<template>
	<div class="wrapper">
		<LayoutHeader></LayoutHeader>
		<div class="grid">
			<Project :p="p" v-for="(p, i) in data.projects" class="item"> </Project>
		</div>
	</div>
</template>

<script setup>
	const query = groq`{
    "projects": *[_type == "project" && show == true]| order(orderRank),
    }`
	const sanity = useSanity()
	const { data } = await useAsyncData(() => sanity.fetch(query))

	definePageMeta({
		layout: 'default',
	})

	new BugController({ minBugs: 1, maxBugs: 1, mouseOver: 'fly' })

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
		/* mask-image: linear-gradient(90deg, rgb(0 0 0 / 100%), 80%, transparent); */
		background-color: var(--blueski);
		/* mask-mode: alpha; */
	}
	.grid {
		margin-top: 10vh;
		padding: var(--space-m);
		background-color: var(--grey);
		display: flex;
		flex-direction: column;
		gap: var(--space-m);
		overflow: hidden;
	}
</style>
