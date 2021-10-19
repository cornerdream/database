<!-- -->
<template>
<div class="ModelPathways">
  <div class="container">
    
    <div class="top">
      <v-btn
        
        class="searchbtn"
        fab
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
      
     
      <div class="component">
        <div class="componentBox">
          <div class="nav">
            <v-btn
            class="navbtn"
            x-small
            color="warning"
            dark
            >
            </v-btn>
             pathways
          </div>
          <v-row class="componentContent">
            <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6" class="animate__animated animate__fadeInTopLeft">
              <Bubble id="pathwaysbubble1" :data="bubbleLeftData" x='kegg_pathway_id' y="ssgsea_score"></Bubble>
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6" class="animate__animated animate__fadeInTopRight">
              <Bubble id="pathwaysbubble2" :data="bubbleRightData" x='kegg_pathway_id' y="normalized_ssgsea_score"></Bubble>
            </v-col>
          </v-row>
        </div>
         
        
        
        
        
        

      </div>
      <div class="select">
        <v-combobox
        v-model="Pathways.select1"
        :items="Pathways.items1"
        label="Gene set"
        outlined
        dense
        solo
        @input="PathwayschangeArr"
        :disabled="Pathways.disabled1"
        ></v-combobox>
        <v-text-field 
        placeholder="Gene list"
        :value="Pathways.value2"
        @keyup.enter="PathwayschangeArr2"
        :disabled="Pathways.disabled2"
        >
          <v-icon
            slot="append"
            color="#429fd5"
          >
          mdi-pencil
          </v-icon>
        </v-text-field>
        <!-- <v-combobox
          v-model="Pathways.select3"
          :items="Pathways.items3"
          label="Gene data"
          outlined
          dense
          solo
          @input="PathwayschangeArr3"
          allow-overflow
        ></v-combobox>
        <v-combobox
          v-model="Pathways.select4"
          :items="Pathways.items4"
          label="Gene data"
          outlined
          dense
          solo
          @input="PathwayschangeArr4"
          allow-overflow
        ></v-combobox>
        <v-combobox
          v-model="Pathways.select5"
          :items="Pathways.items5"
          label="Gene data"
          outlined
          dense
          solo
          @input="PathwayschangeArr5"
          allow-overflow
        ></v-combobox> -->
        
      </div>
    </div>
    
</div>
</template>
<script>
import {AgetScatter} from '../api/model'
// import "animate.css"
// import baseUrl from '../utils/baseurl'
// import loading from '../components/loading.vue'
// import alert from '../components/alert.vue'
import {mapGetters} from 'vuex'
// import Pathway from '../components/pathway.vue'
import Bubble from '../components/bubble.vue'
// import Scatter from '../components/scatter.vue'
export default {
name: 'ModelPathways',
components:{
  //  loading,
  //  alert,
    Bubble,
  //  Scatter
    
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
    Pathways:{
      select1: 'human',
      items1: ['human','mouse'],
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
    bubbleLeftData:[],
    bubbleRightData:[]
}
},
created() {
  this.PathwayschangeArr()
},
mounted() {
  // this.load()
},
methods:{
    load(){
      
    },
    onsearch(){
      
    },
    onSelectBubble(){
      let options={
        species:this.Pathways.select1,
      }
      let loading = this.$loading()
      AgetScatter(options).then(res=>{
        let data = res.data.data_info;
        this.bubbleLeftData = data.ssgsea_score;
        this.bubbleRightData = data.normalized_ssgsea_score;
      })
      loading.close()
    },
    PathwayschangeArr(){
      this.onSelectBubble()
    },
    PathwayschangeArr2(){

    },
    PathwayschangeArr3(){
        
    },
    PathwayschangeArr4(){
        
    },
    PathwayschangeArr5(){
        
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
  left: 100px;
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