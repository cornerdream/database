<!-- -->
<template>
<div class="TargetOverview">
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
        <!-- <SimpleTable  :data="tableData"></SimpleTable> -->
        <v-card>
            <v-toolbar
                flat
                color="primary"
                dark
            >
                <v-toolbar-title>TP53</v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical>
                <v-tab>
                    <v-icon left>
                        mdi-chart-scatter-plot
                    </v-icon>
                    scatter
                </v-tab>
                <v-tab>
                    <v-icon left>
                        mdi-table
                    </v-icon>
                   table
                </v-tab>

                <v-tab-item>
                <v-card flat>
                    <v-card-text>
                       <!-- <seqScatter :data="scatterData" ></seqScatter> -->
                       <Lollipop :data="scatterData" ></Lollipop>
                    </v-card-text>
                </v-card>
                </v-tab-item>
                <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <Table :data="tableData" ></Table>
                    </v-card-text>
                </v-card>
                </v-tab-item>
               
            </v-tabs>
        </v-card>
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
// import SimpleTable from '../components/simpleTable.vue'
import Lollipop from '../components/lollipop.vue'
// import seqScatter from '../components/seq-scatter.vue'
import Table from '../components/table.vue'
export default {
name: 'TumorOverview',
components:{
//   SimpleTable,
Lollipop,
// seqScatter,
Table,
loading,
alert
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
    states: ['TP53'],
    scatterData:[],
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
    async onsearch(data){
      var _this = this;
      console.log(baseUrl)
      this.$store.dispatch('ShowLoading')
      await fetch(baseUrl+'/api/gene/genedomain/?gene_symbol='+data).then((res)=>{
        return res.json()
      }).then((data)=>{
        // data.code==200?this.scatterData = data.data_info.domain:this.$alert.error(data.message)
        if(data.code==200){          
          this.scatterData = data.data_info.domain
        }else{
          this.alertShow = true;
          this.type = 'error'
          this.info = data.message
          setTimeout(function(){
            _this.alertShow = false
          },2000)
        }

      })
      this.$store.dispatch('HideLoading')
    },  
}
}
</script>
<style scoped>

</style>