<template>
  <div class="search">
    
    <div class="searchTool">
      <v-row class="searchBox">
        <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6" class="searchCard">
          <div class="">
            wenzijieshao
          </div>
          <v-row class="searchEngine">
            <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
              <el-select 
              class="typeselect"
              v-model="selectType" 
              placeholder="Entity Type">
                <el-option
                  v-for="item in (searchBtnText=='Advanced Search'?selectItems:selectItems1)"
                  :key="item"
                  :label="item"
                  :value="item">
                  <template>
                    <span :class="[{'bold':boldItems.indexOf(item)>-1}]">{{item}}</span>
                  </template>
                </el-option>
              </el-select>
              <p class="btnText" @click="searchChange(searchBtnText)" >
                {{searchBtnText=='Advanced Search'?'Advanced Search':''}}
              </p>
            </v-col>
            <v-col cols="12" xs="12" sm="7" md="7" lg="7" xl="7">
              
              <el-select
                class="itemselect"
                  v-model="selectList"
                  multiple
                  filterable
                  remote
                  :remote-method="(query)=>{remoteMethod(query)}"
                  @change="filterChange($event)">
                  <el-option
                  v-for="item in listItems"
                  :key="item"
                  :label="item"
                  :value="item">
                  </el-option>
              </el-select>
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
          <v-row class="searchEngine2" v-show="advancedShow">
             <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
              <el-select 
              class="typeselect"
              v-model="selectType2" 
              placeholder="Entity Type">
                <el-option
                  v-for="item in selectItems2"
                  :key="item"
                  :label="item"
                  :value="item">
                  <template>
                    <span :class="[{'bold':boldItems.indexOf(item)>-1}]">{{item}}</span>
                  </template>
                </el-option>
              </el-select>
              <p class="btnText" @click="searchChange(searchBtnText)" >
                {{searchBtnText=='Basic Search'?'Basic Search':''}}
              </p>
              
            </v-col>
            <v-col cols="12" xs="12" sm="7" md="7" lg="7" xl="7">
              
              <el-select
                class="itemselect"
                  v-model="selectList2"
                  multiple
                  filterable
                  remote
                  :remote-method="(query)=>{remoteMethod2(query)}"
                  @change="filterChange($event)">
                  <el-option
                  v-for="item in listItems2"
                  :key="item"
                  :label="item"
                  :value="item">
                  </el-option>
              </el-select>
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
      
      
      

    </div>
    <!-- <v-row>
      <v-col
        v-for="(item,i) in cardItems"
        :key="i"
        cols="12"
        md="4"
      >
        <v-hover v-slot="{ hover }">
          <v-card 
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
          >
            <v-toolbar
                flat
                color="primary"
                dark
            >
                <v-toolbar-title>{{item.title}}</v-toolbar-title>
            </v-toolbar>
            <v-list>
              
              <v-list-item
                v-for="(list, j) in item.list"
                :key="j"
                @click="itemClick(item.title,list.text)"
              >
                <v-list-item-icon>
                  <v-icon v-text="list.icon"></v-icon>
                  
                </v-list-item-icon>
                <v-list-item-content>
                  <v-row class="list">
                    <v-col cols="6" class="listT">
                      <v-list-item-title v-text="list.text"></v-list-item-title>
                    </v-col>
                    <v-col cols="6" class="listV">
                      <v-chip
                        class="ma-2"
                        color="primary"
                      >
                        {{list.value}}
                      </v-chip>
                    </v-col>
                  </v-row>
                  
                  
                </v-list-item-content>
              </v-list-item>
              
            </v-list>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>   -->
    
  </div>
</template>
<script>
import {Agetsearch_list} from '../api/model'
import $ from 'jquery'
export default {
  name:'search',
  components:{
    
  },
  data(){
    return{
      advancedShow:false,
      searchBtnText:"Advanced Search",
      selectType:'Cancer Type',
      selectList:[],
      listItems:[],
      selectType2:'Gene/Protein/Target',
      selectList2:[],
      listItems2:[],
      selectItems: ['Cancer Type', 'Model Name', 'Gene/Protein/Target', 'Mutation','Fusion','Pathway','Immume Cell','Tumor Cell','Immune Subtype','Drug'],
      selectItems1:['Cancer Type', 'Model Name','Tumor Cell','Immune Subtype'],
      selectItems2:['Gene/Protein/Target', 'Mutation','Fusion','Pathway','Immume Cell','Drug'],
      boldItems:['Cancer Type', 'Model Name','Gene/Protein/Target'],
      modelItems:[
        { text: 'model browser', icon: 'mdi-clock' },
        // { text: 'model browser', icon: 'mdi-account' },
        // { text: 'model browser', icon: 'mdi-flag' },
      ],
      cardItems:[
        {
          title:'Model',
          list:[
            {text:'Bookshelf',value:1238},
            {text:'MeSH',value:22},
            {text:'NLM Catalog',value:19},
            {text:'PubMed',value:23034},
            {text:'PubMed Central',value:65047},
          ]
        },
        {
          title:'Gene',
          list:[
            {text:'Gene',value:6671},
            {text:'GEO DattaSets',value:9991},
            {text:'GEO Profiles',value:193438},
            {text:'HomoloGene',value:13},
            {text:'PopSet',value:42},
          ]
        },
        {
          title:'Pathway',
          list:[
            {text:'Conserved Domains',value:22},
            {text:'Indentical Protein Groups',value:22},
            {text:'Protein',value:5159},
            {text:'Protein Family Models',value:49},
            {text:'Structure',value:227},
          ]
        }
      ]
    }
  },
  created(){
    this.load()
  },
  methods:{
    filterChange(){
      this.$forceUpdate()
    },
    remoteMethod(query){
      if(!query){return}
      Agetsearch_list(this.selectType,query).then((res)=>{
        let data = res.data.data_info;
        let newData = [...new Set(data)]
        let arr =[];
        data.forEach(item => {
          if(item.toLowerCase()==query.toLowerCase()){
            arr = newData;
          }else{
            arr =[query,...newData]
          }
        });
        this.listItems=[...new Set(arr)]
        console.log(this.listItems,this.listItems2)
      }) 
    },   
    remoteMethod2(query){
      if(!query){return}
      Agetsearch_list(this.selectType2,query).then((res)=>{
        let data = res.data.data_info;
        let newData = [...new Set(data)]
        let arr =[];
        data.forEach(item => {
          if(item.toLowerCase()==query.toLowerCase()){
            arr = newData;
          }else{
            arr =[query,...newData]
          }
        });
        this.listItems2=[...new Set(arr)]
        console.log(this.listItems,this.listItems2)
      })

    },   
    searchChange(text){
      if(text=='Advanced Search'){
        this.searchBtnText = 'Basic Search'
        this.advancedShow = true
        $('.searchEngine').css('bottom','80px')
        $('.searchEngine2').css('bottom','0')
      }else{
        this.searchBtnText = 'Advanced Search'
        this.advancedShow = false;
        $('.searchEngine').css('bottom','0')
        this.selectList2 =[]
      }
    },
    searchBtn(){
      let queryO={},routeUrl;
      if(this.searchBtnText=='Advanced Search'){
        queryO ={
          type:this.selectType,
          value:this.selectList
        }
        routeUrl = this.$router.resolve({path: '/ModelResult',query: queryO});
        
      }else{
        queryO ={
          type:this.selectType,
          value:this.selectList,
          type2:this.selectType2,
          value2:this.selectList2
        }
        console.log(this.selectList2)
        // routeUrl = this.$router.resolve({path: '/ModelAtlas',query: {view:'Omics',type:'Model',modelType:this.selectType,modelValue:this.selectList.join(','),value:this.selectList2.join(','),table:'mutation'}});
        routeUrl = this.$router.resolve({path: '/ModelAtlas',query: {view:'Omics',type:'Model',modelType:this.selectType,modelValue:this.selectList.join(','),value:this.selectList2.join(',')}});
      }
      console.log(queryO)
      // let routeUrl = this.$router.resolve({path: '/ModelResult',query: queryO});
      console.log(routeUrl)
      window.open(routeUrl.href, '_blank');
    },
    itemClick(type,name){
      console.log(type,name)
      let routeUrl = this.$router.resolve({path: '/ModelAtlas',query: {view:'Overview',type:type,name:name}});
      window.open(routeUrl.href, '_blank');
    }

  }
}
</script>
<style scoped>
.searchBox{
  min-height: 300px;
}
.list.row{
  margin: 0;
}
.list .listT{
  display: flex;
  text-align: left;
  padding: 0;
}
.list .listV{
  text-align: right;
  padding: 0;
}
.v-chip.v-size--default{
  height: 20px;
}
.v-card {
transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
opacity: 0.9;
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
  left: 0;
  width: 100%;
}
.searchEngine2{
  position: absolute;
  left: 0;
  width: 100%;
}
.btnText{
  /* margin:-8px 0 0; */
  cursor: pointer;
}
.bold{
  font-weight: bolder;
}
.itemselect{
  width: 100%;
}
</style>

