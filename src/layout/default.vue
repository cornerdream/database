<template>
  <div id="layout">
    <viewTab></viewTab>
    
    <!-- <div class="searchTool">
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6" class="searchCard">
          <div class="">
            wenzijieshao
          </div>
          <v-row class="searchEngine">
            <v-col cols="12" xs="12" sm="2" md="2" lg="2" xl="2">

              <v-select
                v-model="selectType"
                :items="selectItems"
                label="Entity Type"
                outlined
                dense
              ></v-select>
              <p class="btnText" @click="searchChange(searchBtnText)" >
                {{searchBtnText}}
              </p>
            </v-col>
            <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
              <v-autocomplete
                v-model="selectList"
                :disabled="isUpdating"
                :items="listItems"
                filled
                chips
                dense
                color="blue-grey lighten-2"
                item-text="name"
                item-value="name"
                multiple
                @keyup.enter.native="enter($event)"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    color="green"
                    label
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
                    {{ data.item}}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                 
                  <template>
                   
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item"></v-list-item-title>
                      
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" xs="12" sm="2" md="2" lg="2" xl="2">
              <v-btn
                color="warning"
                dark
                @click="searchBtn"
              >
                search
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="advancedShow">
             <v-col cols="12" xs="12" sm="2" md="2" lg="2" xl="2">

              <v-select
                v-model="selectType"
                :items="selectItems"
                label="Entity Type"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
              <v-autocomplete
                v-model="selectList"
                :disabled="isUpdating"
                :items="listItems"
                filled
                chips
                dense
                color="blue-grey lighten-2"
                item-text="name"
                item-value="name"
                multiple
                @keyup.enter="enter"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    color="green"
                    label
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                 
                  <template>
                    <v-list-item-avatar class="avatar" :color="colors[data.item.group]">
                      {{data.item.name.slice(0,1)}}
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                     
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
          <div class="modelbrowser">
            
              <v-list dense>
                <v-subheader class="modelbrowser_title">TOOLS</v-subheader>
                
               
                  <v-list-item
                    v-for="(item, i) in modelItems"
                    :key="i"
                  >
                     <router-link to="/result" target="_blank" class="modelbrowser_link">
                    <v-list-item-icon>
                      <v-icon v-text="item.icon" color="#1972d6"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                    </router-link>
                  </v-list-item>
                
                
              </v-list>
            
          </div>
        </v-col>
      </v-row>
      
      
      

    </div> -->
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import {Agetsearch_list} from '../api/model'
import viewTab from '../components/viewTab.vue'
const srcs = {
  1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
  2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
  3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
  4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
  5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
}
export default {
  name: 'layout',
  components:{
    viewTab,

  },
  data(){
    
    return{
      advancedShow:false,
      searchBtnText:"Advanced Search",
      autoUpdate: true,
      friends: ['Sandra Adams', 'Britta Holt'],
      isUpdating: false,
      name: 'Midnight Crew',
      people: [
        // { header: 'Group 1' },
        { name: 'Sandra Adams', group: 'Group1', avatar: srcs[1] },
        { name: 'Ali Connors', group: 'Group1', avatar: srcs[2] },
        { name: 'Trevor Hansen', group: 'Group1', avatar: srcs[3] },
        { name: 'Tucker Smith', group: 'Group1', avatar: srcs[2] },
        // { divider: true },
        // { header: 'Group 2' },
        { name: 'Britta Holt', group: 'Group2', avatar: srcs[4] },
        { name: 'Jane Smith ', group: 'Group2', avatar: srcs[5] },
        { name: 'John Smith', group: 'Group2', avatar: srcs[1] },
        { name: 'Sandra Williams', group: 'Group2', avatar: srcs[3] },
      ],
      title: 'The summer breeze',
      loading: false,
      search: null,
      select: null,
      states: [],  
      activator: null,
      attach: null,
      colors: {
        Group1:'green', 
        Group2:'purple',
        Group3:'indigo',
        Group4:'cyan',
        Group5:'teal',
        Group6:'orange',
      },
      editing: null,
      editingIndex: -1,
      selectType:'',
      selectList:[],
      listItems:[],
      selectItems: ['Cancer Type', 'Model Name', 'Gene/Protein/Target', 'Mutation','Fusion','Pathway','Immume Cell','Tumor Cell','Immune Subtype','Drug'],
      selectItems1:[],
      selectItems2:[],
      items: [
        { header: 'Select an option or create one' },
        {
          text: 'Foo',
          color: 'blue',
        },
        {
          text: 'Bar',
          color: 'red',
        },
      ],
      modelItems:[
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
      nonce: 1,
      menu: false,
      model: [
        {
          text: 'Foo',
          color: 'blue',
        },
      ],
      x: 0,
      // search: null,
      y: 0,
      box:null,

    }
  },
  watch: {
     
    
    
  },
  mounted() {
    
  },
  created(){
    
  },

  methods: {
    searchChange(text){
      if(text=='Advanced Search'){
        this.searchBtnText = 'Basic Search'
        this.advancedShow = true
      }else{
        this.searchBtnText = 'Advanced Search'
        this.advancedShow = false
      }
    },
    searchBtn(){
      console.log(this.selectType,this.selectList)
      // let data  = []
      // Agetsearch_table(this.selectType,this.selectList).then((res)=>{
      //   console.log(res)
      //   data = res.data.data_info
        
      // }).finally(()=>{
        // console.log(data)
        // this.$EventBus.$emit('modeltable',data)
        let routeUrl = this.$router.resolve({path: '/ModelResult',query: {type:this.selectType,value:this.selectList}});
        window.open(routeUrl.href, '_blank');
      // })

    },
    enter(e){
      console.log(e,e.target.value)
      console.log(this.selectType,this.selectList)
      Agetsearch_list(this.selectType,e.target.value).then((res)=>{
        console.log(res)
        this.listItems = res.data.data_info
        console.log(this.listItems)
      })
    },
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
    remove (item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    },
    load(){
     
    },
    liClick(){

			let routeUrl = this.$router.resolve({path: '/result'});
      window.open(routeUrl.href, '_blank');
    }
  },
}
</script>
<style scoped>
.searchTool{
  margin: 20px 50px;
}
.content{
  position: relative;
  padding: 20px 80px;
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
.avatar{
  border:1px solid;
  color: #fff;
}
.modelbrowser{
  text-align: left;
}
.modelbrowser_title{
  border-bottom: 1px solid #1972d6;
  color: #1972d6;
}
.modelbrowser_link{
  display: flex;
}
.searchCard{
  position: relative;
}
.searchEngine{
  position: absolute;
  bottom: 0;
}
.btnText{
  margin:-8px 0 0;
  cursor: pointer;
}
</style>
