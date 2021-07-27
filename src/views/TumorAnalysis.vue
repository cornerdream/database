<!-- -->
<template>
<div class="TumorAnalysis">
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
        <Boxplot></Boxplot>
      </div>
      <div class="select">
        <v-combobox
        v-model="Analysis.select1"
        :items="Analysis.items1"
        label="Gene set"
        outlined
        dense
        solo
        @input="AnalysischangeArr"
        :disabled="Analysis.disabled1"
        ></v-combobox>
        <v-text-field 
        placeholder="Gene list"
        :value="Analysis.value2"
        @keyup.enter="AnalysischangeArr2"
        :disabled="Analysis.disabled2"
        >
          <v-icon
            slot="append"
            color="#429fd5"
          >
          mdi-pencil
          </v-icon>
        </v-text-field>
        <v-combobox
          v-model="Analysis.select3"
          :items="Analysis.items3"
          label="Gene data"
          outlined
          dense
          solo
          @input="AnalysischangeArr3"
          allow-overflow
        ></v-combobox>
        <v-combobox
          v-model="Analysis.select4"
          :items="Analysis.items4"
          label="Gene data"
          outlined
          dense
          solo
          @input="AnalysischangeArr4"
          allow-overflow
        ></v-combobox>
        <v-combobox
          v-model="Analysis.select5"
          :items="Analysis.items5"
          label="Gene data"
          outlined
          dense
          solo
          @input="AnalysischangeArr5"
          allow-overflow
        ></v-combobox>
        
      </div>
    </div>
    <!-- <div class="container">
      <div class="component">
        <Boxplot ></Boxplot>
      </div>
      
    </div> -->
</div>
</template>
<script>
import Boxplot from '../components/boxplot.vue'
export default {
name: 'TumorAnalysis',
components:{
    Boxplot
},
data() {
return {
  loading: false,
      search: null,
      select: null,
      states: [],
      Analysis:{
        select1: '',
        items1: [],
        disabled1:false,
        value2:'',
        disabled2:false,
        select3: 'Mutation',
        items3: ['Mutation', 'CNV', 'Fusion', 'Methylation','gene expression'], 
        select4: 'Mutation',
        items4: ['Mutation', 'CNV', 'Fusion', 'Methylation','gene expression'], 
        select5: 'Mutation',
        items5: ['Mutation', 'CNV', 'Fusion', 'Methylation','gene expression'], 
      },
      scatterData:[],
}
},
created() {},
mounted() {},
methods:{
    onsearch(){
      
    },
    AnalysischangeArr(){

    },
    AnalysischangeArr2(){

    },
    AnalysischangeArr3(){
        
    },
    AnalysischangeArr4(){
        
    },
    AnalysischangeArr5(){
        
    }
}
}
</script>
<style scoped>

</style>