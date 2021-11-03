<!-- 分组柱状图 -->
<template>
<div :id="id" style="position:relative"></div>
</template>
<script>
import $ from 'jquery'
import { Column } from '@antv/g2plot';
import * as d3 from 'd3'
// import { AxisType } from '@antv/g2plot/lib/plots/dual-axes/types';
export default {
name: '',
props:{
  id:{
    default:'barGroup'
  },
  data:{
    default:()=>[]
  },
  columns:{
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
        {'type':'a','group': 'banana', Nitrogen : '12', normal: '1', stress: '13'},
        {'type':'a','group': 'poacee', Nitrogen: '6', normal: '6', stress: '33'},
        {'type':'b','group': 'sorgho', Nitrogen: '11', normal: '28', stress: '12'},
        {'type':'c','group': 'triticum', Nitrogen: '19', normal: '6', stress: '1'},
        
    ],

    // columns:['type','group', 'Nitrogen', 'normal', 'stress'],
    typecolumns:['type','group', 'modelname', 'species', 'vartain','gene'],
    typedata:[
      {'type':'a','group': 'banana', modelname : 'pdx', species: 'human', vartain: 'ad',gene:'ftm',count:12},
      {'type':'a','group': 'poacee', modelname : 'pjx', species: 'mouse', vartain: 'cb',gene:'fdm',count:1},
      {'type':'a','group': 'sorgho', modelname : 'pnx', species: 'mouse', vartain: 'de',gene:'fdm',count:13},
      {'type':'b','group': 'poacee2', modelname: 'pdx', species: 'mouse', vartain: 'ad',gene:'fdm',count:6},
      {'type':'b','group': 'sorgho2', modelname: 'pdx', species: 'human', vartain: 'ad',gene:'ftm',count:6},
      {'type':'b','group': 'triticum', modelname: 'pnx', species: 'human', vartain: 'cb',gene:'fdm',count:33},
    ],
    type:['a'],
    group:['banana'],
    modelname:['pdx'],
    species:['human'],
    vartain:['ad'],
    gene:['ftm'],
    color:[
    '#2dcf00',
    '#ff5353',
    '#5b5bff',
    '#025DF4',
    '#DB6BCF',
    '#2498D1',
    '#BBBDE6',
    '#4045B2',
    '#21A97A',
    '#FF745A',
    '#007E99',
    '#FFA8A8',
    '#2391FF',
    '#FFC328',
    '#A0DC2C',
    '#946DFF',
    '#626681',
    '#EB4185',
    '#CD8150',
    '#36BCCB',
    '#327039',
    '#803488',
    '#83BC99',
  ],
  newtypedata:[],
  groupkey:['Cancer Type','Model Name'],
}
},
watch:{
    data(){
        console.log('data')
        // this.antv()
        this.load()
    },
},
created() {},
mounted() {
    // this.antv()
    this.load()
},
methods:{
  load2(){
    var typedata = {};
     this.typedata.forEach(item=>{
       if(!typedata[item.type]){
         typedata[item.type]=[item]
       }else{
        typedata[item.type].push(item)
       }
     })
    console.log(typedata)
    var colors = this.color;
     var margin = {top: 10, right: 30, bottom: 50, left: 50},
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
            var data = this.typedata;
            console.log(data)
            // console.log(data.columns)
        // List of subgroups = header of the csv files = soil condition here
        var subgroups = this.typecolumns.slice(2)
console.log(subgroups)
        // List of groups = species here = value of the first column called group -> I show them on the X axis
        var types = d3.map(data,function(d){return(d.type)}).keys()
        console.log(types)
        var groups = d3.map(data, function(d){return(d.group)}).keys()
console.log(groups)
        // Add X axis
        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        console.log(x)
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0))
            .selectAll('text')
            .attr('font-size','14px')
            .attr('text-anchor','end')
            .attr('dx','-1em')
            .attr('dy','.15em')
            . attr('transform','rotate(-45,-10,-20)')

//         // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 40])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

//         // Another scale for subgroup position?
        var xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.05])
        console.log(xSubgroup)
        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(colors)

//         // Show the bars
        svg.selectAll("tg")
           .data(types)
           .enter()
           .append('g')
          .selectAll('mg')
        .data(function(d){
          console.log(d)
          return typedata[d]
        })
        .enter()
        .append('g')
        .attr("transform", function(d) { 
              console.log(d)
              console.log(x(d.group))
              return "translate(" + x(d.group) + ",0)"; 
            })
            .selectAll("rect")
            .data(function(d) { 
              console.log(d)
              return subgroups.map(function(key) { return {key: key, value: d.count}; }); 
            })
            // .data(subgroups)
            .enter().append("rect")
            .attr("x", function(d) { return xSubgroup(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", xSubgroup.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return color(d.key); });
        
    
  },
  load(){
    // $('#'+this.id).css({'position':'relative'});
    $('#'+this.id).html(' ')
    var _this = this;
    var typedata = {};
    console.log(this.data)
    var data = this.data;
    console.log(data) 
    data.forEach(item=>{
       if(!typedata[item['Cancer Type']]){
         typedata[item['Cancer Type']]=[item]
       }else{
        typedata[item['Cancer Type']].push(item)

       }
     })
    console.log(typedata)
    var colors = this.color;
    var values=[]
    data.forEach(item=>{
      var arr = Object.values(item)
      values.push(...arr)
    })
    console.log(values)
    values = [...new Set(values)]
    console.log(values)
    values=values.filter(el=>typeof el=='number')
    console.log(values)
    var max = Math.max(...values)
    console.log(max)
    var margin = {top: 10, right: 30, bottom: 140, left: 50},
        width = 860 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#"+this.id)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")")
                .attr("position","relative")

    // Parse the Data
     

    // List of subgroups = header of the csv files = soil condition here
    var subgroups = this.columns.filter(item=>{
      return this.groupkey.indexOf(item)<0
    })
    // var subgroups = this.columns.slice(2)
    console.log(subgroups)
    //cancertype 分组
    var types = d3.map(data,function(d){return(d['Cancer Type'])}).keys()
    console.log(types)
    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function(d){return(d['Model Name'])}).keys()
    console.log(groups)
    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    console.log(x)
    //x轴标签
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll('text')
        .attr('font-size','14px')
        .attr('text-anchor','end')
        // .attr('dx','-1em')
        // .attr('dy','.15em')
        . attr('transform','rotate(-45,10,0)')

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, max])
        .range([ height, 0 ]);
    console.log(y)
    //y标签
    svg.append("g")
        .call(d3.axisLeft(y));

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])
    console.log(xSubgroup)
    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
                  .domain(subgroups)
                  .range(colors)
    var tcolor = d3.scaleOrdinal()
                    .domain(types)
                    .range(colors)    
    //上方分组柱形图
    svg.selectAll("tg")
        .data(types)
        .enter()
        .append('g')
        .selectAll('mg')
        .data(function(d){return typedata[d]})
        .enter()
        .append('g')
        .attr("transform", function(d) { return "translate(" + x(d['Model Name']) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
        .attr("x", function(d) { return xSubgroup(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return color(d.key); })
        .attr('class','model')
    //下方cancertype矩形图
    svg.selectAll("cg")
        .data(types)
        .enter()
        .append('g')
        .selectAll('myrect')
        .data(function(d){return typedata[d].slice(0,1)})
        .enter()
        .append('rect')
        .attr('x',function(d){return x(d['Model Name']);})
        .attr('y',height+116)
        .attr('width',function(d){return x.step()*typedata[d['Cancer Type']].length})
        .attr('height',24)
        .attr('fill',function(d) { return tcolor(d['Cancer Type']); })
        .attr('type',function(d) { return d['Cancer Type']})
        .attr('class','cancer')   
        
    //下方cancertype文字      
    svg.selectAll("textg")
          .data(types)
          .enter()
          .append('g')
          .selectAll('mytext')
          .data(function(d){
            return typedata[d].slice(0,1)
          })
          .enter()
          .append('text')
          .attr('x',function(d){return x(d['Model Name']);})
          .attr('y',height+116)
          .attr('fill','#fff')
          .attr('text-anchor',"middle")
          .attr('dx',function(d){return (x.step()*typedata[d['Cancer Type']].length/24)+'em'})
          .attr('dy',(24/16)+'em')
          .text(function(d){   return d['Cancer Type']})
    // 上方toolip

    //下方toolip
    svg.selectAll(".cancer").on('mouseover', function () {
      var type = $(this).attr('type')
      let t = document.createElement('div')
      typedata[type].forEach(item=>{   
        let div = document.createElement('div')
        div.setAttribute('id','group')
        for(var key in item){
          let p = document.createElement('p')
          p.innerHTML ='<p>'+key+':'+item[key]+'<p>'
          div.appendChild(p)
        }
        t.appendChild(div)
      })
      d3.select('#'+_this.id)
              .append(function(){
                return t
              })
              .attr("id", "cancertip")
              .attr("style", "display:flex;align-items:center;justify-content:space-around;padding:6px;background-color:white;border:1px solid #ccc;border-radius:10px;box-shadow: 4px 4px 10px rbga(0, 0, 0, 0.4);position:absolute;left:20px" + ";top:0")             

      });
      svg.selectAll(".cancer").on('mouseout', function () {
        d3.select("#cancertip").remove();
      });         
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
            // 分组柱状图 组内柱子间的间距 (像素级别)
            dodgePadding: 2,
            // 分组柱状图 组间的间距 (像素级别)
            intervalPadding: 20,
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
#barGroup{
  position: relative;
}
</style>