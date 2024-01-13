<script setup>
  const query = groq`*[_type == "home"]{logo{asset->{url}}}[0]`
  const sanity = useSanity()
  const { data } = await useAsyncData(() => sanity.fetch(query))

  const { mobile } = useScreenSize()
  onMounted(async () => {
    await document.fonts.ready
    ready.value = true
  })
</script>

<template>
  <div :style="`--header: ${headersize}`" :class="['layout', { ready }]">
    <!-- <LayoutHeaderNew v-if="!mobile" :logo="data.logo"></LayoutHeaderNew>
    <LayoutHeaderMobile v-else :logo="data.logo"></LayoutHeaderMobile> -->
    <slot />
    <!-- <LayoutFooter></LayoutFooter> -->
  </div>
</template>

<style lang="postcss">
  .layout {
    background-color: white;
    /* z-index: -2; */
  }
</style>
