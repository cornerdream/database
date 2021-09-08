<!-- -->
<template>
<div class="TumorPathways">
    <div class="container">
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
        <Table :data="pathwaysTableData" :msg="current" v-if="tab==0"></Table>
        <Pathway :data="pathwaysData" :msg="current" :pathway="Pathways.select3" v-else></Pathway>
        <Loading v-if="loading"></Loading>
        <Alert v-if="alertShow" :info="info" :type="type"></Alert>
      </div>
      <div class="select">
          <v-combobox
          v-model="Pathways.select1"
          :items="pathway_list"
          :label="Pathways.label1"
          outlined
          dense
          solo
          @input="PathwayschangeArr"
          ></v-combobox>     
          <v-combobox
            v-model="Pathways.select3"
            :items="Pathways.items3"
            :label="Pathways.label3"
            outlined
            dense
            solo
            @input="PathwayschangeArr3"
            allow-overflow
          ></v-combobox>
      </div>
    </div>
</div>
</template>
<script>
import baseUrl from '../utils/baseurl'
// import loading from '../modules/Loading/loading.vue'
// import alert from '../modules/Alert/alert.vue'
import {mapGetters} from 'vuex'
import Table from '../components/tableSwitch.vue'
import Pathway from '../components/pathway.vue'
export default {
name: 'TumorPathways',
components:{ 
  // loading,
  // alert,
    Table,
    Pathway,
},
computed: {
  ...mapGetters(['cmp_id','pathway_list','loading']),
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
    items:[],
    states: [],
    Pathways:{
        label1:'Pathways list',
        select1: '',
        items1: [],
        label3:'Gene data',
        select3: 'Mutation',
        // items3: ['Mutation', 'CNV', 'Fusion', 'Methylation','gene expression'],
        items3: ['Mutation', 'CNV', 'Fusion', 'gene expression'],
    },
    
    tab: 0,
    tabItems:[
        {text:'table'},
        {text:'pathway'},
    ],
    pathwaysData:{},
    pathwaysTableData:[],
    source:'',
    msg:''
}
},
created() {
  console.log(this.current)
  this.$EventBus.$on(this.current, (msg) => {
      console.log(msg)
      this.source = msg;  
      if(this.search||this.Pathways.select1){
        if(this.tab!=0){
          this.onselectPathways(this.select)
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
      // var _this = this;
      if(this.Pathways.select1){
        this.tab==0?this.onselectPathwaysTable(cmp_id):this.onselectPathways(cmp_id)
      }else{
        // this.alertShow = true;
        // this.type = 'warning'
        // this.info = '请选择'+this.Pathways.label1||this.Pathways.label3
        // setTimeout(function(){
        //   _this.alertShow = false
        // },3000)
        this.alert('warning','请选择'+this.Pathways.label1||this.Pathways.label3)
      }
    },
    PathwayschangeArr(){   
      // var _this = this; 
      if(this.select){
        this.tab==0?this.onselectPathwaysTable(this.select):this.onselectPathways(this.select)
      }else{
        // this.alertShow = true;
        // this.type = 'warning'
        // this.info = '请选择cmp_id'
        // setTimeout(function(){
        //   _this.alertShow = false
        // },3000)
        this.alert('warning','请选择cmp_id')
      } 
    },
    PathwayschangeArr3(){
      // var _this = this;
      if(this.select){
        this.tab==0?this.onselectPathwaysTable(this.select):this.onselectPathways(this.select)
      }else{
        // this.alertShow = true;
        // this.type = 'warning'
        // this.info = '请选择cmp_id'
        // setTimeout(function(){
        //   _this.alertShow = false
        // },3000)
        this.alert('warning','请选择cmp_id')
      }  
    },
    async onselectPathwaysTable(cmp_id){
      // var _this = this;
      this.$store.dispatch('ShowLoading')
      await fetch(baseUrl+'/api/pathway/pathwaytable/?cmp_id='+cmp_id+'&omics_type='+this.Pathways.select3+'&pathway_id='+this.Pathways.select1+'&source='+(this.source)).then((res)=>{
        return res.json()
      }).then((data)=>{
        // data.code==200?this.pathwaysTableData = data.data_info:this.$alert.error(data.message)
        if(data.code==200){          
          this.pathwaysTableData = data.data_info
        }else{
          // this.alertShow = true;
          // this.type = 'error'
          // this.info = data.message
          // setTimeout(function(){
          //   _this.alertShow = false
          // },3000)
          this.alert('error',data.message)
        }
      })
      this.$store.dispatch('HideLoading')
    },
    async onselectPathways(cmp_id){
      // var _this = this;
      this.$store.dispatch('ShowLoading')
      await fetch(baseUrl+'/api/pathway/pathway/?cmp_id='+cmp_id+'&omics_type='+this.Pathways.select3+'&pathway_id='+this.Pathways.select1+'&source='+(this.source)).then((res)=>{
        return res.json()
      }).then((data)=>{
        // data.code==200?this.pathwaysData = data.data_info:this.$alert.error(data.message)
        if(data.code==200){          
          this.pathwaysData = data.data_info
        }else{
          // this.alertShow = true;
          // this.type = 'error'
          // this.info = data.message
          // setTimeout(function(){
          //   _this.alertShow = false
          // },3000)
          this.alert('error',data.message)
        }
      })
      this.$store.dispatch('HideLoading')
    },
    onchange(){
      if(this.source){
        if(this.select){
          if(this.tab!=0){
           this.onselectPathwaysTable(this.select) 
          }
        }
      }  
    }
}
}
</script>
<style scoped>

</style>