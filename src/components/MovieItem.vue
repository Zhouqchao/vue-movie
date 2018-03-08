<template>
	<li class="movie-item">
		<div class="rank" :class="{off: closeRank}">
			<span>&nbsp;{{ 'No.' + (rankNum + 1)}}&nbsp;</span>
			&nbsp;<span>&nbsp;{{rankTitle}}&nbsp;</span>
		</div>
		<router-link :to="'/movie/' + movie.id">
			<div class="movie-photo">
				<img :src="movie.images.small">
			</div>				
			<div class="movie-detail">
				<h3 class="movie-title">{{movie.title}}</h3>
				<p class="rating-collection">
					<span class="rating">{{movie.rating.average}}</span>
					<span>分 / {{movie.collect_count}} 收藏</span>
				</p>
				<p class="pubtime-type">
					<span class="pubtime">{{movie.year}} /</span>
					<span class="type">{{type}}</span>
				</p>
				<p class="doctor">导演：{{movie.directors.length === 0 ? 'Unknown' : movie.directors[0].name}}</p>
				<p class="actor">{{actors}}</p>
			</div>	
		</router-link>	
	</li>
</template>

<script>
	export default {
		props: ['movie','rankNum','rankTitle','closeRank'],
		computed: {
			type() {
				return this.movie.genres.join(' / ');
			},
			actors() {
				const actorList = [];
				if(this.movie.casts.length === 0) {
					return '主演：Unknown'; 
				}else {
					this.movie.casts.forEach(function(actor){
							actorList.push(actor.name);
					})
					return '主演：' + actorList.join(' / ');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

.movie-item {
	position: relative;

	.rank {
		position: absolute;
		top: 10px;
		right: 10px;
		padding:3px 5px;
		font-size: 12px;
		background-image: linear-gradient(to right, #ffe069 33%, #ffca00 33%);
		border-radius: 5px;

		&.off {
			display: none;
		}
	}	

	a{
		width: 100%;
		padding: 10px;
		display: flex;

		.movie-photo{
			width: 80px;
			margin-right: 10px;

			img{
				width: 100%;
				margin-top: 10px;
			}
		}

		.movie-detail{
			padding-bottom: 10px;
			padding-right: 10px;
			border-bottom:1px solid #ccc;
			flex: 1;

			.rating{
				color: orangered;
			}

			p{
				margin:10px auto;
			}	
		}
	}
}






	
</style>