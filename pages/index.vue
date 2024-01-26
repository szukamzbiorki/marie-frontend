<template>
  <div class="wrapper">
    <LayoutHeader></LayoutHeader>
    <!-- {{ idle }} {{ idledFor }} -->
    <div class="grid">
      <div v-for="(p, i) in data.projects" class="item">
        <div class="ani">
          <div class="title">{{ p.title }}<span>,&nbsp;</span></div>
          <div class="year">{{ p.year }}</div>
          <div class="client">{{ p.client }}</div>
        </div>
        <div class="carousel">
          <LazyCarousel class="caru" :content="p"></LazyCarousel>
          <div class="gradient"></div>
        </div>
        <div class="desc">{{ p.description }}</div>
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

  // new BugController({ minBugs: 4, maxBugs: 6, mouseOver: 'fly' })

  useHead({})
  useSeoMeta({})
</script>

<style lang="postcss">
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
    gap: var(--space-s) var(--space-m);
    grid-template-rows: auto auto;
    background-color: white;

    grid-template-rows: auto auto 0fr;
    grid-column: 1/-1;
    grid-row: 1/2;
    cursor: default;
    transition: grid-template-rows 0.5s ease-in-out;
    width: calc(100vw - 2 * (var(--space-m)));

    & > .ani {
      grid-column: 1/-1;
      display: flex;
      flex-direction: row;
      @media screen and (max-width: 600px) {
        width: 100%;
        justify-content: space-between;
        & > .title {
          & > span {
            display: none;
          }
        }
      }
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
      grid-column: 1 / -1;
      width: calc((100vw - 2 * var(--space-m)) / 12 * 6);
      grid-row: 3/-1;
      overflow: hidden;
      color: grey;
      /* font-family: 'NHG', sans-serif; */
      white-space: pre-wrap;
    }
    @media screen and (max-width: 600px) {
      grid-template-rows: auto auto 1fr;
      & > .desc {
        width: calc((100vw - 2 * var(--space-m)));
      }
    }

    & > .carousel > .caru > .swiper > .swiper-wrapper > .swiper-slide {
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }
    .swiper-slide-active {
      opacity: 1 !important;
    }
    @media (hover: hover) {
      &:hover {
        grid-template-rows: auto auto 1fr;
        & > .carousel > .caru > .swiper > .swiper-wrapper > .swiper-slide {
          opacity: 1;
        }
        & > .ani {
          display: flex;
          flex-direction: row;

          & > .title {
            min-width: calc((100vw - 2 * var(--space-m)) / 12 * 3);
            & > span {
              opacity: 0;
            }
          }
          & > .year {
            min-width: calc((100vw - 2 * var(--space-m)) / 12 * 1);
          }

          & > .client {
            min-width: calc((100vw - 2 * var(--space-m)) / 12 * 3);
            opacity: 1;
          }
        }
      }
    }
  }

  .carousel {
    position: relative;
    width: calc(100vw - 2 * (var(--space-m)));
    & > .gradient {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: var(--grad);
      background: linear-gradient(-90deg, #ffffffff, #00000000);
      z-index: 4;

      @media screen and (max-width: 600px) {
        display: none;
      }
    }
  }
</style>
