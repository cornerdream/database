<!-- -->
<template>
<div class="ModelOmics">
  
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
      
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        :key="item.name"
        v-for="(item) in tabItems"
        :label="item.label"
        :name="item.name"
      >
        
      </el-tab-pane>
      
    </el-tabs> 
    <div class="component">
      
      <div class="componentBox" v-if="$route.query.type!=='Pathway'">
        <!-- tablegroup @loadSeque="onSelectOmicsSequence"  -->
        <!-- <TableGroup  v-if="activeName=='1'" :infoData="omicsTableData" :total="pageNumber" @loadTable="onSelectOmicsTable" :selectKey="selectKey" :selectData="selectData" :searchKey="searchKey" :searchData="searchData" :s="s" :valuekey="valuekey" table="mutation" ></TableGroup> -->
        <TableEl1  v-if="activeName=='1'" :infoData="omicsTableData" :total="pageNumber" @loadTable="onSelectOmicsTable" :selectKey="selectKey" :selectData="selectData" :searchKey="searchKey" :searchData="searchData" :s="s" :valuekey="valuekey" table="mutation" ></TableEl1>
        <TableEl2 v-else-if="activeName=='2'" :infoData="omicsTableFusionData" :total="pageFusionNumber" @loadTable="onSelectOmicsTableFusion" :selectKey="selectFusionKey" :selectData="selectFusionData" :searchKey="searchFusionKey" :searchData="searchFusionData" :s="s" :valuekey="fusionvaluekey" table="fusion" @loadDraw="tableElClick"></TableEl2>
        <TableEl3 v-else-if="$route.query.type!=='Pathway'" :infoData="omicsTableExpressionData" :total="pageExpressionNumber" @loadTable="onSelectOmicsTableExpression" :selectKey="selectExpressionKey" :selectData="selectExpressionData" :searchKey="searchExpressionKey" :searchData="searchExpressionData" :s="s" :valuekey="expressionvaluekey" table="expression"  @loadDraw="tableElClick"></TableEl3>
        <v-row class="componentContent">
          <v-col cols="12" xs="12" sm="6" md="6" :lg="activeName=='1'?9:5" :xl="activeName=='1'?9:5" class="animate__animated animate__bounceInDown">  
            <!-- <component :is="Omics.select4=='Mutation'?'Lollipop':'Bar1'"></component> -->
            <!-- <Lollipop v-if="Omics.select3=='Mutation'" :data="scatterData" :width="l" :circle="circleData"></Lollipop>
            <Sequence v-if="Omics.select3=='Mutation'" :seq="seq" :cov="cov" :neoepitope="neoepitope" ></Sequence>
            <Bar v-else-if="Omics.select3=='Fusion'" id="omicsbar1" :data="omicsBarDataLeft" x="gene" y="FFPM"></Bar> -->
            <Lollipop v-if="activeName=='1'" :data="scatterData" :width="l" :circle="circleData"></Lollipop>
            <Sequence v-if="activeName=='1'" :seq="seq" :cov="cov" :neoepitope="neoepitope" ></Sequence>
            
            <!-- <Bar v-if="activeName=='2'" id="omicsbar1" :data="omicsBarDataLeft" x="gene" y="FFPM"></Bar> -->
            <!-- <Bar v-if="$route.query.type!=='Pathway'" id="omicsbar2" :data="omicsBarExpressionDataLeft" x="x_axis" y="log2tpm"></Bar> -->
                
            
          </v-col>
          <!-- <v-col cols="12" xs="12" sm="6" md="6" :lg="Omics.select3=='Mutation'?3:6" :xl="Omics.select3=='Mutation'?3:6" class="animate__animated animate__bounceInUp"> -->
          <v-col cols="12" xs="12" sm="6" md="6" :lg="activeName=='1'?3:5" :xl="activeName=='1'?3:5" class="animate__animated animate__bounceInUp">  
            <!-- <component :is="Omics.select4=='Mutation'?'Card':'Bar2'"></component> -->
            <!-- <Card v-if="Omics.select3=='Mutation'" :infoData="omicsCardData"></Card>
            <Bar v-else-if="Omics.select3=='Fusion'" id="omicsbar3" :data="omicsBarDataRight" x="gene" y="count"></Bar> -->
            <Card v-if="activeName=='1'" :infoData="omicsCardData"></Card>
            <!-- <Bar v-if="activeName=='2'" id="omicsbar3" :data="omicsBarDataRight" x="gene" y="count"></Bar> -->
            <!-- <Bar v-if="$route.query.type!=='Pathway'" id="omicsbar4" :data="omicsBarExpressionDataRight" x="x_axis" y="median_normalized_log2tpm"></Bar> -->
          </v-col>
          <!-- <v-col cols="12" xs="12" sm="6" md="6" lg="2" xl="2" v-if="activeName!=='1'&&selectCol">
            <div>
              <v-combobox
              v-model="Omics.select1"
              :items="Omics.items1"
              label="Model"
              outlined
              dense
              solo
              @input="OmicschangeArr"
              :disabled="Omics.disabled1"
              ></v-combobox>
              <v-combobox
              v-model="Omics.select1"
              :items="Omics.items1"
              label="Gene"
              outlined
              dense
              solo
              @input="OmicschangeArr"
              :disabled="Omics.disabled1"
              ></v-combobox>
            </div>
          </v-col> -->
        </v-row>
        <div v-if="activeName!=='1'&&selectCol" class="chartBox">  
          <div class="chartTab">
            <v-card
              class="mx-auto"
              max-width="300"
              tile
            >
              <v-list dense>
                <v-subheader>REPORTS</v-subheader>
                <v-list-item-group
                  v-model="selectedItem"
                  color="primary"
                >
                  <v-list-item
                    v-for="(item, i) in listItems"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </div> 
          <div class="chart">
            <!-- <v-row >
              <v-col cols="12" xs="12" sm="5" md="5" lg="5" xl="5">
                
                <Bar v-if="activeName=='2'" id="omicsbar1" :data="omicsBarDataLeft" x="gene" y="FFPM"></Bar>
                <Bar v-if="$route.query.type!=='Pathway'" id="omicsbar2" :data="omicsBarExpressionDataLeft" x="x_axis" y="log2tpm"></Bar>
              </v-col>
              <v-col cols="12" xs="12" sm="5" md="5" lg="5" xl="5">
                <Bar v-if="activeName=='2'" id="omicsbar3" :data="omicsBarDataRight" x="gene" y="count"></Bar>
                <Bar v-if="$route.query.type!=='Pathway'" id="omicsbar4" :data="omicsBarExpressionDataRight" x="x_axis" y="median_normalized_log2tpm"></Bar>
              </v-col>
              
            </v-row>
            <v-row>  
              <v-col cols="12" xs="12" sm="10" md="10" lg="10" xl="10">
                <HeatmapShape v-if="activeName=='2'" id="fusionheatmap" :data="heatmapData" x="model_id" y="gene" z="FFPM"></HeatmapShape>
                <HeatmapShape v-else id="omicsheatmap" :data="heatmapData" x="x_axis" y="y_axis" z="value"></HeatmapShape>
              </v-col>
            </v-row> -->
            <BarGroupV></BarGroupV>
            <HeatmapShape v-if="activeName=='2'" id="fusionheatmap" :data="heatmapData" x="model_id" y="gene" z="FFPM"></HeatmapShape>
            <HeatmapShape v-else id="omicsheatmap" :data="heatmapData" x="x_axis" y="y_axis" z="value"></HeatmapShape>
          </div>
          
          <!-- <div class="chartSelect">
            <v-combobox
            v-model="Omics.select1"
            :items="Omics.items1"
            label="Model"
            outlined
            dense
            solo
            @input="OmicschangeArr"
            :disabled="Omics.disabled1"
            ></v-combobox>
            <v-combobox
            v-model="Omics.select1"
            :items="Omics.items1"
            label="Gene"
            outlined
            dense
            solo
            @input="OmicschangeArr"
            :disabled="Omics.disabled1"
            ></v-combobox>
          </div> -->
          
        </div>
        

    
        
        <!-- <component :is="Omics.select4=='Mutation'?'TableGroup':'Table'"></component> -->
        
        <!-- <TableGroup v-if="Omics.select3=='Mutation'" :infoData="omicsTableData" :total="pageNumber" @loadTable="onSelectOmicsTable" @loadSeque="onSelectOmicsSequence"></TableGroup>
        <Table v-else-if="Omics.select3=='Fusion'" id="omicstable1" :data="omicsTableFusionData" :total="pageFusionNumber" @loadTableFusion="onSelectOmicsTableFusion"></Table>
        <Table v-else-if="$route.query.type!=='Pathway'" id="omicstable2" :data="omicsTableExpressionData" :total="pageExpressionNumber" @loadTableExpression="onSelectOmicsTableExpression"></Table> -->
      </div>
      
      <!-- <div class="componentBox" v-if="$route.query.type=='Gene'&&Omics.select3!=='gene expression'"> -->
      
      <div class="componentBox" v-if="$route.query.type=='Gene'&&activeName!=='3'">
        <!-- <div class="nav">
          <v-btn
          class="navbtn"
          x-small
          color="warning"
          dark
          >
          </v-btn>
        omics mutation
        </div> -->
        
        <Heatmap v-if="activeName=='2'" id="fusionheatmap" :data="heatmapData" x="model_id" y="gene" z="FFPM"></Heatmap>
        <!-- <Heatmap v-if="Omics.select3=='Fusion'" id="fusionheatmap" :data="heatmapData" x="model_id" y="gene" z="FFPM"></Heatmap> -->
        <Heatmap v-else id="omicsheatmap" :data="heatmapData" x="x_axis" y="y_axis" z="value"></Heatmap>
      </div>
      
      
      <div class="componentBox" v-if="$route.query.type=='Pathway'">
        <!-- <div class="nav">
          <v-btn
          class="navbtn"
          x-small
          color="warning"
          dark
          >
          </v-btn>
        omics mutation
        </div> -->
        
        
        <Bubble id="pathwaybubble" height="200" :data="bubbleData" x="model_id" y="normalized_ssgsea_score"></Bubble>
        <Heatmap id="pathwayheatmap" :data="heatmapData" x="model_id" y="gene_symbol" z="log2tpm"></Heatmap>
      </div>
      
    </div>
   
    <!-- <div class="select" v-if="activeName=='1'"> -->
      <!-- <v-combobox
      v-model="Omics.select1"
      :items="Omics.items1"
      label="Species human/mouse"
      outlined
      dense
      solo
      @input="OmicschangeArr"
      :disabled="Omics.disabled1"
      ></v-combobox>
      <v-text-field 
      placeholder="Gene list"
      v-model="Omics.value2"
      @keyup.enter="OmicschangeArr"
      :disabled="Omics.disabled2"
      >
        <v-icon
          slot="append"
          color="#429fd5"
        >
        mdi-pencil
        </v-icon>
      </v-text-field> -->
      <!-- <v-combobox
        v-model="Omics.select3"
        :items="Omics.items3"
        label="Gene set"
        outlined
        dense
        solo
        @input="OmicschangeArr"
        allow-overflow
      ></v-combobox> -->
    <!-- </div> -->
  </div>  
 
</div>
</template>
<script>
import {Agetsearch_list_id,Agettable_search,AgetMutation_table,AgetFusion_table_search,AgetFusion_table,AgetExpression_table_search,AgetExpression_table,AgetFusionbar,AgetExpressionbar,AgetCard} from '../api/model'
import {AgetTable,AgetGeneCard,AgetGeneHeatmap,AgetGeneFusionTable,AgetGeneFusionBar,AgetGeneExpressionTable,AgetGeneFusionHeatmap,AgetGeneExpressionBar} from '../api/model'
import {AselectPathwayHeatmap} from '../api/model'
import {mapGetters} from 'vuex'
import Lollipop from '../components/lollipop.vue'
import Sequence from '../components/sequence.vue'
import Card from '../components/card.vue'
// import TableGroup from '../components/tableGroup.vue'
import TableEl1 from '../components/tableEl.vue'
import TableEl2 from '../components/tableEl.vue'
import TableEl3 from '../components/tableEl.vue'
// import Bar from '../components/bar.vue'
import BarGroupV from '../components/barGroupV.vue'
// import Table from '../components/table.vue'
import Heatmap from '../components/heatmap.vue'
import HeatmapShape from '../components/heatmap-shape.vue'
import Bubble from '../components/bubble.vue'
export default {
name: 'ModelOmics',
components:{
  Lollipop,
  Sequence,
  Card,
  // TableGroup,
  TableEl1,
  TableEl2,
  TableEl3,
  // Bar,
  BarGroupV,
  // Table,
  Heatmap,
  HeatmapShape,
  Bubble
},
computed: {
  ...mapGetters(['cmp_id']),
},
data() {
  return {
    
    selectCol:false,
    tabItems:[
      {
        name:'1',
        label:'Mutation'
      },
      {
        name:'2',
        label:'Fusion'
      },
      {
        name:'3',
        label:'Gene Expression'
      }
    ],
    activeName: '1',
    loading: false,
    hidden: true,
    search: null,
    select: null,
    Omics:{
      select1: 'human',
      items1: ['human','mouse'],
      disabled1:false,
      // value2:'EGFR',
      value2:'',
      disabled2:false,
      select3: 'Mutation',
      items3: ['Mutation', 'Fusion', 'Gene Expression'], 
    },
    // seq:{},
    seq:'',
    neoepitope:[],
    cov:[],
    l:0,
    scatterData:[],
    circleData:[],
    options:[]  ,
    omicsTableData:[],
    omicsTableFusionData:[],
    omicsTableExpressionData:[],
    selectKey:{},
    searchKey:{},
    searchData:{},
    selectData:{},
    s:undefined,
    selectFusionKey:{},
    searchFusionKey:{},
    searchFusionData:{},
    selectFusionData:{},
    selectExpressionKey:{},
    searchExpressionKey:{},
    searchExpressionData:{},
    selectExpressionData:{},
    itemsPerPage:100,
    pageNumber:1,
    pageFusionNumber:1,
    pageExpressionNumber:1,
    // mutationKey:[],
    valuekey:'Gene Symbol',
    // fusionKey:[],
    fusionvaluekey:'Gene Symbol',
    // expressionKey:[],
    expressionvaluekey:'Gene Symbol',
    omicsCardData:[],
    omicsBarDataLeft:[],
    omicsBarDataRight:[],
    omicsBarExpressionDataLeft:[],
    omicsBarExpressionDataRight:[],
    heatmapData:[],
    bubbleData:[],
    listItems:[
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
    ],
    modelId:[],
  }
},
created() {
  // console.log('create')
  // this.$EventBus.$on('modeltable',(msg)=>{
  //   console.log(msg)
  // })
  // this.onSelectOmicsTableSearch()

  // this.onSelectOmicsTableFusionSearch()
  // this.onSelectOmicsTableExpressionSearch()
  
},
mounted() {
  console.log('mount')
  this.load()
  // this.OmicschangeArr()
},
methods:{
  async load(){
    await Agetsearch_list_id(this.$route.query.modelType,this.$route.query.modelValue).then(res=>{
        console.log(res)
        this.modelId = res.data.data_info
        console.log(this.modelId)
    })
    this.OmicschangeArr()
    // this.onSelectOmicsTableSearch()
    // this.onSelectOmicsTableFusionSearch()
    // this.onSelectOmicsTableExpressionSearch()
  },
  handleClick() {
    this.OmicschangeArr()
  },
  loadSpecies(){
  },
  //gene group table
  onSelectGeneTable(p,n){
    let options={
      species:this.Omics.select1,
      page:p||1,
      page_num:n||this.itemsPerPage
    }
    let loading = this.$loading()
    AgetTable(options).then(res=>{
      this.omicsTableData = res.data.data_info.data;
      this.pageNumber = res.data.data_info.total;
    })
    loading.close()
  },
  //
  // async onSelectOmicsTableInput(v,k){
  //   // this.$forceUpdate()
  //   console.log(this.searchData,this.searchKey)
  //   const data =await new Promise((resolve)=>{Agettable_input(v).then(res=>{
  //         resolve(res.data.data_info) 
  //       })
  //   })
  //   console.log(data)
  //   // this.$set(this.searchData,k,data[k])
  //   this.searchData[k] = data[k]
  //   console.log(this.searchData,this.searchKey)
  //   console.log(this.searchData[k])
  //   // this.searchData = obj;
  //   // console.log(this.searchKey,this.searchData)
  // },
  //
  async onSelectOmicsTableSearch(){
    console.log(this.modelId)
    return   Agettable_search(this.modelId.join(',')).then(res=>{
        let data = res.data.data_info;
        let searchData = data.search_data;
        let selectData = data.select_data;
        searchData.forEach(item=>{
          // this.mutationKey.push(item)
          this.searchKey[item]=[]
          this.searchData[item]=[]
        })
        console.log(this.searchKey,this.searchData)
        this.selectData = selectData;
        Object.keys(selectData).forEach(item=>{
          this.selectKey[item]=[]
          let arr = []
          this.selectData[item].forEach(item=>{
            let o = {
              text:item,
              value:item
            }
            arr.push(o)
          })
          this.selectData[item]=arr
        })
        // for(var k in this.selectKey){
        //     console.log(k)
        //     let arr = []
        //     this.selectData[k].forEach(item=>{
        //       let o = {
        //         text:item,
        //         value:item
        //       }
        //       arr.push(o)
        //     })
        //     this.selectData[k]=arr
        //   }
        // }
        console.log(this.selectKey,this.selectData)
      })
    
    
  },
  //model group table
  onSelectOmicsTable(p,n,s,k,o,d){
    console.log(p,n,s,k,o,d)
    let options={
      species:this.Omics.select1,
      model_id:this.modelId.join(',')||'',
      gene_symbol:this.Omics.value2||'',
      // gene_symbol:this.$route.query.value||'',
      page:p||1,
      page_num:n||this.itemsPerPage,
      search_data:s||(this.$route.query.value?JSON.stringify({'Gene Symbol':this.$route.query.value.split(',')}):''),
      order_by_field:o||'',
      desc:d!==undefined?d:''
    }
    console.log(options)
    let loading = this.$loading({
      lock: true,
      text: '获取数据中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    AgetMutation_table(options).then(res=>{
      let data = res.data.data_info;
      this.omicsTableData = data.data;
      this.pageNumber = data.total;
      Object.keys(this.searchData).forEach(item=>{
        this.searchKey[item]=!s?[]:k[item]
        // this.searchKey[item]=[]
      })
      Object.keys(this.selectData).forEach(item=>{
        this.selectKey[item]=!s?[]:k[item]
        // this.selectKey[item]=[]
      })
      console.log(this.searchKey,this.searchData)
      console.log(this.selectKey,this.selectData)
      
    })
    loading.close()
  },
  //gene fusion table
  onSelectGeneTableFusion(p,n){
    let options={
      species:this.Omics.select1,
      page:p||1,
      page_num:n||this.itemsPerPage
    }
    let loading = this.$loading()
    AgetGeneFusionTable(options).then(res=>{
      this.omicsTableFusionData = res.data.data_info.data;
      this.pageFusionNumber = res.data.data_info.total;
    })
    loading.close()
  },
  //
  async onSelectOmicsTableFusionSearch(){
    return AgetFusion_table_search(this.modelId.join(',')).then(res=>{
      let data = res.data.data_info;
      let searchData = data.search_data;
      let selectData = data.select_data;
      searchData.forEach(item=>{
        this.searchFusionKey[item]=[]
        this.searchFusionData[item]=[]
      })
      console.log(this.searchFusionKey,this.searchFusionData)
       this.selectFusionData = selectData;
        Object.keys(selectData).forEach(item=>{
          this.selectFusionKey[item]=[]
          let arr = []
          this.selectFusionData[item].forEach(item=>{
            let o = {
              text:item,
              value:item
            }
            arr.push(o)
          })
          this.selectFusionData[item]=arr
        })
      
      console.log(this.selectFusionKey,this.selectFusionData)
    })
  },
  //model fusion table
  onSelectOmicsTableFusion(p,n,s,k,o,d){
    console.log(p,n,s,k,o,d)
    let options={
      species:this.Omics.select1,
      model_id:this.modelId.join(',')||'',
      gene_symbol:this.Omics.value2||'',
      page:p||1,
      page_num:n||this.itemsPerPage,
      // search_data:s||'',
      search_data:s||(this.$route.query.value?JSON.stringify({'Gene Symbol':this.$route.query.value.split(',')}):''),
      order_by_field:o||'',
      desc:d!==undefined?d:''
    }
    console.log(options)
    let loading = this.$loading({
      lock: true,
      text: '获取数据中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    AgetFusion_table(options).then(res=>{
      let data = res.data.data_info;
      this.omicsTableFusionData = data.data;
      this.pageFusionNumber = data.total;
      Object.keys(this.searchFusionData).forEach(item=>{
        this.searchFusionKey[item]=!s?[]:k[item]
      })
      Object.keys(this.selectFusionData).forEach(item=>{
          this.selectFusionKey[item]=!s?[]:k[item]
      })
      console.log(this.searchFusionKey,this.searchFusionData)
      console.log(this.selectFusionKey,this.selectFusionData)
    })
    loading.close()
  },
  //gene expression table
  onSelectGeneTableExpression(p,n){
    let options={
      species:this.Omics.select1,
      page:p||1,
      page_num:n||this.itemsPerPage,
    }
    let loading = this.$loading()
    AgetGeneExpressionTable(options).then(res=>{
      this.omicsTableExpressionData = res.data.data_info.data;
      this.pageExpressionNumber = res.data.data_info.total;
    })
    loading.close()
  },
  //
  //
  async onSelectOmicsTableExpressionSearch(){
    return AgetExpression_table_search(this.modelId.join(',')).then(res=>{
      let data = res.data.data_info;
      let searchData = data.search_data;
      let selectData = data.select_data;
      searchData.forEach(item=>{
        this.searchExpressionKey[item]=[]
        this.searchExpressionData[item]=[]
      })
      console.log(this.searchExpressionKey,this.searchExpressionData)
      this.selectExpressionData = selectData;
      Object.keys(selectData).forEach(item=>{
        this.selectExpressionKey[item]=[]
        let arr = []
        this.selectExpressionData[item].forEach(item=>{
          let o = {
            text:item,
            value:item
          }
          arr.push(o)
        })
        this.selectExpressionData[item]=arr
      })
      console.log(this.selectExpressionKey,this.selectExpressionData)
    })
  },
  //model expression table
  onSelectOmicsTableExpression(p,n,s,k,o,d){
    console.log(p,n,s,k,o,d)
    let options={
      species:this.Omics.select1,
      model_id:this.modelId.join(',')||'',
      gene_symbol:this.Omics.value2||'',
      page:p||1,
      page_num:n||this.itemsPerPage,
      // search_data:s||'',
      search_data:s||(this.$route.query.value?JSON.stringify({'Gene Symbol':this.$route.query.value.split(',')}):''),
      order_by_field:o||'',
      desc:d!==undefined?d:''
    }
    let loading = this.$loading({
      lock: true,
      text: '获取数据中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    AgetExpression_table(options).then(res=>{
      let data = res.data.data_info;
      this.omicsTableExpressionData = data.data;
      this.pageExpressionNumber = data.total;
      Object.keys(this.searchExpressionData).forEach(item=>{
        this.searchExpressionKey[item]=!s?[]:k[item]
      })
      Object.keys(this.selectExpressionData).forEach(item=>{
        this.selectExpressionKey[item]=!s?[]:k[item]
      })
      console.log(this.searchExpressionKey,this.searchExpressionData)
      console.log(this.selectExpressionKey,this.selectExpressionData)
    })
    loading.close()
  },
  //gene bar
  onSelectGeneBar(){
    let options={
      species:this.Omics.select1,
    }
    let loading = this.$loading()
    AgetGeneFusionBar(options).then(res=>{
      this.omicsBarDataLeft = res.data.data_info.FFPM;
      this.omicsBarDataRight = res.data.data_info.fusion_gene_count;
    })
    loading.close()
  },
  //model bar
  onSelectOmicsBar(){
    let options={
      species:this.Omics.select1,
      gene_symbol:this.Omics.value2||'',
    }
    let loading = this.$loading()
    AgetFusionbar(options).then(res=>{
      this.omicsBarDataLeft = res.data.data_info.FFPM;
      this.omicsBarDataRight = res.data.data_info.fusion_gene_count;
    })
    loading.close()
  },
  //gene expression bar 
  onSelectGeneBarExpression(){
    let options={
      species:this.Omics.select1,
    }
    let loading = this.$loading()
    AgetGeneExpressionBar(options).then(res=>{
      this.omicsBarExpressionDataLeft = res.data.data_info.log2tpm;
      this.omicsBarExpressionDataRight = res.data.data_info.median_normalized_log2tpm;
    })
    loading.close()
  },
  //model expression bar 
  onSelectOmicsBarExpression(){
    let options={
      species:this.Omics.select1,
      gene_symbol:this.Omics.value2||'',
    }
    let loading = this.$loading()
    AgetExpressionbar(options).then(res=>{
      this.omicsBarExpressionDataLeft = res.data.data_info.log2tpm;
      this.omicsBarExpressionDataRight = res.data.data_info.median_normalized_log2tpm;
    })
    loading.close()
  },
  //card
  onSelectOmicsCard(){
    let options={
      species:this.Omics.select1,
      gene_symbol:this.Omics.value2||'',
    }
    let loading = this.$loading()
    AgetCard(options).then(res=>{
      this.omicsCardData = res.data.data_info;
    })
    loading.close()
  },
  //gene card
  onSelectGeneCard(){
    let options={
      species:this.Omics.select1,
    }
    let loading = this.$loading()
    AgetGeneCard(options).then(res=>{
      this.omicsCardData = res.data.data_info;
    })
    loading.close()
  },
  //pathway heatmap
  onSelectPathwayHeatmap(){
    let options={
      species:this.Omics.select1,
    }
    let loading = this.$loading()
    AselectPathwayHeatmap(options).then(res=>{
      this.bubbleData = res.data.data_info.ssgsea_score
      this.heatmapData = res.data.data_info.log2tpm;
    })
    loading.close()
  },
  //gene heatmap
  onSelectGeneHeatmap(){
    let options={
      species:this.Omics.select1,
    }
    let loading = this.$loading()
    AgetGeneHeatmap(options).then(res=>{
      this.heatmapData = res.data.data_info;
    })
    loading.close()
  },
  //gene fusion heatmap
  onSelectGeneFusionHeatmap(){
    let options={
      species:this.Omics.select1,
    }
    let loading = this.$loading()
    AgetGeneFusionHeatmap(options).then(res=>{
      this.heatmapData = res.data.data_info;
    })
    loading.close()
  },
  //model sequence
  onSelectOmicsSequence(d){
    this.seq = d.aa_sequence.aa_sequence;
    this.l = d.aa_sequence.aa_sequence.length
    this.cov = d.protein_domain_mapping;
    this.scatterData = d.protein_domain_mapping;
    this.circleData=d.HGVSp_Short
  },
  onsearch(){
    
  },
  tableElClick(){
    if(this.activeName == '2'){
      this.onSelectOmicsBar()
      this.onSelectGeneFusionHeatmap()
      
    }else{
      this.onSelectOmicsBarExpression()
      this.onSelectGeneHeatmap()
    }
    this.selectCol = true
  },
  async OmicschangeArr(){
    
    if(this.activeName=='1'){
      if(this.$route.query.type=='Model'){
        await this.onSelectOmicsTableSearch()
        this.onSelectOmicsTable()
        // let query = Object.assign(this.$route.query,{table:'mutation'})
        // let routeUrl = this.$router.resolve({path: '/ModelAtlas',query: query});
        // console.log(query)
        // console.log(routeUrl)
        // let index = window.location.href.indexOf('#')
        // console.log(index)
        // let href=index<0?window.location.href+'#mutation':window.location.href.slice(0,index)+'#mutation'
        // let href = window.location.href+'#mutation'
        // console.log(href)
        // window.location.href = href;
        this.$router.push({query:{...this.$route.query,table:'mutation'}})
        
        // window.open(routeUrl.href);
        // this.onSelectOmicsCard()
      }else if(this.$route.query.type=='Gene'){
        this.onSelectGeneTable()
        this.onSelectGeneCard()
        this.onSelectGeneHeatmap()
      }else{
        this.onSelectPathwayHeatmap()
      }
      
    }else if(this.activeName=='2'){
      if(this.$route.query.type=='Model'){
        await this.onSelectOmicsTableFusionSearch()
        this.onSelectOmicsTableFusion()
        // let query = Object.assign(this.$route.query,{table:'fusion'})
        // console.log(query)
        // this.$router.push(query)
        // let index = window.location.href.indexOf('#')
        // console.log(index)
        // let href=index<0?window.location.href+'#fusion':window.location.href.slice(0,index)+'#fusion'
        // let href = window.location.href+'#fusion'
        // console.log(href)
        // window.location.href = href;
        this.$router.push({query:{...this.$route.query,table:'fusion'}})
        // this.onSelectOmicsBar()
      }else if(this.$route.query.type=='Gene'){
        this.onSelectGeneTableFusion()
        this.onSelectGeneBar()
        this.onSelectGeneFusionHeatmap()
      }
      
    }else{
      if(this.$route.query.type=='Model'){
        await this.onSelectOmicsTableExpressionSearch()
        this.onSelectOmicsTableExpression()
        // let query = Object.assign(this.$route.query,{table:'expression'})
        // console.log(query)
        // this.$router.push(query)
        // let index = window.location.href.indexOf('#')
        // console.log(index)
        // let href=index<0?window.location.href+'#expression':window.location.href.slice(0,index)+'#expression'
        // let href = window.location.href+'#expression'
        // console.log(href)
        // window.location.href = href;
        this.$router.push({query:{...this.$route.query,table:'expression'}})
        // this.onSelectOmicsBarExpression()
      }else if(this.$route.query.type=='Gene'){
        this.onSelectGeneTableExpression()
        this.onSelectGeneBarExpression()
      }
      
      
    }
    // this.onSelectOmicsTable()
    // this.onSelectOmicsCard()
    // this.onSelectOmicsSequence()
  },
  OmicschangeArr2(){

  },
  OmicschangeArr3(){
    
    if(this.Omics.select3=='Mutation'){
      if(this.$route.query.type=='Model'){
        this.onSelectOmicsTable()
      }else{
        this.onSelectGeneTable()
      }
      
      this.onSelectOmicsCard()
    }else if(this.Omics.select3=='Fusion'){
      this.onSelectOmicsTableFusion()
      this.onSelectOmicsBar()
    }else{
      this.onSelectOmicsTableExpression()
      this.onSelectOmicsBarExpression()
    }
    
  },
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
/* .content .searchbtn{
  position: absolute;
  right: 96px;
  top: 16px;
}
.content .search.v-btn--fab.v-size--default.v-btn--absolute.v-btn--top{
  left: 100px;
  top: 0;
} */

.navbtn.v-btn:not(.v-btn--round).v-size--x-small{
  min-width: 4px;
  padding: 0;
  margin-right: 10px;
}
.nav{
  display: flex;
  margin-bottom: 10px;
  color:#000;
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
.chartBox{
  display: flex;
  align-items: center;
}
.chart{
  flex: 1;
}
</style>