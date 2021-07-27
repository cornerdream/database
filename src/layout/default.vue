<template>
  <!-- <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app> -->
  <div id="layout" class="overflow-hidden">
    <v-card >
      <v-img
        height="280px"
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
        {{ link }} {{body}}
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
      value="select"
      :loading="loading"
      :items="states"    
      :search-input.sync="search"
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
            >
              <v-list-item-content>
                <v-list-item-title>{{item.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>  
    
      </div>
      <router-view/>
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
  name: 'layout',
  computed: {
    ...mapGetters(['body'])
  },
  data: () => ({
    drawer: true,
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
      { title: 'Overview' },
      { title: 'Omics' },
      { title: 'Pathways' },
      { title: 'Immunology' },
      { title: 'Oncogenesis' },
      { title: 'Regulation' },
      { title: 'Pharmacology' },
      { title: 'Analysis' }
    ], 
    model: 1,
    select1: ['Vuetify'],
    items1: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    select2: ['Vuetify'],
    items2: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    select3: ['Vuetify'],
    items3: ['Foo', 'Bar', 'Fizz', 'Buzz'], 
  }),
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    },
  },
  mounted() {
  this.menu();
  },
  created(){
    this.load();
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
        console.log(this.states)
      })
    },
    querySelections (v) {
      console.log(v)
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
     
      this.onsearch(v);
    },
    onsearch(data){
      const options = {cmp_id:data}
      console.log(options)
      fetch('http://192.168.1.128:8000/api/introduction/cmp/',options).then((res)=>{
        return res.json()
      }).then((data)=>{
        
        console.log(data)
      })
    }
  },
};
</script>
<style scoped>
/* #layout{
  position: relative;
} */
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
  background: rgba(0, 88, 138, 0.4);
  color: #fff;
}
.select {
  position: fixed;
  bottom: 100px;
  right: 50px;
  width: 100px;
}
.select .theme--dark.v-list {
  background: #29b6f6;
}
.content{
  position: relative;
  padding: 0 80px;
  
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
