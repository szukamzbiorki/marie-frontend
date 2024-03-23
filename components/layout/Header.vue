<template>
	<div class="header">
		<div class="name">Marie Gertsen</div>
		<NuxtLink to="/about" class="info"
			>Info
			<!-- <img src="/assets/brev.webp" alt="" srcset="" /> -->
		</NuxtLink>
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
		z-index: 1100;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		& > * {
			display: inline-block;
		}

		& > .name {
			cursor: default;
			user-select: none;
		}

		& > .info {
			display: flex;
			flex-direction: row;
			& > div {
				padding-right: var(--space-m);
				transform: translateX(115%);
				transition: transform ease-in-out 0.4s;
				user-select: none;

				@media screen and (max-width: 600px) {
					transform: translateX(0);
					display: none;
				}
			}
			& > img {
				height: calc(10vh - (var(--space-m)));
				z-index: 4;
				filter: contrast(100%);
				width: auto;
			}

			@media (hover: hover) {
				&:hover {
					& > div {
						transform: translateX(0);
					}
				}
			}
		}

		&:hover {
			& > .name > .about {
				max-width: 80px;
			}
		}
	}
</style>
