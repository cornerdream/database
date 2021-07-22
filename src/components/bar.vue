<!-- -->
<template>
<div id="bar">

</div>
</template>
<script>
import * as d3 from 'd3'
import { Chart } from '@antv/g2';
export default {
name: 'barplot',
props:['data'],
data() {
return {
    d3data:[
        { type: '1-3秒', value: '0.16' },
        { type: '4-10秒', value: '0.125'},
        { type: '11-30秒', value: '0.24'},
        { type: '31-60秒', value: '0.19'},
        { type: '1-3分', value: '0.22'},
        { type: '3-10分', value: '0.05' },
        { type: '10-30分', value: '0.01'},
        { type: '30+分', value: '0.015' },
    ],
    antvData:[
        { year: '2013', value: -3.1 },
        { year: '2014', value: 0.8 },
        { year: '2015', value: 2.3 },
        { year: '2016', value: 3.5 },
        { year: '2017', value: 5.4 },
    ]
}
},
watch:{
  data(){
    this.load()
  }
},
created() {
  
},
mounted() {

    this.load()
    // this.antv()
},
methods:{
    
    load(){
       console.log(this.data)
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // set the ranges
        var x = d3.scaleBand()
                .range([0, width])
                .padding(0.1)
           
        var y = d3.scaleLinear()
                .range([height, 0]);
                
        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("#bar").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");

        // get the data
        

            // Scale the range of the data in the domains
            x.domain(this.d3data.map(function(d) { 
                return d.type;
                // return d.type; 
            }));
            y.domain([0, d3.max(this.d3data, function(d) { 
                // for(var i=0;i<d.value.length;i++){
                //     return d.value[i]
                // }
                return d.value; 
            })]);

            // append the rectangles for the bar chart
            svg.selectAll(".bar")
                .data(this.d3data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { 
                    // return x()+1; 
                    return x(d.type); 
                })
                // .attr("width", x.bandwidth())
                .attr("width", 1)
                .attr("y", function(d) { 
                    // for(var i=0;i<d.value.length;i++){
                    //     return d.value[i]
                    // }
                    return y(d.value); 
                })
                // .colorAccessor(d => d.type)
                // .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F", "grey", "purple"])
                .attr("height", function(d) { 
                    // for(var i=0;i<d.value.length;i++){
                    //     return height - y(d.value[i])
                    // }
                    return height - y(d.value); 
                });

            // add the x Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // add the y Axis
            svg.append("g")
                .call(d3.axisLeft(y));

        



    },
    antv(){
        const chart = new Chart({
  container: 'bar',
  autoFit: true,
  height: 500,
  width:1,
});
chart.data(this.antvData);
chart.scale('value', {
  alias: '现金流(亿)',
  nice: true,
});
chart.axis('year', {
  tickLine: null,
});

chart.axis('value', {
  label: null,
  title: {
    offset: 30,
  },
});

chart.tooltip({
  showMarkers: false,
});
chart.interaction('active-region');

chart.legend(false);
chart
  .interval()
  .position('year*value')
  .color('year', (val) => {
    if (val === '2013') {
      return '#36c361';
    }
    return '#ff5957';
  })
  .label('year*value', (year, value) => {
    return {
      content: (originData) => {
        if (originData.year === '2014') {
          return null;
        }
        return value;
      },
    };
  });

chart.render();

// 使用  html 添加特殊标注
const position = chart.getXY({ year: '2014', value: 0.8 });
const div = document.createElement('div');
div.className = 'g2-label-spec';
div.innerHTML = `新产品上市破局，现金流<span class="g2-label-spec-value"> 0.8 </span>亿`;
div.setAttribute('style', `top: ${position.y - 34}px; left: ${position.x - 100}px`);
const chartContainer = chart.getCanvas().get('bar');
chartContainer.appendChild(div);
    }
}
}
</script>
<style scoped></style>