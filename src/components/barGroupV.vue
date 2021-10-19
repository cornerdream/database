<!-- 分组柱状图 -->
<template>
<div :id="id"></div>
</template>
<script>
import $ from 'jquery'
import { Column } from '@antv/g2plot';
import * as d3 from 'd3'
export default {
name: '',
props:{
  id:{
    default:'barGroup'
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
// props:['data'],
data() {
return {
    barData:[
        {
    name: 'London',
    月份: 'Jan.',
    月均降雨量: 18.9,
  },
  {
    name: 'London',
    月份: 'Feb.',
    月均降雨量: 28.8,
  },
  {
    name: 'London',
    月份: 'Mar.',
    月均降雨量: 39.3,
  },
  {
    name: 'London',
    月份: 'Apr.',
    月均降雨量: 81.4,
  },
  {
    name: 'London',
    月份: 'May',
    月均降雨量: 47,
  },
  {
    name: 'London',
    月份: 'Jun.',
    月均降雨量: 20.3,
  },
  {
    name: 'London',
    月份: 'Jul.',
    月均降雨量: 24,
  },
  {
    name: 'London',
    月份: 'Aug.',
    月均降雨量: 35.6,
  },
  {
    name: 'Berlin',
    月份: 'Jan.',
    月均降雨量: 12.4,
  },
  {
    name: 'Berlin',
    月份: 'Feb.',
    月均降雨量: 23.2,
  },
  {
    name: 'Berlin',
    月份: 'Mar.',
    月均降雨量: 34.5,
  },
  {
    name: 'Berlin',
    月份: 'Apr.',
    月均降雨量: 99.7,
  },
  {
    name: 'Berlin',
    月份: 'May',
    月均降雨量: 52.6,
  },
  {
    name: 'Berlin',
    月份: 'Jun.',
    月均降雨量: 35.5,
  },
  {
    name: 'Berlin',
    月份: 'Jul.',
    月均降雨量: 37.4,
  },
  {
    name: 'Berlin',
    月份: 'Aug.',
    月均降雨量: 42.4,
  },
        
        
    ],
    d3Data:[
        {group: 'banana', Nitrogen: '12', normal: '1', stress: '13'},
        {group: 'poacee', Nitrogen: '6', normal: '6', stress: '33'},
        {group: 'sorgho', Nitrogen: '11', normal: '28', stress: '12'},
        {group: 'triticum', Nitrogen: '19', normal: '6', stress: '1'},
        
    ],
    columns:['group', 'Nitrogen', 'normal', 'stress']
}
},
watch:{
    data(){
        console.log('data')
        this.antv()
        // this.load()
    },
},
created() {},
mounted() {
    this.antv()
    // this.load()
},
methods:{
    load(){
        var margin = {top: 10, right: 30, bottom: 20, left: 50},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#"+this.id)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Parse the Data
        // d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv", function(data) {
            var data = this.d3Data;
            console.log(data)
            console.log(data.columns)
        // List of subgroups = header of the csv files = soil condition here
        var subgroups = this.columns.slice(1)
console.log(subgroups)
        // List of groups = species here = value of the first column called group -> I show them on the X axis
        var groups = d3.map(data, function(d){return(d.group)}).keys()
console.log(groups)
        // Add X axis
        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 40])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Another scale for subgroup position?
        var xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.05])

        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#e41a1c','#377eb8','#4daf4a'])

        // Show the bars
        svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
            .enter().append("rect")
            .attr("x", function(d) { return xSubgroup(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", xSubgroup.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return color(d.key); });

        // })

    },

    antv(){
        let _this = this;
        let newData = []
        $('#'+_this.id).html(' ');
        newData = this.barData;
        console.log(newData)
        console.log(_this.id)
        const stackedColumnPlot = new Column(_this.id, {
            data:newData,
            isGroup: true,
            xField: '月份',
            yField: '月均降雨量',
            seriesField: 'name',
            /** 设置颜色 */
            color: ['#1ca9e6', '#f88c24'],
            /** 设置间距 */
            marginRatio: 0.1,
            // label: {
                // 可手动配置 label 数据标签位置
                //position: 'middle', // 'top', 'middle', 'bottom'
                // 可配置附加的布局方法
                // layout: [
                //     // 柱形图数据标签位置自动调整
                //     { type: 'interval-adjust-position' },
                //     // 数据标签防遮挡
                //     { type: 'interval-hide-overlap' },
                //     // 数据标签文颜色自动调整
                //     { type: 'adjust-color' },
                // ],
                
            // },
        });

        stackedColumnPlot.render();
        
    }
}
}
</script>
<style scoped></style>