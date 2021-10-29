<!-- -->
<template>
<div class="ModelResult">
    <!-- <div class="bread">
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
    </div> -->
    <div class="resultTab">
      
      <v-list
        class="resultCard"
        dense>
      <v-list-item-group
          v-model="model"
          active-class="menuListItemActive"
          color="indigo"
        >
      <v-subheader>REPORTS</v-subheader>
          <v-list-item
          class="listItem"
          v-for="(item, i) in listItems"
          :key="i"
          @click="toggleTab(item.text)"
          >
          <!-- <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon> -->
          <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
        
    </div>
    <div class="result">
        <TableGroup :infoData="omicsTableData" :total="pageNumber" @loadTable="loadData" :selectKey="selectKey" :selectData="selectData" :searchKey="searchKey" :searchData="searchData" ></TableGroup>
    </div>
    
   
</div>
</template>
<script>
import $ from 'jquery'
import TableGroup from '../components/tableGroup.vue'
import {Agetsearch_tables,Agetsearch_table,Agetsearch_list_id,Agetsearch_list_id_table} from '../api/model'
export default {
name: '',
components:{
  TableGroup,
},
data() {
return {
    breaditems: [
      {
        text: 'Home',
        disabled: false,
        href: '/',
        icon:'mdi-home'
      },
    ],
    omicsTableData:[],
    selectKey:{},
    searchKey:{},
    searchData:{},
    selectData:{},
    itemsPerPage:100,
    pageNumber:1,
    listItems:[
      { text: 'Model panel', icon: 'mdi-clock' },
      { text: 'Growth', icon: 'mdi-account' },
      { text: 'TME RNA-seq', icon: 'mdi-flag' },
      { text: 'TME IO Feature', icon: 'mdi-flag' },
      { text: 'Cancer Biology', icon: 'mdi-flag' },
    ],
    model:0,
    modelId:[]
}
},
created() {
    this.loadId()
    // this.loadData()
    // this.loadBread()
    // this.loadTable()

},
mounted() {
    this.menu()
},
methods:{
  async loadId(){
    console.log(this.$route.query.type,this.$route.query.value)
    let query = this.$route.query
    await Agetsearch_list_id(query.type,query.value).then(res=>{
        this.modelId = res.data.data_info
    })
    // let params = this.modelId.join(',')
    // console.log(params)
    // Agetsearch_list_id_table(params).then(res=>{
    //     console.log(res)
    //     let data = res.data.data_info;
    //     this.omicsTableData = data.data;
    //     this.pageNumber = data.total;
    //     console.log(this.omicsTableData)
    // })
    this.loadData();
  
  },
  loadData(p,n,s,k,o,d){
    console.log(p,n,s,k,o,d)
    let params = this.modelId.join(',')
    console.log(params)
    let options={
        model_id:params,
        page:p||1,
        page_num:n||this.itemsPerPage,
        order_by_field:o||'',
        desc:d!==undefined?d:''
    }
    console.log(options)
    Agetsearch_list_id_table(options).then(res=>{
        console.log(res)
        let data = res.data.data_info;
        this.omicsTableData = data.data;
        this.pageNumber = data.total;
        console.log(this.omicsTableData)
    })
  },
  loadBread(){
      var obj = {text:this.$route.name,disabled:true,href:this.$route.fullPath,icon:''}
    this.breaditems.push(obj)
    let view = this.$route.query.view
    this.currentTab = view;
    this.model = this.Menuitems.findIndex(item=>item.title==view)
  },
  menu(){
    $('.resultTab').on('mouseover',function(){
      $('.resultCard').show();  
    }).on('mouseleave',function(){
      $('.resultCard').hide();
    })
  },
  loadTable(p,n,s,k,o,d){
      console.log(p,n,s,k,o,d)
      console.log(this.$route)
      let queryo = this.$route.query
      console.log(queryo)
      // this.omicsTableData=[];
      
      if(queryo.type2){
          let options={
              model_Entity_Type:queryo.type,
              model_value:queryo.value,
              gene_Entity_Type:queryo.type2,
              gene_value:queryo.value2,
              page:p||1,
              page_num:n||this.itemsPerPage,
              order_by_field:o||'',
              desc:d!==undefined?d:''
          }
          console.log(options)
          Agetsearch_tables(options).then((res)=>{
              console.log(res)
              let data = res.data.data_info;
              this.omicsTableData = data.data;
              this.pageNumber = data.total;
              console.log(this.omicsTableData)
          })
      }else{
          let options={
              Entity_Type:queryo.type,
              value:queryo.value,
              page:p||1,
              page_num:n||this.itemsPerPage,
              order_by_field:o||'',
              desc:d!==undefined?d:''
          }
          console.log(options)
          Agetsearch_table(options).then((res)=>{
              console.log(res)
              let data = res.data.data_info;
              this.omicsTableData = data.data;
              this.pageNumber = data.total;
              console.log(this.omicsTableData)
          })
      }
      console.log(this.omicsTableData)
  },
  toggleTab(tab){
      console.log(tab)
  //   this.currentTab = tab
    this.model = this.listItems.findIndex(item=>item.text==tab)
    if(tab=='TME RNA-seq'){
      // let routeUrl = this.$router.resolve({path: '/ModelAtlas',query: {view:'Omics',type:'Model'}});
      let query = this.$route.query;
      // let routeUrl = this.$router.resolve({path: '/ModelAtlas',query: {view:'Omics',type:'Model',modelType:query.type,modelValue:query.value}});
      let routeUrl = this.$router.resolve({path: '/ModelAtlas',query: {view:'Omics',type:'Model',modelType:query.type,modelValue:query.value,table:'mutation'}});
      window.open(routeUrl.href, '_blank');
    }
  //   this.$router.replace({query:{view:tab}})
    
  },
}
}
</script>
<style scoped>
.resultTab{
  width:10rem;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 9999;
  min-width: 120px;
}
.resultCard{
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
body[theme-mode='dark'] .resultCard{
  color: #fff;
}
.resultTab >>>.resultCard.v-sheet.v-list:not(.v-sheet--outlined){
  box-shadow: 0px 0.2rem 0.4rem -1px #000;
}
.resultTab  >>>.listItem.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  color: #03588a !important;
  
}
body[theme-mode='dark'] .resultTab >>>.listItem.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  color: #fff !important;
  
}
.listItem >>>.v-list-item--dense .v-list-item__title, .v-list-item--dense .v-list-item__subtitle, .v-list--dense .v-list-item .v-list-item__title, .v-list--dense .v-list-item .v-list-item__subtitle{
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
    padding: 0;
}
/* .ModelResult{
    display: flex;
} */
.result{
    flex: 1 1 auto;
}
</style>