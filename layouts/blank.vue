<template>
  <div>
    <LayoutHeaderMobile v-if="mobile" :logo="data.logo"></LayoutHeaderMobile>
    <slot />
  </div>
</template>

<script setup>
  const { mobile } = useScreenSize()
  const query = groq`*[_type == "home"]{logo{asset->{url}}}[0]`
  const sanity = useSanity()
  const { data } = await useAsyncData(() => sanity.fetch(query))
</script>
