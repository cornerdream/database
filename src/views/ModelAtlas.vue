<template>
  <div class="ModelAtlas">

      <keep-alive>
        <component :is="view" :current="view"></component>
      </keep-alive>
      
   
  </div>
</template>
<script>
import "animate.css"
import Overview from './ModelOverview.vue'
import Omics from './ModelOmics.vue'
import Immunology from './ModelImmunology.vue'
import Pathways from './ModelPathways.vue'
import Pathology from './ModelPathology.vue'
export default {
  name:'ModelAtlas',
  props:['view','tableData'],
  components:{
    Overview,
    Omics,
    Immunology,
    Pathways,
    Pathology
  },
  data(){
    return {
     
    }
  },
  created(){
    
  },
  mounted(){
    
  },
  methods:{
    


  }
}
</script>
<style scoped>
.ModelAtlas{
  /* overflow-x:scroll; */
}


</style>

