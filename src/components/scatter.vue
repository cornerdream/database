<!-- -->
<template>
<div id="scatter">
 
</div>
</template>
<script>
import { Scatter } from '@antv/g2plot';
import { Chart } from '@antv/g2';
import $ from 'jquery'
export default {
name: 'scatter',
props:['data','x','y'],
data() {
return {
  scatterChart:'',
  antvData:[],
  scatterData:[],
  
}
},
watch:{
  data(){
    // this.antv()
    this.data&&this.antv2()
  }
},
created() {
},
mounted() {
 
  // this.antv()
  this.antv2()
},
methods:{
    antv(){
      $('#scatter').html('')
      this.antvData=[];
      for(var item in this.data){
        
        for(var obj in this.data[item]){
        
          let type1 = {'gender':item}
        
          type1['height'] = obj;
          var value1;
          if(typeof this.data[item][obj]=='object'){
            value1 = Object.values(this.data[item][obj]).reduce((prev,next)=>prev+next)
          }else{
            value1 = this.data[item][obj]
          }
        
          type1['weight'] = value1;
        
          this.antvData.push(type1)
        } 
     
      }
      this.scatterChart = new Chart({
        container: 'scatter',
        autoFit: true,
        height: 500
      });
      // 数据格式： [{"gender":"female","height":161.2,"weight":51.6}]
      this.scatterChart.data(this.antvData);
      this.scatterChart.scale({
        height: { nice: true },
        weight: { nice: true },
      });
      this.scatterChart.tooltip({
        showTitle: false,
        showCrosshairs: true,
        crosshairs: {
          type: 'xy',
        },
        itemTpl: '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">'
          + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
          + '{name}<br/>'
          + '{value}'
          + '</li>'
      });
      this.scatterChart
        .point()
        .position('height*weight')
        .color('gender')
        .shape('circle')
        .tooltip('gender*height*weight', (gender, height, weight) => {
          return {
            name: gender,
            value: height + ', ' + weight + ''
          };
        })
        .style({
          fillOpacity: 0.85
        });
      this.scatterChart.interaction('legend-highlight');
      this.scatterChart.render();
    },
    antv2(){
      $('#scatter').html('')
      this.scatterData=[];
      if(!this.data){return}
      if(Array.isArray(this.data)){
        this.data.map((item)=>{
          let type1 = {'Genre':item[this.x]}
          type1['Revenue (Millions)'] = item[this.x];
          type1['Rating'] = item[this.y];
          this.scatterData.push(type1)
        })
      }else{
        for(var item in this.data){
          console.log(item)
          for(var obj in this.data[item]){
            console.log(obj)
            let type1 = {'Genre':item}
          
            type1['Revenue (Millions)'] = obj;
            var value1;
            if(typeof this.data[item][obj]=='object'){
              value1 = Object.values(this.data[item][obj]).reduce((prev,next)=>prev+next)
            }else{
              value1 = this.data[item][obj]
            }
            
          
            type1['Rating'] = value1;
            console.log(value1)
            this.scatterData.push(type1)
          } 
      
        }
      }
      const scatterPlot = new Scatter('scatter', {
        appendPadding: 10,
        data:this.scatterData,
        tooltip: {
          formatter: (datum) => {
            return { name: datum['Revenue (Millions)'], value: datum['Rating'] + '' };
          },
        },
        xField: 'Revenue (Millions)',
        yField: 'Rating',
        shape: 'circle',
        colorField: 'Genre',
        size: 4,
        yAxis: {
          min:0,
          nice: true,
          line: {
            style: {
              stroke: '#aaa',
            },
          },
        },
        xAxis: {
          min: 0,
          grid: {
            line: {
              style: {
                stroke: '#eee',
              },
            },
          },
          line: {
            style: {
              stroke: '#aaa',
            },
          },
        },
        animation: {
          // 配置图表第一次加载时的入场动画
          appear: {
            animation: 'wave-in', // 动画效果
            duration: 1000,  // 动画执行时间
          },
        }
      });
      scatterPlot.render();
    }
  }
}
</script>
<style scoped>
#scatter{
  height: 500px;
}
</style>