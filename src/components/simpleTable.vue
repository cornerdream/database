<!-- 简单数据展示表格 -->
<template>
<div class="simpleTable">
    <v-simple-table height="500px" id="simpleTable" v-show="data.length!=0">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">
              Name
            </th>
            <th class="text-center">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in desserts"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
</div>
</template>
<script>
export default {
name: 'simpleTable',
props:['data'],
data() {
return {
    desserts: [],
}
},
watch:{
    data(){
      this.load()
    }
},
created() {
},
mounted() {
  
},
methods:{
  load(){
    console.log(this.data)
    this.desserts = []
    if(Array.isArray(this.data)){
      this.data = this.data.filter((item)=>item!='id')
      this.data.forEach((item)=>{
        let name = Object.keys(item);
        name.map((n)=>{
          let obj = {name:n,calories:item[n]}
          this.desserts.push(obj)
        })
      })
    }else{
      console.log(this.data)
      var data = Object.keys(this.data).filter((item)=>item!='id')
      console.log(data)
      data.forEach((item)=>{
        let obj = {name:item,calories:this.data[item]}
        this.desserts.push(obj)
      })
      // for(var item in this.data){
      //   let obj = {name:item,calories:this.data[item]}
      //   this.desserts.push(obj)
      // }
    }
    console.log(this.desserts)
  }
}
}
</script>
<style scoped>
#simpleTable{
  background: transparent;
}
</style>