<template>
  <div class="wrapper">
    <div class="info">
      <NuxtLink to="/" class="name">Back</NuxtLink>
      <div class="content">
        <div class="div">Marie Gertsen</div>
        <div class="div">1978, Copenhagen</div>
        <div class="div">mariegertsen@gmail.com</div>
        <div class="description">
          {{ data.about.about }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { mobile } = useScreenSize()

  const query = groq`{
    "about": *[_type == "about"][0],
    }`
  const sanity = useSanity()
  const { data } = await useAsyncData(() => sanity.fetch(query))

  definePageMeta({
    layout: 'default',
  })

  useHead({
    title: 'About',
  })
  useSeoMeta({})
</script>

<style scoped>
  .grid {
    margin-top: 10vh;
    padding: var(--space-m);
    background-color: var(--color);
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }

  .item {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--space-m);
    grid-template-rows: auto auto;
    background-color: white;
  }

  .textbox {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column: 1/-1;
    grid-row: 1/2;
  }

  .titel {
    grid-column: span 4;
  }

  .image {
    grid-column: 1/7;
    grid-row: 2/-1;
  }

  .info {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--space-m);
  }

  .content {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--space-m);
    grid-template-rows: auto auto;
  }

  .content > div {
    grid-column: span 3;
  }

  .description {
    grid-column: span 6 !important;
    grid-row: 2 / span 1;
    white-space: pre-wrap;
  }
</style>
