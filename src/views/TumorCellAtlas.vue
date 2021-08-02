<template>
  <div class="TumorCellAtlas">    
    
    <keep-alive>
      <component :is="view"></component>
    </keep-alive>
   
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'

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
  // computed: {
  //   ...mapGetters(['cmp_id'])
  // },
  data(){
    return {
      
      // loading: false,
      // search: null,
      // select: null,
      
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
<style scoped>
</style>
