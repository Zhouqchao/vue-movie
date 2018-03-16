<template>
	<div>
		<section class="movie-detail">
			<app-loading-icon :isLoading="isLoading"></app-loading-icon>
			<div v-if="movie" :style="{display: movie ? 'block' : 'none'}">
				<div class="cover">
					<img v-if="movie.images"  :src="movie.images.small">
				</div>
				<div class="info">
					<h2 class="title">{{movie.title}}</h2>
					<p class="pubtime-country-type">
						{{movie.year}} / {{movie.countries[0]}} / 
						<span class="type">{{ type }}</span>
					</p>
					<p class="original-name">原名：{{movie.original_title}}</p>
					<p class="pubtime-consise"></p>
					<p class="duration"></p>
					<p class="rating-counts">
						<span>豆瓣评分：</span>
						<span class="rating">{{movie.rating.average}}</span>
						<app-star :score="movie.rating.average"></app-star>
						<p class="counts">评论数：{{movie.ratings_count}} 人次</p>
					</p>
				</div>
				<div class="summary" :class="{part: !isClicked}" @click="isClicked = !isClicked">
					<h3>剧情简介</h3>
					{{movie.summary}}
				</div>
				<div class="filmer-wrapper">
					<h3 class="title">影人</h3>
					<ul class="filmers">
						<li class="filmer" v-for="(filmer, index) in filmers">
								<router-link :to="{name:'filmer',params:{id:filmer.id}}">
									<img class="filmer-img" v-if="filmer.avatars"  :src="filmer.avatars.small">
									<p class="filmer-name">{{filmer.name}}</p>
									<p>{{index === 0 ? '导演' : '演员'}}</p>
								</router-link>
						 </li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import LoadingIcon from './LoadingIcon.vue'
	import Star from './star/star.vue'

	export default {
		data() {
			return {
				movie: null,
				filmers : [],
				type : '',
				isClicked: false,
				id: ''
			}
		},
		components: {
			appLoadingIcon: LoadingIcon,
			appStar: Star
		},
		// created() {
		// 		this.getMovieDetail();
		// },
		computed: {
			...mapGetters(
					['isLoading']
				)
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if(to.params.id !== vm.id) {
					vm.movie = null,
					vm.filmers = [],
					vm.type = '',
					vm.$nextTick(() => {
						vm.getMovieDetail();
					})
				}
			})
		},	
		beforeRouteLeave(to, from, next) {
			this.id = from.params.id;
			next();
		},
		methods: {
			...mapActions(
					['reverseIsLoading']
				),
			getMovieDetail() {
				this.reverseIsLoading();
				var vm = this;
				this.$http.jsonp('https://api.douban.com/v2/movie/subject/'+ this.$route.params.id).then(res => {
						this.reverseIsLoading();
						
						this.movie = res = res.body;
						this.filmers = res.directors.concat(res.casts);	
						let vm = this;

						this.filmers.forEach(function(filmer){
							if(!filmer.avatars){
								return false;
							}
							vm.filmers.push(filmer);
						})

						this.type = this.movie.genres.join(' / ');

					})
				}
		}
	}
</script>

<style lang="scss" scoped>

	@keyframes moveInFromTop {
		from {
			transform: translateY(-100px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
	@keyframes moveInFromLeft {
		from {
			transform: translateX(-100px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	.movie-detail {
		width: 100%;
		height: 100%;
		// overflow: scroll;
		background-color: #fff;
		padding: 2% 8%;
		line-height: 1.5;
		padding-bottom: 100px;	

		& > div{
			margin-bottom: 20px;
		}
		.cover{
			width: 100%;
			min-height: 280px;
			padding: 20px 50px;
			margin-bottom: 20px;
			text-align: center;
			box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
			animation: moveInFromTop .6s ease-out;

			img{
				width: 100%;
			}
		}

		.info {
			.rating {
				color: orangered;
				font-weight: bold;
				margin-right: 4px;
			}
		}

		.summary{
			display: -webkit-box;
			-webkit-box-orient:vertical;
			overflow: hidden;

			&.part{
				-webkit-line-clamp:3;
			}
		}

		.filmers{
			width: 100%;
			white-space: nowrap;
			overflow-x: scroll;

			&::-webkit-scrollbar {
			    height: 1em;
			}		

			&::-webkit-scrollbar-thumb{
				background-color:transparent;
			}

			.filmer{
				display: inline-block;
				width: 33.3333%;
				text-align: center;

				.filmer-img{
					width: 100%;
					height: 113px;
					background-color: #ccc;
					animation: moveInFromLeft .6s ease-out;
				}

				.filmer-name{
					font-size: 12px;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}	
			}
		}
	}

</style>