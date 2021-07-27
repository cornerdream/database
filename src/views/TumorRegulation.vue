<!-- -->
<template>
<div class="TumorRegulation">
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
        <Structure></Structure>
      </div>
      <div class="select">
        <v-combobox
        v-model="Regulation.select1"
        :items="Regulation.items1"
        label="Gene set"
        outlined
        dense
        solo
        @input="RegulationchangeArr"
        :disabled="Regulation.disabled1"
        ></v-combobox>
        <v-text-field 
        placeholder="Gene list"
        :value="Regulation.value2"
        @keyup.enter="RegulationchangeArr2"
        :disabled="Regulation.disabled2"
        >
          <v-icon
            slot="append"
            color="#429fd5"
          >
          mdi-pencil
          </v-icon>
        </v-text-field>
        <v-combobox
          v-model="Regulation.select3"
          :items="Regulation.items3"
          label="Gene data"
          outlined
          dense
          solo
          @input="RegulationchangeArr3"
          allow-overflow
        ></v-combobox>
      </div>
    </div>
    <!-- <div class="container">
      <div class="component">
        <Structure ></Structure>
      </div>
      
    </div> -->
</div>
</template>
<script>
import Structure from '../components/structure.vue'
export default {
name: 'TumorRegulation',
components:{
    Structure
},
data() {
return {
  loading: false,
      search: null,
      select: null,
      states: [],
      Regulation:{
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
    RegulationchangeArr(){

    },
    RegulationchangeArr2(){

    },
    RegulationchangeArr3(){
        
    }
}
}
</script>
<style scoped>

</style>