<!-- -->
<template>
<div class="TumorPharmacology">
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
        <Human></Human>
      </div>
      <div class="select">
        <v-combobox
        v-model="Pharmacology.select1"
        :items="Pharmacology.items1"
        label="Gene set"
        outlined
        dense
        solo
        @input="PharmacologychangeArr"
        :disabled="Pharmacology.disabled1"
        ></v-combobox>
        <v-text-field 
        placeholder="Gene list"
        :value="Pharmacology.value2"
        @keyup.enter="PharmacologychangeArr2"
        :disabled="Pharmacology.disabled2"
        >
          <v-icon
            slot="append"
            color="#429fd5"
          >
          mdi-pencil
          </v-icon>
        </v-text-field>
        <v-combobox
          v-model="Pharmacology.select3"
          :items="Pharmacology.items3"
          label="Gene data"
          outlined
          dense
          solo
          @input="PharmacologychangeArr3"
          allow-overflow
        ></v-combobox>
      </div>
    </div>
    <!-- <div class="container" >
        <div class="component">
        <Human ></Human>
        </div>
    
    </div> -->
</div>
</template>
<script>
import Human from '../components/human.vue'
export default {
name: 'TumorPharmacology',
components:{
     Human
},
data() {
return {
    loading: false,
      search: null,
      select: null,
      states: [],
      Pharmacology:{
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
    PharmacologychangeArr(){

    },
    PharmacologychangeArr2(){

    },
    PharmacologychangeArr3(){
        
    }
}
}
</script>
<style scoped>

</style>