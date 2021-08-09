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
        @change="onsearch"
        @keyup.enter="onsearch"
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
        @click="onsearch"
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
          label="Pathways list"
          outlined
          dense
          solo
          @input="PathwayschangeArr"
          ></v-combobox>     
          <v-combobox
            v-model="Pathways.select3"
            :items="Pathways.items3"
            label="Gene data"
            outlined
            dense
            solo
            @input="PathwayschangeArr3"
            allow-overflow
          ></v-combobox>
      </div>
    </div>
</div>
</template>
<script>
import baseUrl from '../utils/baseurl'
import {mapGetters} from 'vuex'
import Table from '../components/table.vue'
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
    loading: false,
    search: null,
    select: null,
    items:[],
    states: [],
    Pathways:{
        select1: '',
        items1: [],
        select3: 'Mutation',
        // items3: ['Mutation', 'CNV', 'Fusion', 'Methylation','gene expression'],
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
    msg:''
}
},
created() {
  console.log(this.current)
  this.$EventBus.$on(this.current, (msg) => {
    console.log(1)
      console.log(msg)
      this.source = msg;  
      if(this.search||this.select||this.Pathways.select1){
        if(this.tab==0){
          this.onselectPathwaysTable()
        }else{
          this.onselectPathways()
        }
      }
  })
},
mounted() {
  
},
methods:{
    
    onsearch(){
      if(this.Pathways.select1){
        if(this.tab==0){
          this.onselectPathwaysTable()
        }else{
          this.onselectPathways()
        }
        
      }
    },
    PathwayschangeArr(){    
      if(this.select||this.search){
        if(this.tab==0){
          this.onselectPathwaysTable()
        }else{
          this.onselectPathways()
        } 
      } 
      
    },
    PathwayschangeArr3(){
      if(this.select||this.search){
        if(this.tab==0){
          this.onselectPathwaysTable()
        }else{
          this.onselectPathways()
        }
      }  
    },
    onselectPathwaysTable(){
      fetch(baseUrl+'/api/pathway/pathwaytable/?cmp_id='+(this.select||this.search)+'&omics_type='+this.Pathways.select3+'&pathway_id='+this.Pathways.select1+'&source='+(this.source)).then((res)=>{
        return res.json()
      }).then((data)=>{
        if(data.code==200){
          this.pathwaysTableData = data.data_info;
        }else{
         this.$alert.error(data.message)
        }
      })
    },
    onselectPathways(){
      fetch(baseUrl+'/api/pathway/pathway/?cmp_id='+(this.select||this.search)+'&omics_type='+this.Pathways.select3+'&pathway_id='+this.Pathways.select1+'&source='+(this.source)).then((res)=>{
        return res.json()
      }).then((data)=>{
        if(data.code==200){
          this.pathwaysData = data.data_info;
        }else{
         this.$alert.error(data.message)
        }
      })
    },
    onchange(){
      if(this.source){
        if(this.select||this.search){
          if(this.tab==0){
            this.onselectPathways()
          }else{
            this.onselectPathwaysTable() 
          }
        }
      }  
    }
}
}
</script>
<style scoped>

</style>