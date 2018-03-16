import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		isLoading: false,
	},
	getters: {
		isLoading(state) {
			return state.isLoading;
		}
	},
	mutations: {
		reverseIsLoading(state) {
			state.isLoading = !state.isLoading;
		}
	},
	actions: {
		reverseIsLoading({commit}) {
			commit('reverseIsLoading');
		}
	}
})