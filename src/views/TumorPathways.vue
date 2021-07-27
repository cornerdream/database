<!-- -->
<template>
<div class="TumorPathways">
    <div class="container">
      <v-toolbar flat id="search">
        <v-autocomplete
        append-icon="mdi-pencil"
        v-model="select"
        :loading="loading"
        :items="states"   
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
        <Table :data="pathwaysTableData" v-if="tab==0"></Table>
        <Pathway :data="pathwaysData" v-else></Pathway>
      </div>
      <div class="select">
          <v-combobox
          v-model="Pathways.select1"
          :items="Pathways.items1"
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
import Table from '../components/table.vue'
import Pathway from '../components/pathway.vue'
export default {
name: 'TumorPathways',
components:{ 
    Table,
    Pathway,
},
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
        items3: ['Mutation', 'CNV', 'Fusion', 'Methylation','gene expression'],
    },
    pathwaysData:{},
    pathwaysTableData:{},
    switchTable:true,
    tab: 0,
    tabItems:[
        {text:'table'},
        {text:'pathway'},
    ]
}
},
// watch: {
//     search (val) {
//       val && val !== this.select && this.querySelections(val)
//     },
//   },
created() {
    this.loadPathways();
    this.load();
},
mounted() {},
methods:{
    load(){
      fetch('http://192.168.1.128:8000/api/introduction/get_cmp_id/').then((res)=>{
        return res.json()
      }).then((data)=>{
        this.states = data.datainfo.cmp_id;
      })
    },
    // querySelections (v) {
    //   this.loading = true
    //   // Simulated ajax query
    //   setTimeout(() => {
    //     this.items = this.states.filter(e => {
    //       return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
    //     })
    //     this.loading = false
    //   }, 500)
    // },
    loadPathways(){
      fetch('http://192.168.1.128:8000/api/pathway/pathwayid/').then((res)=>{
        return res.json()
      }).then((data)=>{
        this.Pathways.items1 = data.datainfo;
      })
    },
    onsearch(){
      if(this.Pathways.select1){
        console.log(this.tab)
        if(this.tab==0){
          this.onselectPathwaysTable()
        }else{
          this.onselectPathways()
        }
        
      }
    },
    PathwayschangeArr(){     
      console.log(this.tab)
      if(this.tab==0){
          this.onselectPathwaysTable()
        }else{
          this.onselectPathways()
        } 
    },
    PathwayschangeArr3(){
      console.log(this.tab)
      if(this.tab==0){
          this.onselectPathwaysTable()
        }else{
          this.onselectPathways()
        }
    },
    onselectPathwaysTable(){
      fetch('http://192.168.1.128:8000/api/pathway/pathwaytable/?cmp_id='+(this.select||this.search)+'&omics_type='+this.Pathways.select3+'&pathway_id='+this.Pathways.select1).then((res)=>{
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
      fetch('http://192.168.1.128:8000/api/pathway/pathway/?cmp_id='+(this.select||this.search)+'&omics_type='+this.Pathways.select3+'&pathway_id='+this.Pathways.select1).then((res)=>{
        return res.json()
      }).then((data)=>{
        if(data.code==200){
          this.pathwaysData = data.pathway_info;
        }else{
         this.$alert.error(data.message)
        }
      })
    },
    onchange(){
      if(this.tab==0){
        this.onselectPathways()
      }else{
        this.onselectPathwaysTable() 
      }
    }
}
}
</script>
<style scoped>

</style>