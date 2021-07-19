<!-- -->
<template>
<div class="simpleTable">
    <v-simple-table height="500px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">
              Name
            </th>
            <th class="text-center">
              Calories
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
// import { mapGetters } from 'vuex'
export default {
name: 'simpleTable',
props:['data','id'],
// computed: {
//   ...mapGetters(['tableData'])
// },
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
  this.load()
},
mounted() {},
methods:{
  load(){
    // console.log('id')
      // fetch('http://192.168.1.128:8000/api/introduction/cmp/?cmp_id='+this.id).then((res)=>{
      //   return res.json()
      // }).then((data)=>{
      //   for(var item in data.datainfo){
      //     let obj = {name:item,calories:data.datainfo[item]}
      //     this.desserts.push(obj)
      //   }
      // })
    // this.$store.dispatch('GetTableData',this.id).then(() => {
    //   for(var item in this.tableData){
    //     let obj = {name:item,calories:this.tableData[item]}
    //     this.desserts.push(obj)
    //   }
    // })
    this.desserts = []
    for(var item in this.data){
      let obj = {name:item,calories:this.data[item]}
      this.desserts.push(obj)
    }
  }
}
}
</script>
<style scoped></style>