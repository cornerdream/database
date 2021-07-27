<!-- -->
<template>
<div class="TumorOverview">
    <div class="container" >
      <v-toolbar flat id="search">
        <v-autocomplete
        append-icon="mdi-pencil"
        v-model="select"
        :loading="loading"
        :items="states"   
        :search-input.sync="search"
        @change="onsearch(select)"
        @keyup.enter="onsearch(search)"
        cache-items
        flat
        hide-no-data
        hide-details
        label="What state are you from?"
        solo-inverted
        ></v-autocomplete>
        <v-btn
        class="searchBtn"
        rounded
        color="#2477a8"
        dark
        @click="onsearch(search)"
        >
          SEARCH
        </v-btn>
      </v-toolbar>
      <div class="component">
        <SimpleTable  :data="tableData" @loadsearch="onsearch" :id="this.select||this.search"></SimpleTable>
      </div>
      
    </div>
</div>
</template>
<script>
import SimpleTable from '../components/simpleTable.vue'
export default {
name: 'TumorOverview',
components:{
    SimpleTable,
    
},
data() {
return {
    loading: false,
    search: null,
    select: null,
    states: [],
    tableData:[],
}
},
// watch: {
//     search (val) {
//       val && val !== this.select && this.querySelections(val)
//     },
//   },
created() {
    this.load();
},
mounted() {},
methods:{
    load(){
      fetch('http://192.168.1.128:8000/api/introduction/get_cmp_id/').then((res)=>{
        return res.json()
      }).then((data)=>{
        this.states = data.datainfo.cmp_id;
      })
    },
    // querySelections (v) {
    //   this.loading = true
    //   // Simulated ajax query
    //   setTimeout(() => {
    //     this.items = this.states.filter(e => {
    //       return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
    //     })
    //     this.loading = false
    //   }, 500)
    // },
    onsearch(data){
      fetch('http://192.168.1.128:8000/api/introduction/cmp/?cmp_id='+data).then((res)=>{
        return res.json()
      }).then((data)=>{
        this.tableData = data.datainfo;
      })
    },  
}
}
</script>
<style scoped>

</style>