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
		background-color: white;
	}
	.grid {
		margin-top: 10vh;
		padding: var(--space-m);
		background-color: white;
		display: flex;
		flex-direction: column;
		gap: var(--space-m);
		overflow: hidden;
	}
</style>
