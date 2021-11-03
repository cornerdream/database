<!-- 基础或堆叠柱状图 -->
<template>

<div :id="id"></div>

</template>
<script>
import $ from 'jquery'
import { Column } from '@antv/g2plot';
import * as d3 from 'd3'
export default {
name: 'bar',
props:{
  id:{
    default:'bar'
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
},
// props:['data','id','x','y'],
data() {
return {
    boxId:'',
    chartData:[
      { time: '03-19', type: '101-1000', value: 32000 },
      { time: '03-19', type: '31-100', value: 30000 },
      { time: '03-19', type: '11-30', value: 27000 },
      { time: '03-19', type: '1-10', value: 24000 },
      { time: '03-20', type: '101-1000', value: 35000 },
      { time: '03-20', type: '31-100', value: 32000 },
      { time: '03-20', type: '11-30', value: 30000 },
      { time: '03-20', type: '1-10', value: 27000 },
      { time: '03-21', type: '101-1000', value: 39000 },
      { time: '03-21', type: '31-100', value: 37000 },
      { time: '03-21', type: '11-30', value: 34000 },
      { time: '03-21', type: '1-10', value: 30000 },
      { time: '03-22', type: '101-1000', value: 44000 },
      { time: '03-22', type: '31-100', value: 42000 },
      { time: '03-22', type: '11-30', value: 38000 },
      { time: '03-22', type: '1-10', value: 34000 },
      { time: '03-23', type: '101-1000', value: 47000 },
      { time: '03-23', type: '31-100', value: 44000 },
      { time: '03-23', type: '11-30', value: 40000 },
      { time: '03-23', type: '1-10', value: 36000 },
      { time: '03-24', type: '101-1000', value: 48000 },
      { time: '03-24', type: '31-100', value: 46000 },
      { time: '03-24', type: '11-30', value: 42000 },
      { time: '03-24', type: '1-10', value: 38000 },
      { time: '03-25', type: '101-1000', value: 50000 },
      { time: '03-25', type: '31-100', value: 48000 },
      { time: '03-25', type: '11-30', value: 44000 },
      { time: '03-25', type: '1-10', value: 38000 }
    ]
}
},
watch:{
  data(newv,oldv){
    
    if(newv!==oldv){
      this.antv2()
    }
    
  },
  
},
created() {
  
},
mounted() { 
    // this.antv2()
    this.load()
},
methods:{
  load(){
    const maxHeight = 400;
    const maxWidth = 600;
    const margin = {
      top: 20,
      right: 60,
      bottom: 20,
      left: 60,
    };
    const colorArray = ['#38CCCB', '#0074D9', '#2FCC40', '#FEDC00', '#FF4036', 'lightgrey'];
    const data = [
      {
        label: 'apple',
        value: 10,
      },
      {
        label: 'banana',
        value: 15,
      },
      {
        label: 'orange',
        value: 25,
      }
    ];
    const barWidth = 20;
    const xTicks = new Array(data.length + 1);
    for ( let i = 0; i <= data.length; i++ ) {
      xTicks[i] = i;
    }
    const getX = (d) => d.label;
    const getY = (d) => d.value; 
    const scaleX = d3.scalePoint()
      .domain(data.map(getX))
      .range([0, maxWidth - margin.left - margin.right])
      .padding(0.2)
    const scaleY = d3.scaleLinear()
      .domain([0, d3.max(data, getY)])
      .range([maxHeight - margin.top - margin.bottom, 0])
    const svg = d3.select('body')
      .append('svg')
      .attr('width', maxWidth)
      .attr('height', maxHeight)
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => scaleX(getX(d)) + margin.left - barWidth / 2)
      .attr('y', (d) => scaleY(getY(d)) + margin.top)
      .attr('width', barWidth - 1)
      .attr('height', (d) => maxHeight - margin.bottom - margin.top - scaleY(getY(d)))
      .attr('fill', (d, i) => colorArray[i % colorArray.length])
    const axisLeft = d3.axisLeft(scaleY);
    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(axisLeft);
    const axisBottom = d3.axisBottom(scaleX);
    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${maxHeight - margin.bottom})`)
      .call(axisBottom);
  },
    antv2(){
      $('#'+this.id).html('');
      let data = []
      data = this.data;
      console.log(data)
      if(data.length==0) return
      let stackedColumnPlot = new Column(this.id, {
        data,
        // isStack: true,
        xField: this.x,
        yField: this.y,
        seriesField: this.x,
        /** 设置颜色 */
        color: ['#1ca9e6', '#f88c24'],
        /** 设置间距 */
        marginRatio: 0.1,
        // 分组柱状图 组内柱子间的间距 (像素级别)
        dodgePadding: 2,
        // 分组柱状图 组间的间距 (像素级别)
        intervalPadding: 20,
        // label: {
          // 可手动配置 label 数据标签位置
          // position: 'middle', // 'top', 'bottom', 'middle'
          // 可配置附加的布局方法
          // layout: [
          //   // 柱形图数据标签位置自动调整
          //   { type: 'interval-adjust-position' },
          //   // 数据标签防遮挡
          //   { type: 'interval-hide-overlap' },
          //   // 数据标签文颜色自动调整
          //   { type: 'adjust-color' },
          // ],
        // },
        xAxis:{
          label:{
            rotate:-45
          }
        },
        legend: {
          layout: 'horizontal',
          position: 'top-right'
        }
      });

      stackedColumnPlot.render();
      
    }
}
}
</script>
<style scoped>
#bar{
  height: 500px;
}
</style>