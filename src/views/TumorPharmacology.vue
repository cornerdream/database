<!-- -->
<template>
<div class="TumorPharmacology">
  
    <div class="container">
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

        <v-select
          v-model="menuselect"
          :items="selectitems"
          label="Chart type"
          dense
          outlined
          @change="onchange"
        ></v-select>
        <Scatter :data="PharmacologyData" :x="'DRUG_NAME'" :y="Pharmacology.select3"  v-if="menuselect=='scatter'"></Scatter>
        <!-- <ScatterList :data="PharmacologyData" :x="'DRUG_NAME'" :y="'AUC'" :l="'LN_IC50'" v-if="menuselect=='scatter'"></ScatterList> -->
        <div v-else>
          <v-row
          align="center"
          justify="center"
          >
            <!-- <v-col cols="3">
              <Network></Network>
            </v-col> -->
            <v-col cols="12">
              <TablePharmacology :data="tableData"></TablePharmacology>
            </v-col>
          </v-row>
        </div>
        
      </div>
      <div class="select">
        <v-combobox
        v-model="Pharmacology.select1"
        :items="drugclass"
        :label="Pharmacology.label1"
        outlined
        dense
        solo
        @input="PharmacologychangeArr"
        :disabled="Pharmacology.disabled1"
        ></v-combobox>
        <v-combobox
        v-model="Pharmacology.select2"
        :items="gene_class"
        :label="Pharmacology.label2"
        outlined
        dense
        solo
        @input="PharmacologychangeArr2"
        :disabled="Pharmacology.disabled2"
        ></v-combobox>
        <v-text-field 
        :placeholder="Pharmacology.label3"
        :value="Pharmacology.value1"
        @keyup.enter="PharmacologychangeArr3"
        :disabled="Pharmacology.disabled3"
        >
          <v-icon
            slot="append"
            color="#429fd5"
          >
          mdi-pencil
          </v-icon>
        </v-text-field>
        <v-text-field 
        :placeholder="Pharmacology.label4"
        :value="Pharmacology.value2"
        @keyup.enter="PharmacologychangeArr4"
        :disabled="Pharmacology.disabled4"
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
          :label="Pharmacology.label5"
          outlined
          dense
          solo
          @input="PharmacologychangeArr5"
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
// import baseUrl from '../utils/baseurl'
import {Aselectdrug_info,Aselectdrugtable} from '../api/tumor'
import {mapGetters} from 'vuex'
import Scatter from '../components/scatter.vue'
import TablePharmacology from '../components/table.vue'
export default {
name: 'TumorPharmacology',
components:{
  Scatter,
  TablePharmacology
},
computed: {
  ...mapGetters(['cmp_id','gene_class','drugclass']),
},
data() {
return {
    
    loading: false,
    search: null,
    select: null,
    states: [],
    Pharmacology:{
      label1:'Drug set',
      select1: '',
      items1: [],
      disabled1:false,
      label2:'Gene set',
      select2: '',
      items2: [],
      disabled2:false,
      label3:'Drug list',
      value1:'',
      disabled3:false,
      label4:'Gene list',
      value2:'',
      disabled4:false,
      label5:'drug response indicator',
      select3: 'LN_IC50',
      items3: ['LN_IC50','AUC'], 
    },
    menuselect:'scatter',
    selectitems:['scatter','table'],
    PharmacologyData:[],
    tableData:[],
}
},
created() {
},
mounted() {},
methods:{
    
    onsearch(){
      let select = this.Pharmacology;
      if(select.select1){
        this.menuselect=='scatter'?this.onselect():this.onselectTable() 
      }else{
        this.$message.warning('请选择'+select.label1||select.label2||select.label3||select.label4||select.label5)
      }  
    },
    PharmacologychangeArr(){
      this.Pharmacology.disabled2 = true;
      this.Pharmacology.disabled3 = true;
      this.Pharmacology.disabled4 = true;
      // if(this.select){
      //   this.menuselect=='scatter'?this.onselect():this.onselectTable() 
      // }else{
      //   this.$message.warning('请选择cmp_id')
      // }
      this.PharmacologychangeArr5()
    },
    PharmacologychangeArr2(){
      this.Pharmacology.disabled1 = true;
      this.Pharmacology.disabled3 = true;
      this.Pharmacology.disabled4 = true;
      // if(this.select){
      //   this.menuselect=='scatter'?this.onselect():this.onselectTable() 
      // }else{
      //   this.$message.warning('请选择cmp_id')
      // }
      this.PharmacologychangeArr5()
    },
    PharmacologychangeArr3(){
      this.Pharmacology.disabled1 = true;
      this.Pharmacology.disabled2 = true;
      this.Pharmacology.disabled4 = true;  
      // if(this.select){
      //   this.menuselect=='scatter'?this.onselect():this.onselectTable()
      // }else{
      //   this.$message.warning('请选择cmp_id')
      // }
      this.PharmacologychangeArr5()
    },
    PharmacologychangeArr4(){
      this.Pharmacology.disabled1 = true;
      this.Pharmacology.disabled2 = true;
      this.Pharmacology.disabled3 = true;  
      // if(this.select){
      //   this.menuselect=='scatter'?this.onselect():this.onselectTable() 
      // }else{
      //   this.$message.warning('请选择cmp_id')
      // }
      this.PharmacologychangeArr5()
    },
    PharmacologychangeArr5(){
      if(this.select){
        this.menuselect=='scatter'?this.onselect():this.onselectTable() 
      }else{
        this.$message.warning('请选择cmp_id')
      }
      
    },
    async onselect(){
      let $loading = this.$loading()
      // this.$store.dispatch('ShowLoading')
      let select = this.Pharmacology;
      // await fetch(baseUrl+'/api/drug/drug_info/?drug_class='+(select.select1||select.select2||select.value1||select.value2)).then((res)=>{
      //   return res.json()
      // }).then((data)=>{
      //   data.code==200?this.PharmacologyData = data.data_info:this.$message.error(data.message);
      // })
      let option = select.select1||select.select2||select.value1||select.value2
      Aselectdrug_info(option).then(res=>this.PharmacologyData = res.data.data_info)
      $loading.close()
      // this.$store.dispatch('HideLoading')
      select.disabled1 = false;
      select.disabled2 = false;
      select.disabled3 = false;  
      select.disabled4 = false;  
    },
    async onselectTable(){
      let $loading = this.$loading()
      // this.$store.dispatch('ShowLoading')
      let select = this.Pharmacology;
      // await fetch(baseUrl+'/api/drug/drugtable/?drug_class='+(select.select1||select.select2||select.value1||select.value2)).then((res)=>{
      //   return res.json()
      // }).then((data)=>{
      //   data.code==200?this.tableData = data.data_info:this.$message.error(data.message);
      // })
      let option = select.select1||select.select2||select.value1||select.value2
      Aselectdrugtable(option).then(res=>this.tableData = res.data.data_info)
      $loading.close()
      // this.$store.dispatch('HideLoading')
      select.disabled1 = false;
      select.disabled2 = false;
      select.disabled3 = false;  
      select.disabled4 = false; 
    },
    onchange(){
      if(this.search||this.select){
        this.menuselect=='scatter'?this.onselect():this.onselectTable(); 
      }  
    }
}
}
</script>
<style scoped>

</style>