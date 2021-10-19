<!-- -->
<template>
<div class="TumorPathways">
    <div class="container">
      <v-toolbar flat id="search">
        <v-autocomplete
        append-icon="mdi-pencil"
        v-model="select"
        :loading="loading"
        :items="cmp_id"   
        :search-input.sync="search"
        @change="onsearch(select)"
        @keyup.enter="onsearch(search)"
        cache-items
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
      <div class="component">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          class="seqTab"
          active-class="seqTabActive"
        >
            <v-tab
            v-for="item in tabItems"
            :key="item.text"
            @change="onchange"
            >
            {{ item.text }}
            </v-tab>
        </v-tabs>
        <Table :data="pathwaysTableData" :msg="current" v-if="tab==0"></Table>
        <Pathway :data="pathwaysData" :msg="current" :pathway="Pathways.select3" v-else></Pathway>
      </div>
      <div class="select">
          <v-combobox
          v-model="Pathways.select1"
          :items="pathway_list"
          :label="Pathways.label1"
          outlined
          dense
          solo
          @input="PathwayschangeArr"
          ></v-combobox>     
          <v-combobox
            v-model="Pathways.select3"
            :items="Pathways.items3"
            :label="Pathways.label3"
            outlined
            dense
            solo
            @input="PathwayschangeArr"
            allow-overflow
          ></v-combobox>
      </div>
    </div>
</div>
</template>
<script>
// import baseUrl from '../utils/baseurl'
import {AselectPathway,AselectPathwaytable} from '../api/tumor'
import {mapGetters} from 'vuex'
import Table from '../components/tableSwitch.vue'
import Pathway from '../components/pathway.vue'
export default {
name: 'TumorPathways',
components:{ 
    Table,
    Pathway,
},
computed: {
  ...mapGetters(['cmp_id','pathway_list']),
},
props:['current'],
data() {
return {
    
    search: null,
    select: null,
    items:[],
    states: [],
    Pathways:{
        label1:'Pathways list',
        select1: '',
        items1: [],
        label3:'Gene data',
        select3: 'Mutation',
        items3: ['Mutation', 'CNV', 'Fusion', 'gene expression'],
    },
    
    tab: 0,
    tabItems:[
        {text:'table'},
        {text:'pathway'},
    ],
    pathwaysData:{},
    pathwaysTableData:[],
    source:'',
}
},
created() {
  
  this.$EventBus.$on(this.current, (msg) => {
      this.source = msg;  
      if(this.search||this.Pathways.select1){
        if(this.tab!=0){
          this.onselectPathways(this.select)
        }
      }
  })
},
mounted() {
  
},
methods:{
    onsearch(cmp_id){
      let select = this.Pathways;
      if(select.select1){
        this.tab==0?this.onselectPathwaysTable(cmp_id):this.onselectPathways(cmp_id)
      }else{
        this.$message.warning('请选择'+select.label1||select.label3)
      }
    },
    PathwayschangeArr(){   
      if(this.select){
        this.tab==0?this.onselectPathwaysTable(this.select):this.onselectPathways(this.select)
      }else{
        this.$message.warning('请选择cmp_id')
      } 
    },
    async onselectPathwaysTable(cmp_id){
      let $loading = this.$loading();
      let select = this.Pathways;
      // await fetch(baseUrl+'/api/pathway/pathwaytable/?cmp_id='+cmp_id+'&omics_type='+select.select3+'&pathway_id='+select.select1+'&source='+(this.source)).then((res)=>{
      //   return res.json()
      // }).then((data)=>{
      //   data.code==200?this.pathwaysTableData = data.data_info:this.$message.error(data.message)
      // })
      AselectPathwaytable(cmp_id,select.select3,select.select1,this.source).then(res=>this.pathwaysTableData = res.data.data_info)
      $loading().close();
    },
    async onselectPathways(cmp_id){
      let $loading = this.$loading();
      let select = this.Pathways;
      // await fetch(baseUrl+'/api/pathway/pathway/?cmp_id='+cmp_id+'&omics_type='+select.select3+'&pathway_id='+select.select1+'&source='+(this.source)).then((res)=>{
      //   return res.json()
      // }).then((data)=>{
      //   data.code==200?this.pathwaysData = data.data_info:this.$message.error(data.message)
        
      // })
      AselectPathway(cmp_id,select.select3,select.select1,this.source).then(res=>this.pathwaysData = res.data.data_info)
      
      $loading().close();
    },
    onchange(){
      if(this.source){
        if(this.select){
          if(this.tab!=0){
           this.onselectPathwaysTable(this.select) 
          }
        }
      }  
    }
}
}
</script>
<style scoped>

</style>