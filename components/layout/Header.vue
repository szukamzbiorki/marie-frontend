<template>
  <div class="header">
    <NuxtLink to="/about" class="name"
      ><span class="about">About&nbsp;</span>Marie Gertsen</NuxtLink
    >

    <!-- <div class="position">Thanks for connecting from {{ results }}</div> -->
  </div>
</template>

<script setup>
  import { useIdle } from '@vueuse/core'

  const { idle, lastActive } = useIdle(3 * 1000) // 10 sec
  const now = useTimestamp({ interval: 1000 })

  import { useGeolocation } from '@vueuse/core'

  const { coords, locatedAt, error } = useGeolocation()

  const idledFor = computed(() =>
    Math.floor((now.value - lastActive.value) / 1000)
  )
</script>

<style lang="postcss" scoped>
  .header {
    position: fixed;
    top: 0;
    padding: var(--space-m);

    & > .name {
      display: inline-block;
      display: flex;
      flex-direction: row;
      z-index: 900;
      position: relative;
      & > .about {
        display: inline-block;
        max-width: 0px;
        overflow: hidden;
        transition: max-width 0.5s;
      }
    }

    &:hover {
      & > .name > .about {
        max-width: 80px;
      }
    }
  }
</style>
