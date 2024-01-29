<template>
  <div class="wrapper">
    <LayoutHeader></LayoutHeader>
    <div class="grid">
      <div v-for="(p, i) in data.projects" class="item">
        <div class="ani">
          <div class="title">{{ p.title }}<span>,&nbsp;</span></div>
          <div class="year">{{ p.year }}</div>
          <div v-if="p.client & !mobile" class="client">{{ p.client }}</div>
        </div>
        <div class="carousel">
          <Carousel class="caru" :content="p"></Carousel>
        </div>
        <div class="desc">
          <div v-if="p.client && mobile" class="client">{{ p.client }}</div>
          <div class="text">
            {{ p.description }}
          </div>
        </div>
      </div>
      <div class="cipa"></div>
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
  .wrapper {
    /* background-image: linear-gradient(
        45deg,
        var(--blueski) 25%,
        transparent 25%
      ),
      linear-gradient(-45deg, var(--blueski) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #808080 75%),
      linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 10vw 30vw;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px; */
    background-color: var(--blueski);
  }
  .grid {
    margin-top: 10vh;
    padding: var(--space-m);
    background-color: var(--color);
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    overflow: hidden;
  }

  .client {
    color: black !important;
  }

  .item {
    display: flex;
    flex-direction: column;
    padding: var(--space-s) 0 var(--space-s) var(--space-m);
    gap: var(--space-s) var(--space-m);
    background-color: white;
    grid-column: 1/-1;
    grid-row: 1/2;
    cursor: default;
    width: calc(100vw - 2 * (var(--space-m)));
    @media screen and (max-width: 600px) {
      margin-bottom: calc(3 * var(--space-m));
      padding: 0;
    }

    &:nth-of-type(2n) {
      /* background-color: rgb(152, 200, 255); */
    }

    & > .ani {
      display: flex;
      flex-direction: row;
      width: calc(100vw - 2 * (var(--space-m)));
      @media screen and (max-width: 600px) {
        justify-content: space-between;
        & > .title {
          & > span {
            display: none;
          }
        }
      }
      & > .title {
        transition: min-width 0.43s ease-in-out;
        min-width: 3px;
        & > span {
          transition: opacity 0.43s ease-in-out;
        }
      }

      & > .year {
        transition: min-width 0.43s ease-in-out;
        min-width: 3px;
      }

      & > .client {
        transition: min-width 0.43s ease-in-out, opacity 0.43s ease-in-out;
        min-width: 3px;
        opacity: 0;
      }
    }
    & > .desc {
      width: calc((100vw - 2 * var(--space-m)) / 12 * 6);
      grid-row: 3/-1;
      overflow: hidden;
      color: grey;
      /* font-family: 'NHG', sans-serif; */
      white-space: pre-wrap;
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.43s ease-in-out;
      & > .text {
        overflow: hidden;
      }
    }
    @media screen and (max-width: 600px) {
      grid-template-rows: 1fr;
      & > .desc {
        width: calc((100vw - 2 * var(--space-m)));
      }
    }

    & > .carousel > .caru > .swiper > .swiper-wrapper > .swiper-slide {
      opacity: 0;
      transition: opacity 0.43s ease-in-out;
      background-color: white;
    }
    .swiper-slide-active {
      opacity: 1 !important;
    }
    @media (hover: hover) {
      &:hover {
        & > .carousel {
          &:hover {
            & > .caru > .swiper > .swiper-wrapper > .swiper-slide {
              opacity: 0;
            }
          }
        }

        & > .desc {
          grid-template-rows: 1fr;
        }

        & > .ani {
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
    width: calc(100vw - 2 * (var(--space-m)));
    /* mask-image: linear-gradient(90deg, rgb(0 0 0 / 100%), 80%, transparent); */
    mask-image: none;

    @media screen and (max-width: 600px) {
      mask-image: none;
    }
  }

  .cipa {
    height: 0;
  }
</style>
