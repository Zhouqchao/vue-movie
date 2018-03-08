import TopMovies from './components/TopMovies.vue'
import AmericaMovies from './components/AmericaMovies.vue'
import SearchMovie from './components/SearchMovie.vue'
import MovieDetail from './components/MovieDetail.vue'
import Filmer from './components/Filmer.vue'

export const routes= [
	{
		path: '/',
		component: TopMovies,
		children: [
			{
				path: '/movie/:id',
				component: MovieDetail
			}
		]
	},
	{
		path: '/america',
		component: AmericaMovies
	},
	{
		path: '/search',
		component: SearchMovie
	},
	{
		path: '/filmer/:id',
		component: Filmer
	}
];