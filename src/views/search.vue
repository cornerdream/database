<template>
  <div class="search">
    <!-- <sunburst/> -->
    <!-- <barplot/> -->
    <!-- <bar/> -->
    <!-- <boxplot/> -->
    <!-- <violin/> -->
    <!-- <wordcloud/> -->
    <!-- <scatter/> -->
    <!-- <heatmap/> -->
    <!-- <heatmapshape/> -->
    <!-- <network/> -->
    <!-- <lollipop/> -->
    <!-- <bubble/> -->
    <!-- <lineScatter/> -->
    <!-- <seq/> -->
    <!-- <Structure/> -->

    <v-row>
      <v-col
        v-for="(item,i) in cardItems"
        :key="i"
        cols="12"
        md="4"
      >
        <v-hover v-slot="{ hover }">
          <v-card 
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
          >
            <v-toolbar
                flat
                color="primary"
                dark
            >
                <v-toolbar-title>{{item.title}}</v-toolbar-title>
            </v-toolbar>
            <v-list>
              
              <v-list-item
                v-for="(list, j) in item.list"
                :key="j"
                @click="itemClick"
              >
                <!-- <v-list-item-icon> -->
                  <!-- <v-icon v-text="list.icon"></v-icon> -->
                  
                <!-- </v-list-item-icon> -->
                <v-list-item-content>
                  <v-row class="list">
                    <v-col cols="6" class="listT">
                      <v-list-item-title v-text="list.text"></v-list-item-title>
                    </v-col>
                    <v-col cols="6" class="listV">
                      <v-chip
                        class="ma-2"
                        color="primary"
                      >
                        {{list.value}}
                      </v-chip>
                    </v-col>
                  </v-row>
                  
                  
                </v-list-item-content>
              </v-list-item>
              
            </v-list>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>  
    
  </div>
</template>
<script>
// import sunburst from '../components/sunburst.vue'
// import barplot from '../components/barplot.vue'
// import bar from '../components/bar.vue'
// import boxplot from '../components/boxplot.vue'
// import violin from '../components/violin.vue'
// import wordcloud from '../components/wordcloud.vue'
// import Scatter from '../components/scatter.vue'
// import heatmap from '../components/heatmap.vue'
// import heatmapshape from '../components/heatmap-shape.vue'
// import network from '../components/network.vue'
// import lollipop from '../components/lollipop.vue'
// import bubble from '../components/bubble.vue'
// import lineScatter from '../components/lineScatter.vue'
// import seq from '../components/sequence.vue'
// import Structure from '../components/structure.vue'
// import {test} from '../api/test'
export default {
  name:'search',
  components:{
    // sunburst,
    // barplot,
    // bar,
    // boxplot,
    // violin,
    // wordcloud,
    // Scatter,
    // heatmap,
    // heatmapshape,
    // network,
    // lollipop,
    // bubble,
    // lineScatter,
    // seq,
    // Structure
  },
  data(){
    return{
      cardItems:[
        {
          title:'Literature',
          list:[
            {text:'Bookshelf',value:1238},
            {text:'MeSH',value:22},
            {text:'NLM Catalog',value:19},
            {text:'PubMed',value:23034},
            {text:'PubMed Central',value:65047},
          ]
        },
        {
          title:'Genes',
          list:[
            {text:'Gene',value:6671},
            {text:'GEO DattaSets',value:9991},
            {text:'GEO Profiles',value:193438},
            {text:'HomoloGene',value:13},
            {text:'PopSet',value:42},
          ]
        },
        {
          title:'Protenis',
          list:[
            {text:'Conserved Domains',value:22},
            {text:'Indentical Protein Groups',value:22},
            {text:'Protein',value:5159},
            {text:'Protein Family Models',value:49},
            {text:'Structure',value:227},
          ]
        }
      ]
    }
  },
  created(){
    this.load()
  },
  methods:{
    async load(){
      // const {data} = await test();
      // console.log(data)
      
    },
    itemClick(){
      let routeUrl = this.$router.resolve({path: '/ModelAtlas',query: {view:'Overview'}});
      window.open(routeUrl.href, '_blank');
    }

  }
}
</script>
<style scoped>
.list.row{
  margin: 0;
}
.list .listT{
  display: flex;
  text-align: left;
  padding: 0;
}
.list .listV{
  text-align: right;
  padding: 0;
}
.v-chip.v-size--default{
  height: 20px;
}
.v-card {
transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
opacity: 0.9;
 }
</style>

