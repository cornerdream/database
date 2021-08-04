<!-- -->
<template>
<div class="TumorOverview">
    <div class="container" >
      <v-toolbar flat id="search">
        <v-autocomplete
        append-icon="mdi-pencil"
        v-model="select"
        :loading="loading"
        :items="cmp_id"   
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
        <SimpleTable  :data="tableData"></SimpleTable>
      </div>
      
    </div>
</div>
</template>
<script>
import baseUrl from '../utils/baseurl'
import {mapGetters} from 'vuex'
import SimpleTable from '../components/simpleTable.vue'
export default {
name: 'TumorOverview',
components:{
  SimpleTable,
},
computed: {
  ...mapGetters(['cmp_id']),
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
created() {
},
mounted() {
  // this.$EventBus.$on("aMsg", (msg) => {
  //     // A发送来的消息
  //     console.log(msg)
  //   this.onsearch(msg);
  // })
},
methods:{
    onsearch(data){
      console.log(baseUrl)
      fetch(baseUrl+'/api/introduction/cmp/?cmp_id='+data).then((res)=>{
        return res.json()
      }).then((data)=>{
        this.tableData = data.data_info;
      })
    },  
}
}
</script>
<style scoped>

</style>