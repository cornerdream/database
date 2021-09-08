<template>
  <div id="home">
    <homeTab/>
    <carousel/>  
  </div>  
</template>

<script>
import homeTab from '@/components/homeTab.vue'
import carousel from '@/components/carousel.vue'
export default {
  name: 'Home',
  components: {
    homeTab,
    carousel
  }
}
</script>
<style scoped>
</style>
