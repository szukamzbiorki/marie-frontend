<template>
  <div class="wrapper">
    <div class="brev">
      <a href="mailto:mariegertsen1@gmail.com">EMAIL ME!</a>
      <!-- <img src="lillebrev.png" alt="" /> -->
    </div>

    <div class="navn">Marie Gertsen</div>

    <div class="grid">
      <div class="item">
        <div class="textbox">
          <div class="titel">This Book Is Going Somewhere!</div>
          <div class="year">2022</div>
        </div>
        <!-- <div class="image"><img src="book.png" alt="" /></div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
  const { mobile } = useScreenSize()

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
    grid-column: 1/-1 !important;
  }
</style>
