<template>
		<footer>
			<ul>
			    <router-link to="/" tag="li" active-class="active" exact>
					<i class="iconfont icon-top250"></i>
					<a class="tab-name">Top</a>
				</router-link>
			    <router-link to="/america" tag="li" active-class="active">
			    	<i class="iconfont icon-us"></i>
			    	<a class="tab-name">NorthAmerica</a>
				</router-link>
			    <router-link to="/search" tag="li" active-class="active">
			    	<i class="iconfont icon-search" style="font-size: 22px;"></i>
				    <a class="tab-name">Search</a>
				</router-link>
			</ul>
		</footer>
</template>

<script>
	export default {}
</script>

<style lang="scss" scoped>
	footer{

		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 10;
		background-color: #f0fcfa;
	    color: #396;

		ul{
			display: flex;
			justify-content: space-around;
			vertical-align: middle;
			height: 50px;
			border-top: 1px solid rgba(0,0,0,0.1);

			li {
				flex:1;
				text-align: center;
				cursor: pointer;
			    background: #fff;

			    .iconfont {
					display: block;
					height:30px;
					padding-top: 10px;
					font-size: 16px;
			    	color: #396;
			    }

			    &.active {
			    	color: orangered;

					.iconfont {
						color: inherit;
					}
			    }

				.tab-name{
					display: block;
					position: relative;
					z-index: 1;
					padding-top: 30px;
					margin-top: -30px;
					line-height: 20px;
				}
		  }
		}
	}
		
</style>