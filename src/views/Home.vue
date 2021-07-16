<template>
  <div id="home">
    <homeTab/>
    <carousel/>  
  </div>  
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import homeTab from '@/components/homeTab.vue'
import carousel from '@/components/carousel.vue'
export default {
  name: 'Home',
  components: {
    // HelloWorld,
    homeTab,
    carousel
  }
}
</script>
<style scoped>
</style>
