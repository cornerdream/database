<template>
  <div id="modellayout">
    <viewTab/>

    <div class="content">
      <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-format-list-bulleted-square
            </v-icon>
          </v-btn>
        </template>
        <v-btn
          v-for="(item,i) in btnitems"
          :key="i"
          dark
          small
          :color="item.color"
          @click="toggleTab(item.title)"
        >
          <v-icon>{{item.icon}}</v-icon>{{item.title}}
        </v-btn>
      </v-speed-dial>
      
       
      <router-view  :view="currentTab" />
     
        
    </div>
    
  </div>
</template>

<script>
import viewTab from '../components/viewTab.vue'
export default {
  name: 'modellayout',
  components:{
    viewTab
  },
  data: () => ({
    direction: 'bottom',
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    top: true,
    right: true,
    bottom: false,
    left: false,
    transition: 'slide-x-reverse-transition',
    btnitems:[
      {title:'Overview',icon:'',color:'secondary'},
      {title:'Omics',icon:'',color:'primary'},
      {title:'Immunology',icon:'',color:'warning'},
      {title:'Pathways',icon:'',color:'error'},
      {title:'Pathology',icon:'',color:'success'}

    ],
    currentTab:'',
  }),
 
  mounted() {
  },
  created(){
    this.load();
    // this.$nextTick(()=>{
    //   $(document).on('scroll',function(){
    //     const scrollH = $(document).scrollTop();
    //     if(scrollH>0){
    //       $('.top').css('height','80px')
    //       $('.bannger').css('height','80px')
    //       $('#logo').hide()
    //     }else{
    //       $('.top').css('height','280px')
    //       $('.bannger').css('height','280px')
    //       $('#logo').show()
    //     }
        
    //   })
    // })
  },
  methods: {
    load(){
      let view = this.$route.query.view
      this.currentTab = view;
    },
    toggleTab(tab){
      this.currentTab = tab
      this.$router.replace({query:{view:tab}})
      
    },
  },
};
</script>
<style scoped>
.content{
  position: relative;
  min-height: 630px;
}
.content .v-speed-dial {
  position: absolute;
  right: 36px;
}

.content .v-btn--floating {
  position: relative;
}
</style>
