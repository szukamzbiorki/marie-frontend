<template>
  <div class="wrapper">
    <LayoutHeader></LayoutHeader>
    <div class="grid">
      <div v-for="(p, i) in data.projects" class="item">
        <div class="top">
          <div class="ani">
            <div class="title">{{ p.title }}<span>,&nbsp;</span></div>
            <div class="year">{{ p.year }}</div>
            <div class="client">{{ p.client }}</div>
          </div>
          <div class="desc">{{ p.description }}</div>
        </div>
        <div class="bot">
          <LazyCarousel :content="p"></LazyCarousel>
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

  new BugController({ minBugs: 4, maxBugs: 7, mouseOver: 'fly' })

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

    & > .top {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: auto 0fr;
      grid-column: 1/-1;
      grid-row: 1/2;
      cursor: default;
      transition: grid-template-rows 0.5s ease-in-out;
      & > .ani {
        grid-column: 1/-1;
        display: flex;
        flex-direction: row;
        & > .title {
          transition: min-width 0.5s ease-in-out;
          min-width: 3px;
          & > span {
            transition: opacity 0.5s ease-in-out;
          }
        }

        & > .year {
          transition: min-width 0.5s ease-in-out;
          min-width: 3px;
        }

        & > .client {
          transition: min-width 0.5s ease-in-out, opacity 0.5s ease-in-out;
          min-width: 3px;
          opacity: 0;
        }
      }

      & > .desc {
        grid-column: 1 / span 4;
        grid-row: 2/-1;
        overflow: hidden;
        color: grey;
      }
    }

    &:hover {
      & > .top {
        grid-template-rows: auto 1fr;

        & > .ani {
          display: flex;
          flex-direction: row;
          & > .title {
            min-width: calc((100vw - 2 * var(--space-m)) / 12 * 4);
            & > span {
              opacity: 0;
            }
          }
          & > .year {
            min-width: calc((100vw - 2 * var(--space-m)) / 12 * 4);
          }

          & > .client {
            min-width: calc((100vw - 2 * var(--space-m)) / 12 * 4);
            opacity: 1;
          }
        }
      }
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
</style>
