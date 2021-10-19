<template>
  <v-app>
      <router-view/>
  </v-app>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'

export default {
  name:'app',
  computed: {
    ...mapGetters(['body'])
  },
  data(){
    return {
      timer:null
    }
  },
  watch:{
  },
  mounted(){
    this.load();
    if(this.timer){
      clearInterval(this.timer)
    }else{
      this.timer = setInterval(()=>{
        this.load()
      },60000)
    }
  },
  created(){
  },
  methods:{
    load(){   
      let currentTime=new Date().getHours()
      console.log(currentTime)
      if(9 <= currentTime && currentTime < 18){
        $('body').attr('theme-mode','light');
      }else{
        $('body').attr('theme-mode','dark'); 
      }
      let themeColor=$('body').attr('theme-mode');
      this.$store.dispatch('GetBody',themeColor);
      this.$vuetify.theme.dark = this.body=='dark'?true:false;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
