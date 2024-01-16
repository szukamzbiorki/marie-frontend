<template>
  <div class="header">
    <NuxtLink to="/about" class="name"
      ><span class="about">About&nbsp;</span>Marie Gertsen</NuxtLink
    >

    <div class="position">Thanks for connecting from {{ results }}</div>
  </div>
</template>

<script setup>
  import { useIdle } from '@vueuse/core'

  const { idle, lastActive } = useIdle(3 * 1000) // 10 sec
  const now = useTimestamp({ interval: 1000 })

  import { useGeolocation } from '@vueuse/core'

  const { coords, locatedAt, error } = useGeolocation()

  const options = {
    method: 'GET',
    url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
    params: {
      latitude: coords.latitude,
      longitude: coords.longitude,
      range: '0',
    },
    headers: {
      'X-RapidAPI-Key': 'd87f36c547msh843540dedf3087cp1fb3fdjsnb597fe239f81',
      'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com',
    },
  }

  const {
    results,
    pending,
    error: er,
    refresh,
  } = await useAsyncData('mountains', () =>
    $fetch(
      'https://api.tomtom.com/search/2/reverseGeocode/52.157831,5.223776.json?key={Your_API_Key}&radius=100',
      options
    )
  )

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
