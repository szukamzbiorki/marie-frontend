<template>
  <div :class="spaces.get(content.space)">
    <div v-if="!mobile" ref="swipe" class="swiper">
      <div class="swiper-wrapper">
        <div
          v-for="image in content.images"
          :key="image._id"
          class="swiper-slide"
        >
          <Media class="swiperimg" :medium="image"></Media>
        </div>
      </div>
    </div>
    <div v-else-if="mobile" class="images">
      <div v-for="image in content.images" :key="image._id" class="slide">
        <Media class="swiperimg" :medium="image"></Media>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { mobile } = useScreenSize()

  console.log(mobile)
  const props = defineProps({
    content: Object,
  })

  const spaces = new Map([
    ['0', '-m-b-0'],
    ['S', '-m-b-s'],
    ['M', '-m-b-m'],
    ['L', '-m-b-l'],
    ['XL', '-m-b-xl'],
  ])

  import Swiper from 'swiper'
  import 'swiper/css'
  import 'swiper/css/navigation'

  const swipe = ref(null)
  const swiper = ref()
  const slideNumber = ref(1)

  onMounted(() => {
    swiper.value = new Swiper(swipe.value, {
      grabCursor: true,
      observer: true,
      observeParents: true,
      loop: false,
      slidesPerView: 'auto',
      on: {
        slideChange: (swiper) => {
          slideNumber.value = swiper.realIndex + 1
        },
      },
    })
  })

  onUnmounted(() => {
    if (swiper.value) {
      swiper.value.destroy()
    }
  })
</script>

<style lang="postcss" scoped>
  .swiper {
    width: 100vw;
    max-width: 100vw;
  }

  .swiper-wrapper {
    display: flex;
    box-sizing: border-box;
    padding-right: var(--grad);
  }

  .swiper-slide {
    /* max-height: 70vh; */
    width: auto;
    margin-right: var(--space-m);

    &:last-child {
      margin-right: 20vw;
    }

    & > .swiperimg {
      height: 50vh;
    }
  }

  .images {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }
</style>
