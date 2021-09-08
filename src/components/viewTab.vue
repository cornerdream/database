<!-- -->
<template>
<div id="viewTab">
    <v-card >
      <!-- <v-img
        height="280px"
        :src="body=='light'?white_bg:dark_bg"
      >
      </v-img> -->
      <v-parallax
        height="280"
        :src="body=='light'?white_bg:dark_bg"
      ></v-parallax>
            
      <v-card-title class="white--text mt-8" id="logo">
        <v-img :src="body=='light'?white_logo:dark_logo"></v-img>      
      </v-card-title>
      <!-- <v-tabs
        value="SEARCH"
        fixed-tabs
        background-color="rgba(0,129,204,0.6)"
        dark
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
          {{ link }} 
        </v-tab>
        
      </v-tabs> -->
      <v-app-bar color="rgba(0,129,204,0.6)" height="80px" class="tab" shrink-on-scroll>
        <v-row
            justify="space-between"
            no-gutters
        >
          
              <v-btn
              v-for="link in links"
              :key="link"
              color="white"
              text
              rounded
              class="my-2"
              >
              {{ link }} 
              </v-btn>
        
            

        </v-row>   
        </v-app-bar>
    </v-card>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import white_bg from '../assets/white_detail_bg.png'
import dark_bg from '../assets/dark_detail_bg.png'
import white_logo from '../assets/white_detail_logo.png'
import dark_logo from '../assets/dark_detail_logo.png'
export default {
name: 'viewTab',
computed: {
  ...mapGetters(['body'])
},
data() {
return {
    white_bg:white_bg,
    dark_bg:dark_bg,
    bg:'',
    white_logo:white_logo,
    dark_logo:dark_logo,
    logo:'',
    links: [
      'Home',
      'SEARCH',
      'FAQ',
      'PRODUCT&SERVICE',
      'CONTACT',
      'REGISTER&LOGIN',
    ],
}
},
created() {
    
},
mounted() {
  this.load(this.body)
},
watch:{
  body(newv,oldv){
    if(newv!==oldv){
      this.load(newv)
    }
  }
},
methods:{
  load(flag){
      if(flag=='light'){
        this.bg = this.white_bg;
        this.logo = this.white_logo;
      }else{
        this.bg = this.dark_bg;
        this.logo = this.dark_logo;
      }
    },
}
}
</script>
<style scoped>
#logo{
    position: absolute;
    left:4rem;
    top:0;
}
.tab{
  position: absolute;
  bottom: 0;
}
.v-toolbar--prominent .v-toolbar__content{
  align-items: center;
}
</style>