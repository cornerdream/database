<template>
  <div class="TumorCellAtlas">    
    {{view}}
    <div class="container" v-if="view=='Overview'" >
      <SimpleTable  :data="tableData" :id="cmp_id"></SimpleTable>
    </div>
    <div class="container" v-else-if="view=='Omics'">
      <Scatter :data="scatterData" ref="scatter"></Scatter>
      <Area :data="scatterData" ref="area" v-show="Omics.select3!=='Fusion'"></Area>
      <!-- <div id="select"> -->
        <div class="select">
        <v-combobox
        v-model="Omics.select1"
        :items="Omics.items1"
        label="Gene set"
        multiple
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
      <!-- </div> -->
      
    </div>
    <div class="container" v-else-if="view=='Pathways'">
      <!-- <v-switch
      inset
      v-model="switchTable"
      :label="switchTable ? 'table' : 'pathway'"
      ></v-switch>   -->
      {{tab}}
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

      
    
      <Table :data="pathwaysData" ref="table" v-if="tab==0"></Table>
      <Pathway :data="pathwaysData" v-else></Pathway>
      <!-- <Scatter  :dataScater="scatterDataPathways" ref="scatter"></Scatter> -->
      <!-- <Area :dataArea="scatterDataPathways" ref="area"></Area> -->
      <!-- <div id="select"> -->
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
      <!-- </div> -->
      
    </div>
    <div class="container" v-else-if="view=='Immunology'">
      <Sunburst ></Sunburst>
    </div>
    <div class="container" v-else-if="view=='Oncogenesis'">
      <Pathway ></Pathway>
    </div>
    <div class="container" v-else-if="view=='Regulation'">
      <Sequence ></Sequence>
    </div>
    <div class="container" v-else-if="view=='Pharmacology'">
      <Boxplot ></Boxplot>
    </div>
    <div class="container" v-else-if="view=='Analysis'">
      <Network ></Network>
    </div>
    <!-- <Barplot v-else-if="view=='Oncogenesis'"></Barplot> -->
    
    
    
    
    
   
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import SimpleTable from '../components/simpleTable.vue'
import Scatter from '../components/scatter.vue'
import Area from '../components/area.vue'
import Sunburst from '../components/sunburst.vue'
// import Barplot from '../components/barplot.vue'
import Pathway from '../components/pathway.vue'
import Sequence from '../components/sequence.vue'
import Boxplot from '../components/boxplot.vue'
import Network from '../components/network.vue'
import Table from '../components/table.vue'
export default {
  name:'TumorCellAtlas',
  props:['view','tableData','cmp_id'],
  components:{
    SimpleTable,
    Scatter,
    Area,
    Sunburst,
    // Barplot,
    Pathway,
    Sequence,
    Boxplot,
    Network ,
    Table
  },
  // computed: {
  //   ...mapGetters(['gene_class','scatterData','pathway_list','pathwaysData'])
  // },
  data(){
    return {
      Omics:{
        select1: [],
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
  created(){ 
      this.loadOmics();
      this.loadPathways();
      // this.load();
  },
  methods:{
    load(){
      this.$store.dispatch('GetGeneClass').then(() => {
        this.Omics.items1 = this.gene_class
      })
      this.$store.dispatch('GetPathwayList').then(() => {
        this.Pathways.items1 = this.pathway_list
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
      // for(var i=0;i<this.items2.length;i++){
       
      //   let item = this.items2[i];
      //   for(var j=0;j<this.select1.length;j++){
      //     var el = this.select1[j]
      //     if(el.value==item.value){
      //       item.disabled = true;   
      //       break;   
      //     }else{
      //       item.disabled = false;
      //     }
      //   }
      // }
      this.Omics.disabled2 = true;
      this.onselect();
     
    },
    OmicschangeArr2(){
      // for(var i=0;i<this.items2.length;i++){
      //   let item = this.items2[i];
      //   for(var j=0;j<this.select2.length;j++){
      //     var el = this.select2[j]
      //     if(el.value==item.value){
      //       item.disabled = true;   
      //       break;   
      //     }else{
      //       item.disabled = false;
      //     }
      //   }
      // }
      this.Omics.disabled1 = true;
      this.onselect();
     
    },
    OmicschangeArr3(){
      this.onselect();
      
    },
    onselect(){
      console.log('select')
      fetch('http://192.168.1.128:8000/api/omics/ccl/?cmp_id='+this.cmp_id+'&omics_type='+this.Omics.select3+'&gene_set='+(this.Omics.select1.toString())+'&gene_list='+this.Omics.value2).then((res)=>{
        return res.json()
      }).then((data)=>{
        if(data.code==200){
          this.scatterData = data.datainfo;
          console.log(this.$refs)
          // this.$refs.area.change()
          // this.$refs.scatter.change()
        }else{
         this.$alert.error(data.message)
        }
        
      })
      // const option={
      //   cmp_id:this.cmp_id,
      //   omics_type:this.Omics.select3,
      //   gene_set:this.Omics.select1.toString(),
      //   gene_list:this.Omics.value2
      // }
      // this.$store.dispatch('GetScatterData',option).then(() => { })
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
      console.log('selectPathways')
      fetch('http://192.168.1.128:8000/api/pathway/pathwaytable/?cmp_id='+this.cmp_id+'&omics_type='+this.Pathways.select3+'&pathway_id='+(this.Pathways.select1.toString())).then((res)=>{
        return res.json()
      }).then((data)=>{
        if(data.code==200){
          this.pathwaysData = data.data_info;
          console.log(this.pathwaysData)
          // this.$refs.table.load()
          // this.$refs.scatter.change()
        }else{
         this.$alert.error(data.message)
        }
        
      })
      // const option={
      //   cmp_id:this.cmp_id,
      //   omics_type:this.Pathways.select3,
      //   pathway_id:this.Pathways.select1.toString()
      // }
      // this.$store.dispatch('GetPathwaysData',option).then(() => {})
    }
  }
}
</script>
<style scoped>
.TumorCellAtlas{
  height: 780px;
  /* position: relative; */
}
.container >>>.v-tab{
    color: #0079b5;
    padding: .5rem 1rem;
    border-radius: .25rem;
}
.container .seqTabActive{
    color: #fff;
    background-color: #0079b5;
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
</style>
