<template>
  <div class="ModelAtlas">
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
      
      <keep-alive>
        <component :is="view" :current="view"></component>
      </keep-alive>
  </div>
</template>
<script>
// import $ from 'jquery'
// import {view} from '../utils/jquery.parallux'
// import Table from '../components/table.vue'
// import Scatter from '../components/scatter.vue'
// import Area from '../components/area.vue'
// import Sunburst from '../components/sunburst.vue'
// import Barplot from '../components/barplot.vue'
// import Sequence from '../components/sequence.vue'
// import Boxplot from '../components/boxplot.vue'
// import Network from '../components/network.vue'
// import LineScatter from '../components/lineScatter.vue'
import Overview from './ModelOverview.vue'
import Omics from './ModelOmics.vue'
import Immunology from './ModelImmunology.vue'
import Pathways from './ModelPathways.vue'
import Pathology from './ModelPathology.vue'
export default {
  name:'ModelAtlas',
  props:['view','tableData'],
  components:{
    // Table,
    // Scatter,
    // Area,
    // Sunburst,
    // Barplot,
    // Sequence,
    // Boxplot,
    // Network,
    // LineScatter
    Overview,
    Omics,
    Immunology,
    Pathways,
    Pathology
  },
  data(){
    return {
      // view:'Overview'
      
    }
  },
  created(){
    this.load()
  },
  mounted(){
    
  },
  methods:{

    load(){
      this.$store.dispatch('GetCmpId')
      this.$store.dispatch('GetGeneClass')
      this.$store.dispatch('GetPathwayList')
      this.$store.dispatch('GetHlaAllele')
      this.$store.dispatch('GetDrugclass')
    },

  }
}
</script>
<style scoped>

</style>

