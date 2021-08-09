<!-- -->
<template>
<div id="heatmap-shape"></div>
</template>
<script>
import { Heatmap } from '@antv/g2plot';
export default {
name: 'heatmap-shape',
data() {
return {}
},
created() {},
mounted() {
    this.antv()
},
methods:{
    antv(){
        fetch('https://gw.alipayobjects.com/os/bmw-prod/68d3f380-089e-4683-ab9e-4493200198f9.json')
  .then((res) => res.json())
  .then((data) => {
    const heatmapPlot = new Heatmap(document.getElementById('heatmap-shape'), {
      data,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      shape: 'circle',
      sizeRatio: 0.5,
      color: ['#0d5fbb', '#7eadfc', '#fd8b6f', '#aa3523'],
      label: {
        style: {
          fill: '#fff',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
    });
    heatmapPlot.chart.interaction('brush');
    heatmapPlot.render();
  });

    }
}
}
</script>
<style scoped></style>