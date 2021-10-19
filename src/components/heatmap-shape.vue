<!-- 可框选的圆形热图 -->
<template>
<div :id="id"></div>
</template>
<script>
import $ from 'jquery'
import { Heatmap } from '@antv/g2plot';
export default {
name: 'heatmap-shape',
props:{
  id:{
    default:'heatmap-shape'
  },
  data:{
    default:()=>[]
  },
  x:{
    default:''
  },
  y:{
    default:''
  },
  z:{
    default:''
  }
},
data() {
return {}
},
watch:{
    data(){
        console.log('data')
        this.antv2()
        
    },
},
created() {},
mounted() {
    this.antv2()
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

    },
    antv2(){
      $('#'+this.id).html('')
      // fetch('https://gw.alipayobjects.com/os/bmw-prod/68d3f380-089e-4683-ab9e-4493200198f9.json')
      // .then((res) => res.json())
      // .then((data) => {
        var data = this.data;
        let _this = this;   
        const heatmapPlot = new Heatmap(document.getElementById(this.id), {
          data,
          xField: _this.x,
          yField: _this.y,
          colorField: _this.z,
          sizeField: _this.z,
          shape: 'circle',
          // color: ['#dddddd', '#9ec8e0', '#5fa4cd', '#2e7ab6', '#114d90'],
          label: {
            style: {
              fill: '#fff',
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)',
            },
          },
        });
        heatmapPlot.render();
      // });
    }
}
}
</script>
<style scoped></style>