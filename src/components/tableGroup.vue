<!-- -->
<template>
<div class="tableGroup">
    <table class="theader">
        <thead >
            <tr>
                <th v-for="(item) in headers" :key="item.name">{{item.name}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(list,j) in groupData" :key="j">
                <td v-for="(k, v) in list" :key="v" :rowspan="k.rows">{{k.name}}</td>
            </tr>
            <!-- <tr>
                <td rowspan="4">gain</td>
                <td rowspan="2">liver cancer</td>
                <td rowspan="1">model-x</td>
            </tr>
             <tr>    
                <td rowspan="1">model-x</td> 
            </tr>
            <tr>
                
                <td rowspan="2">kidney cancer</td>
                <td rowspan="1">model-x</td>
            </tr>
             <tr>

                <td rowspan="1">model-x</td>
                
            </tr>
           
            
            
            <tr>
                <td rowspan="3">loss</td>
                <td rowspan="2">breast cancer</td>
                <td rowspan="1">model-x</td>
            </tr>
            <tr>
                <td rowspan="1">model-x</td>
                
                
            </tr>
             <tr>
                 <td rowspan="1">glioma</td>
                 <td rowspan="1">model-x</td>
            </tr> -->
           
           
        </tbody>
    </table>
</div>
</template>
<script>
export default {
name: '',
data() {
return {
    headers: [
      {
        name: 'CNV status',
      },
      {
        name: 'cancer type',
      },
      {
        name: 'model name',
      },
    ],  
    groupData:[
        
        [
            {name:'gain',rows:4},
            {name:'liver cancer',rows:2},
            {name:'model-x',rows:1}
        ],
        [
            {name:'model-x',rows:1}
        ],
        [
            {name:'kidney cancer',rows:2},
            {name:'model-x',rows:1}
        ],
        [
            {name:'model-x',rows:1}
        ],

    
    
        [
            {name:'loss',rows:3},
            {name:'breast cancer',rows:2},
            {name:'model-x',rows:1}
        ],
        [
            {name:'model-x',rows:1}
        ],
        [
            {name:'glioma',rows:1},
            {name:'model-x',rows:1}
        ],
        
    ]
}
},
created() {
    
},
mounted() {}
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
</style>