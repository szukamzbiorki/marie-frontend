<template>
	<div class="wrapper">
		<div class="info">
			<NuxtLink to="/" class="back">Back</NuxtLink>
			<div class="content">
				<a class="email" :href="`mailto:${data.about.email}`">{{
					data.about.email
				}}</a>
				<!-- <a
					class="phone"
					v-if="data.about.phone"
					:href="`tel:${data.about.phone}`"
					>{{ data.about.phone }}</a
				> -->
				<div class="phone" v-if="data.about.phone">
					{{ data.about.phone }}
				</div>
				<a class="instagram" :href="`https://instagram.com/marie9ert`">
					@marie9ert
				</a>
				<div class="description">
					{{ data.about.about }}
				</div>
				<span @click="credits = true" v-if="!credits" class="credits but"
					>Credits</span
				>
				<span v-if="credits" class="credits"
					>Code: <a href="https://bartekp.info">Bartek Pierściński</a
					><br />Typeface: Karrik by Jean-Baptiste Morizot, Lucas Le Bihan.
					Distributed by
					<a href="https://velvetyne.fr">velvetyne.fr</a>
				</span>
				<Media class="image" :medium="data.about.image"></Media>
			</div>
		</div>
	</div>
</template>

<script setup>
	const { mobile } = useScreenSize()
	const credits = ref(false)

	const query = groq`{
    "about": *[_type == "about"][0],
    }`
	const sanity = useSanity()
	const { data } = await useAsyncData(() => sanity.fetch(query))

	definePageMeta({
		layout: 'default',
	})

	useHead({
		title: 'About',
	})
	useSeoMeta({})
</script>

<style scoped>
	.grid {
		margin-top: 10vh;
		padding: var(--space-m);
		display: flex;
		flex-direction: column;
		gap: var(--space-m);
	}

	.item {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: var(--space-m);
		grid-template-rows: auto auto;
		background-color: white;
	}

	.textbox {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-column: 1/-1;
		grid-row: 1/2;
	}

	.titel {
		grid-column: span 4;
	}

	.image {
		grid-column: 1/7;
		grid-row: 2/-1;
	}

	.info {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: white;
		z-index: 2;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: var(--space-m);

		@media screen and (max-width: 600px) {
			justify-content: flex-start;
			gap: 100px;
		}
	}

	.content {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: var(--space-m);
		grid-template-rows: auto auto;

		@media screen and (max-width: 600px) {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.content > div,
	a,
	.instagram {
		grid-column: span 3;

		@media screen and (max-width: 600px) {
			grid-column: 1 / span 1;
		}
	}

	.description {
		grid-column: 1 / span 6 !important;

		@media screen and (max-width: 600px) {
			grid-column: span 2 !important;
		}

		white-space: pre-wrap;
	}

	.image {
		grid-column: span 2 !important;
		width: 183px;
		@media screen and (max-width: 600px) {
			grid-column: span 1 !important;
			width: auto;
		}

		grid-row: 1 / span 1;
		white-space: pre-wrap;
	}

	.email {
		grid-column: 1 / span 3 !important;

		@media screen and (max-width: 600px) {
			grid-column: 1 / span 2 !important;
		}
	}

	a {
		text-decoration: underline;
		color: black;
	}

	.but {
		cursor: pointer;
		text-decoration: underline;
	}

	.credits {
		grid-column: 1 / span 6 !important;

		@media screen and (max-width: 600px) {
			grid-column: span 2 !important;
		}

		white-space: pre-wrap;
	}
</style>
