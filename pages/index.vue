<template>
  <div class="wrapper">
    <div class="grid">
      <div v-for="(p, i) in data.projects" class="item">
        <div class="top">
          <div class="title">{{ p.title }}</div>
          <div class="year">{{ p.year }}</div>
          <div class="desc">{{ p.description }}</div>
        </div>
        <div class="bot">
          <Carousel :content="p"></Carousel>
          <div class="gradient"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { mobile } = useScreenSize()

  const query = groq`{
    "projects": *[_type == "project" && show == true]| order(orderRank),
    }`
  const sanity = useSanity()
  const { data } = await useAsyncData(() => sanity.fetch(query))

  definePageMeta({
    layout: 'default',
  })

  useHead({})
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
    gap: 0 var(--space-m);
    grid-template-rows: auto auto;
    background-color: white;
  }

  .top {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto 0fr;
    grid-column: 1/-1;
    grid-row: 1/2;
    cursor: default;
    transition: grid-template-rows 0.3s ease;

    & > .desc {
      grid-column: 1 / span 4;
      grid-row: 2/-1;
      overflow: hidden;
    }

    &:hover {
      grid-template-rows: auto 1fr;
    }
  }

  .bot {
    position: relative;
    & > .gradient {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: var(--grad);
      background: linear-gradient(-90deg, #ffffffff, #00000000);
      z-index: 4;
    }
  }

  .title {
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
    grid-column: 1/-1 !important;
  }
</style>
