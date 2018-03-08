<template>
    <section class="us movies">
			<ul class="us-movie-list">
				<app-movie-item  v-for="(movie, index) in movies" :movie="movie" :key="movie.index" :rankNum="index" rankTitle="北美票房榜"></app-movie-item>
			</ul>
			<app-loading-icon :isLoading="isLoading"></app-loading-icon>
			<app-heading title="没有更多电影了" :hasMovieLeft="hasMovieLeft"></app-heading>
		</section>
</template>

<script>

import {mapGetters,mapActions} from 'vuex'
import MovieItem from './MovieItem.vue'
import LoadingIcon from './LoadingIcon.vue'
import Heading from './Heading.vue'

let movieData = [];

export default {
  data () {
    return {
    	movies: movieData
    }
  },
  components: {
  	appMovieItem: MovieItem,
  	appLoadingIcon: LoadingIcon,
  	appHeading: Heading
  },
  computed: {
		...mapGetters(
				['isLoading']
			),
		hasMovieLeft() {
			return this.movies.length === 0;
		}
	},
	created() {
		this.$nextTick(() => {
			if(movieData.length === 0) {
				this.getMovies();
			}
		})
	},
	methods: {
		...mapActions(
				['reverseIsLoading']
			),	
		getMovies() {	
			this.reverseIsLoading();

			const vm = this;

			this.$http.jsonp('http://api.douban.com/v2/movie/us_box').then(res => {
					document.title = res.body.title;

					res = res.body.subjects;

					res.forEach(function(ele){
						movieData.push(ele.subject);
						vm.movies = movieData;
					})

					this.reverseIsLoading();
				});
		},
	}
}
</script>

<style lang="scss" scoped>
	.us {
		margin-bottom: 50px;
	}
</style>
