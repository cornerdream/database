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
        <div class="tablebox" v-show="activeName=='1'">
          <TableEl1  :infoData="omicsTableData" :total="pageNumber" @loadTable="onSelectOmicsTable" :modelId="modelId" :selectKey="selectKey" :selectData="selectData" :searchKey="searchKey" :searchData="searchData" :s="s" :valuekey="valuekey" table="mutation" @loadDraw="loadchart"></TableEl1>
          <div class="chart" v-if="barshow">
            <v-row >
              <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                <div class="chartSelect">
                  <el-select
                  v-for="(item,i) in chartselectkey"
                  :key="i"
                  class="chartselectbox"
                  v-model="chartselect[item]"
                  multiple
                  :placeholder="item"
                  @change="chartchangeArr(chartselect)">
                  <el-option
                  v-for="o in chartselectData[i][item]"
                  :key="o"
                  :label="o"
                  :value="o">
                  </el-option>
                  </el-select>
                </div>
              </v-col>
              <v-col cols="12" xs="12" sm="9" md="9" lg="9" xl="9" id="barbox">
                <BarGroupV id="Mutationbar" :data="d3Data" :columns="columns"></BarGroupV>
              </v-col>
            </v-row>
          </div>
        </div>
        <div class="tablebox" v-show="activeName=='2'">
          <TableEl2  :infoData="omicsTableFusionData" :total="pageFusionNumber" @loadTable="onSelectOmicsTableFusion" :modelId="modelId" :selectKey="selectFusionKey" :selectData="selectFusionData" :searchKey="searchFusionKey" :searchData="searchFusionData" :s="s" :valuekey="fusionvaluekey" table="fusion" @loadDraw="loadchart"></TableEl2>
          <div class="chart" v-if="Fusionbarshow">
            <v-row >
              <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                <div class="chartSelect">
                  <el-select
                  v-for="(item,i) in Fusionchartselectkey"
                  :key="i"
                  class="chartselectbox"
                  v-model="Fusionchartselect[item]"
                  multiple
                  :placeholder="item"
                  @change="chartchangeArr(Fusionchartselect)">
                  <el-option
                  v-for="o in FusionchartselectData[i][item]"
                  :key="o"
                  :label="o"
                  :value="o">
                  </el-option>
                  </el-select>
                </div>
              </v-col>
              <v-col cols="12" xs="12" sm="9" md="9" lg="9" xl="9" id="barbox">
                <BarGroupV id="Fusionbar" :data="Fusiond3Data" :columns="Fusioncolumns"></BarGroupV>
              </v-col>
            </v-row>
          </div>
        </div>
        <div class="tablebox" v-show="activeName=='3'">
          <TableEl3  :infoData="omicsTableExpressionData" :total="pageExpressionNumber" @loadTable="onSelectOmicsTableExpression" :modelId="modelId" :selectKey="selectExpressionKey" :selectData="selectExpressionData" :searchKey="searchExpressionKey" :searchData="searchExpressionData" :s="s" :valuekey="expressionvaluekey" table="expression"  @loadDraw="loadchart"></TableEl3>
          <div class="chart" v-if="Expressionbarshow">
            <v-row >
              <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                <div class="chartSelect">
                  <el-select
                  v-for="(item,i) in Expressionchartselectkey"
                  :key="i"
                  class="chartselectbox"
                  v-model="Expressionchartselect[item]"
                  multiple
                  :placeholder="item"
                  @change="chartchangeArr(Expressionchartselect)">
                  <el-option
                  v-for="o in ExpressionchartselectData[i][item]"
                  :key="o"
                  :label="o"
                  :value="o">
                  </el-option>
                  </el-select>
                </div>
              </v-col>
              <v-col cols="12" xs="12" sm="9" md="9" lg="9" xl="9" id="barbox">
                <BarGroupV id="Expressionbar" :data="Expressiond3Data" :columns="Expressioncolumns"></BarGroupV>
              </v-col>
            </v-row>
          </div>
        </div>
        
        <!-- <Bar id="omicsbar1" :data="omicsBarDataLeft" x="gene" y="FFPM"></Bar> -->
        <!-- <Lollipop v-if="activeName=='1'" :data="scatterData" :width="seql" :circle="circleData"></Lollipop> -->
        <!-- <Sequence v-if="activeName=='1'" :seq="seq" :cov="cov" :neoepitope="neoepitope" ></Sequence> -->
        <!-- <Card v-if="activeName=='1'" :infoData="omicsCardData"></Card> -->
      </div>
      
      
      
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
  </div>  
 
</div>
</template>
<script>
import {Agetsearch_list_id,Agettable_search,AgetMutation_table,AgetFusion_table_search,AgetFusion_table,AgetExpression_table_search,AgetExpression_table,AgetFusionbar,AgetExpressionbar,AgetCard} from '../api/model'
import {AgetTable,AgetGeneCard,AgetGeneHeatmap,AgetGeneFusionTable,AgetGeneFusionBar,AgetGeneExpressionTable,AgetGeneFusionHeatmap,AgetGeneExpressionBar} from '../api/model'
import {AgetMutation_select,AgetMutation_bar,AgetFusion_select,AgetFusion_bar,AgetExpression_select,AgetExpression_bar} from '../api/model'
import {AselectPathwayHeatmap} from '../api/model'
import {mapGetters} from 'vuex'
// import Lollipop from '../components/lollipop.vue'
// import Sequence from '../components/sequence.vue'
// import Card from '../components/card.vue'
// import TableGroup from '../components/tableGroup.vue'
import TableEl1 from '../components/tableEl.vue'
import TableEl2 from '../components/tableEl.vue'
import TableEl3 from '../components/tableEl.vue'
// import Bar from '../components/bar.vue'
import BarGroupV from '../components/barGroupV.vue'
// import Table from '../components/table.vue'
import Heatmap from '../components/heatmap.vue'
// import HeatmapShape from '../components/heatmap-shape.vue'
import Bubble from '../components/bubble.vue'
export default {
name: 'ModelOmics',
components:{
  // Lollipop,
  // Sequence,
  // Card,
  // TableGroup,
  TableEl1,
  TableEl2,
  TableEl3,
  // Bar,
  BarGroupV,
  // Table,
  Heatmap,
  // HeatmapShape,
  Bubble
},
computed: {
  ...mapGetters(['cmp_id']),
},
data() {
  return {
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
    seql:0,
    scatterData:[],
    circleData:[],
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
    barshow:false,
    chartselectData:[],
    chartselect:{
      // select0:[],
      // select1:[],
      // select2:[],
      // select3:[],
      // select4:[],
      // select5:[],
    },
    chartselectkey:[],
    d3Data:[],
    columns:[],
    Fusionbarshow:false,
    FusionchartselectData:[],
    Fusionchartselect:{
      // select0:[],
      // select1:[],
      // select2:[],
      // select3:[],
      // select4:[],
      // select5:[],
    },
    Fusionchartselectkey:[],
    Fusiond3Data:[],
    Fusioncolumns:[],
    Expressionbarshow:false,
    ExpressionchartselectData:[],
    Expressionchartselect:{
      // select0:[],
      // select1:[],
      // select2:[],
      // select3:[],
      // select4:[],
      // select5:[],
    },
    Expressionchartselectkey:[],
    Expressiond3Data:[],
    Expressioncolumns:[],
  }
},
created() {
  
  
},
mounted() {
  console.log('mount')
  this.load()
},
methods:{
  async load(){
    await Agetsearch_list_id(this.$route.query.modelType,this.$route.query.modelValue).then(res=>{
        console.log(res)
        this.modelId = res.data.data_info
        console.log(this.modelId)
    })
    await this.onSelectOmicsTableSearch()
    await this.onSelectOmicsTableFusionSearch()
    await this.onSelectOmicsTableExpressionSearch()
    this.OmicschangeArr()
  },
  onsearch(){

  },
  handleClick() {
    this.OmicschangeArr()
  },
  chartchangeArr(s){
    console.log(s)
    let l = s['Gene Symbol'].length
    if(l==0){
      this.$msgbox.alert('请选择gene','注意')
    }else if(l>5){
      this.$msgbox.alert('请选择少于5个的gene数','注意')
    }else{
      let chartselect= JSON.stringify(s)
      console.log(chartselect)
      if(this.activeName=='1'){
        this.loadBar(chartselect)
      }else if(this.activeName=='2'){
        this.loadFusionBar(chartselect)
      }else{
        this.loadExpressionBar(chartselect)
      }
    }
    
  },
  loadchart(s){
    if(this.activeName=='1'){
      this.loadSelect(s)
      this.loadBar(s)
    }else if(this.activeName=='2'){
      this.loadFusionSelect(s)
      this.loadFusionBar(s)
    }else{
      this.loadExpressionSelect(s)
      this.loadExpressionBar(s)
    }
  },
  loadSelect(s){
    this.barshow = true
    console.log(s)
    let options={
      model_id:this.modelId.join(',')||'',
      search_data:s||(this.$route.query.value?JSON.stringify({'Gene Symbol':this.$route.query.value.split(',')}):''),
    }
    AgetMutation_select(options).then(res=>{
      console.log(res)
      let data = res.data.data_info;
      console.log(data)
      let keys=[]
      data.forEach(item=>{
        var k = Object.keys(item)
        console.log(k)
        keys.push(...k)
      })
      console.log(keys)
      this.chartselectkey = [...new Set(keys)]
      console.log(this.chartselectkey)
      this.chartselectkey.forEach(item=>{
        this.chartselect[item]=[]
      })
      console.log(this.chartselect)
      this.chartselectData = data
    })
    
    // this.loadBar(s)
  },
  loadBar(s){
    let options={
      model_id:this.modelId.join(',')||'',
      search_data:s||(this.$route.query.value?JSON.stringify({'Gene Symbol':this.$route.query.value.split(',')}):''),
    }
    AgetMutation_bar(options).then(res=>{
      console.log(res)
      let data = res.data.data_info;
      console.log(data)
      let keys=[]
      data.forEach(item=>{
        var k = Object.keys(item)
        console.log(k)
        keys.push(...k)
      })
      console.log(keys)
      this.columns = [...new Set(keys)]
      console.log(this.columns)
      this.d3Data = data
      console.log(this.d3Data)
    })
  },
  loadFusionSelect(s){
    this.Fusionbarshow = true
    console.log(s)
    let options={
      model_id:this.modelId.join(',')||'',
      search_data:s||(this.$route.query.value?JSON.stringify({'Gene Symbol':this.$route.query.value.split(',')}):''),
    }
    AgetFusion_select(options).then(res=>{
      console.log(res)
      let data = res.data.data_info;
      console.log(data)
      let keys=[]
      data.forEach(item=>{
        var k = Object.keys(item)
        console.log(k)
        keys.push(...k)
      })
      console.log(keys)
      this.Fusionchartselectkey = [...new Set(keys)]
      console.log(this.Fusionchartselectkey)
      this.Fusionchartselectkey.forEach(item=>{
        this.Fusionchartselect[item]=[]
      })
      console.log(this.Fusionchartselect)
      this.FusionchartselectData = data
    })
    
    // this.loadFusionBar(s)
  },
  loadFusionBar(s){
    let options={
      model_id:this.modelId.join(',')||'',
      search_data:s||(this.$route.query.value?JSON.stringify({'Gene Symbol':this.$route.query.value.split(',')}):''),
    }
    AgetFusion_bar(options).then(res=>{
      console.log(res)
      let data = res.data.data_info;
      console.log(data)
      let keys=[]
      data.forEach(item=>{
        var k = Object.keys(item)
        console.log(k)
        keys.push(...k)
      })
      console.log(keys)
      this.Fusioncolumns = [...new Set(keys)]
      console.log(this.Fusioncolumns)
      this.Fusiond3Data = data
      console.log(this.Fusiond3Data)
    })
  },
  loadExpressionSelect(s){
    this.Expressionbarshow = true
    console.log(s)
    let options={
      model_id:this.modelId.join(',')||'',
      search_data:s||(this.$route.query.value?JSON.stringify({'Gene Symbol':this.$route.query.value.split(',')}):''),
    }
    AgetExpression_select(options).then(res=>{
      console.log(res)
      let data = res.data.data_info;
      console.log(data)
      let keys=[]
      data.forEach(item=>{
        var k = Object.keys(item)
        console.log(k)
        keys.push(...k)
      })
      console.log(keys)
      this.Expressionchartselectkey = [...new Set(keys)]
      console.log(this.Expressionchartselectkey)
      this.Expressionchartselectkey.forEach(item=>{
        this.Expressionchartselect[item]=[]
      })
      console.log(this.Expressionchartselect)
      this.ExpressionchartselectData = data
    })
    
    // this.loadExpressionBar(s)
  },
  loadExpressionBar(s){
    let options={
      model_id:this.modelId.join(',')||'',
      search_data:s||(this.$route.query.value?JSON.stringify({'Gene Symbol':this.$route.query.value.split(',')}):''),
    }
    AgetExpression_bar(options).then(res=>{
      console.log(res)
      let data = res.data.data_info;
      console.log(data)
      let keys=[]
      data.forEach(item=>{
        var k = Object.keys(item)
        console.log(k)
        keys.push(...k)
      })
      console.log(keys)
      this.Expressioncolumns = [...new Set(keys)]
      console.log(this.Expressioncolumns)
      this.Expressiond3Data = data
      console.log(this.Expressiond3Data)
    })
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
  async onSelectOmicsTableSearch(){
    console.log(this.modelId)
    return   Agettable_search(this.modelId.join(',')).then(res=>{
        let data = res.data.data_info;
        let searchData = data.search_data;
        let selectData = data.select_data;
        searchData.forEach(item=>{
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
      })
      Object.keys(this.selectData).forEach(item=>{
        this.selectKey[item]=!s?[]:k[item]
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
    this.seql = d.aa_sequence.aa_sequence.length
    this.cov = d.protein_domain_mapping;
    this.scatterData = d.protein_domain_mapping;
    this.circleData=d.HGVSp_Short
  },
  async OmicschangeArr(){
    
    if(this.activeName=='1'){
      if(this.$route.query.type=='Model'){
        this.onSelectOmicsTable()
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
        this.onSelectOmicsTableFusion()
        // this.onSelectOmicsBar()
      }else if(this.$route.query.type=='Gene'){
        this.onSelectGeneTableFusion()
        this.onSelectGeneBar()
        this.onSelectGeneFusionHeatmap()
      }
      
    }else{
      if(this.$route.query.type=='Model'){
        this.onSelectOmicsTableExpression()
        // this.onSelectOmicsBarExpression()
      }else if(this.$route.query.type=='Gene'){
        this.onSelectGeneTableExpression()
        this.onSelectGeneBarExpression()
      }
      
      
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
.chartSelect{
  display: flex;
  align-items: center;
  flex-direction: column;
}
.chartselectbox{
  margin-bottom: 20px;
}
</style>