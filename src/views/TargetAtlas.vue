<template>
  <div class="TargetAtlas">
    <!-- {{view}}
    {{tableData}}
      <Table v-if="view=='Overview'" :data="tableData"></Table>
      <Scatter v-else-if="view=='Omics'"></Scatter>
      <Area v-else-if="view=='Pathways'"></Area>
      <Sunburst v-else-if="view=='Immunology'"></Sunburst>
      <Barplot v-else-if="view=='Oncogenesis'"></Barplot>
      <Sequence v-else-if="view=='Regulation'"></Sequence>
      <Boxplot v-else-if="view=='Pharmacology'"></Boxplot>
      <Network v-else-if="view=='Analysis'"></Network> -->
       <!-- <Violin></Violin> -->
    <keep-alive>
      <component :is="view" :current="view"></component>
    </keep-alive>  
  </div>
</template>
<script>
// import Violin from '../components/violin.vue'
// import Table from '../components/table.vue'
// import Scatter from '../components/scatter.vue'
// import Area from '../components/area.vue'
// import Sunburst from '../components/sunburst.vue'
// import Barplot from '../components/barplot.vue'
// import Sequence from '../components/sequence.vue'
// import Boxplot from '../components/boxplot.vue'
// import Network from '../components/network.vue'
import Overview from './TargetOverview.vue'
import Omics from './TargetOmics.vue'
import Pathways from './TargetPathways.vue'
import Immunology from './TargetImmunology.vue'
import Oncogenesis from './TargetOncogenesis.vue'
import Regulation from './TargetRegulation.vue'
import Pharmacology from './TargetPharmacology.vue'
// import Analysis from './TargetAnalysis.vue'
export default {
  name:'TargetAtlas',
  props:['view'],
  components:{
    // Violin,
    Overview,
    Omics,
    Pathways,
    Immunology,
    Oncogenesis,
    Regulation,
    Pharmacology,
    // Analysis
  },
  data(){
    return {
      // view:'Overview'
    }
  },
  created(){ 
      this.load();
  },
  methods:{
    load(){
      this.$store.dispatch('GetCmpId')
      this.$store.dispatch('GetGeneClass')
      this.$store.dispatch('GetPathwayList')
      this.$store.dispatch('GetHlaAllele')
      this.$store.dispatch('GetDrugclass')
    },
    // onsearch(data){
      // fetch('http://192.168.1.128:8000/api/introduction/cmp/?cmp_id='+data).then((res)=>{
      //   return res.json()
      // }).then((data)=>{
      //   this.tableData = data.datainfo;
      // })
      // EventBus.$emit("aMsg", data);
      // this.$EventBus.$emit("aMsg", data)
    // },  
  }
}
</script>

