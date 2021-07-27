<!-- -->
<template>
<div class="TumorOmics">
    <div class="container" >
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
        <!-- <Area :data="scatterData" v-show="Omics.select3!=='Fusion'"></Area> -->
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
import Scatter from '../components/scatter.vue'
// import Area from '../components/area.vue'
export default {
name: 'TumorOmics',
components:{
   
    Scatter,
    // Area,
    
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
//  watch: {
//     search (val) {
//       val && val !== this.select && this.querySelections(val)
//     },
//   },
created() {
    this.loadOmics();
    this.load();
},
mounted() {},
methods:{
    load(){
      this.currentView = this.$route.query.view
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
    loadOmics(){
      fetch('http://192.168.1.128:8000/api/omics/gene_class/').then((res)=>{
        return res.json()
      }).then((data)=>{
        this.Omics.items1 = data.datainfo.gene_class;
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