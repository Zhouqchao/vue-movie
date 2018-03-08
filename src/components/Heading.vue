<template>
	<section class="heading"  :class="{on:!hasMovieLeft}">
	    <div class="line left-line"></div>
	    <div class="title">{{title}}</div>
	    <div class="line right-line"></div>
	</section>
</template>

<script>
	export default {
		props:['title', 'hasMovieLeft']
	}
</script>

<style lang="scss" scoped>
  .heading{
    display:none;
    height:36px;
    line-height:36px;
    justify-content:center;
    align-items:center;
    padding:0 5%; 

    &.on {
      display: flex;
    }

    .title{
      margin:0 20px;
    }

    .line{
      flex:1;
      height:1px;
      background:rgba(0,0,0,0.2); 
    }

    .left-line{
      margin-right:20px;
    }
    
    .right-line{
      margin-left:20px;
    }
  }

</style>