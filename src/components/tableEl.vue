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
            :remote-method="(query)=>{remoteMethod(query,k,table,modelId)}"
            @change="filterChange($event,k)"
            @remove-tag="remoteMethod2(currentSearch[k],k,scope)">
            <div class="searchBox" @click="remoteMethod2(currentSearch[k],k,scope)">             
              <i class="el-icon-search" ></i><span class='prefixSlot'>搜索</span>             
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
props:['infoData','total','selectKey','selectData','searchKey','searchData','valuekey','table','modelId'],
computed: {
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
  currentSearch:{},
  currentSelect:{}, 
  tagItems: [
    { label: 'Frame Shift' ,color:'#aae0da'},
    { label: 'In Frame' ,color:'#e0c3aa'},
    { label: 'Missens' ,color:'#93afcd'},
    { label: 'Nonsense' ,color:'#acddf2'},
    { label: 'silent' ,color:'#96a7f3'}
  ],
  tag:'Start_Position',
  itemsPerPageArray: [100,200,500],
  page: 1,
  itemsPerPage: 100,
  sortBy:'',
  desc:0,
  colData: [],
}
},
watch:{
    infoData(){
      console.log('监听')
      this.load()
      this.loadremote()
    },
},
created() {
},
mounted() {
},
methods:{
  loadremote(){
    this.remoteMethod(this.$route.query.value,this.valuekey,this.table,this.modelId)
  },
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
  remoteMethod(query,k,t,d) {
    console.log(query,k,t,d)
    if(!query){return}
    if(query.length>=2){ 
      Agettable_input(query,k,t,d).then(res=>{
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
    Object.keys(this.selectKey).forEach(k => {
        this.currentSelect[k]=!this.s?[]:this.selectKey[k]
    });
    Object.keys(this.searchKey).forEach(k => {
      this.currentSearch[k]=!this.s?(k=='Gene Symbol'?(this.$route.query.value?this.$route.query.value.split(','):[]):[]):this.searchKey[k]
      //  this.currentSearch[k]=!this.s?this.$route.query.value.split(','):this.searchKey[k]
    });
    this.colData=[];
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
  },
  handleClick(){
    console.log(this.s)
    console.log(this.currentSelect)
    console.log(this.currentSearch)
    let l = this.currentSearch['Gene Symbol'].length
    if(l==0){
      this.$msgbox.alert('请选择gene','注意')
    }else if(l>5){
      this.$msgbox.alert('请选择少于5个的gene数','注意')
    }else{
      let s = JSON.stringify(this.currentSearch)
      console.log(s)
      this.$emit('loadDraw',s)
    }
      
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