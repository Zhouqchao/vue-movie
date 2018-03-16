import TopMovies from './components/TopMovies.vue'
import AmericaMovies from './components/AmericaMovies.vue'
import SearchMovie from './components/SearchMovie.vue'
import MovieDetail from './components/MovieDetail.vue'
import Filmer from './components/Filmer.vue'

export const routes= [
	{
		path: '/',
		name: 'top',
		component: TopMovies
	},
	{
		path: '/movie/:id',
		name: 'moviedetail',
		component: MovieDetail
	},
	{
		path: '/america',
		name: 'america',
		component: AmericaMovies
	},
	{
		path: '/search',
		name: 'search',
		component: SearchMovie
	},
	{
		path: '/filmer/:id',
		name: 'filmer',
		component: Filmer
	}
];