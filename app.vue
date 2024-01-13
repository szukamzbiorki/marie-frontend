<template>
  <div :style="{ '--window-height': `${windowHeight}px` }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  const { height: windowHeight } = useWindowSize()
  useHead({
    title: '',
    ogTitle: '',
    templateParams: {
      separator: '♥',
    },
  })
</script>

<style></style>
