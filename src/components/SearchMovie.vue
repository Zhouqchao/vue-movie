<template>
    <section class="search">
				<form>
					<input class="search-input" type="text" v-model.trim="keyword" placeholder="请输入电影名,导演..." autofocus autocomplete="off" @keyup.enter="searchMovies">
					<button class="search-btn" @click.prevent="searchMovies">搜索</button>
				</form>
				<app-loading-icon :isLoading="isLoading"></app-loading-icon>
				<ul class="top250-list movies">
					<app-movie-item  v-for="(movie,index) in movies" :movie="movie" :key="movie.index" closeRank="true"></app-movie-item>
				</ul>
				<ul class="search-list movies"></ul>
				<app-heading title="搜索结果全部加载完毕！No more..." :hasMovieLeft="hasMovieLeft"></app-heading>
	</section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import LoadingIcon from './LoadingIcon.vue'
	import MovieItem from './MovieItem.vue'
	import Heading from './Heading.vue'

	export default {
	  data () {
	    return {
	    	movies: [],
	    	keyword: ''
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
				return this.movies.length === 0
			}
		},
		methods: {
			...mapActions(
					['reverseIsLoading']
			),		
			searchMovies() {
				this.movies = []; // assign a new empty array, empty previous request data, reset hasMovieLeft to true;

				if(this.isLoading) {
					return false;
				}

				this.reverseIsLoading();

				this.$http.jsonp('https://api.douban.com/v2/movie/search', {params: {
					q:this.keyword}}).then(res => {
						this.movies = res = res.body.subjects;
						this.reverseIsLoading();
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		margin-bottom: 50px;

		form{
		  width: 95%;
		  display: flex;
		  justify-content: center;
		  margin: 20px auto;
		  text-align: center;
		  line-height: 30px;
		  padding-bottom: 12px;
		  border-bottom: 1px solid rgba(0,0,0,.1);

			.search-input{
				width: calc(100% - 72px);
				padding: 5px;
			  outline: none;
			  border: none;
			  background-color: #eee;
			  border-radius: 5px;
			  font-size: 16px;
			}   

			.search-btn{
		    border: none;
		    outline: none;
		    background: orangered;
		    color: #fff;
		    padding: 4px 10px;
		    margin-left: 5px;	
		    border-radius: 5px;
		    cursor: pointer;
		    font-size: 16px;
			}
		}
	}

</style>
