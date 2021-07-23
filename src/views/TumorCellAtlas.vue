<template>
  <div class="TumorCellAtlas">    
    {{view}}
    <div class="container" v-if="view=='Overview'" >
      <v-toolbar flat id="search">
        <v-autocomplete
        append-icon="mdi-pencil"
        v-model="select"
        :loading="loading"
        :items="states"   
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
        <SimpleTable  :data="tableData" @loadsearch="onsearch" :id="this.select||this.search"></SimpleTable>
      </div>
      
    </div>
    <div class="container" v-else-if="view=='Omics'">
      <v-toolbar flat id="search">
        <v-autocomplete
        append-icon="mdi-pencil"
        v-model="select"
        :loading="loading"
        :items="states"   
        :search-input.sync="search"
        @change="()=>{if(Omics.select1){onselect()}}"
        @keyup.enter="()=>{if(Omics.select1){onselect()}}"
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
        @click="()=>{if(Omics.select1){onselect()}}"
        >
          SEARCH
        </v-btn>
      </v-toolbar>
      <div class="component">
        <Scatter :data="scatterData" ></Scatter>
        <Area :data="scatterData" v-show="Omics.select3!=='Fusion'"></Area>
      </div>
      <div class="select">
        <v-combobox
        v-model="Omics.select1"
        :items="Omics.items1"
        label="Gene set"
        outlined
        dense
        solo
        @input="OmicschangeArr"
        :disabled="Omics.disabled1"
        ></v-combobox>
        <!-- <v-combobox
          v-model="select2"
          :items="items2"
          label="Gene list"
          multiple
          outlined
          dense
          solo
          @input="changeArr2"
          :disabled="disabled2"
        ></v-combobox> -->
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
    <div class="container" v-else-if="view=='Pathways'">
      <v-toolbar flat id="search">
        <v-autocomplete
        append-icon="mdi-pencil"
        v-model="select"
        :loading="loading"
        :items="states"   
        :search-input.sync="search"
        @change="()=>{if(Pathways.select1){onselectPathways()}}"
        @keyup.enter="()=>{if(Pathways.select1){onselectPathways()}}"
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
        @click="()=>{if(Pathways.select1){onselectPathways()}}"
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
            >
            {{ item.text }}
            </v-tab>
        </v-tabs>
        <Table :data="pathwaysData" v-if="tab==0"></Table>
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
    <div class="container" v-else-if="view=='Immunology'">
      <div class="component">
        <Structure ></Structure>
      </div>
    </div>
    <div class="container" v-else-if="view=='Oncogenesis'">
      <div class="component">
        <Human ></Human>
      </div>
      
    </div>
    <div class="container" v-else-if="view=='Regulation'">
      <div class="component">
        <Sequence ></Sequence>
      </div>
      
    </div>
    <div class="container" v-else-if="view=='Pharmacology'">
      <div class="component">
        <Boxplot ></Boxplot>
      </div>
      
    </div>
    <div class="container" v-else-if="view=='Analysis'">
      <div class="component">
        <Network ></Network>
      </div>
      
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import SimpleTable from '../components/simpleTable.vue'
import Scatter from '../components/scatter.vue'
import Area from '../components/area.vue'
// import Sunburst from '../components/sunburst.vue'
import Structure from '../components/structure.vue'
// import Bar from '../components/bar.vue'
import Pathway from '../components/pathway.vue'
import Sequence from '../components/sequence.vue'
import Boxplot from '../components/boxplot.vue'
import Network from '../components/network.vue'
import Table from '../components/table.vue'
import Human from '../components/human.vue'
export default {
  name:'TumorCellAtlas',
  props:['view'],
  components:{
    SimpleTable,
    Scatter,
    Area,
    // Sunburst,
    Structure,
    // Bar,
    Pathway,
    Sequence,
    Boxplot,
    Network ,
    Table,
    Human
  },
  // computed: {
  //   ...mapGetters(['gene_class','scatterData','pathway_list','pathwaysData'])
  // },
  data(){
    return {
      loading: false,
      search: null,
      select: null,
      states: [],
      tableData:[],
      Omics:{
        select1: '',
        items1: [],
        disabled1:false,
        value2:'',
        disabled2:false,
        select3: 'Mutation',
        items3: ['Mutation', 'CNV', 'Fusion', 'Methylation','gene expression'], 
      },
      Pathways:{
        select1: '',
        items1: [],
        select3: 'Mutation',
        items3: ['Mutation', 'CNV', 'Fusion', 'Methylation','gene expression'],
      },
      scatterData:[],
      pathwaysData:{},
      switchTable:true,
      tab: null,
      tabItems:[
        {text:'table'},
        {text:'pathway'},
      ]
    }  
      
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    },
  },
  created(){ 
      this.loadOmics();
      this.loadPathways();
      this.load();
  },
  methods:{
    load(){
      fetch('http://192.168.1.128:8000/api/introduction/get_cmp_id/').then((res)=>{
        return res.json()
      }).then((data)=>{
        this.states = data.datainfo.cmp_id;
      })
    },
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },
    onsearch(data){
      fetch('http://192.168.1.128:8000/api/introduction/cmp/?cmp_id='+data).then((res)=>{
        return res.json()
      }).then((data)=>{
        this.tableData = data.datainfo;
      })
    },  
    
    loadOmics(){
      fetch('http://192.168.1.128:8000/api/omics/gene_class/').then((res)=>{
        return res.json()
      }).then((data)=>{
        this.Omics.items1 = data.datainfo.gene_class;
      })
    },
    loadPathways(){
      fetch('http://192.168.1.128:8000/api/pathway/pathwayid/').then((res)=>{
        return res.json()
      }).then((data)=>{
        this.Pathways.items1 = data.datainfo;
      })
    },
    OmicschangeArr(){
      this.Omics.disabled2 = true;
      this.onselect();
    },
    OmicschangeArr2(){
      this.Omics.disabled1 = true;
      this.onselect();
    },
    OmicschangeArr3(){
      this.onselect(); 
    },
    onselect(){
      fetch('http://192.168.1.128:8000/api/omics/ccl/?cmp_id='+(this.select||this.search)+'&omics_type='+this.Omics.select3+'&gene_set='+(this.Omics.select1.toString())+'&gene_list='+this.Omics.value2).then((res)=>{
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
    PathwayschangeArr(){     
      this.onselectPathways();     
    },
    PathwayschangeArr3(){
      this.onselectPathways();
    },
    onselectPathways(){
      fetch('http://192.168.1.128:8000/api/pathway/pathwaytable/?cmp_id='+(this.select||this.search)+'&omics_type='+this.Pathways.select3+'&pathway_id='+(this.Pathways.select1.toString())).then((res)=>{
        return res.json()
      }).then((data)=>{
        if(data.code==200){
          this.pathwaysData = data.data_info;
        }else{
         this.$alert.error(data.message)
        }
      })
    }
  }
}
</script>
<style scoped>
/* .TumorCellAtlas{ */
  /* height: 580px; */
  /* position: relative; */
/* } */
.container >>>.v-tab{
    color: #0079b5;
    padding: .5rem 1rem;
    border-radius: .25rem;
}
.container .seqTabActive{
    color: #fff;
    background-color: #0079b5;
}
#search{
  /* padding:0 50px; */
}
#search >>>.v-input{
  border: 1px solid #429fd5;
  border-radius: 0 ;
  color:#a0a0a0; 
}
#search >>>.v-text-field.v-text-field--solo .v-input__control{
  min-height: 38px;
}
#search >>>.v-btn:not(.v-btn--round).v-size--default{
  padding:0 26px;
  margin-left: 90px;
}
#select{
  width: 200px;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 9999;
}
.select{
  width: 200px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.component{
  padding:0 200px 0 0;
  min-height: 580px;
}
</style>
