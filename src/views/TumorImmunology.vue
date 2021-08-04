<!-- -->
<template>
<div class="TumorImmunology">
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
        <v-select
          v-model="menuselect"
          :items="selectitems"
          label="Outlined style"
          dense
          outlined
          @change="onchange"
        ></v-select>
        <Scatter :data="ImmunologyData" v-if="menuselect=='scatter'"></Scatter>
        <div v-else>
          <v-card
            :loading="loading"
            class="mx-auto my-12"
            
          >
            <!-- <v-row
              align="center"
              justify="center"
            > -->
              <!-- <v-col class="col-2"> -->
                <v-card-title>Cell line:{{info['model_name']}}</v-card-title>
                <v-card-title>MSI:{{info['msi_status']}}</v-card-title>
                <v-card-title>TMB:{{info['mutational_burden']}}</v-card-title>
              <!-- </v-col> -->
              <!-- <v-col class="col-10"> -->
                <TableImmunology :data="ImmunologyDataTable"></TableImmunology>
              <!-- </v-col> -->
            <!-- </v-row> -->
            
            <!-- <Sequence :data="ImmunologyData" :id="search" v-else></Sequence> -->
          </v-card>
        </div>
        
        <!-- <TableImmunology :data="ImmunologyDataTable" v-if="tab==0"></TableImmunology> -->
        <!-- <SimpleTable :data="ImmunologyDataTable" v-if="tab==0"></SimpleTable> -->
        
      </div>
      <div class="select">
        <v-combobox
        v-model="Immunology.select1"
        :items="gene_class"
        label="Gene set"
        outlined
        dense
        solo
        @input="ImmunologychangeArr"
        :disabled="Immunology.disabled1"
        ></v-combobox>
        <v-text-field 
        placeholder="Gene list"
        :value="Immunology.value2"
        @keyup.enter="ImmunologychangeArr2"
        :disabled="Immunology.disabled2"
        >
          <v-icon
            slot="append"
            color="#429fd5"
          >
          mdi-pencil
          </v-icon>
        </v-text-field>
        <v-combobox
          v-model="Immunology.select3"
          :items="hla_allele"
          label="HLA locus"
          multiple
          outlined
          dense
          solo
          @input="ImmunologychangeArr3"
          allow-overflow
        ></v-combobox>
      </div>
    </div>
    
     
</div>
</template>
<script>
import baseUrl from '../utils/baseurl'
import {mapGetters} from 'vuex'
import Scatter from '../components/scatter.vue'
// import Table from '../components/table.vue'
import TableImmunology from '../components/tableImmunology.vue'
// import Sequence from '../components/sequence.vue'
// import SimpleTable from '../components/simpleTable.vue'
export default {
name: 'TumorImmunology',
components:{
  Scatter,
  // Table,
  TableImmunology,
    // Sequence,
    // SimpleTable
},
computed: {
  ...mapGetters(['cmp_id','gene_class','hla_allele']),
},
data() {
return {
    loading: false,
    search: null,
    select: null,
    states: [],
    Immunology:{
      select1: '',
      items1: [],
      disabled1:false,
      value2:'',
      disabled2:false,
      select3: ['HLA-C*07:01'],
      items3: ['Mutation', 'CNV', 'Fusion', 'Methylation','gene expression'], 
    },
    tab:0,
    tabItems:[
      {text:'table'},
      {text:'immunology'},
    ],
    menuselect:'scatter',
    selectitems:['scatter','table'],
    info:{},
    ImmunologyData:[],
    ImmunologyDataTable:[],
      
}
},
created() {
},
mounted() {},
methods:{
    
    loadImmunologyInfo(){
      fetch(baseUrl+'/api/immunity/msi_tmb/?cmp_id='+(this.search||this.select)).then((res)=>{
        return res.json()
      }).then((data)=>{
        this.info = data.data_info;        
      })
    },
    onsearch(){
      if(this.Immunology.select1){
        if(this.menuselect=='scatter'){
          this.onselect()
        }else{
          this.loadImmunologyInfo()
          this.onselectTable() 
        }
      }
    },
    ImmunologychangeArr(){
      this.Immunology.disabled2 = true;
      if(this.search||this.select){
        if(this.menuselect=='scatter'){
            this.onselect()
          }else{
            this.loadImmunologyInfo()
            this.onselectTable() 
          }
      }   
    },
    ImmunologychangeArr2(){
      this.Immunology.disabled1 = true;
      if(this.search||this.select){
        if(this.menuselect=='scatter'){
          this.onselect()
        }else{
          this.loadImmunologyInfo()
          this.onselectTable() 
        }
      }  
    },
    ImmunologychangeArr3(){
      if(this.search||this.select){
        if(this.menuselect=='scatter'){
          this.onselect()
        }else{
          this.loadImmunologyInfo()
          this.onselectTable() 
        }
      }  
    },
    onselect(){
      fetch(baseUrl+'/api/immunity/immunity/?cmp_id='+(this.search||this.select)+'&hla_type='+(this.Immunology.select3.toString())+'&gene_set='+this.Immunology.select1+'&gene_list='+this.Immunology.value2).then((res)=>{
        return res.json()
      }).then((data)=>{
        if(data.code==200){
          this.ImmunologyData = data.data_info;
        }else{
         this.$alert.error(data.message)
        }
      })
      this.Immunology.disabled1 = false;
      this.Immunology.disabled2 = false;
    },
    onselectTable(){
      fetch(baseUrl+'/api/immunity/hlatable/?cmp_id='+(this.search||this.select)+'&hla_type='+(this.Immunology.select3.toString())+'&gene_set='+this.Immunology.select1+'&gene_list='+this.Immunology.value2).then((res)=>{
        return res.json()
      }).then((data)=>{
        if(data.code==200){
          this.ImmunologyDataTable = data.data_info;
        }else{
         this.$alert.error(data.message)
        }
      })
      this.Immunology.disabled1 = false;
      this.Immunology.disabled2 = false;
    },
    onchange(){
      if(this.search||this.select){
        if(this.menuselect=='scatter'){
          this.onselect()
        }else{
          this.loadImmunologyInfo()
          this.onselectTable() 
        }
      }  
    },
    
}
}
</script>
<style scoped>

</style>