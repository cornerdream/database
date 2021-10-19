<!-- 可切换表格 -->
<template>
<div id="tab">
  <!-- 切换参数按钮 -->
  <v-toolbar
    id="tabHeader"
    dark
    color="#7695b1"
    class="mb-1"
  > 
    <div class="page">
      <span>Items per page</span>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            text
            color="#fff"
            class="ml-2"
            v-bind="attrs"
            v-on="on"
          >
            {{ itemsPerPage }}
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(number, index) in itemsPerPageArray"
            :key="index"
            @click="updateItemsPerPage(number)"
          >
            <v-list-item-title>{{ number }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-spacer></v-spacer>
    <v-btn 
      id="tabDown"  
      small 
      depressed
      color="#fff"
      :value="false"
    >
      DOWNLOAD
      <!-- <v-icon>mdi-download</v-icon> -->
    </v-btn>
    <v-spacer></v-spacer>
    <v-text-field
      class="tabSearch"
      v-model="search"
      clearable
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
    ></v-text-field>
    <v-spacer></v-spacer>

    <v-switch
     v-model="switchTable"
    :label="switchTable ? 'ccle' : 'cosmic'"
    class="tabSwitch"
    @change="onchange"
    ></v-switch>        
  </v-toolbar>
  <v-data-table
    :headers="newHeaders"
    :items="newItems"
    :items-per-page.sync="itemsPerPage"
    :page.sync="page"
    :search="search"
    :sort-by="sortBy.toLowerCase()"
    :sort-desc="sortDesc"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:item.COSMIChsCnt="{ item }" v-if="switchTable">
      <!-- <v-chip
        :color="getColor(item.COSMIChsCnt)"
        dark
      >
       {{ item.COSMIChsCnt }}
      </v-chip> -->
        <div class="color" :style="{'background':getColor(item.COSMIChsCnt)}" >
          {{ item.COSMIChsCnt }}
        </div> 
    </template>
    <template v-slot:item.Gene_CDS_length="{ item }" v-else>
      <!-- <v-chip
        :color="getColor(item.COSMIChsCnt)"
        dark
      >
       {{ item.COSMIChsCnt }}
      </v-chip> -->
        <div class="color" :style="{'background':getColor(item.Gene_CDS_length)}" >
          {{item.Gene_CDS_length}}
        </div>
         
    </template>
    <!-- <template v-slot:footer>
      <v-row
      id="tabFooter"
      align="center"
      justify="center"
    >
            
      <div class="text-center">
        Legend
        <v-chip
          x-small
          class="ma-2"
          color="#aae0da"
          label
          text-color="white"
        >
                            
        </v-chip>
        Frame Shift   
        <v-chip
          x-small
          class="ma-2"
          color="#e0c3aa"
          label
          text-color="white"
        >
          
        </v-chip>
        In Frame
        <v-chip
          x-small
          class="ma-2"
          color="#93afcd"
          label
          text-color="white"
        >
          
        </v-chip>
        Missens
        <v-chip
          x-small
          class="ma-2"
          color="#acddf2"
          label
          text-color="white"
        >
          
        </v-chip>
        Nonsense
        <v-chip
          x-small
          class="ma-2"
          color="#96a7f3"
          label
          text-color="white"
        >  
        </v-chip>
        silent
      </div>
      <v-spacer></v-spacer>
  
      <span
        class="mr-4"
      >
        Page {{ page }} of {{ numberOfPages }}
      </span>
      <v-btn
        x-small
        fab
        dark
        color="blue darken-3"
        class="mr-1"
        @click="formerPage"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        x-small
        fab
        dark
        color="blue darken-3"
        class="ml-1"
        @click="nextPage"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
    </template>     -->
  </v-data-table>
  <v-toolbar
    dark
    color="#7695b1"
    class="mb-1"
  > 
    <!-- <v-row
      align="center"
      justify="center"
    >
      <v-col cols="7">        -->
      <div class="text-center">
        Legend
        <v-chip
          x-small
          class="ma-2"
          color="#aae0da"
          label
          text-color="white"
        >
                            
        </v-chip>
        Frame Shift   
        <v-chip
          x-small
          class="ma-2"
          color="#e0c3aa"
          label
          text-color="white"
        >
          
        </v-chip>
        In Frame
        <v-chip
          x-small
          class="ma-2"
          color="#93afcd"
          label
          text-color="white"
        >
          
        </v-chip>
        Missens
        <v-chip
          x-small
          class="ma-2"
          color="#acddf2"
          label
          text-color="white"
        >
          
        </v-chip>
        Nonsense
        <v-chip
          x-small
          class="ma-2"
          color="#96a7f3"
          label
          text-color="white"
        >  
        </v-chip>
        silent
      </div>
      <!-- </v-col>  -->
      <v-spacer></v-spacer>
      <!-- <v-col cols="5"> -->
      <div class="page">  
      <span
        class="mr-4"
      >
        Page {{ page }} of {{ numberOfPages }}
      </span>
      <v-btn
        x-small
        fab
        dark
        color="blue darken-3"
        class="mr-1"
        @click="formerPage"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        x-small
        fab
        dark
        color="blue darken-3"
        class="ml-1"
        @click="nextPage"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      </div>
      <!-- </v-col> 
    </v-row> -->
  
  </v-toolbar>
</div>
</template>
<script>
export default {
name: 'tab',
props:['data','msg'],
computed: {
  numberOfPages () {
    return Math.ceil(this.newItems.length / this.itemsPerPage)
  },
  filteredKeys () {
    return this.keys.filter(key => key !== 'id')
  },
},
data() {
return {
    itemsPerPageArray: [8, 16],
    search: '',
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 8,
    sortBy: 'Gene_name',
    // keys: [
    //   'Name',
    //   'Calories',
    //   'Fat',
    //   'Carbs',
    //   'Protein',
    //   'Sodium',
    //   'Calcium',
    //   'Iron',
    // ],
    items: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: '8%',
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: '6%',
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: '3%',
        iron: '8%',
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        sodium: 327,
        calcium: '7%',
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        sodium: 50,
        calcium: '0%',
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        sodium: 38,
        calcium: '0%',
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        sodium: 562,
        calcium: '0%',
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        sodium: 326,
        calcium: '2%',
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        sodium: 54,
        calcium: '12%',
        iron: '6%',
      },
    ],
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
    ],
    // desserts: [
    //   {
    //     name: 'Frozen Yogurt',
    //     calories: 159,
    //     fat: 6.0,
    //     carbs: 24,
    //     protein: 4.0,
    //     iron: '1%',
    //   },
    //   {
    //     name: 'Ice cream sandwich',
    //     calories: 237,
    //     fat: 9.0,
    //     carbs: 37,
    //     protein: 4.3,
    //     iron: '1%',
    //   },
    //   {
    //     name: 'Eclair',
    //     calories: 262,
    //     fat: 16.0,
    //     carbs: 23,
    //     protein: 6.0,
    //     iron: '7%',
    //   },
    //   {
    //     name: 'Cupcake',
    //     calories: 305,
    //     fat: 3.7,
    //     carbs: 67,
    //     protein: 4.3,
    //     iron: '8%',
    //   },
    //   {
    //     name: 'Gingerbread',
    //     calories: 356,
    //     fat: 16.0,
    //     carbs: 49,
    //     protein: 3.9,
    //     iron: '16%',
    //   },
    //   {
    //     name: 'Jelly bean',
    //     calories: 375,
    //     fat: 0.0,
    //     carbs: 94,
    //     protein: 0.0,
    //     iron: '0%',
    //   },
    //   {
    //     name: 'Lollipop',
    //     calories: 392,
    //     fat: 0.2,
    //     carbs: 98,
    //     protein: 0,
    //     iron: '2%',
    //   },
    //   {
    //     name: 'Honeycomb',
    //     calories: 408,
    //     fat: 3.2,
    //     carbs: 87,
    //     protein: 6.5,
    //     iron: '45%',
    //   },
    //   {
    //     name: 'Donut',
    //     calories: 452,
    //     fat: 25.0,
    //     carbs: 51,
    //     protein: 4.9,
    //     iron: '22%',
    //   },
    //   {
    //     name: 'KitKat',
    //     calories: 518,
    //     fat: 26.0,
    //     carbs: 65,
    //     protein: 7,
    //     iron: '6%',
    //   },
    // ],
    newkeys:[],
    newItems:[],
    newHeaders:[],
    switchTable:false,
    // data:{},
    newData:[]
}
},
watch:{
  data(newv){
    console.log('监听')
    console.log(newv)
    this.load()
    
  }
},
created() {
  console.log('初始化')
  console.log(this.data)
  this.data&&this.emit();
  // this.load();
},
mounted() {
  
},
methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
    getColor (calories) {
      if (calories > 9000) return '#96a7f3'
      else if(calories > 7000) return '#acddf2'
      else if (calories > 5000) return '#93afcd'
      else if (calories > 3000) return '#e0c3aa'
      else return '#aae0da'
    },
    load(){
      // if(this.data==undefined||this.data.length==0){return } 
      this.newItems=[];
      this.newHeaders=[];

    //   console.log(this.data)
    //   console.log(this.switchTable)
    //  console.log(this.data.ccl_mutation_from_ccle)
    //  console.log(this.data.ccl_mutation_from_cosmic)
    //  let newData;
    //  if(this.switchTable){
    //    console.log('ccl_mutation_from_ccle')
    //    newData = this.data.ccl_mutation_from_ccle
    //  }else{
    //    console.log('ccl_mutation_from_cosmic')
    //    newData = this.data.ccl_mutation_from_cosmic
    //  }
      // let newData = this.switchTable?this.data.ccl_mutation_from_ccle:this.data.ccl_mutation_from_cosmic

      // console.log(newData)
      // if(!newData) return 
      // if(newData!==undefined&&newData.length>0){
      //   let newKeys = Object.keys(newData[0]);
      //   newKeys = newKeys.filter((item)=>item!='id')
      //   console.log(newKeys)
      //     newKeys.forEach((key)=>{
      //       let obj = {text:key,value:key};  

      //       this.newHeaders.push(obj) 
      //     })
        
          
      // }
  
      //   console.log(this.newHeaders)
       
      //   this.newItems = newData
       
      //   console.log(this.newItems)
      let newData = this.data;
      if(newData==undefined||newData.length==0){return } 
      this.newItems = newData
      let newKeys = Object.keys(newData[0]);
      newKeys = newKeys.filter((item)=>item!='id')
      newKeys.forEach((key)=>{
        let obj = {text:key,value:key};  
        this.newHeaders.push(obj) 
      })
      
      console.log(this.newItems)
      console.log(this.newHeaders)
    },
    // onselect(){
    //   fetch(this.baseUrl+'/api/omics/ccl/?cmp_id='+(this.select||this.search)+'&omics_type='+this.Omics.select3+'&gene_set='+this.Omics.select1+'&gene_list='+this.Omics.value2+'source='+(this.switchTable?'ccle':'cosmic')).then((res)=>{
    //     return res.json()
    //   }).then((data)=>{
    //     if(data.code==200){
    //       this.scatterData = data.datainfo;
    //     }else{
    //      this.$alert.error(data.message)
    //     }
    //   })
    //   this.Omics.disabled1 = false;
    //   this.Omics.disabled2 = false;
    // },
    // onselectTable(){
    //   fetch(this.baseUrl+'/api/omics/ccltable/?cmp_id='+(this.select||this.search)+'&omics_type='+this.Omics.select3+'&gene_set='+this.Omics.select1+'&gene_list='+this.Omics.value2+'source='+(this.switchTable?'ccle':'cosmic')).then((res)=>{
    //     return res.json()
    //   }).then((data)=>{
    //     if(data.code==200){
    //       this.scatterData = data.datainfo;
    //     }else{
    //      this.$alert.error(data.message)
    //     }
    //   })
    //   this.Omics.disabled1 = false;
    //   this.Omics.disabled2 = false;
    // },
    emit(){
      var source = this.switchTable?'ccle':'cosmic'
      this.$EventBus.$emit(this.msg, source)
    },
    onchange(){
      this.emit()
    }
  },
}
</script>
<style scoped>

</style>