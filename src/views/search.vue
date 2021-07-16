<template>
  <div class="about">
    <sunburst/>
    <barplot/>
    <bar/>
    <boxplot/>
    <violin/>
    <wordcloud/>
    <scatter/>
    <heatmap/>
    <heatmapshape/>
    <network/>
    <lollipop/>
    <bubble/>
  </div>
</template>
<script>
import sunburst from '../components/sunburst.vue'
import barplot from '../components/barplot.vue'
import bar from '../components/bar.vue'
import boxplot from '../components/boxplot.vue'
import violin from '../components/violin.vue'
import wordcloud from '../components/wordcloud.vue'
import Scatter from '../components/scatter.vue'
import heatmap from '../components/heatmap.vue'
import heatmapshape from '../components/heatmap-shape.vue'
import network from '../components/network.vue'
import lollipop from '../components/lollipop.vue'
import bubble from '../components/bubble.vue'
// import {test} from '../api/test'
export default {
  name:'about',
  components:{
    sunburst,
    barplot,
    bar,
    boxplot,
    violin,
    wordcloud,
    Scatter,
    heatmap,
    heatmapshape,
    network,
    lollipop,
    bubble
  },
  data(){
    return{
      cmp_id:[]
    }
  },
  created(){
    this.load()
  },
  methods:{
    async load(){
      // const {data} = await test();
      // console.log(data)
      
    }

  }
}
</script>

