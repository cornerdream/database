<template>
  <div class="ImmuneCellAtlas">
    {{view}}
    {{tableData}}
      <Table v-if="view=='Overview'" :data="tableData"></Table>
      <Scatter v-else-if="view=='Omics'"></Scatter>
      <Area v-else-if="view=='Pathways'"></Area>
      <Sunburst v-else-if="view=='Immunology'"></Sunburst>
      <Barplot v-else-if="view=='Oncogenesis'"></Barplot>
      <Sequence v-else-if="view=='Regulation'"></Sequence>
      <Boxplot v-else-if="view=='Pharmacology'"></Boxplot>
      <Network v-else-if="view=='Analysis'"></Network>
  </div>
</template>
<script>
import Table from '../components/tableSwitch.vue'
import Scatter from '../components/scatter.vue'
import Area from '../components/area.vue'
import Sunburst from '../components/sunburst.vue'
import Barplot from '../components/barplot.vue'
import Sequence from '../components/sequence.vue'
import Boxplot from '../components/boxplot.vue'
import Network from '../components/network.vue'
export default {
  name:'ImmuneCellAtlas',
  props:['view','tableData'],
  components:{
    Table,
    Scatter,
    Area,
    Sunburst,
    Barplot,
    Sequence,
    Boxplot,
    Network
  },
  data(){
    return {
      // view:'Overview'
    }
  }
}
</script>

