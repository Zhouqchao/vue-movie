<template>
	<section id="filmer">
		<div v-if="filmer">
			<div class="avatar">
				<img :src="filmer.avatars.small">
			</div>
			<div class="info">
				<div class="name-collect">
					<div class="name-info">
						<h2 class="name-cn">{{filmer.name}}</h2>
						<p class="name-en">{{filmer.name_en}}</p>
					</div>
				</div>
				<div class="works">
					<h3>代表作品</h3>
					<ul class="workList">
						<li v-for="work in filmer.works">
							<router-link :to="'/movie/' + work.subject.id">
								<img class="work-img" :src="work.subject.images.small" :alt="work.subject.title">
								<h3 class="work-title">{{work.subject.title}}</h3>
								<p class="role">{{work.roles[0]}}</p>
							</router-link>
							<router-view></router-view>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<app-loading-icon :isLoading="isLoading"></app-loading-icon>
	</section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import LoadingIcon from './LoadingIcon.vue'

	let _filmer = null;

	export default {
		data() {
			return {
				filmer: _filmer
			}
		},
		created() {
				if(!_filmer || (_filmer && _filmer.id !== this.$route.params.id)) {
					this.filmer = _filmer = null;
					this.getFilmerData();
				}
		},			
		components: {
			appLoadingIcon: LoadingIcon
		},	
		computed: {
			...mapGetters(
				['isLoading']
			)
		},
		methods: {
			...mapActions(
				['reverseIsLoading']
			),
			getFilmerData() {
				_filmer = null;
				this.reverseIsLoading();

				this.$http.jsonp('https://api.douban.com/v2/movie/celebrity/' + this.$route.params.id).then(res => {
					this.filmer = _filmer = res.body;
					this.reverseIsLoading();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

@keyframes moveInFromLeft {
	from {
		transform: translateY(-100px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}

.avatar{
	width: 60%;
	margin: 20px auto;
	padding: 20px 30px;
	text-align: center;
	box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
	animation: moveInFromLeft .6s ease-out;

	img{
		height: 240px;
	}
}

.info {
	padding: 0 20px;
	line-height: 1.5;
}

.works {
	.workList{
		width: 100%;
		white-space: nowrap;
		overflow-x: scroll;

		li{
			display: inline-block;
			width: 33.3333%;
			text-align: center;

			.work-img{
				width: 100%;
				height: 127px;
			}

			.work-title{
				font-size: 12px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}	

		}
	}
	

	
}

</style>