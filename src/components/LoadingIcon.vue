<template>
	<div class="loading" ref="loading" :class="{on: isLoading}">
		<i class="iconfont icon-loading"></i>			
	</div>
</template>

<script>
	export default {
		props: ['isLoading']
	}
</script>

<style lang="scss" scoped>
	.loading {
		display: none;
		text-align: center;
		margin: 10px auto;

		.icon-loading {
			display: inline-block;
			color: red;
			animation: circling 1s linear infinite;

		&:before {
			    font-size: 60px;
			}
		}
		
		&.on {
			display: block;
		}
	}

	@keyframes circling{
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(1turn);
		}
	}
</style>