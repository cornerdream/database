<!-- 列可选表格 -->
<template>
<div class="tableGroup">
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
      v-for="(v,s) in selectKey"
      :key="s"
      :prop="s"
      :label="s"
      align="center"
      :column-key="s"
      :filters="selectData[s]"
      :filtered-value="currentSelect[s]">
      </el-table-column>
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
          :placeholder="k"
          :remote-method="(query)=>{remoteMethod(query,k,table)}"
          @change="filterChange($event,k)"
          @remove-tag="remoteMethod2(currentSearch[k],k,scope)">
          <!-- @keydown.enter.native.prevent="remoteMethod2(currentSearch[k],k,scope)" -->
          <!-- @keyup.enter.native="filterOption($event,k,scope)" -->
          <!-- @change="remoteMethod2(searchKey[k],k)" -->
          
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
  </el-table>
  <v-row>
    <!-- <v-col class="legend-group">
      <div class="tag-group">
        <span class="tag-group__title">Legend</span>
        <span v-for="item in tagItems" :key="item.label" class="legend">
        <el-tag
          :color="item.color"
          effect="dark">
        </el-tag>
        {{ item.label }}
        </span>
      </div>
    </v-col> -->
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
  </v-row>
  
  

</div>

</template>
<script>
// import {AgetSequence,AgetGeneSequence} from '../api/model'
import {Agettable_input} from '../api/model'
export default {
name: '',
components:{},
props:['infoData','total','selectKey','selectData','searchKey','searchData','valuekey','table'],
computed: {
  items: function() {
    let _this = this;
   return this.colData.filter(function (item) {
    //  return item.istrue
    // return item.istrue&&item.text!==_this.tag
    return item.text!=='id'&&Object.keys(_this.selectKey).findIndex(el=>el==item.text)<0&&Object.keys(_this.searchKey).findIndex(el=>el==item.text)<0
   })
  },
},
data() {
return {
    currentSearch:{},
    params:{},
    currentSelect:{}, 
    searchval:{},
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
    colData:[],
    sortBy:'',
    desc:0,
}
},
watch:{
    infoData(){
      // console.log('监听')
      this.load()
      // this.itemClick(this.tableData[0]);
      // this.searchTable(this.searchby)
    },
},
created() {
  this.remoteMethod(this.$route.query.value,this.valuekey,this.table)
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
    remoteMethod(query,k,t){
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

      console.log(this.searchKey,this.selectKey,this.currentSelect,this.currentSearch)
     
      this.s = {
        ...this.currentSearch,
        ...this.selectKey
      }
      console.log(this.s)
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
      console.log(this.searchKey,this.selectKey,this.currentSelect,this.currentSearch)
      for(var k in filters){
        console.log(k)
        this.selectKey[k] = filters[k]
      }
      console.log(this.selectKey,this.currentSelect)
      
      this.s = {
        ...this.selectKey,
        ...this.currentSearch
      }
      console.log(this.s)
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
      let _this = this;
      console.log(this.s)
      // this.s = JSON.parse(JSON.stringify(this.s))
      // console.log(this.s)
      let flag = !this.s
      console.log(flag)
      console.log(this.searchKey,this.searchData)
      console.log(this.selectKey,this.selectData)
      // console.log(this.infoData,this.total)
      console.log(this.searchval)
      // this.searchval = flag?JSON.parse(JSON.stringify(this.searchData)):this.searchval;
      // this.searchval = flag?JSON.parse(JSON.stringify(this.searchKey)):this.searchval;
      console.log(this.searchval)
      Object.keys(this.selectKey).forEach(k => {
         this.currentSelect[k]=flag?[]:this.selectKey[k]
      });
      // Object.keys(this.searchKey).forEach(k => {
      //    this.currentSearch[k]=flag?[]:this.searchKey[k]
      // });
      Object.keys(this.searchKey).forEach(k => {
        this.currentSearch[k]=!this.s?(k=='Gene Symbol'?(this.$route.query.value?this.$route.query.value.split(','):[]):[]):this.searchKey[k]
        //  this.currentSearch[k]=flag?(this.$route.query.value?this.$route.query.value.split(','):[]):this.searchKey[k]
      });
      console.log(this.currentSearch)
      // console.log(this.searchk)
      // this.searchK = JSON.parse(JSON.stringify(this.searchKey))
      // console.log(this.searchk)
      let data = this.infoData;
      if(data.length==0){return}
      // this.tableData = data
      this.colData=[];
      let key = Object.keys(data[0])
      console.log(key)
      key.forEach(item=>{
        let obj = {
          text:item,
          value:item
        }
        _this.colData.push(obj)
      })
      console.log(this.colData)
      // console.log(this.searchval)
      
      // this.mulsearch = JSON.parse(JSON.stringify(this.mulsearch))
      // console.log(this.mulsearch)
      // this.mulsearch[key]=this.searchval
      // console.log(this.mulsearch)
      // this.selectKey.forEach(k => {
      //   _this.mulselect[k]=[]
      // });
      // console.log(this.mulselect)
      
      // if(flag){
        
      //   console.log('空')
      //   console.log(this.selectKey,this.selectData)
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
      
        
          
      
    
      
      
    },
    itemClick(o){
      console.log(o)
      this.$refs.multipleTable.setCurrentRow(o)
      // if(this.$route.query.type=='Model'){
      //   AgetSequence(o.id).then(res=>{
      //     let d = res.data.data_info
      //     this.$emit('loadSeque',d)
      //   })
      // }else{
      //   AgetGeneSequence(o.id).then(res=>{
      //     let d = res.data.data_info
      //     this.$emit('loadSeque',d)
      //   })
      // }
      
    },
    
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
.scrollable-page {
    height: 250px;
    overflow-x: auto;
}
.item-page {
    padding: 2px;
    margin: 0;
}
.li-page {
    margin: 1px;
    padding: 4px;
}
.searchInput{
  width: 300px;
  /* position: relative; */
}
.searchBox{
  /* position: absolute;
  top: 0; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  line-height: 32px;
  border-bottom: 1px solid #000;
  cursor: pointer;
}


</style>