<!-- -->
<template>
<div id="wordcloud">

</div>
</template>

<script>
import { WordCloud } from '@antv/g2plot';
export default {
name: 'wordcloud',
data() {
return {}
},
created() {},
mounted() {
  this.antv()
  
},
methods:{
  antv(){
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
    .then((res) => res.json())
    .then((data) => {
      const wordCloud = new WordCloud('wordcloud', {
        data,
        wordField: 'name',
        weightField: 'value',
        colorField: 'name',
        wordStyle: {
          fontFamily: 'Verdana',
          fontSize: [8, 32],
          rotation: 0,
        },
        // 返回值设置成一个 [0, 1) 区间内的值，
        // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
        random: () => 0.5,
      });

      wordCloud.render();
    });
  },
  
}
}
</script>
<style scoped></style>