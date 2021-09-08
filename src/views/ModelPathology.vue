<!-- -->
<template>
<div class="ModelPathology">
  <div class="container">
    
    <div class="top">
      <v-btn
        
        class="searchbtn"
        rounded
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
          {{current}}
          </div>
          <v-row class="componentContent">
            <v-col cols="12" xs="12" sm="6" md="6" lg="3" xl="3" class="animate__animated animate__rotateInDownLeft">
              <v-card
                class="mx-auto"
                max-width="344"
                color="#E3E9EE" 
              >
                <v-card-text>
                  <div>Word of the Day</div>
                  <p class="text-h4 text--primary">
                    be•nev•o•lent
                  </p>
                  <p>adjective</p>
                  <div class="text--primary">
                    well meaning and kindly.<br>
                    "a benevolent smile"
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="deep-purple accent-4"
                  >
                    Learn More
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="6" lg="9" xl="9" class="animate__animated animate__rotateInDownRight">
              <ImgN></ImgN>
             </v-col>
          </v-row>
        </div>
        
         
        
        
        
        
        

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
    
</div>
</template>
<script>
import "animate.css"
// import baseUrl from '../utils/baseurl'
// import loading from '../components/loading.vue'
// import alert from '../components/alert.vue'
import {mapGetters} from 'vuex'
import ImgN from '../components/imageN.vue'

export default {
name: 'ModelPathology',
components:{
  //  loading,
  //  alert,
    ImgN,
    
},
computed: {
  ...mapGetters(['cmp_id','loading']),
},
props:['current'],
data() {
return {

    hidden: true,
    
    alertShow:false,
    info:'',
    type:'',
    // loading: false,
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
      galaxy:null
}
},
created() {
  
},
mounted() {
  // this.load()
},
methods:{
  load(){
    // window.checkComplete()
    //  this.galaxy = new CanvasZoom( document.getElementById('galaxyCanvas'), './helloworld_file', 15723, 14815 );
     console.log(this.galaxy)
  },
  zoomIn(){
    this.galaxy.zoomInCentre()
  },
  zoomOut(){
    this.galaxy.zoomOutCentre()
  },
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
.top{
  margin-bottom: 50px;
}
.container .searchbtn{
  position: absolute;
  left: 16px;
}
.container .search.v-btn--fab.v-size--default.v-btn--absolute.v-btn--top{
  left: 100px;
  top: 0;
}


.navbtn.v-btn:not(.v-btn--round).v-size--x-small{
  min-width: 4px;
  padding: 0;
}
.nav{
  display: flex;
  margin-bottom: 10px;
}
.componentBox{
  margin: 20px 0;
}
.componentContent{
  
  align-items: center;
 
}
</style>