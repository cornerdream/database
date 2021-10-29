<!-- 列可选表格 -->
<template>
<div class="tableEl">
  <!-- <div id="tableTop"> -->
    <!-- <el-select
      class="selectli"
      v-model="colOptions"
      multiple
      collapse-tags
      placeholder="请选择">
      <el-option
        v-for="item in colSelect"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select> -->
    <!-- <el-input
    class="searchli"
    @input="searchTable"
    v-model="searchby"
    size="mini"
    placeholder="输入关键字搜索"/>
  </div> -->
  
  <el-table
  empty-text="空数据"
  id="elTable"
  ref="multipleTable"
  :data="infoData"
  tooltip-effect="dark"
  style="width: 100%"
  max-height="1000"
  highlight-current-row
  @filter-change="filterHandlerChange"
  @sort-change="sortHandlerChange"
  :header-cell-style="{}">
    <el-table-column
      sortable="custom"
      width="200"
      v-for="(v,s) in selectKey"
      :key="s"
      :prop="s"
      :label="s"
      align="center"
      :column-key="s"
      :filters="selectData[s]"
      :filtered-value="currentSelect[s]"
    ></el-table-column>
    <el-table-column
      sortable="custom"
      width="400"
      v-for="(v,k) in searchKey"
      :key="k"
      :prop="k"
      align="center">
    <template slot="header" slot-scope="scope">
        <el-select
           class="searchInput"
            v-model="currentSearch[k]"
            multiple
            filterable
            remote
            reserve-keyword
            :placeholder="k"
            :remote-method="(query)=>{remoteMethod(query,k,table)}"
            @change="filterChange($event,k)"
            @remove-tag="remoteMethod2(currentSearch[k],k,scope)">
            <!-- @keyup.enter.native="filterOption($event,k,scope)"
            @change="remoteMethod(searchKey[k],k)" -->
            <!-- :remote-method="remoteMethod(mulsearch,k)"> -->
            <div class="searchBox" @click="remoteMethod2(currentSearch[k],k,scope)">
              <!-- <el-button type="primary" icon="el-icon-search" @click="remoteMethod2(currentSearch[k],k,scope)">搜索</el-button> -->
              <!-- 搜索 -->
              <i class="el-icon-search" ></i><span class='prefixSlot'>搜索</span>
              <!-- <span class = 'prefixSlot'>互联网大佬</span> -->
            </div>
            <el-option
            v-for="item in searchval[k]"
            :key="item"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
        </template>
    </el-table-column>      
    <el-table-column
      sortable="custom"
      v-for="(item,i) in items" 
      :key="i"
      :prop="item.text"
      align="center">
      <template slot="header">
      <span class="searchInput">{{item.text}}</span>
      </template>
    </el-table-column>  
    <!-- <el-table-column
      prop="Start_Position"
      label="Start_Position"
      width="100"
      :filters="[{ text: '1', value: 5000000 }, { text: '2', value: 1000000 },{ text: '3', value: 2000000 }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <div class="color" :style="{'background':getColor(scope.row[tag])}" >
          {{scope.row[tag]}}
        </div> 
      </template>
    </el-table-column> -->
  </el-table>
  <v-row>
    <v-col>
      <el-pagination
        class="tablePage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="itemsPerPageArray"
        :page-size="itemsPerPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </v-col>  
    <v-col class="legend-group">
        <!-- <el-button type="danger" size="mini">Draw</el-button> -->
        <v-btn
        depressed
        color="error"
        @click="handleClick"
        >
         Draw
        </v-btn>
      <!-- <div class="tag-group">
        <span class="tag-group__title">Legend</span>
        <span v-for="item in tagItems" :key="item.label" class="legend">
        <el-tag
          :color="item.color"
          effect="dark">
        </el-tag>
        {{ item.label }}
        </span>
      </div> -->
    </v-col>
    
  </v-row>
  
  

</div>

</template>
<script>
import {Agettable_input} from '../api/model'
export default {
name: 'tableEl',
components:{},
props:['infoData','total','selectKey','selectData','searchKey','searchData','valuekey','table'],
computed: {
  // numberOfPages () {
  //   // return Math.ceil(this.tableData.length / this.itemsPerPage)
  //   return Math.ceil(this.total / this.itemsPerPage)
  // },
  items: function() {
    let _this = this;
   return this.colData.filter(function (item) {
 
    //  return item.istrue
    return item.text!=='id'&&Object.keys(_this.selectKey).findIndex(el=>el==item.text)<0&&Object.keys(_this.searchKey).findIndex(el=>el==item.text)<0
   })
  },
  
},
data() {
return {
  params:{},
  searchval:{},
  // searchk:{},
  currentSearch:{},
  currentSelect:{}, 
    // options: {
    //   "Left Gene":[{
    //         value: "MT-ATP6",
    //         label: "MT-ATP6"
    //     }, {
    //         value: "OCA2",
    //         label: "OCA2"
    //     }, {
    //         value: "DNM2",
    //         label: "DNM2"
    //   }],
    //   "Fused Genes":[{
    //         value: "ENSG00000251555--RPL7AP28",
    //         label: "ENSG00000251555--RPL7AP28"
    //     }, {
    //         value: "MT-ATP6--MT-ATP8",
    //         label: "MT-ATP6--MT-ATP8"
    //     }, {
    //         value: "VIM--KRT81",
    //         label: "VIM--KRT81"
    //   }],
    //   "Right Gene":[{
    //         value: "RPL7AP28",
    //         label: "RPL7AP28"
    //     }, {
    //         value: "MT-ATP8",
    //         label: "MT-ATP8"
    //     }, {
    //         value: "MT-CO3",
    //         label: "MT-CO3"
    //   }],
    //   "Gene Symbol":[{
    //         value: "HSPG2",
    //         label: "HSPG2"
    //     }, {
    //         value: "ZBTB40",
    //         label: "ZBTB40"
    //     }, {
    //         value: "LUZP1",
    //         label: "LUZP1"
    //   }],
    // },
    // options: [{
    //     value: "MT-ATP6",
    //     label: "MT-ATP6"
    // }, {
    //     value: "OCA2",
    //     label: "OCA2"
    // }, {
    //     value: "DNM2",
    //     label: "DNM2"
    // }],
    // mulsearch:{
    //   "Left Gene":"",
    //   "Fused Genes":"",
    //   "Right Gene":"",
    //   "Gene Symbol":""
    // },
    // mulSelcet:'species',
    tagItems: [
      { label: 'Frame Shift' ,color:'#aae0da'},
      { label: 'In Frame' ,color:'#e0c3aa'},
      { label: 'Missens' ,color:'#93afcd'},
      { label: 'Nonsense' ,color:'#acddf2'},
      { label: 'silent' ,color:'#96a7f3'}
    ],
    tag:'Start_Position',
    // searchby:'',
    itemsPerPageArray: [100,200,500],
    // search: '',
    // filter: {},
    // sortDesc: false,
    page: 1,
    itemsPerPage: 100,
    sortBy:'',
    desc:0,
    // colOptions: [
    //   'name', 
    //   'date', 
    //   'address'
    // ],  //多选框已选择的选项
    // colSelect: [
    //   'name', 
    //   'date', 
    //   'address',
    //   'calories','fat','carbs','protein','sodium','calcium','iron'
    // ],    //多选框中的所有选项
    colData: [],
    // selects: false,
    // tableData: [],
    // s:{},
    // remoteflag:true,
}
},
watch:{
    
    // colOptions(newVal) {
    //   if (newVal) {    //如果有值发生变化，即多选框的已选项变化
    //     // console.log(newVal)
    //     var arr = this.colSelect.filter(i => newVal.indexOf(i) < 0)     // 未选中
    //     // console.log(arr)
    //     this.colData.filter(i => {
    //       if (arr.indexOf(i.text) !== -1) {
    //         i.istrue = false
    //       } else {
    //         i.istrue = true
    //       }
    //     })
    //   }
    // },
    infoData(){
      console.log('监听')
      this.load()
      // this.remoteMethod(this.$route.query.value,this.valuekey,this.table)
      // this.remoteflag = true;
      // if(this.remoteflag){
      //   this.remoteMethod(this.$route.query.value,this.valuekey,this.table)
      //   this.remoteflag = false
      // } 
      // !this.s?this.remoteMethod(this.$route.query.value,this.valuekey,this.table):null
      // this.itemClick(this.tableData[0]);
      // this.searchTable(this.searchby)
    },
    // searchData(){
      // console.log('监听')
      // this.load()
      // this.remoteMethod(this.$route.query.value,this.valuekey,this.table)
    // },
    $route(){
      this.remoteMethod(this.$route.query.value,this.valuekey,this.table)
    }
    // s(){
    //   this.remoteMethod(this.$route.query.value,this.valuekey,this.table)
    // }
    // s(newv){
    //   console.log(newv)
    //   !newv?this.remoteMethod(this.$route.query.value,this.valuekey,this.table):null
    // }
},
created() {
  // console.log(this.valuekey)
  // console.log(this.table)
  // console.log(this.s)
  // console.log(!this.s)
  // this.remoteMethod(this.$route.query.value,this.valuekey,this.table)
  // !this.s?this.remoteMethod(this.$route.query.value,this.valuekey,this.table):null
  // if(this.remoteflag){
  //       this.remoteMethod(this.$route.query.value,this.valuekey,this.table)
  //       this.remoteflag = false
  //     } 
},
mounted() {
    
},
methods:{
  filterChange(){
    this.$forceUpdate()
  },
    async filterOption(e,k){
      console.log(e,k)

      console.log(this.searchval,this.searchval[k])
      let str = e.target.value;
      if(str.length>=4){
        const data =await new Promise((resolve)=>{Agettable_input(str).then(res=>{
          // let data = res.data.data_info
          resolve(res.data.data_info) 
          // this.$forceUpdate()

          // this.$set(this.searchval,k,data[k])
          // this.searchval[k] = data[k]
         
          
          // console.log(this.searchval,this.searchKey)
          
        })
        })
        // const data={
        //   'Gene Symbol': ["ZNF90", "ZNF91", "ZNF92", "ZNF93", "ZNF98", "ZNF99"]
        // }
        console.log(data)
        // this.searchval[k] = data[k]
        this.searchval=Object.assign(this.searchval,data)
        // this.$set(this.searchval,k,data[k])
        console.log(this.searchval,this.searchval[k])
        // this.$emit('loadSearch',e.target.value,k)
      }
      
      // this.$emit('loadSearch',e.target.value)


     
    },
    filterTag(value, row) {
        console.log(value)
        console.log(row)
        return row.Start_Position >= value;
    },
    filterHandler(value, row, column) {
      console.log(this.filterList)
        const property = column['property'];
        return row[property] === value;
    },
    searchTable(value){
      console.log(value)
      console.log(this.searchby)
      let searchData = []
      if(value!==''){
        this.tableData.forEach(item=>{
          if(item[this.searchKey].toLowerCase().indexOf(value.toLowerCase())!==-1){
            searchData.push(item)
          }
        })
        this.tableData = searchData
      }else{
        this.tableData = this.infoData;
      }
    },

    remoteMethod(query,k,t) {
      
       console.log(query,k,t)
      
      if(!query){return}
      if(query.length>=2){
        
        Agettable_input(query,k,t).then(res=>{
          let data = res.data.data_info
         
          let newData = [...new Set(data[k])]
          let arr =[];
          newData.forEach(item => {
            
            if(item.toLowerCase()==query.toLowerCase()){
              
              arr = newData;
            }else{
              
              arr =[query,...newData]
            }
          });
          this.$set(this.searchval,k,[...new Set(arr)])
         
         
          
        })
      }
      
        console.log(this.searchval) 
        
            
        
    },
     remoteMethod2(query,key) {
      console.log(query,key)

      console.log(this.searchKey,this.selectKey,this.currentSelect,this.searchK,this.currentSearch)
        this.s = {
          ...this.currentSearch,
          ...this.selectKey
        }
        this.params = {
        ...this.s
        }
        console.log(this.params)
        let s = JSON.stringify(this.s)
        console.log(s)
        if (query !== null) {
            let loading = this.$loading()
            this.page = 1;
            this.$emit('loadTable',this.page,this.itemsPerPage,s,this.params)
            loading.close()
            
        }
    },
    filterHandlerChange(filters){
      console.log(filters)
      console.log(this.searchKey,this.selectKey,this.currentSelect,this.searchK,this.currentSearch)
      for(var k in filters){
        console.log(k)
        this.selectKey[k] = filters[k]
      }
      console.log(this.selectKey)
      this.s = {
        ...this.selectKey,
        ...this.currentSearch
      }
      this.params = {
        ...this.s
      }
      console.log(this.params)
      let s = JSON.stringify(this.s)
      console.log(s)
      let loading = this.$loading()
      this.$emit('loadTable',this.page,this.itemsPerPage,s,this.params)
      loading.close()
    },
    sortHandlerChange({prop,order}){
      console.log(prop,order)
      this.sortBy=prop;
      if(order=='descending'){
        this.desc=1
      }else{
        this.desc =0
      }
      console.log(this.desc)
      let s = JSON.stringify(this.s)
      console.log(s)
      let loading = this.$loading()
      this.$emit('loadTable',this.page,this.itemsPerPage,s,this.params,this.sortBy,this.desc)
      loading.close()
    },
    
    handleSizeChange(val) {
      console.log(this.s)
      console.log(`每页 ${val} 条`);
      this.itemsPerPage = val;
      this.$refs.multipleTable.clearSort()
      let s = JSON.stringify(this.s)
      console.log(s)
      let loading = this.$loading()
      this.$emit('loadTable',this.page,this.itemsPerPage,s,this.params)
      loading.close()
    },
    handleCurrentChange(val) {
      console.log(this.s)
      console.log(`当前页: ${val}`);
      this.page = val;
      this.$refs.multipleTable.clearSort()
      let s = JSON.stringify(this.s)
      console.log(s)
      let loading = this.$loading()
      this.$emit('loadTable',this.page,this.itemsPerPage,s,this.params)
      loading.close()
    },
    load(){
      console.log('load')
      console.log(this.s)
      let flag = !this.s
      console.log(flag)
      console.log(this.searchKey,this.searchData)
      console.log(this.selectKey,this.selectData)
      console.log(this.searchval)
      // this.searchval = !this.s?JSON.parse(JSON.stringify(this.searchData)):this.searchval;
      // !this.s?this.remoteMethod(this.$route.query.value,this.valuekey,this.table):null;
      console.log(this.searchval)
      // console.log(this.searchk)
      // this.searchK = JSON.parse(JSON.stringify(this.searchKey))
      // console.log(this.searchk)
      Object.keys(this.selectKey).forEach(k => {
         this.currentSelect[k]=!this.s?[]:this.selectKey[k]
      });
      Object.keys(this.searchKey).forEach(k => {
        this.currentSearch[k]=!this.s?(k=='Gene Symbol'?(this.$route.query.value?this.$route.query.value.split(','):[]):[]):this.searchKey[k]
        //  this.currentSearch[k]=!this.s?this.$route.query.value.split(','):this.searchKey[k]
      });
      console.log(this.currentSearch)
      this.colData=[];
      this.tableData=[];
      console.log(this.infoData,this.total)
      let data = this.infoData;
      if(data.length==0){return}
      let key = Object.keys(data[0])
      this.colSelect = key;
      this.colOptions = key.slice(0,12)
      key.forEach(item=>{
        let obj = {
          text:item,
          istrue:false,
          value:item
        }
        this.colData.push(obj)
      })
      this.colData.filter(i => {    
          if (this.colOptions.indexOf(i.text) !== -1) {
            i.istrue = false
          } else {
            i.istrue = true
          }
      })
      console.log(this.colData)
      this.tableData = data;
      
      // if(!this.s){
        
      //   // console.log(this.currentSelect)
      //   for(var k in this.selectKey){
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
      
      // console.log(this.selectData)
      // this.s = undefined;
      // console.log(this.s)
      // console.log(!this.s)
    },
    handleClick(){
        this.$emit('loadDraw')
    }
}
}
</script>
<style scoped>
.theader thead{
    color: #fff;
    background-color: blue;
}
.theader tbody{
    background-color:cornflowerblue;
}
.tablePage{
  text-align: left;
  margin: 10px 0;
}
#tableTop{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0 ;
}
/* .selectli{ */
  /* float: right; */
  /* margin: 20px 0 10px; */
/* } */
.searchli{
  width: 200px;
  height: 40px;
  margin-left: 5px;
}

.tableGroup{
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  margin-top: 20px;
  
}
body[theme-mode='dark'] .tableGroup{
  border-color: rgba(255, 255, 255, 0.12);
}
.legend-group{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.tag-group{
  display: flex;
  align-items: center;
}
.legend{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5px;
}
.el-tag{
  border:0;
  width:26px;
  height:16px;
}
.elSelect{
    width: 200px;
}
.searchInput{
  width: 300px;
}
.searchBox{
  display: flex;
  align-items: center;
  justify-content: space-around;
  line-height: 32px;
  border-bottom: 1px solid #000;
  cursor: pointer;
}
</style>