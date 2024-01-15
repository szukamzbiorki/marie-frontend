<template>
  <div class="header">
    <NuxtLink to="/about" class="name"
      ><span class="about">About&nbsp;</span>Marie Gertsen</NuxtLink
    >
  </div>
</template>

<script setup></script>

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
