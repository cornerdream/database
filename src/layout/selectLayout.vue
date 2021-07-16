<template>
  <div id="selectlayout">
    <v-card class="top">
      <v-img
        height="280px"
        class="bannger"
        :src="body=='light'?white_bg:dark_bg"
      >
      </v-img>
            
      <v-card-title class="white--text mt-8" id="logo">
       
         <v-img :src="body=='light'?white_logo:dark_logo"></v-img>        
      </v-card-title>
      <v-app-bar color="rgba(0,129,204,0.6)" height="80px" class="tab">
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
    <v-toolbar flat id="search">
      <v-autocomplete
      append-icon="mdi-pencil"
      v-model="select"
      :loading="loading"
      :items="states"   
      :search-input.sync="search"
      @change="onsearch(select)"
      @keyup.enter="onsearch(search)"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="What state are you from?"
      solo-inverted
      ></v-autocomplete>
      <v-btn
      class="searchBtn"
      rounded
      color="#2477a8"
      dark
      @click="onsearch(search)"
      >
        SEARCH
      </v-btn>
    </v-toolbar>
    
    
    <div class="content">
      <div id="menu">
      
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
              v-for="(item, i) in Menuitems"
              :key="i"
              
              @click="toggleTab(item.title)"
            >
              
    
              <v-list-item-content>
                <v-list-item-title>{{item.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
     
      </div>
        <!-- <component :is="currentTab"></component> -->
        <keep-alive>
          <router-view :tableData="searchData" :view="currentTab" :cmp_id="this.search||this.select"/>
        </keep-alive>
        
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import white_bg from '../assets/white_detail_bg.png'
import dark_bg from '../assets/dark_detail_bg.png'
import white_logo from '../assets/white_detail_logo.png'
import dark_logo from '../assets/dark_detail_logo.png'

import $ from 'jquery'

export default {
  name: 'selectlayout',
  computed: {
    ...mapGetters(['body'])
  },
  data: () => ({
    white_bg:white_bg,
    dark_bg:dark_bg,
    white_logo:white_logo,
    dark_logo:dark_logo,
    links: [
      'Home',
      'SEARCH',
      'FAQ',
      'PRODUCT&SERVICE',
      'CONTACT',
      'REGISTER&LOGIN',
    ],
    breaditems: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard',
        icon:'mdi-home'
      },
      {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1',
        icon:'mdi-folder'
      },
      {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2',
        icon:''
      },
    ],
    loading: false,
    items: [],
    search: null,
    select: null,
    states: [],  
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
    searchData:[],
    
  }),
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    },
    // $route(to){	     
    //   let view = to.query.view
    //   this.currentTab = view
    //   this.model = this.Menuitems.findIndex(item=>item.title==view)
    // }
 
  },
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
      
    },
    load(){
      fetch('http://192.168.1.128:8000/api/introduction/get_cmp_id/').then((res)=>{
        return res.json()
      }).then((data)=>{
        this.states = data.datainfo.cmp_id;
      })
      let view = this.$route.query.view
      this.currentTab = view;
      this.model = this.Menuitems.findIndex(item=>item.title==view)
    },
    
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
      // this.onsearch(v);
      
    },
    onsearch(data){
      console.log('id')
      fetch('http://192.168.1.128:8000/api/introduction/cmp/?cmp_id='+data).then((res)=>{
        return res.json()
      }).then((data)=>{
        this.searchData = data.datainfo;
      })
    },  

    toggleTab(tab){
      this.currentTab = tab
      this.model = this.Menuitems.findIndex(item=>item.title==tab)
      this.$router.replace({query:{view:tab}})
    }
  },
};
</script>
<style scoped>
#logo{
    position: absolute;
    left:40px;
    top:0;
}
.tab{
  position: absolute;
  bottom: 0;
}
.bread{
  padding:0 30px;
}
#search{
  padding:0 50px;
}
#search >>>.v-input{
  border: 1px solid #429fd5;
  border-radius: 0 ;
  color:#a0a0a0; 
}
#search >>>.v-text-field.v-text-field--solo .v-input__control{
  min-height: 38px;
}
#search >>>.v-btn:not(.v-btn--round).v-size--default{
  padding:0 26px;
  margin-left: 90px;
}
#menu{
  width:100px;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 9999;
}
.menuList{
  display: none;
  position: fixed;
  left: 0;
  top:50%;
  /* transform: translateY(-50%); */
  padding:0;
  width:200px;
  color: #03588a;
  text-shadow: 0 1px 0 #03588a;
  background: transparent;
}
body[theme-mode='dark'] .menuList{
  color: #fff;
}
#menu >>>.menuList.v-sheet.v-list:not(.v-sheet--outlined){
  box-shadow: 0px 2px 4px -1px #000;
}
#menu >>>.menuListItem.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  color: #03588a !important;
  
}
body[theme-mode='dark'] #menu >>>.menuListItem.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  color: #fff !important;
  
}
/* #menu >>>.menuListItemActive.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  color: #fff !important;
} */
.menuListItemActive{
  background: rgba(36, 119, 168,0.6);
  color: #fff;
  text-shadow: 0 1px 0 #fff;
  box-shadow: 0px 2px 4px -1px #2477a8;
}
.select {
  position: fixed;
  bottom: 100px;
  right: 50px;
  width: 200px;
}
.select >>>.v-text-field--outlined fieldset{
  border-color: #429fd5;
}
.select >>>.v-input__slot{
  border-color: #429fd5;
}
.select >>>.v-icon.v-icon{
  color:#429fd5;
}
.content{
  position: relative;
  padding:0 280px 0 80px;
  
}
.content{
  background: url('../assets/white_corner.gif') no-repeat;
  background-attachment: fixed;
  background-position: 100% 100%;
}
body[theme-mode='dark'] .content{
  background: url('../assets/dark_corner.gif') no-repeat;
  background-attachment: fixed;
  background-position: 100% 100%;
}
</style>
