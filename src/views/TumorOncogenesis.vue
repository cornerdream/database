<!-- -->
<template>
<div class="TumorOncogenesis">
  <div class="container">
      <v-toolbar flat id="search">
        <v-autocomplete
        append-icon="mdi-pencil"
        v-model="select"
        :loading="loading"
        :items="states"   
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
        <!-- <v-tabs
          v-model="tab"
          background-color="transparent"
          class="seqTab"
          active-class="seqTabActive"
        >
            <v-tab
            v-for="item in tabItems"
            :key="item.text"
            @change="onchange"
            >
            {{ item.text }}
            </v-tab>
        </v-tabs> -->
        <!-- <Table :data="pathwaysTableData" v-if="tab==0"></Table>
        <Pathway :data="pathwaysData" v-else></Pathway> -->
        <!-- <Network></Network> -->
        <HeatmapShape></HeatmapShape>
        <!-- <Heatmap></Heatmap> -->
      </div>
      <div class="select">
        <v-combobox
        v-model="Oncogenesis.select1"
        :items="Oncogenesis.items1"
        label="Gene set"
        outlined
        dense
        solo
        @input="OncogenesischangeArr"
        :disabled="Oncogenesis.disabled1"
        ></v-combobox>
        <v-text-field 
        placeholder="Gene list"
        :value="Oncogenesis.value2"
        @keyup.enter="OncogenesischangeArr2"
        :disabled="Oncogenesis.disabled2"
        >
          <v-icon
            slot="append"
            color="#429fd5"
          >
          mdi-pencil
          </v-icon>
        </v-text-field>
        <v-combobox
          v-model="Oncogenesis.select3"
          :items="Oncogenesis.items3"
          label="Gene data"
          outlined
          dense
          solo
          @input="OncogenesischangeArr3"
          allow-overflow
        ></v-combobox>
      </div>
    </div>
    
</div>
</template>
<script>
// import Network from '../components/network.vue'
import HeatmapShape from '../components/heatmap-shape.vue'
// import Heatmap from '../components/heatmap.vue'
export default {
name: 'TumorOncogenesis',
components:{
  // Network
  HeatmapShape,
  // Heatmap
},
data() {
return {
  loading: false,
      search: null,
      select: null,
      states: [],
      Oncogenesis:{
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
created() {},
mounted() {},
methods:{
    onsearch(){
      
    },
    OncogenesischangeArr(){

    },
    OncogenesischangeArr2(){

    },
    OncogenesischangeArr3(){
        
    }
}
}
</script>
<style scoped>

</style>