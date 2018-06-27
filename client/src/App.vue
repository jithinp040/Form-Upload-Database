<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components:{
    HelloWorld
  }
}
</script>


<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
