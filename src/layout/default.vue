<template>
  <div id="layout">
    <viewTab/>
    
    <v-toolbar flat id="search">
      
      <v-autocomplete
      append-icon="mdi-pencil"
      value="select"
      :loading="loading"
      :items="states"    
      :search-input.sync="search"
      cache-items
      class="mx-4"
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

    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import viewTab from '../components/viewTab.vue'
export default {
  name: 'layout',
  components:{
    viewTab,

  },
  data(){
    return{
    srcs:{
      1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    },
    friends: ['Sandra Adams', 'Britta Holt'],
    people: [
        { header: 'Group 1' },
        { name: 'Sandra Adams', group: 'Group 1', avatar: this.srcs[1] },
        { name: 'Ali Connors', group: 'Group 1', avatar: this.srcs[2] },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: this.srcs[3] },
        { name: 'Tucker Smith', group: 'Group 1', avatar: this.srcs[2] },
        { divider: true },
        { header: 'Group 2' },
        { name: 'Britta Holt', group: 'Group 2', avatar: this.srcs[4] },
        { name: 'Jane Smith ', group: 'Group 2', avatar: this.srcs[5] },
        { name: 'John Smith', group: 'Group 2', avatar: this.srcs[1] },
        { name: 'Sandra Williams', group: 'Group 2', avatar: this.srcs[3] },
      ],
    loading: false,
    search: null,
    select: null,
    states: [],  
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    },
  },
  mounted() {
    
  },
  created(){
    this.load();
  },

  methods: {
    remove (item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    },
    load(){
      // fetch('http://192.168.1.128:8000/api/introduction/get_cmp_id/').then((res)=>{
      //   return res.json()
      // }).then((data)=>{
      //   this.states = data.datainfo.cmp_id;
      //   console.log(this.states)
      // })
    },
    // querySelections (v) {
    //   console.log(v)
    //   this.loading = true
    //   // Simulated ajax query
    //   setTimeout(() => {
    //     this.items = this.states.filter(e => {
    //       return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
    //     })
    //     this.loading = false
    //   }, 500)
     
    //   this.onsearch(v);
    // },
    // onsearch(data){
    //   const options = {cmp_id:data}
    //   console.log(options)
    //   fetch('http://192.168.1.128:8000/api/introduction/cmp/',options).then((res)=>{
    //     return res.json()
    //   }).then((data)=>{
        
    //     console.log(data)
    //   })
    // }
  },
}
</script>
<style scoped>
#search{
  margin: 20px 50px;
}
.content{
  position: relative;
  padding: 0 80px;
  min-height: 630px;
}
.content{
  background: url('../assets/white_corner.png') no-repeat;
  background-attachment: fixed;
  background-position: 100% 100%;
}
body[theme-mode='dark'] .content{
  background: url('../assets/dark_corner.png') no-repeat;
  background-attachment: fixed;
  background-position: 100% 100%;
}

</style>
