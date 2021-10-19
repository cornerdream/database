<template>
  <div class="TumorCellAtlas">    
    
    <keep-alive>
      <component :is="view" :current="view"></component>
    </keep-alive>
   
  </div>
</template>
<script>
import Overview from './TumorOverview.vue'
import Omics from './TumorOmics.vue'
import Pathways from './TumorPathways.vue'
import Immunology from './TumorImmunology.vue'
import Oncogenesis from './TumorOncogenesis.vue'
import Regulation from './TumorRegulation.vue'
import Pharmacology from './TumorPharmacology.vue'
import Analysis from './TumorAnalysis.vue'
export default {
  name:'TumorCellAtlas',
  props:['view'],
  components:{
    Overview,
    Omics,
    Pathways,
    Immunology,
    Oncogenesis,
    Regulation,
    Pharmacology,
    Analysis
  },
  data(){
    return {
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
  }
}
</script>
<style scoped>
</style>
