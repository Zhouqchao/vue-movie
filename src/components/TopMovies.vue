<template>
	<section class="top250-wrapper" ref="main" @scroll="isToBottom">
		<div class="top250 active" ref="top250">
			<ul class="top250-list movies" v-if="movies.length !== 0">
				<app-movie-item  v-for="(movie, index) in movies" :movie="movie" :key="movie.index" :rankNum="index" rankTitle="电影Top250"></app-movie-item>
			</ul>
			<app-loading-icon :isLoading="isLoading"></app-loading-icon>
			<app-heading title="Top250加载完毕！"  :hasMovieLeft="hasMovieLeft"></app-heading>
		</div>
		<router-view></router-view>


	</section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import LoadingIcon from './LoadingIcon.vue'
	import MovieItem from './MovieItem.vue'
	import Heading from './Heading.vue'

	let topMovies = [];

	export default {
		data() {
			return {
				movies: topMovies,
				config: {
					start: 0,
					count: 10
				}
			}
		},
		components: {
			appLoadingIcon: LoadingIcon,
			appMovieItem: MovieItem,
			appHeading: Heading
		},
		computed: {
			...mapGetters(
					['isLoading']
				),
			hasMovieLeft() {
				return this.movies.length !== 250
			}
		},
		created() {
			this.$nextTick(() => {
				if(topMovies.length === 0) {
					this.getMovies();
				}
			})
		},
		methods: {
			...mapActions(
					['reverseIsLoading']
				),
			isToBottom() { // check if scroll to bottom , to send another http request
				const wrapperH = parseInt(window.getComputedStyle(this.$refs.main).height);
				const wrapperScrollTop = this.$refs.main.scrollTop;
				const eleH = parseInt(window.getComputedStyle(this.$refs.top250).height);

					const timer = null;
					const vm = this;
					if(timer) {
						clearTimeout(timer);
					}else{
						setTimeout(function(){
							if(wrapperH + wrapperScrollTop + 5 >= eleH) {
								if(vm.movies.length !== 250){
									vm.getMovies();
								}
							}
						},300);
					}

			},		
			getMovies() {	
				if(this.isLoading) {
					return false;
				}

				this.reverseIsLoading();

				this.$http.jsonp('https://api.douban.com/v2/movie/top250', {params: {
					start: this.config.start, count: this.config.count}}).then(res => {
						document.title = res.body.title;
						res = res.body.subjects;
						topMovies = topMovies.concat(res);
						this.movies = topMovies;
						this.config.start += this.config.count;
						this.reverseIsLoading();
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.top250-wrapper{
		height: calc(100vh - 50px);
		overflow-y: scroll;
		-webkit-overflow-scrolling:touch;

		.top250{
			display: none;
			padding-bottom: 20px;

			&.active{
				display: block;
			}
		}
	}



</style>