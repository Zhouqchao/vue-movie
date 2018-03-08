<template>
  <div id="app">
    <router-view></router-view>
    <movie-footer></movie-footer>
  </div>
</template>

<script>
  import Footer from './components/Footer.vue'

  export default {
    data () {
      return {
      }
    },
    components: {
      movieFooter: Footer
    },
  }
</script>

<style lang="scss">

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    height: 100%;
    font-size: 12px;
  }
  body{
    height: 100%;
    font-size: 12px;
    line-height: 1.2;
    background-color: #fff;
  }

  
  a{
    text-decoration: none;
    color: #333;
  }

  ul{
    list-style: none;
  }
</style>
