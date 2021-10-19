<!-- 列可选表格 -->
<template>
<div class="tableGroup">
  <el-table
  id="elTable"
  ref="multipleTable"
  :data="infoData"
  tooltip-effect="dark"
  style="width: 100%"
  max-height="500"
  highlight-current-row
  @filter-change="filterHandlerChange"
  :header-cell-style="{}">
    <el-table-column
      sortable
      v-for="(v,s) in selectKey"
      :key="s"
      :prop="s"
      :label="s"
      width="180"
      :column-key="s"
      :filters="selectData[s]"
      :filtered-value="currentSelect[s]">
      </el-table-column>
    <el-table-column
      sortable
        width="200"
        v-for="(v,k) in searchKey"
        :key="k"
        :prop="k">
      <template slot="header" slot-scope="scope">
        <el-select
            v-model="currentSearch[k]"
            multiple
            filterable
            :placeholder="k"
            @keyup.enter.native="filterOption($event,k,scope)"
            @change="remoteMethod(searchKey[k],k)">
            <el-option
            v-for="item in searchval[k]"
            :key="item"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
        <!-- <el-input v-model="mulsearch[k]" placeholder="请输入内容" @input="remoteMethod(mulsearch[k],k)">
          <div class="tagBox">
            <el-tag v-for="tag in tags" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
          </div>
        </el-input>
        <div class="scrollable-page" v-show="searchList">
            <ul class="item-page">
                <li class="li-page" v-for="l in searchData[k]" :key="l" @click="liClick(i)">{{l }}</li>
            </ul>
        </div> -->
        </template>
    </el-table-column>
    <el-table-column
      sortable
      v-for="(item,i) in items" 
      :key="i"
      :label="item.text"
      :prop="item.text"
      align="center">
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
import {AgetSequence,AgetGeneSequence} from '../api/model'
import {Agettable_input} from '../api/model'
export default {
name: '',
components:{},
props:['infoData','total','selectKey','selectData','searchKey','searchData'],
computed: {
  items: function() {
    let _this = this;
   return this.colData.filter(function (item) {
    //  return item.istrue
    // return item.istrue&&item.text!==_this.tag
    return item.text!=='id'&&Object.keys(_this.selectKey).findIndex(el=>el==item.text)<0&&Object.keys(_this.searchKey).findIndex(el=>el==item.text)<0
   })
  },
  // searchData:function(newv){
  //   console.log(newv)
  //   return this.searchval = newv
  // }

  
},
data() {
return {
    // options: [{
    //     value: 'HSPG2',
    //     label: 'HSPG2'
    // }, {
    //     value: 'ZBTB40',
    //     label: 'ZBTB40'
    // }, {
    //     value: 'LUZP1',
    //     label: 'LUZP1'
    // }],
    // searchData:{},
    reflush:true,
    currentSearch:{},
    searchk:{},
    selectK:{},
    params:{},
    optionShow:false,
    currentSelect:{}, 
    // searchval:JSON.parse(JSON.stringify(this.searchData)),
    // searchval:{
    //   'Gene Symbol': []
    // },
    searchval:{},
    mulsearch:{},
    mulselect:{},
    tagItems: [
      { label: 'Frame Shift' ,color:'#aae0da'},
      { label: 'In Frame' ,color:'#e0c3aa'},
      { label: 'Missens' ,color:'#93afcd'},
      { label: 'Nonsense' ,color:'#acddf2'},
      { label: 'silent' ,color:'#96a7f3'}
    ],
    tag:'Start_Position',
    tags:[],
    searchby:'',
    itemsPerPageArray: [100,200,500],
    search: '',
    filter: {},
    page: 1,
    itemsPerPage: 100,    
    tableData: [],
    colData:[],
    restaurants: [],
    state: '',
    // s:{}
}
},
watch:{
    infoData(){
      console.log('监听')
      this.load()

      // this.itemClick(this.tableData[0]);
      // this.searchTable(this.searchby)
    },
    // searchData(newv){
    //   console.log(newv)
    //   let newo = JSON.parse(JSON.stringify(newv))
    //   console.log(newo);
    //   this.searchval = newo
    //   this.load()
    // }
},
created() {
  // this.load()
},
mounted() {
    
},
methods:{
  
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
    async keyupSubmit(query){
      if(query.length>=4){
        const data =await new Promise((resolve)=>{Agettable_input(query).then(res=>{
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
        // this.searchval=Object.assign(this.searchval,data)
        this.searchval=Object.assign(this.searchval,data)
        // this.$set(this.searchval,k,data[k])
        console.log(this.searchval)
        // this.$emit('loadSearch',e.target.value,k)
      }
    },
    querySearch(queryString, cb) {
      this.searchKey.forEach(k=>{
        this.searchData[k].forEach(item=>{
          let o={
            value:item
          }
          this.restaurants.push(o)
        })
      })
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
        console.log(item);
    },
    handleClose(tag){
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    remoteMethod(query,key) {
      // this.$forceUpdate()
      console.log(query,key)

      console.log(this.searchKey,this.selectKey,this.currentSelect,this.searchK,this.currentSearch)
     
        // let search_data=[...query]
        // console.log(search_data)
        // console.log({[key]:search_data})
        // let search = JSON.stringify({[key]:search_data})
        // console.log(search)
        // if (query !== null) {
        //     let loading = this.$loading()
        //     let s = search_data.length==0?'':search;
        //     this.$emit('loadTable',this.page,this.itemsPerPage,s)
        //     loading.close()
        // } else {
        //   this.options = [];
        // }
        // let search_data=[...query]
        // console.log(search_data)
        // console.log({[key]:search_data})
        // let search = JSON.stringify({[key]:search_data})
      // let mulS = {}
      // for(let i in this.searchKey[key]){
      //   if(this.searchKey[key][i]!==''&&this.searchKey[key][i].length!==0){
      //     mulS[key] = this.searchKey[key]
      //   }
      // }
      // for(let i in this.searchK[key]){
      //   if(this.searchK[key][i]!==''&&this.searchK[key][i].length!==0){
      //     mulS[key] = this.searchK[key]
      //   }
      // }
      // for(let i in this.currentSearch[key]){
      //   if(this.currentSearch[key][i]!==''&&this.currentSearch[key][i].length!==0){
      //     mulS[key] = this.currentSearch[key]
      //   }
      // }
      let mulS = {
        ...this.currentSearch
      }
      // console.log(this.selectKey)
        // let mul = JSON.stringify(mulS)
        // console.log(search)
        // console.log(mul)
        // this.s = {
        //   ...this.selectKey,
        //   ...this.searchKey
        // }
        // this.s = {
        //   ...this.selectKey,
        //   ...this.searchK
        // }
        this.s = {
          ...mulS,
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
            this.s = s=="{}"?"":s;
            // this.$refs.multipleTable.clearFilter()
            // this.$emit('loadTable',this.page,this.itemsPerPage,s,this.s)
            this.$emit('loadTable',this.page,this.itemsPerPage,s,this.params)
            loading.close()
            
        }
    },
    filterHandlerChange(filters){
      // this.$forceUpdate()
      console.log(filters)
      console.log(this.searchKey,this.selectKey,this.currentSelect,this.searchK,this.currentSearch)
      // let mulS = {
      //   ...this.currentSelect
      // }
      for(var k in filters){
        console.log(k)
        this.selectKey[k] = filters[k]
        // mulS[k] = filters[k]
      }
      console.log(this.selectKey,this.currentSelect)
      
      // this.s = {
      //   ...this.selectKey,
      //   ...this.searchKey
      // }
      // this.s = {
      //   ...mulS,
      //   ...this.currentSearch
      // }
      this.s = {
        ...this.selectKey,
        ...this.currentSearch
      }
      this.params = {
        ...this.s
      }
      console.log(this.params)
      // this.s = {
      //   ...filters,
      //   ...this.currentSearch
      // }
      let s = JSON.stringify(this.s)
      console.log(s)
      // let s = JSON.stringify(this.selectKey)
      // console.log(s)
      let loading = this.$loading()
      this.s = s=="{}"?"":s;
      // this.$emit('loadTable',this.page,this.itemsPerPage,s,this.selectKey)
      this.$emit('loadTable',this.page,this.itemsPerPage,s,this.params)
      loading.close()
    },
    filterHandler(value, row, column) {
      console.log(value, row, column)
      const property = column['property'];
      console.log(property)
      console.log(this.searchKey)
      console.log(this.selectKey)
      console.log(this.selectKey[property])
      this.selectKey[property]=[value]
      // return row[property] === value;
      let loading = this.$loading()
      // this.s = mul=="{}"?"":mul;
      // this.$emit('loadTable',this.page,this.itemsPerPage,this.s,mulS)
      loading.close()
    },
    filterTag(value, row) {
      console.log(value)
      console.log(row)
      return row.Start_Position >= value;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.itemsPerPage = val;
      this.$emit('loadTable',this.page,this.itemsPerPage)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.$emit('loadTable',this.page,this.itemsPerPage)
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
      this.searchval = flag?JSON.parse(JSON.stringify(this.searchData)):this.searchval;
      console.log(this.searchval)
      // console.log(this.searchk)
      // this.searchK = JSON.parse(JSON.stringify(this.searchKey))
      // console.log(this.searchk)
      let data = this.infoData;
      if(data.length==0){return}
      // this.tableData = data
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
      Object.keys(this.selectKey).forEach(k => {
         this.currentSelect[k]=flag?[]:this.selectKey[k]
      });
      Object.keys(this.searchKey).forEach(k => {
         this.currentSearch[k]=flag?[]:this.searchKey[k]
      });
      if(flag){
        
        // console.log(this.currentSelect)
        for(var k in this.selectKey){
          console.log(k)
          let arr = []
          this.selectData[k].forEach(item=>{
            let o = {
              text:item,
              value:item
            }
            arr.push(o)
          })
          this.selectData[k]=arr
        }
      }
      
      console.log(this.selectData)
      
      
        
          
      
    
      
      
    },
    itemClick(o){
      console.log(o)
      this.$refs.multipleTable.setCurrentRow(o)
      if(this.$route.query.type=='Model'){
        AgetSequence(o.id).then(res=>{
          let d = res.data.data_info
          this.$emit('loadSeque',d)
        })
      }else{
        AgetGeneSequence(o.id).then(res=>{
          let d = res.data.data_info
          this.$emit('loadSeque',d)
        })
      }
      
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
  text-align: right;
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
</style>