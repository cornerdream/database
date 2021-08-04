<!-- -->
<template>
<div class="TumorOmics">
    <div class="container" >
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
        <Scatter :data="scatterData" v-if="tab==0"></Scatter>
        <Table :data="tableData" :msg="current" v-else></Table>
        <!-- {{tableData}} -->
        <!-- <Area :data="scatterData" v-show="Omics.select3!=='Fusion'"></Area> -->
      </div>
      <div class="select">
        <v-combobox
        v-model="Omics.select1"
        :items="gene_class"
        label="Gene set"
        outlined
        dense
        solo
        @input="OmicschangeArr"
        :disabled="Omics.disabled1"
        ></v-combobox>
        <v-text-field 
        placeholder="Gene list"
        :value="Omics.value2"
        @keyup.enter="OmicschangeArr2"
        :disabled="Omics.disabled2"
        >
          <v-icon
            slot="append"
            color="#429fd5"
          >
          mdi-pencil
          </v-icon>
        </v-text-field>
        <v-combobox
          v-model="Omics.select3"
          :items="Omics.items3"
          label="Gene data"
          outlined
          dense
          solo
          @input="OmicschangeArr3"
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
import Table from '../components/table.vue'
export default {
name: 'TumorOmics',
components:{ 
    Scatter,
    Table
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
    Omics:{
      select1: '',
      items1: [],
      disabled1:false,
      value2:'',
      disabled2:false,
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
    msg:''
}
},
created() {
  console.log('omics')
  console.log(this.current)
  this.$EventBus.$on(this.current, (msg) => {
      console.log(msg)
      this.source = msg;  
      if(this.search||this.select||this.Omics.select1){
        if(this.tab==0){
          this.onselect();
        }else{
          this.onselectTable()
        }
      }
  })
},
mounted() {
  
},
methods:{
    onsearch(){
      if(this.Omics.select1){
        if(this.tab==0){
          this.onselect()
        }else{
          this.onselectTable()
        }
      }
    },
    OmicschangeArr(){
      this.Omics.disabled2 = true;
      if(this.search||this.select){
        if(this.tab==0){
          this.onselect();
        }else{
          this.onselectTable()
        }
      }
      
    },
    OmicschangeArr2(){
      this.Omics.disabled1 = true;
      if(this.search||this.select){
        if(this.tab==0){
          this.onselect();
        }else{
          this.onselectTable()
        }
        
      }
    },
    OmicschangeArr3(){
      if(this.search||this.select){
        if(this.tab==0){
          this.onselect();
        }else{
          this.onselectTable()
        }
        
      }
    },
    onselect(){
      fetch(baseUrl+'/api/omics/ccl/?cmp_id='+(this.select||this.search)+'&omics_type='+this.Omics.select3+'&gene_set='+this.Omics.select1+'&gene_list='+this.Omics.value2).then((res)=>{
        return res.json()
      }).then((data)=>{
        if(data.code==200){
          this.scatterData = data.datainfo;
        }else{
         this.$alert.error(data.message)
        }
      })
      this.Omics.disabled1 = false;
      this.Omics.disabled2 = false;
    },
    onselectTable(){
      fetch(baseUrl+'/api/omics/ccltable/?cmp_id='+(this.select||this.search)+'&omics_type='+this.Omics.select3+'&gene_set='+this.Omics.select1+'&gene_list='+this.Omics.value2+'&source='+(this.source)).then((res)=>{
        return res.json()
      }).then((data)=>{
        if(data.code==200){
          this.tableData = data.data_info;
        }else{
         this.$alert.error(data.message)
        }
      })
      this.Omics.disabled1 = false;
      this.Omics.disabled2 = false;
    },
    onchange(){
      if(this.source){
        if(this.select||this.search){
          if(this.tab==0){
            this.onselectTable()
          }else{
            this.onselect();
          }
        }
      }
      
    }
}
}
</script>
<style scoped>

</style>