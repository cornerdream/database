<!-- 小提琴图 -->
<template>
<div id="violin">

</div>
</template>
<script>
import { Violin } from '@antv/g2plot';
export default {
name: 'violin',
data() {
return {}
},
created() {},
mounted() {
  this.antv()
},
methods:{
  antv(){
    fetch('https://gw.alipayobjects.com/os/bmw-prod/6b0a5f1d-5931-42ae-b3ba-3c3cb77d0861.json')
    .then((response) => response.json())
    .then((data) => {
      const violinPlot = new Violin('violin', {
        height: 500,
        data: data,
        xField: 'x',
        yField: 'y',
      });
      violinPlot.render();
    });
  },
    
}
}

</script>
<style scoped></style>