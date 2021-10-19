<!-- -->
<template>
<div class="result">
    <h1>Model Browser</h1>
    <p>a</p>
    <div class="browser-container"> 
        <div class="browser-page">
            <div class="col-page" :class="'box-card'+i" v-for="(o,i) in keys" :key="i">
                <div class="panel-page" >
                    <h3 class="title-page">{{o}}</h3>
                    <input type="text" placeholder="Type to filter" class="filter-page" v-model="filterList[i]" @input="handleFilter(o,i)">
                    <!-- <el-input :v-model="'filter'+i" placeholder="Type to filter" class="filter-page" @input="handleFilter(o,i)"></el-input> -->
                    <div class="scrollable-page" >
                        <ul class="item-page" v-show="i==0">
                            <li class="li-page" v-for="l in ulItems[o]" :key="l" @click="liClick(i)">{{l }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="col-action">
            <div class="go" @click="handleGo">Go</div>
        </div>
    </div>
    <!-- <div class="selectTable">
        <el-card :class="'box-card'+i" v-for="(o,i) in items" :key="i">
            <div slot="header" class="clearfix">
                <span>{{keys[i]}}</span>
                
            </div>
            <ul class="text item" v-show="i==0">
                <li v-for="l in o" :key="l" @click="liClick(i)">{{l }}</li>
            </ul>
        </el-card>
    </div> -->
    
</div>
</template>
<script>
import $ from 'jquery'
export default {
name: '',
data() {
return {
    filterList:[],
    keys:["Cancer Type","Histology","IO/NOT","Model Classification","Model Type","Model Name","strain"],
    items0:[],
    items1:[],
    items2:[],
    items3:[],
    items4:[],
    items5:[],
    items6:[],
    items:[
        ['Adrenal gland (2628 / 11083)','Autonomic ganglia (1220 / 8705)','Biliary tract (3438 / 10530)','Bone (2173 / 10343)'],
        ['Include all','Adrenal gland (2484)','Extraadrenal (3)','NS (141)'],
        ['Include all','Adrenal cortical adenoma (1819)','Adrenal cortical carcinoma (340)'],
        ['Include all','Aldosterone producing (2)','Cortisol and virilizing syndrome-producing (14)'],
        ['Include all'],
        ['Include all'],
        ['Include all'],
    ],
    ulItems:{
        "Cancer Type":['Adrenal gland (2628 / 11083)','Autonomic ganglia (1220 / 8705)','Biliary tract (3438 / 10530)','Bone (2173 / 10343)'],
        "Histology":['Include all','Adrenal gland (2484)','Extraadrenal (3)','NS (141)'],
        "IO/NOT":['Include all','Adrenal cortical adenoma (1819)','Adrenal cortical carcinoma (340)'],
        "Model Classification":['Include all','Aldosterone producing (2)','Cortisol and virilizing syndrome-producing (14)'],
        "Model Type":['Include all'],
        "Model Name":['Include all'],
        "strain":['Include all'],
        
    },
    tableData: [{
        "Cancer Type": '2016-05-02',
        "Histology": '王小虎',
        "IO/NOT": '上海市普陀区金沙江路 1518 弄',
        "Model Classification": '上海市普陀区金沙江路 1518 弄',
        "Model Type": '上海市普陀区金沙江路 1518 弄',
        "Model Name": '上海市普陀区金沙江路 1518 弄'
    }, {
        "Cancer Type": '2016-05-02',
        "Histology": '王小虎',
        "IO/NOT": '上海市普陀区金沙江路 1518 弄',
        "Model Classification": '上海市普陀区金沙江路 1518 弄',
        "Model Type": '上海市普陀区金沙江路 1518 弄',
        "Model Name": '上海市普陀区金沙江路 1518 弄'
    }, {
        "Cancer Type": '2016-05-02',
        "Histology": '王小虎',
        "IO/NOT": '上海市普陀区金沙江路 1518 弄',
        "Model Classification": '上海市普陀区金沙江路 1518 弄',
        "Model Type": '上海市普陀区金沙江路 1518 弄',
        "Model Name": '上海市普陀区金沙江路 1518 弄'
    }, {
        "Cancer Type": '2016-05-02',
        "Histology": '王小虎',
        "IO/NOT": '上海市普陀区金沙江路 1518 弄',
        "Model Classification": '上海市普陀区金沙江路 1518 弄',
        "Model Type": '上海市普陀区金沙江路 1518 弄',
        "Model Name": '上海市普陀区金沙江路 1518 弄'
    }],

}
},
created() {
    this.load()
},
mounted() {
    
},
    
    
methods:{
    load(){
        this.keys.forEach((k,i)=>{
            this['items'+i] = this.ulItems[k]
        })
        
    },
    handleFilter(k,i){
        console.log(k)
        console.log(i)
        console.log(this['filter'+i])
      console.log(this.filterList[i])
      console.log(this['items'+i])
      var data = this.ulItems[k]
    //   console.log(data.find(el=>el.indexOf(this.filter)))
    //   var newItem = []
    //   var el = data.find(el=>el.toLowerCase().indexOf(this.filter))
    console.log(data)
    if(!this.filterList[i]){
        console.log(1)
        this.ulItems[k] = this['items'+i]
        
       
    }else{
         var newData = data.filter(li=>{
          console.log(li.toLowerCase().slice(0,this.filterList[i].length))
          return li.toLowerCase().slice(0,this.filterList[i].length)==this.filterList[i]
        })
        console.log(newData)
        //   if(!el){
        //       newItem.push(el)
        //   }
        
        this.ulItems[k] = newData
    }
      
    },
    liClick(i){
        console.log(i)
        if(i==0){
            $('.box-card'+i).siblings().find('.item-page').hide();
        }else if(i==this.keys.length-1){
            return 
        }
    $('.box-card'+i).next().find('.item-page').show()
    },
    handleGo(){
        let routeUrl = this.$router.resolve({path: '/ModelAtlas',query: {view:'Overview',type:'Model'}});
        window.open(routeUrl.href, '_blank');
    }
}
}
</script>
<style scoped>
.selectTable{
    display: flex;
    align-items: center;
    justify-content: center;
}
.browser-container{
    max-width: 100%;
    background-color: #28446f;
    overflow: hidden;
    padding: 1px;
    border-radius: 4px 4px 0 0;
}
.browser-page {
    
    display: flex;
    align-items: flex-start;
    justify-content: center;
}
.col-page {
    width: 15%;
}
.panel-page {
    margin: 2px;
    background-color: white;
    border-radius: 3px;
    max-width: 100%;
    position: relative;
}
.title-page {
    
    margin-top: 8px;
    padding-top: 0;
    padding-bottom: 5px;
    
}
.filter-page {
    width: 97%;
    background: #E8CCD1;
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
    border: 1px solid #9AC0ED;
}
.col-action{
    position: relative;
    border-radius: 4px;
    margin: 0;
    padding: 10px;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.go{
    width: 52px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    background: #8E0018;
    border-radius: 3px;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
}
</style>