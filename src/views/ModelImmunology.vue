<!-- -->
<template>
<div class="ModelImmunology">
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
        <!-- <div class="nav">
          <v-btn
          class="navbtn"
          x-small
          color="warning"
          dark
          >
          </v-btn>
        immunology
        </div> -->
        <!-- <v-row class="componentContent">
          <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6" class="animate__animated animate__lightSpeedInLeft"> -->
            <BarGroup v-if="Immunology.select3.length==1" :data="barData" x="model_id" y="field" z="value"></BarGroup>
          <!-- </v-col>
          <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6" class="animate__animated animate__lightSpeedInRight"> -->
            
            <Heatmap  v-else :data="heatmapData" x="field" y="model_id" z="value"></Heatmap>
          <!-- </v-col>
        </v-row> -->

      </div>
      
      <div class="componentBox">
        <!-- <div class="nav">
          <v-btn
          class="navbtn"
          x-small
          color="warning"
          dark
          >
          </v-btn>
        patholog
        </div> -->
        <!-- <div class="tab"> -->
          <!-- <v-tabs
            v-model="tab"
            background-color="transparent"
            class="seqTab"
            active-class="seqTabActive"
          >
              <v-tab
              v-for="item in tabItems"
              :key="item.text"
              @change="onTabchange"
              >
              {{ item.text }}
              </v-tab>
          </v-tabs> -->
          <!-- <v-select
            v-model="menuselect"
            :items="selectitems"
            label="Pic list"
            dense
            outlined
            @change="onSelectchange"
          ></v-select> -->
        <!-- </div> -->

        <v-row class="componentContent">
          <v-col cols="12" xs="12" sm="12" md="12" lg="10" xl="10" class="animate__animated animate__lightSpeedInLeft">
          <!-- <div class="animate__animated animate__lightSpeedInLeft"> -->
            <ImgN canvasWidth="1200"></ImgN>
          <!-- </div>   -->
            
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="12" lg="2" xl="2" class="animate__animated animate__lightSpeedInRight">
            <v-select
            v-model="menuselect"
            :items="selectitems"
            label="Pic list"
            dense
            outlined
            @change="onSelectchange"
          ></v-select>
            <!-- <v-card
                class="infoCard"
                max-width="344"
                color="#E3E9EE" 
              >
                <v-card-text>
                  <div></div>
                  <p class="text-h4 text--primary">
                    
                  </p>
                  
                  <div class="text--primary">
                   
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
            </v-card> -->
            <!-- <Bar id="immunologybar"></Bar> -->
          </v-col> 
        </v-row>
        
      </div>  
      
      
      
      
      

    </div>
    <div class="select">
        <v-combobox
        v-model="Immunology.select1"
        :items="Immunology.items1"
        label="Species human/mouse"
        outlined
        dense
        solo
        @input="ImmunologychangeArr"
        :disabled="Immunology.disabled1"
        ></v-combobox>
        <v-combobox
        v-model="Immunology.select2"
        :items="Immunology.items2"
        label="cancer type"
        outlined
        dense
        solo
        @input="ImmunologychangeArr2"
        :disabled="Immunology.disabled2"
        ></v-combobox>
        <!-- <v-text-field 
        placeholder="model list"
        :value="Immunology.value2"
        @keyup.enter="ImmunologychangeArr2"
        :disabled="Immunology.disabled2"
        >
          <v-icon
            slot="append"
            color="#429fd5"
          >
          mdi-pencil
          </v-icon>
        </v-text-field> -->

        <v-combobox
          v-model="Immunology.select3"
          :items="Immunology.items3"
          label="model list"
          outlined
          dense
          solo
          multiple
          @input="ImmunologychangeArr3"
          allow-overflow
        ></v-combobox>
        <v-combobox
          v-model="Immunology.select4"
          :items="Immunology.items4"
          label="enrichment score"
          outlined
          dense
          solo
          @input="ImmunologychangeArr4"
          allow-overflow
        ></v-combobox>
        
        
    </div>
  </div>
    
</div>
</template>
<script>
import {AgetBarGroup} from '../api/model'
import {AgetGeneFusionBar} from '../api/model'
// import "animate.css"
// import baseUrl from '../utils/baseurl'
import {mapGetters} from 'vuex'
import BarGroup from '../components/barGroup.vue'
import Heatmap from '../components/heatmap.vue'
import ImgN from '../components/imageN.vue'
// import Bar from '../components/bar.vue'
export default {
name: 'ModelImmunology',
components:{
  BarGroup,
  Heatmap,
  ImgN ,
  // Bar 
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
      Immunology:{
        select1: 'human',
        items1: ['human','mouse'],
        disabled1:false,
        // value2:'',
        select2:'',
        items2:['liver cancer'],
        disabled2:false,
        select3: ['R21082260LR01-YK-0026'],
        items3: ['R21082260LR01-YK-0026', 'R21066463LR01-YK-0008'], 
        select4: 'enrichment score',
        items4: ['normalized', 'ssgsea', 'enrichment score'], 
       
      },
      scatterData:[],
    tab: 0,
    tabItems:[
        {text:'immume'},
        {text:'patholog'},
        {text:'fac'},
        {text:'drug'},
    ],
    menuselect:'scatter',
    selectitems:['scatter','table'],
    barData:[],
    heatmapData:[]
}
},
created() {
  this.ImmunologychangeArr()
},
mounted() {
  // this.load()
},
methods:{
  load(){
    
  },
  
  onsearch(){
    
  },
  onSelectGeneBar(){
    let options={
      species:this.Immunology.select1,
      model_list:this.Immunology.select3
    }
    let loading = this.$loading()
    AgetGeneFusionBar(options).then(res=>{
      this.barData = res.data.data_info.normalized_ssgsea;
    })
    loading.close()
  },
  onSelectBar(){
    let options={
      species:this.Immunology.select1,
      model_list:this.Immunology.select3
    }
    let loading = this.$loading()
    AgetBarGroup(options).then(res=>{
      this.barData = res.data.data_info;
    })
    loading.close()
  },
  onSelectHeatmap(){
    let options={
      species:this.Immunology.select1,
      model_list:this.Immunology.select3
    }
    let loading = this.$loading()
    AgetBarGroup(options).then(res=>{
      this.heatmapData = res.data.data_info;
    })
    loading.close()
  },
  ImmunologychangeArr(){
    if(this.Immunology.select3.length==1){
      console.log('1')
      this.onSelectBar()
      console.log(this.barData)
    }else{
      console.log('2')
      this.onSelectHeatmap()
      console.log(this.heatmapData)
 
    }
  },
  ImmunologychangeArr2(){

  },
  ImmunologychangeArr3(){
    if(this.Immunology.select3.length==1){
      this.onSelectBar()
    }else{
      this.onSelectHeatmap()
    }
  },
  ImmunologychangeArr4(){
      
  },
  onTabchange(){
    console.log('tabchange')
    
    
  },
  onSelectchange(){
    console.log('selectchange')
    
    
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
  
  /* align-items: center; */
 
}
.tab{
  display: flex;
  align-items: flex-start;
}
.infoCard{
  margin-bottom: 20px;
}
</style>