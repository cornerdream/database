<!-- -->
<template>
<div class="TargetPathways">
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
        <Pathway :data="pathwaysData" :msg="current" :pathway="Pathways.select4" v-else></Pathway>
        <loading v-if="loading"></loading>
        <alert v-if="alertShow" :info="info" :type="type"></alert>
      </div>
      <div class="select">
          <v-combobox
          v-model="Pathways.select1"
          :items="Pathways.items1"
          :label="Pathways.label2"
          multiple
          outlined
          dense
          solo
          @input="PathwayschangeArr"
          ></v-combobox> 
          <v-combobox
            v-model="Pathways.select2"
            :items="Pathways.items2"
            :label="Pathways.label2"
            multiple
            outlined
            dense
            solo
            @input="PathwayschangeArr2"
            allow-overflow
          ></v-combobox>
          <v-combobox
            v-model="Pathways.select3"
            :items="pathway_list"
            :label="Pathways.label3"
            outlined
            dense
            solo
            @input="PathwayschangeArr3"
            allow-overflow
          ></v-combobox>    
          <v-combobox
            v-model="Pathways.select4"
            :items="Pathways.items4"
            :label="Pathways.label4"
            outlined
            dense
            solo
            @input="PathwayschangeArr4"
            allow-overflow
          ></v-combobox>
      </div>
    </div>
</div>
</template>
<script>
import baseUrl from '../utils/baseurl'
import loading from '../components/loading.vue'
import alert from '../components/alert.vue'
import {mapGetters} from 'vuex'
import Table from '../components/table.vue'
import Pathway from '../components/pathway.vue'
export default {
name: 'TumorPathways',
components:{ 
    loading,
    alert,
    Table,
    Pathway,
},
computed: {
  ...mapGetters(['cmp_id','pathway_list','loading']),
},
props:['current'],
data() {
return {
    alertShow:false,
    info:'',
    type:'',
    // loading: false,
    search: null,
    select: null,
    items:[],
    states: [],
    Pathways:{
        label1:'Cancer types',
        select1: [],
        items1: ['Chronic Myelogenous Leukemia','Esophageal Squamous Cell Carcinoma','Plasma Cell Myeloma','Acute Myeloid Leukemia'],
        disabled1:false,
        label2:'Cell lines',
        select2: [],
        items2: ['MC-1010','KMS-12-BM'],
        disabled2:false,
        label3:'Pathways list',
        select3: '',
        items3: ['SK-MEL-1'],
        disabled3:false,
        label4:'Omics data',
        select4: 'Mutation',
        items4: ['Mutation', 'CNV', 'Fusion', 'Methylation','gene expression'],
        // items4: ['Mutation', 'CNV', 'Fusion', 'gene expression'],
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
      console.log(msg)
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
    alert(type,data){
      var _this = this;
      this.alertShow = true;
      this.type = type
      this.info = data
      setTimeout(function(){
        _this.alertShow = false
      },2000)
    },
    onsearch(cmp_id){
      if(this.Pathways.select1){
        this.tab==0?this.onselectPathwaysTable(cmp_id):this.onselectPathways(cmp_id)
      }else{
        this.alert('warning','请选择'+this.Pathways.label1||this.Pathways.label2||this.Pathways.label3)
      }
    },
    PathwayschangeArr(){    
      this.Pathways.disabled2 = true;
      if(this.select){
        this.tab==0?this.onselectPathwaysTable(this.select):this.onselectPathways(this.select)
      }else{
        this.alert('warning','请选择cmp_id')
      } 
    },
    PathwayschangeArr2(){   
      this.Pathways.disabled1 = true; 
      if(this.select){
        this.tab==0?this.onselectPathwaysTable(this.select):this.onselectPathways(this.select)
      }else{
        this.alert('warning','请选择cmp_id')
      } 
    },
    PathwayschangeArr3(){
      if(this.select){
        this.tab==0?this.onselectPathwaysTable(this.select):this.onselectPathways(this.select)
      }else{
        this.alert('warning','请选择cmp_id')
      }  
    },
    PathwayschangeArr4(){    
      if(this.select){
        this.tab==0?this.onselectPathwaysTable(this.select):this.onselectPathways(this.select)
      }else{
        this.alert('warning','请选择cmp_id')
      } 
    },
    async onselectPathwaysTable(){
      this.$store.dispatch('ShowLoading')
      await fetch(baseUrl+'/api/gene/pathwaytable/?cancer_type='+this.Pathways.select1+'&cell_lines='+this.Pathways.select2+'&pathway_id='+this.Pathways.select3+'&omics_type='+this.Pathways.select4).then((res)=>{
        return res.json()
      }).then((data)=>{
        //data.code==200?this.pathwaysTableData = data.data_info:this.$alert.error(data.message)
        if(data.code==200){          
          this.pathwaysTableData = data.data_info
        }else{
          // this.alertShow = true;
          // this.type = 'error'
          // this.info = data.message
          // setTimeout(function(){
          //   _this.alertShow = false
          // },3000)
          this.alert('error',data.message)
        }
      })
      this.$store.dispatch('HideLoading')
      this.Pathways.disabled1 = false;
      this.Pathways.disabled2 = false;
    },
    async onselectPathways(){
      this.$store.dispatch('ShowLoading')
      await fetch(baseUrl+'/api/gene/pathwaydata/?cancer_type='+this.Pathways.select1+'&cell_lines='+this.Pathways.select2+'&pathway_id='+this.Pathways.select3+'&omics_type='+this.Pathways.select4).then((res)=>{
        return res.json()
      }).then((data)=>{
        //data.code==200?this.pathwaysData = data.data_info:this.$alert.error(data.message)
        if(data.code==200){          
          this.pathwaysData = data.data_info
        }else{
          // this.alertShow = true;
          // this.type = 'error'
          // this.info = data.message
          // setTimeout(function(){
          //   _this.alertShow = false
          // },3000)
          this.alert('error',data.message)
        }
      })
      this.$store.dispatch('HideLoading')
      this.Pathways.disabled1 = false;
      this.Pathways.disabled2 = false;
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