<template>
    <section class="search">
				<form>
					<input class="search-input" type="text" v-model.trim="keyword" placeholder="搜索电影、电视剧、综艺、影人" autofocus autocomplete="off" @keyup.enter="searchMovies" ref="inputValue">
					<span class="search-empty" @click="emptySearch" v-show="!isEmpty">x</span>
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
	  beforeCreate() {
	  	document.title = '电影搜索';
	  },
	  computed: {
			...mapGetters(
					['isLoading']
				),
			hasMovieLeft() {
				return this.movies.length === 0
			},
			isEmpty() {
				return this.keyword === "";
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
						this.$refs.inputValue.blur();
						this.movies = res = res.body.subjects;
						this.reverseIsLoading();
					});
			},
			emptySearch() {
				this.keyword = "";
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		padding-bottom: 50px;

		form{
		  width: 95%;
		  display: flex;
		  justify-content: center;
		  margin: 20px auto;
		  text-align: center;
		  line-height: 30px;
		  padding-bottom: 12px;
		  border-bottom: 1px solid rgba(0,0,0,.1);
		  position: relative;

			.search-input{
				width: calc(100% - 72px);
				padding: 5px;
			  outline: none;
			  border: none;
			  background-color: #eee;
			  border-radius: 5px;
			  font-size: 16px;
			}   

			.search-empty {
				font-size: 22px;
				font-family: Arial;
				color: rgba(0,0,0,.6);
				position: absolute;
				top: 0;
				left: calc(100% - 92px);
				cursor: pointer;
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
