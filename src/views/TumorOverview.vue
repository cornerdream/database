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
// import baseUrl from '../utils/baseurl'
import {AsearchCmpId} from '../api/tumor'
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
  
},
methods:{
    async onsearch(cmp_id){
      console.log(cmp_id)
      // console.log(baseUrl)
      // this.$store.dispatch('ShowLoading')
      let $loading=this.$loading();
      // await fetch(baseUrl+'/api/introduction/cmp/?cmp_id='+cmp_id).then((res)=>{
      //   return res.json()
      // }).then((data)=>{
      //   data.code==200?this.tableData = data.data_info:this.$message.error(data.message)
      // })
      AsearchCmpId(cmp_id).then(res=>{
        this.tableData = res.data.data_info
      })
      // this.$store.dispatch('HideLoading')
      $loading.close();
    },  
    
}
}
</script>
<style scoped>

</style>