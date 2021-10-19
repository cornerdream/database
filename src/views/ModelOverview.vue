<!-- -->
<template>
<div class="ModelOverview">
  <div class="container">
    
    <div class="top">
      
      <v-btn
        fab
        class="searchbtn"
        color="primary"
        @click="hidden = !hidden"
      >
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>
      <v-fab-transition>
  
        <v-autocomplete
        v-show="!hidden"
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
        
      </v-fab-transition>
      
    </div>
      
     
      <div class="component" v-if="$route.query.type=='Model'">
        <div class="componentBox" >
          <SimpleTable :data="tableData"></SimpleTable>
        </div>
        
      </div>
      <div class="component" v-else-if="$route.query.type=='Gene'">
        <div class="componentBox" >
          <Lollipop :data="scatterData" :width="l" :circle="circleData"></Lollipop>
          <SimpleTable :data="tableData"></SimpleTable>
        </div>
      </div>  
      <div class="select">
        <v-combobox
        v-model="Overview.select1"
        :items="Overview.items1"
        label="Gene set"
        outlined
        dense
        solo
        @input="OverviewchangeArr"
        :disabled="Overview.disabled1"
        ></v-combobox>
        <v-text-field 
        placeholder="Gene list"
        v-model="Overview.value2"
        @keyup.enter="OverviewchangeArr2"
        :disabled="Overview.disabled2"
        >
          <v-icon
            slot="append"
            color="#429fd5"
          >
          mdi-pencil
          </v-icon>
        </v-text-field>
        <v-combobox
          v-model="Overview.select3"
          :items="Overview.items3"
          label="Gene data"
          outlined
          dense
          solo
          @input="OverviewchangeArr3"
          allow-overflow
        ></v-combobox>
        <v-combobox
          v-model="Overview.select4"
          :items="Overview.items4"
          label="Gene data"
          outlined
          dense
          solo
          @input="OverviewchangeArr4"
          allow-overflow
        ></v-combobox>
        <v-combobox
          v-model="Overview.select5"
          :items="Overview.items5"
          label="Gene data"
          outlined
          dense
          solo
          @input="OverviewchangeArr5"
          allow-overflow
        ></v-combobox>
        
      </div>
  </div>
    
</div>
</template>
<script>
// import 'animate.css'
// import baseUrl from '../utils/baseurl'
import {AgetGeneSequence} from '../api/model'
import {mapGetters} from 'vuex'
import SimpleTable from '../components/simpleTable.vue'
import Lollipop from '../components/lollipop.vue'
export default {
name: 'ModelOverview',
components:{
    SimpleTable,
    Lollipop
},
computed: {
  ...mapGetters(['cmp_id']),
},
data() {
return {
 
    hidden: true,
    loading: false,
    search: null,
    select: null,
    states: [],
    Overview:{
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
    
    tableData:[],
    l:0,
    scatterData:[],
    circleData:[],
}
},
created() {
  this.onSelectSequence()
},
mounted() {
 
},
methods:{
  load(){
    
  },
  onSelectSequence(){
    let loading = this.$loading()
    AgetGeneSequence(1063135).then(res=>{
      let d = res.data.data_info
      this.l = d.aa_sequence.aa_sequence.length
      this.scatterData = d.protein_domain_mapping;
      this.circleData=d.HGVSp_Short
    })
    loading.close()
  },
  onsearch(){
    
  },
  OverviewchangeArr(){

  },
  OverviewchangeArr2(){

  },
  OverviewchangeArr3(){
      
  },
  OverviewchangeArr4(){
      
  },
  OverviewchangeArr5(){
      
  }
}
}
</script>
<style scoped>
/* .top{
  margin-bottom: 50px;
} */

.container .searchbtn{
  position: absolute;
  right: 96px;
  top: 16px;
}
.container .search.v-btn--fab.v-size--default.v-btn--absolute.v-btn--top{
  right: 100px;
  top: 0;
}

.navbtn.v-btn:not(.v-btn--round).v-size--x-small{
  min-width: 4px;
  padding: 0;
  margin-right: 10px;
}
.nav{
  display: flex;
  margin-bottom: 10px;
  color: #000;
}
body[theme-mode=dark] .nav{
  color: #fff;
}
.componentBox{
  margin: 20px 0;
}
.componentContent{
  
  align-items: center;
 
}

</style>