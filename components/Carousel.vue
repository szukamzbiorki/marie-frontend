<template>
	<div :class="spaces.get(content.space)">
		<div v-if="!mobile" ref="swipe" class="swiper">
			<div
				class="swiper-wrapper"
				@click="swiper.slideNext()"
				@mouseover="cursorShow = true"
				@mouseout="cursorShow = false"
			>
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
			<div v-for="image in imagesMobile" :key="image._id" class="slide">
				<Media class="swiperimg" :medium="image"></Media>
			</div>
		</div>

		<div
			v-if="!mobile && cursorShow"
			class="cursor"
			:style="`top: ${y}px; left: ${x}px;`"
		>
			<div class="counter">{{ slideNumber }}/{{ content.images.length }}</div>
			<div class="next">NEXT</div>
		</div>
	</div>
</template>

<script setup>
	const { mobile } = useScreenSize()
	const { x, y } = useMouse()

	const props = defineProps({
		content: Object,
	})

	const imagesMobile = computed(() => {
		return props.content.images.filter((e) => e.mobile != false)
	})

	console.log(imagesMobile.value)

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
	import { EffectFade } from 'swiper/modules'

	const swipe = ref(null)
	const swiper = ref()
	const slideNumber = ref(1)
	const cursorShow = ref(false)

	function showCursor() {
		cursorShow.value = true
		console.log('hejka', cursorShow.value)
	}

	onMounted(() => {
		swiper.value = new Swiper(swipe.value, {
			modules: [EffectFade],
			grabCursor: true,
			observer: true,
			observeParents: true,
			loop: true,
			slidesPerView: 'auto',
			effect: 'fade',
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
	.cursor {
		position: absolute;
		border: black;
		z-index: 1000;
		color: black;
		transform: translate(-50%, -50%);
		pointer-events: none;
		display: flex;
		align-items: center;
		gap: 2px;

		& > * {
			background-color: white;
			padding: 0 2px;
			border: black 0.5px solid;
			font-size: 72%;
		}
	}

	.triangle {
		width: 0px;
		height: 0px;
		border-style: solid;
		border-width: 8.5px 0 8.5px 14.7px;
		border-color: transparent transparent transparent #ff4532;
		transform: rotate(0deg);
	}
	.swiper {
		width: 100vw;
		max-width: 100vw;
		background-color: var(--grey);
	}

	.swiper-wrapper {
		display: flex;
		box-sizing: border-box;
		padding-right: var(--grad);
		cursor: none !important;
		pointer-events: all;
		background-color: var(--grey);
	}

	.swiper-slide {
		width: auto;
		margin-right: var(--space-m);
		background-color: var(--grey);

		&:last-child {
			margin-right: 20vw;
		}

		& > .swiperimg {
			height: 67vh;
			background-color: var(--grey);
		}
	}

	.images {
		display: flex;
		flex-direction: column;
		gap: var(--space-m);
	}
</style>
