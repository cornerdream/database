<template>
  <div id="modellayout">
    <viewTab/>
    
    <div class="content">
      <div class="bread">
        <v-breadcrumbs :items="breaditems">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              :to="{path: item.href}"
              target="_blank"
              :disabled="item.disabled"
            >
              <v-icon>{{item.icon}}</v-icon>
              {{ item.text}}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </div>
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
    breaditems: [
      {
        text: 'Model Atlas',
        disabled: false,
        href: '/',
        icon:'mdi-home'
      }
    ],
    direction: 'bottom',
    fab: false,
    hover: true,
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
      let query = this.$route.query
      console.log(query)
      let view = query.view
      let bread2 = {
        text: query.type,
        disabled: false,
        href: '/search',
        icon:'mdi-apple-icloud'
      }
      let bread3 = {
        text: query.name,
        disabled: true,
        href: '/search',
        icon:'mdi-all-inclusive'
      }
      this.breaditems.push(bread2,bread3);
      this.currentTab = view;
    },
    toggleTab(tab){
      let query = this.$route.query
      this.currentTab = tab
      console.log({query:{view:tab,type:query.type,name:query.name}});
      this.$router.replace({query:{view:tab,type:query.type,name:query.name}})
      
    },
  },
};
</script>
<style scoped>
.content{
  position: relative;
  min-height: 520px;
}
.content .v-speed-dial {
  position: absolute;
  right: 36px;
}

.content .v-btn--floating {
  position: relative;
}
.bread .v-breadcrumbs{
  padding: 26px 12px 26px 26px;
}
</style>
