<!-- 基础或堆叠柱状图 -->
<template>

<div :id="id"></div>

</template>
<script>
import $ from 'jquery'
import { Column } from '@antv/g2plot';
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
    this.antv2()
},
methods:{
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