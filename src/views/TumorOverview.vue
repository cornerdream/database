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
        <loading v-if="loading"></loading>
        <alert v-if="alertShow" :info="info" :type="type"></alert>
      </div>
      
    </div>
    
</div>
</template>
<script>
import baseUrl from '../utils/baseurl'
import loading from '../components/loading.vue'
import alert from '../components/alert.vue'
import {mapGetters} from 'vuex'
import SimpleTable from '../components/simpleTable.vue'
export default {
name: 'TumorOverview',
components:{
  loading,
  alert,
  SimpleTable,

},
computed: {
  ...mapGetters(['cmp_id','loading']),
},
data() {
return {
    alertShow:false,
    info:'',
    type:'',
    // loading: false,
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
    alert(type,data){
      var _this = this;
      this.alertShow = true;
      this.type = type
      this.info = data
      setTimeout(function(){
        _this.alertShow = false
      },2000)
    },
    async onsearch(data){
      
      console.log(baseUrl)
      this.$store.dispatch('ShowLoading')
      await fetch(baseUrl+'/api/introduction/cmp/?cmp_id='+data).then((res)=>{
        return res.json()
      }).then((data)=>{
        // data.code==200?this.tableData = data.data_info:this.$alert.error(data.message)
        if(data.code==200){          
          this.tableData = data.data_info
        }else{
          this.alert('error',data.message)
        }
      })
      this.$store.dispatch('HideLoading')
    },  
    
}
}
</script>
<style scoped>

</style>