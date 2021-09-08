<!-- -->
<template>
<div id="lollipop">
</div>
</template>
<script>
import * as d3 from 'd3'
import $ from 'jquery'
export default {
name: 'lollipop',
props:['data'],
data() {
return {
  color:['#2dcf00','#ff5353','#5b5bff'],
  scatterData:[
    {
      Country:'United States',
      Value:123
    },
    {
      Country:'Russia',
      Value:61
    },
    {
      Country:'Germany (FRG)',
      Value:16
    },
    {
      Country:'France',
      Value:21
    },
    {
      Country:'United Kingdom',
      Value:12
    },
    {
      Country:'China',
      Value:11
    },
    {
      Country:'Spain',
      Value:8
    },
    {
      Country:'Netherlands',
      Value:11
    },
    {
      Country:'Italy',
      Value:66
    },
    {
      Country:'Israel',
      Value:12
    }
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
},
methods:{
    load(){
      $('#lollipop').html(' ');
      var _this = this;
      var data = this.data
      var margin = {top: 10, right: 30, bottom: 90, left: 30},
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#lollipop")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
   

      // Parse the Data
      // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {
      svg.append('rect')
          .attr('x',0)
          .attr('y',380)
          .attr('width',400)
          .attr('height',14)
          .attr('fill','#BABDB6')
          .enter()

      svg.selectAll('myrect').data(data)
                .enter()
          .append('rect')
          .attr('x',function(d){
            console.log(d)
            return d.domain_start
          })
          .attr('y',375)
          .attr('width',function(d){
            return d.domain_end-d.domain_start
          })
          .attr('height',24)
          .attr('fill',function(d,i){
            console.log(_this.color)
            console.log(i)
            return _this.color[i]
          })


      var text=svg.selectAll('mytext').data(data)
                .enter()
          .append('text')
          .attr('x',function(d){
            // return d.domain_start+(d.domain_end-d.domain_start)/2+(this.getBBox().width/2)
            return d.domain_start+(d.domain_end-d.domain_start)/2
          })
          .attr('y',375+12)
          .style('font-size','12px')
          .style('font-family','arial')
          .attr('fill','#fff')
          .attr('text-anchor',"middle")
          .attr('dy','.3em')
          .text(function(d){   
            console.log(d.domain_end-d.domain_start) 
            return d.domain_name
          })
          .attr('opacity',0)
          
      console.log(text._groups)
      var textData = text._groups[0]
      svg.selectAll()
        .data(textData)
        .enter()
        .append('text')
        .attr('x',function(d){
          return d.__data__.domain_start+(d.__data__.domain_end-d.__data__.domain_start)/2
        })
        .attr('y',375+12)
        .style('font-size','12px')
        .style('font-family','arial')
        .attr('fill','#fff')
        .attr('text-anchor',"middle")
        .attr('dy','.3em')
        .text(function(d){   
          var r = d.__data__.domain_end-d.__data__.domain_start
          var t = d.getComputedTextLength()
          console.log(r,t)
          if(r<t){
            // for(var i=0;i<r;i++){
              // console.log(d.__data__.domain_name.slice(0,i))
              // console.log(this.getBBox().width)
              // if(d.__data__.domain_name.slice(0,i).length<=this.getBBox().width){
                return d.__data__.domain_name.substr(0,2)+'..'
              // }
            // }
            
          }else{
            return d.__data__.domain_name
          }
        })
      svg.selectAll().data(data)
                .enter()
          .append('rect')
          .attr('x',function(d){
            console.log(d)
            return d.domain_start
          })
          .attr('y',375)
          .attr('width',function(d){
            return d.domain_end-d.domain_start
          })
          .attr('height',24)
          .attr('fill',function(d,i){
            console.log(_this.color)
            console.log(i)
            return _this.color[i]
          })
          .attr('opacity',0)
          .attr('class','domain-o')
      svg.selectAll(".domain-o").on('mouseover', function () {
                
          d3.select(this)
          .append("title").text(function (d) {
              return  d.domain_name;
          }).attr("id", "tooltip")
                  
                
      
      });
      svg.selectAll(".domain-o").on('mouseout', function () {
      
        d3.select("#tooltip").remove();
          
      });
      // X axis
      var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.domain_name; }))
        .padding(1);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 10])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Lines
      svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
          .attr("x1", function(d) { return x(d.domain_name); })
          .attr("x2", function(d) { return x(d.domain_name); })
          .attr("y1", function(d) { return y(d.domain_num); })
          .attr("y2", y(0))
          .attr("stroke", "grey")

      // Circles
      svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function(d) { return x(d.domain_name); })
          .attr("cy", function(d) { return y(d.domain_num); })
          .attr("r", "4")
          .style("fill", "#69b3a2")
          .attr("stroke", "black")
      // })
          }
}
}
</script>
<style scoped></style>