<template>
	<section id="filmer">
		<div v-if="filmer" :style="{display: filmer ? 'block' : 'none'}">
			<div class="avatar" :style="{display: filmer.avatars ? 'block' : 'none'}">
				<img v-if="filmer.avatars" :src="filmer.avatars.small">
			</div>
			<div class="info">
				<div class="name-collect">
					<div class="name-info">
						<h2 class="name-cn">{{filmer.name}}</h2>
						<p class="name-en">{{filmer.name_en}}</p>
					</div>
				</div>
				<div class="works">
					<h3 :style="{display: filmer.works ? 'block' : 'none'}">代表作品</h3>
					<ul class="workList">
						<li v-for="work in filmer.works">
							<router-link :to="{name:'moviedetail',params:{id:work.subject.id}}">
								<img v-if="work.subject.images" class="work-img" :src="work.subject.images.small" :alt="work.subject.title">
								<h3 class="work-title">{{work.subject.title}}</h3>
								<p class="role">{{work.roles[0]}}</p>
							</router-link>
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

	export default {
		data() {
			return {
				filmer: {},
				id: ''
			}
		},
		// created() {
		// 	this.$nextTick(()=> {
		// 		this.getFilmerData();
		// 	})
		// },
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if(to.params.id !== vm.id) {
					vm.filmer = {};
					vm.getFilmerData();
				}
			})
		},	
		beforeRouteLeave(to, from, next) {
			this.id = from.params.id;
			next();
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
				this.reverseIsLoading();

				this.$http.jsonp('https://api.douban.com/v2/movie/celebrity/' + this.$route.params.id).then(res => {
					this.reverseIsLoading();
					this.filmer = res.body;
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

.avatar{
	width: 60%;
	margin: 20px auto;
	min-height: 200px;
	padding: 20px 30px;
	text-align: center;
	box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
	animation: moveInFromTop .6s ease-out;

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

		&::-webkit-scrollbar {
			    height: 1em;
		}		

		&::-webkit-scrollbar-thumb{
			background-color:transparent;
		}

		li{
			display: inline-block;
			width: 33.3333%;
			text-align: center;

			.work-img{
				width: 100%;
				height: 127px;
				animation: moveInFromLeft .6s ease-out;
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