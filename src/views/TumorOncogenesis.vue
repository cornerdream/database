<!-- -->
<template>
<div class="TumorOncogenesis">
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
        <!-- <v-tabs
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
        </v-tabs> -->
        <!-- <Table :data="pathwaysTableData" v-if="tab==0"></Table>
        <Pathway :data="pathwaysData" v-else></Pathway> -->
        <!-- <Network></Network> -->
        <!-- <HeatmapShape></HeatmapShape> -->
        <!-- <Heatmap></Heatmap> -->
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
        <Scatter :data="scatterData" v-if="tab==0"></Scatter>
        <Table :data="tableData" :msg="current" v-else></Table>
  
      </div>
      <div class="select">
        <v-combobox
        v-model="Oncogenesis.select1"
        :items="gene_class"
        :label="Oncogenesis.label1"
        outlined
        dense
        solo
        @input="OncogenesischangeArr"
        :disabled="Oncogenesis.disabled1"
        ></v-combobox>
        <v-text-field 
        :placeholder="Oncogenesis.label2"
        :value="Oncogenesis.value2"
        @keyup.enter="OncogenesischangeArr2"
        :disabled="Oncogenesis.disabled2"
        >
          <v-icon
            slot="append"
            color="#429fd5"
          >
          mdi-pencil
          </v-icon>
        </v-text-field>
        <v-combobox
          v-model="Oncogenesis.select3"
          :items="Oncogenesis.items3"
          :label="Oncogenesis.label3"
          outlined
          dense
          solo
          @input="OncogenesischangeArr3"
          allow-overflow
        ></v-combobox>
      </div>
    </div>
    
</div>
</template>
<script>

// import baseUrl from '../utils/baseurl'
import {Aselectccl,Aselectccltable} from '../api/tumor'
import {mapGetters} from 'vuex'
import Scatter from '../components/scatter.vue'
import Table from '../components/tableSwitch.vue'
export default {
name: 'TumorOncogenesis',
components:{
  Scatter,
  Table,
},
computed: {
  ...mapGetters(['cmp_id','gene_class']),
},
props:['current'],
data() {
return {
  
  loading: false,
  search: null,
  select: null,
  states: [],
  Oncogenesis:{
    label1:'Gene set',
    select1: '',
    items1: [],
    disabled1:false,
    label2:'Gene list',
    value2:'',
    disabled2:false,
    label3:'Gene data',
    select3: 'Mutation',
    items3: ['Mutation', 'CNV', 'Fusion', 'Methylation','gene expression'], 
  },
  tab: 0,
  tabItems:[
      {text:'scatter'},
      {text:'table'},
  ],
  scatterData:[], 
  tableData:[],
  source:'',
  value:1000,    
}
},
created() {
  console.log('create')
  console.log(this.current)
  this.$EventBus.$on(this.current, (msg) => {
    console.log(msg)
    this.source = msg;   
    if(this.select||this.Omics.select1){
      if(this.tab!=0){
        this.onselectTable(this.select)
      }
    }
  })
},
mounted() {},
methods:{
    onsearch(cmp_id){
      let select = this.Oncogenesis;
      if(select.select1){
        this.tab==0?this.onselect(cmp_id):this.onselectTable(cmp_id)
      }else{
        this.$message.warning('请选择'+select.label1||select.label2||select.label3)
      }

    },
    OncogenesischangeArr(){
      this.Oncogenesis.disabled2 = true;
      // if(this.select){
      //   this.tab==0?this.onselect(this.select):this.onselectTable(this.select)
      // }else{
      //   this.$message.warning('请选择cmp_id')
      // }
      this.OncogenesischangeArr3()
    },
    OncogenesischangeArr2(){
      this.Oncogenesis.disabled1 = true;
      // if(this.select){
      //   this.tab==0?this.onselect(this.select):this.onselectTable(this.select)
      // }else{
      //   this.$message.warning('请选择cmp_id')
      // }
      this.OncogenesischangeArr3()
    },
    OncogenesischangeArr3(){
      if(this.select){
        this.tab==0?this.onselect(this.select):this.onselectTable(this.select)
      }else{
        this.$message.warning('请选择cmp_id')
      }
    },
    async onselect(cmp_id){
      console.log(cmp_id)
      let $loading = this.$loading();
      // this.$store.dispatch('ShowLoading')
      let select = this.Oncogenesis;
      // await fetch(baseUrl+'/api/omics/ccl/?cmp_id='+cmp_id+'&omics_type='+select.select3+'&gene_set='+select.select1+'&gene_list='+select.value2).then((res)=>{
      //   return res.json()
      // }).then((data)=>{
      //   data.code==200?this.scatterData = data.datainfo:this.$message.error(data.message)
      // })
      Aselectccl(cmp_id,select.select3,select.select1,select.value2).then(res=>this.scatterData = res.data.datainfo)
      $loading.close()
      // this.$store.dispatch('HideLoading')
      select.disabled1 = false;
      select.disabled2 = false;
    },
    async onselectTable(cmp_id){
      console.log(cmp_id)
      let $loading = this.$loading();
      // this.$store.dispatch('ShowLoading')
      let select = this.Oncogenesis;
      // await fetch(baseUrl+'/api/omics/ccltable/?cmp_id='+cmp_id+'&omics_type='+select.select3+'&gene_set='+select.select1+'&gene_list='+select.value2+'&source='+(this.source)).then((res)=>{
      //   return res.json()
      // }).then((data)=>{
      //   data.code==200?this.tableData = data.data_info:this.$message.error(data.message)
      // })
      Aselectccltable(cmp_id,select.select3,select.select1,select.value2,this.source).then(res=>this.tableData = res.data.data_info)
      $loading.close();
      // this.$store.dispatch('HideLoading')
      this.Oncogenesis.disabled1 = false;
      this.Oncogenesis.disabled2 = false;
    },
    onchange(){
      console.log('change')
      if(this.source){
        if(this.select){
          if(this.tab!=0){
            this.onselect(this.select);
          }
        }
      }
      
    }
}
}
</script>
<style scoped>

</style>