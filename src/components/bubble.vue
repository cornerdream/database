<!-- 气泡图 -->
<template>
<div :id="id"></div>
</template>
<script>
import $ from 'jquery'
import { Chart } from '@antv/g2';
export default {
name: 'bubble',
props:{
  id:{
    default:'bubble'
  },
  height:{
    default:500
  },
  data:{
    default:()=>[]
  },
  x:{
    default:''
  },
  y:{
    default:''
  }
},
// props:['id','height','data','x','y'],
data() {
return {
  
}
},
watch:{
  data(){
    console.log('data')
    this.antv2()
  }
},
created() {},
mounted() {
    this.antv2()
},
methods:{
   
    antv2(){
      $('#'+this.id).html('')
      let _this = this;
      let data =[];
      data = this.data
     
    //   const colorMap = {
    //   Asia: '#1890FF',
    //   Americas: '#2FC25B',
    //   Europe: '#FACC14',
    //   Oceania: '#223273',
    // };
    // const color=['#1890FF','#2FC25B','#FACC14','#223273']
   
        console.log(this.height)
        const chart = new Chart({
          container: this.id,
          autoFit: true,
          height: Number(this.height),
          padding: [50, 50, 50, 50],
        });
        chart.data(data);
        // 为各个字段设置别名
        // chart.scale({
        //   LifeExpectancy: {
        //     alias: '人均寿命（年）',
        //     nice: true,
        //   },
        //   Population: {
        //     type: 'pow',
        //     alias: '人口总数'
        //   },
        //   GDP: {
        //     alias: '人均国内生产总值($)',
        //     nice: true,
        //   },
        //   Country: {
        //     alias: '国家/地区'
        //   }
        // });
        // chart.axis(_this.x, {
          // label: {
            // formatter(value) {
            //   return (+value / 1000).toFixed(0) + 'k';
            // } // 格式化坐标轴的显示
          // }
        // });
        chart.axis(_this.y, {
          label: {
            formatter(value) {
              return (+value).toFixed(1);
            } // 格式化坐标轴的显示
          }
        });
        chart.tooltip({
          showTitle: false,
          showMarkers: false,
        });
        chart.legend(_this.y, false); // 该图表默认会生成多个图例，设置不展示 Population 和 Country 两个维度的图例
        chart.point().position([_this.x]+'*'+[_this.y])
          .size(_this.y, [4, 15])
          // .color('continent', val => {
          //   return colorMap[val];
          // })
          .color(_this.x)
          .shape('circle')
          .tooltip([_this.x]+'*'+[_this.y])
          .style(_this.x, () => {
            return {
              lineWidth: 1,
              strokeOpacity: 1,
              fillOpacity: 1,
              opacity: 0.65,
              // stroke: colorMap[val],
            };
          });
        chart.interaction('element-active');
        chart.render();

    }
}
}
</script>
<style scoped>
#bubble{
    width:960px;
    height:960px;
    font-family:"sans-serif";
    font-size:10; 
    text-anchor:middle
}
</style>