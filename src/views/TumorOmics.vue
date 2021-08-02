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
        <Scatter :data="scatterData" ></Scatter>
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
import {mapGetters} from 'vuex'
import Scatter from '../components/scatter.vue'
export default {
name: 'TumorOmics',
components:{ 
    Scatter,
},
computed: {
  ...mapGetters(['cmp_id','gene_class']),
},
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
    scatterData:[], 
}
},
created() {
},
mounted() {},
methods:{
  
    onsearch(){
      if(this.Omics.select1){
        this.onselect()
      }
    },
    OmicschangeArr(){
      this.Omics.disabled2 = true;
      if(this.search||this.select){
        this.onselect();
      }
      
    },
    OmicschangeArr2(){
      this.Omics.disabled1 = true;
      if(this.search||this.select){
        this.onselect();
      }
    },
    OmicschangeArr3(){
      if(this.search||this.select){
        this.onselect();
      }
    },
    onselect(){
      fetch('http://192.168.1.128:8000/api/omics/ccl/?cmp_id='+(this.select||this.search)+'&omics_type='+this.Omics.select3+'&gene_set='+this.Omics.select1+'&gene_list='+this.Omics.value2).then((res)=>{
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
}
}
</script>
<style scoped>

</style>