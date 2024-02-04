<template>
	<div class="item">
		<div class="carousel">
			<Carousel class="caru" :content="p"></Carousel>
		</div>
		<div class="ani">
			<div class="title">{{ p.title }}<span>,&nbsp;</span></div>
			<div class="year">{{ p.year }}</div>
			<div v-if="p.client && !mobile" class="client">{{ p.client }}</div>
		</div>
		<div class="desc">
			<div v-if="p.client && mobile" class="client">{{ p.client }}</div>
			<div class="text" ref="text">
				{{ p.description }}
			</div>
		</div>
	</div>
</template>

<script setup>
	const { x, y } = useMouse()
	const text = ref()
	const { height } = useElementSize(text)
	const { mobile } = useScreenSize()

	const realHeight = computed(() => height.value + 'px')

	onMounted(() => {
		console.log(realHeight.value)
	})
	const props = defineProps({
		p: Object,
	})
</script>

<style lang="postcss">
	.item {
		display: flex;
		flex-direction: column;
		padding: var(--space-m) 0 var(--space-s) var(--space-m);
		gap: var(--space-s) var(--space-m);
		background-color: var(--grey);
		grid-column: 1/-1;
		grid-row: 1/2;
		cursor: default;
		width: calc(100vw - 2 * (var(--space-m)));
		@media screen and (max-width: 600px) {
			margin-bottom: calc(3 * var(--space-m));
			padding: 0;
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
			white-space: pre-wrap;
			height: 0;
			transition: height 0.43s ease-in-out;
			& > .text {
				overflow: hidden;
			}
		}
		@media screen and (max-width: 600px) {
			& > .desc {
				width: calc((100vw - 2 * var(--space-m)));
				height: v-bind(height);
			}
		}

		& > .carousel > .caru > .swiper > .swiper-wrapper > .swiper-slide {
			opacity: 0;
			transition: opacity 0.43s ease-in-out;
			background-color: var(--grey);
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
					height: v-bind(realHeight);
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

	.client {
		color: black !important;
	}

	.carousel {
		width: calc(100vw - 2 * (var(--space-m)));
		/* mask-image: linear-gradient(90deg, rgb(0 0 0 / 100%), 80%, transparent); */
		mask-image: none;

		@media screen and (max-width: 600px) {
			mask-image: none;
		}
	}
</style>
