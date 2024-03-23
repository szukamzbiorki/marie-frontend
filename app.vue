<template>
	<div
		:style="[
			{ '--window-height': `${windowHeight}px` },
			{ '--grey': `${data.about.color?.hex}` },
		]"
	>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup>
	const { height: windowHeight } = useWindowSize()
	useHead({
		title: '',
		ogTitle: '',
		templateParams: {
			separator: '♥',
		},
	})

	const query = groq`{
    "about": *[_type == "about"][0],
    }`
	const sanity = useSanity()
	const { data } = await useAsyncData(() => sanity.fetch(query))

	console.log(data.value)
</script>

<style></style>
