<!-- -->
<template>
<div class="TumorOmics">
    <div class="container" >
      <v-toolbar flat id="search">
        <v-autocomplete
        append-icon="mdi-pencil"
        v-model="select"
        :loading="loading"
        :items="cmp_id"   
        :search-input.sync="search"
        @change="onsearch(select)"
        @keyup.enter="onsearch(search)"
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
        @click="onsearch(search)"
        >
          SEARCH
        </v-btn>
      </v-toolbar>
      <div class="component">
        <v-tabs
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
        </v-tabs>
        <Scatter :data="scatterData" v-if="tab==0"></Scatter>
        <Table :data="tableData" :msg="current" v-else></Table>
        <!-- <Area :data="scatterData" v-show="Omics.select3!=='Fusion'"></Area> -->
        <loading v-if="loading"></loading>
        <alert v-if="alertShow" :info="info" :type="type"></alert>
      </div>
      <div class="select">
        <v-combobox
        v-model="Omics.select1"
        :items="gene_class"
        :label="Omics.label1"
        outlined
        dense
        solo
        @input="OmicschangeArr"
        :disabled="Omics.disabled1"
        ></v-combobox>
        <v-text-field 
        :placeholder="Omics.label2"
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
          :label="Omics.label3"
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
import baseUrl from '../utils/baseurl'
import loading from '../components/loading.vue'
import alert from '../components/alert.vue'
import {mapGetters} from 'vuex'
import Scatter from '../components/scatter.vue'
import Table from '../components/table.vue'
export default {
name: 'TumorOmics',
components:{ 
  loading,
  alert,
    Scatter,
    Table
},
computed: {
  ...mapGetters(['cmp_id','gene_class','loading']),
},
props:['current'],
data() {
return {
    alertShow:false,
    info:'',
    type:'',
    // loading: false,
    search: null,
    select: null,
    states: [],
    Omics:{
      label1:'Gene set',
      select1: '',
      items1: [],
      disabled1:false,
      label2:'Gene list',
      value2:'',
      disabled2:false,
      label3:'Gene data',
      select3: 'Mutation',
      // items3: ['Mutation', 'CNV', 'Fusion', 'Methylation','gene expression'], 
      items3: ['Mutation', 'CNV', 'Fusion', 'gene expression'], 
    },
    tab: 0,
    tabItems:[
        {text:'scatter'},
        {text:'table'},
    ],
    scatterData:[], 
    tableData:[],
    source:'',
    //msg:'',
    highlight:'',
    value:1000,
}
},
created() {
  console.log('create')
  console.log(this.current)
  this.$EventBus.$on(this.current, (msg) => {
    console.log(msg)
    this.source = msg;   
    if(this.select||this.Omics.select1){
      if(this.tab!=0){
        this.onselectTable(this.select)
      }
    }
  })
  
  
},
mounted() {
  
},
methods:{
    alert(type,data){
      var _this = this;
      this.alertShow = true;
      this.type = type
      this.info = data
      setTimeout(function(){
        _this.alertShow = false
      },2000)
    },
    onsearch(cmp_id){
      if(this.Omics.select1){
        this.tab==0?this.onselect(cmp_id):this.onselectTable(cmp_id)
      }else{
        // this.alertShow = true;
        // this.type = 'warning'
        // this.info = '请选择'+this.Omics.label1||this.Omics.label2||this.Omics.label3
        // setTimeout(function(){
        //   _this.alertShow = false
        // },2000)
        this.alert('warning','请选择'+this.Omics.label1||this.Omics.label2||this.Omics.label3)
      }
    },
    OmicschangeArr(){
      //  var _this = this;
      this.Omics.disabled2 = true;
      if(this.select){
        this.tab==0?this.onselect(this.select):this.onselectTable(this.select)
      }else{
        // this.alertShow = true;
        // this.type = 'warning'
        // this.info = '请选择cmp_id'
        // setTimeout(function(){
        //   _this.alertShow = false
        // },2000)
        this.alert('warning','请选择cmp_id')
      }
      
    },
    OmicschangeArr2(){
      //  var _this = this;
      this.Omics.disabled1 = true;
      if(this.select){
        this.tab==0?this.onselect(this.select):this.onselectTable(this.select)
      }else{
        // this.alertShow = true;
        // this.type = 'warning'
        // this.info = '请选择cmp_id'
        // setTimeout(function(){
        //   _this.alertShow = false
        // },2000)
        this.alert('warning','请选择cmp_id')
      }
    },
    OmicschangeArr3(){
      //  var _this = this;
      if(this.select){
        this.tab==0?this.onselect(this.select):this.onselectTable(this.select)
      }else{
        // this.alertShow = true;
        // this.type = 'warning'
        // this.info = '请选择cmp_id'
        // setTimeout(function(){
        //   _this.alertShow = false
        // },2000)
        this.alert('warning','请选择cmp_id')
      }
    },
    async onselect(cmp_id){
      //  var _this = this;
       this.$store.dispatch('ShowLoading')
      console.log(cmp_id)
      await fetch(baseUrl+'/api/omics/ccl/?cmp_id='+cmp_id+'&omics_type='+this.Omics.select3+'&gene_set='+this.Omics.select1+'&gene_list='+this.Omics.value2).then((res)=>{
        return res.json()
      }).then((data)=>{
        // data.code==200?this.scatterData = data.datainfo:this.$alert.error(data.message)
        if(data.code==200){          
          this.scatterData = data.datainfo
        }else{
          // this.alertShow = true;
          // this.type = 'error'
          // this.info = data.message
          // setTimeout(function(){
          //   _this.alertShow = false
          // },2000)
          this.alert('error',data.message)
        }
      })
      this.$store.dispatch('HideLoading')
      this.Omics.disabled1 = false;
      this.Omics.disabled2 = false;
    },
    async onselectTable(cmp_id){
      // var _this = this;
      this.$store.dispatch('ShowLoading')
      console.log(cmp_id)
      await fetch(baseUrl+'/api/omics/ccltable/?cmp_id='+cmp_id+'&omics_type='+this.Omics.select3+'&gene_set='+this.Omics.select1+'&gene_list='+this.Omics.value2+'&source='+(this.source)).then((res)=>{
        return res.json()
      }).then((data)=>{
        // data.code==200?this.tableData = data.data_info:this.$alert.error(data.message)
        if(data.code==200){          
          this.tableData = data.data_info
        }else{
          // this.alertShow = true;
          // this.type = 'error'
          // this.info = data.message
          // setTimeout(function(){
          //   _this.alertShow = false
          // },2000)
          this.alert('error',data.message)
        }
      })
      this.$store.dispatch('HideLoading')
      this.Omics.disabled1 = false;
      this.Omics.disabled2 = false;
    },
    onchange(){
      console.log('change')
      if(this.source){
        if(this.select){
          if(this.tab!=0){
            this.onselect(this.select);
          }
        }
      }
      
    }
}
}
</script>
<style scoped>
.seqTab >>>.v-slide-group__content{
  border-bottom:1px solid #0079b5
}
</style>