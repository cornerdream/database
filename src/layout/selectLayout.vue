<template>
  <div id="selectlayout">
    <viewTab/>

    <div class="bread">
      <v-breadcrumbs :items="breaditems">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :href="item.href"
            :disabled="item.disabled"
          >
            <v-icon>{{item.icon}}</v-icon>
            {{ item.text.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>    
    
    <div class="content">
      <div id="menu" >
      
        <v-list
            nav
            dense
            class="menuList"
          >  
          <v-list-item-group
            v-model="model"
            active-class="menuListItemActive"
            color="indigo"
          >
            <v-list-item
              class="menuListItem"
              v-for="(item) in Menuitems"
              :key="item.title"
             
              @click="toggleTab(item.title)"
            >
              
    
              <v-list-item-content>
                <v-list-item-title>{{item.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
     
      </div>

      <router-view  :view="currentTab" />
     
        
    </div>
    
  </div>
</template>

<script>

import viewTab from '../components/viewTab.vue'
import $ from 'jquery'

export default {
  name: 'selectlayout',
  components:{
    viewTab
  },
  data: () => ({
    breaditems: [
      {
        text: 'Home',
        disabled: false,
        href: '/',
        icon:'mdi-home'
      },
    ],
    Menuitems: [
      { title: 'Overview'},
      { title: 'Omics' },
      { title: 'Pathways'},
      { title: 'Immunology'},
      { title: 'Oncogenesis'},
      { title: 'Regulation'},
      { title: 'Pharmacology'},
      { title: 'Analysis'}
    ], 
    model: 0,
    currentTab:'',
  }),
 
  mounted() {
    this.menu()
    
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
    menu(){
      $('#menu').on('mouseover',function(){
        $('.menuList').show();  
      }).on('mouseleave',function(){
        $('.menuList').hide();
      })
      this.$EventBus.$on("menu", (msg) => {
        // A发送来的消息
        console.log(msg)
        this.Menuitems=msg
      })
     
    },
    load(){
      
      var obj = {text:this.$route.name,disabled:true,href:this.$route.fullPath,icon:''}
      this.breaditems.push(obj)
      let view = this.$route.query.view
      this.currentTab = view;
      this.model = this.Menuitems.findIndex(item=>item.title==view)
     
    },
    toggleTab(tab){
      this.currentTab = tab
      this.model = this.Menuitems.findIndex(item=>item.title==tab)
      this.$router.replace({query:{view:tab}})
      
    },
  },
};
</script>
<style scoped>
.bread{
  padding:0 3rem;
}

#menu{
  width:10rem;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 9999;
  min-width: 120px;
}
.menuList{
  display: none;
  position: fixed;
  left: 0;
  top:50%;
  /* transform: translateY(-50%); */
  padding:0;
  width:20rem;
  color: #03588a;
  text-shadow: 0 1px 0 #03588a;
  background: transparent;
  font-size: 16px;
}

body[theme-mode='dark'] .menuList{
  color: #fff;
}
#menu >>>.menuList.v-sheet.v-list:not(.v-sheet--outlined){
  box-shadow: 0px 0.2rem 0.4rem -1px #000;
}
#menu >>>.menuListItem.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  color: #03588a !important;
  
}
body[theme-mode='dark'] #menu >>>.menuListItem.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  color: #fff !important;
  
}
.menuListItem >>>.v-list-item--dense .v-list-item__title, .v-list-item--dense .v-list-item__subtitle, .v-list--dense .v-list-item .v-list-item__title, .v-list--dense .v-list-item .v-list-item__subtitle{
  line-height: 1.2;
}

/* #menu >>>.menuListItemActive.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  color: #fff !important;
} */
.menuListItemActive{
  width:22rem;
  background: rgba(36, 119, 168,0.6);
  color: #fff;
  text-shadow: 0 1px 0 #fff;
  box-shadow: 0px 0.2rem 0.4rem -1px #2477a8;
}
.content{
  position: relative;
  min-height: 630px;
}
.content{
  background: url('../assets/white_corner.png') no-repeat;
  background-attachment: fixed;
  background-position: 100% 100%;
}
body[theme-mode='dark'] .content{
  background: url('../assets/dark_corner.png') no-repeat;
  background-attachment: fixed;
  background-position: 100% 100%;
}
</style>
