<!-- -->
<template>
<div id="boxplot">

</div>
</template>
<script>
import * as d3 from 'd3'
import { Box } from '@antv/g2plot';
export default {
name: 'boxplot',
data() {
return {
  
}
},
created() {},
mounted() {
    this.antv()
    // this.load()
},
methods:{
    antv(){
     const data =[
  { Species: 'I. setosa', type: 'SepalLength', value: 5.1, _bin: [4.3, 4.8, 5, 5.2, 5.8] },
  { Species: 'I. setosa', type: 'SepalWidth', value: 3.5, _bin: [2.3, 3.2, 3.4, 3.7, 4.4] },
  { Species: 'I. setosa', type: 'PetalLength', value: 1.4, _bin: [1, 1.4, 1.5, 1.6, 1.9] },
  { Species: 'I. setosa', type: 'PetalWidth', value: 0.2, _bin: [0.1, 0.2, 0.2, 0.3, 0.6] },
  { Species: 'I. versicolor', type: 'SepalLength', value: 7, _bin: [4.9, 5.6, 5.9, 6.3, 7] },
  { Species: 'I. versicolor', type: 'SepalWidth', value: 3.2, _bin: [2, 2.5, 2.8, 3, 3.4] },
  { Species: 'I. versicolor', type: 'PetalLength', value: 4.7, _bin: [3, 4, 4.35, 4.6, 5.1] },
  { Species: 'I. versicolor', type: 'PetalWidth', value: 1.4, _bin: [1, 1.2, 1.3, 1.5, 1.8] },
  { Species: 'I. virginica', type: 'SepalLength', value: 6.3, _bin: [4.9, 6.2, 6.5, 6.9, 7.9] },
  { Species: 'I. virginica', type: 'SepalWidth', value: 3.3, _bin: [2.2, 2.8, 3, 3.2, 3.8] },
  { Species: 'I. virginica', type: 'PetalLength', value: 6, _bin: [4.5, 5.1, 5.55, 5.9, 6.9] },
  { Species: 'I. virginica', type: 'PetalWidth', value: 2.5, _bin: [1.4, 1.8, 2, 2.3, 2.5] },
];

const groupBoxPlot = new Box('boxplot', {
  data,
  xField: 'type',
  yField: '_bin',
  groupField: 'Species',
});

groupBoxPlot.render();

    },
    load(){
        // set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#boxplot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Read the data and compute summary statistics for each specie
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function(data) {
  console.log(data)
  // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.Species;})
    .rollup(function(d) {
      var q1 = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.25)
      var median = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.5)
      var q3 = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.75)
      var interQuantileRange = q3 - q1
      var min = q1 - 1.5 * interQuantileRange
      var max = q3 + 1.5 * interQuantileRange
      return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
    })
    .entries(data)

  // Show the X scale
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(["setosa", "versicolor", "virginica"])
    .paddingInner(1)
    .paddingOuter(.5)
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  // Show the Y scale
  var y = d3.scaleLinear()
    .domain([3,9])
    .range([height, 0])
  svg.append("g").call(d3.axisLeft(y))

  // Show the main vertical line
  svg
    .selectAll("vertLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key))})
      .attr("x2", function(d){return(x(d.key))})
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 40)

  // rectangle for the main box
  var boxWidth = 100
  svg
    .selectAll("boxes")
    .data(sumstat)
    .enter()
    .append("rect")
        .attr("x", function(d){return(x(d.key)-boxWidth/2)})
        .attr("y", function(d){return(y(d.value.q3))})
        .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
        .attr("width", boxWidth )
        .attr("stroke", "black")
        .style("fill", "#69b3a2")

  // Show the median
  svg
    .selectAll("medianLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
      .attr("y1", function(d){return(y(d.value.median))})
      .attr("y2", function(d){return(y(d.value.median))})
      .attr("stroke", "black")
      .style("width", 80)
})
    }
}
}
</script>
<style scoped></style>