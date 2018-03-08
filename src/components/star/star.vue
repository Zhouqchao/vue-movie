<template>
  <div class="star">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>	
</template>

<script>
	const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      score: {
        type: Number
      }
    },
    computed: {
      itemClasses() {
        let result = [];
        let score = this.score / 2;
        let hasDecimal = score % 1;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal > 0.5) {
          result.push(CLS_ON);
        }else {
        	result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="scss" scoped>
 @mixin bg-image($url) {
 	  background-image: url($url + "@2x.png");
 	  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
		  background-image: url($url + "@3x.png");
		}
 }


  .star {
  	display: inline-block;
    padding:2px 0;
    font-size: 0;

    .star-item {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 3px;
      background-size: 14px 14px;
      background-repeat: no-repeat;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        @include bg-image('star24_on');
      }

      &.half {
        @include bg-image('star24_half');
      }

      &.off {
        @include bg-image('star24_off');
      }
    }
  }
    


		
</style>