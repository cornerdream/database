<!-- 点矩形图 -->
<template>
<div id="lollipop">
</div>
</template>
<script>
import * as d3 from 'd3'
import $ from 'jquery'
export default {
name: 'lollipop',
props:['data','width','circle'],
data() {
return {
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
  },
  width(){
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
      console.log( this.data)
      var data = this.data
      console.log(data)
      if(this.width==0){return}
      let w = 1000;
      var margin = {top: 10, right: 10, bottom: 20, left: 20},
      width = w+100 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;
      // append the svg object to the body of the page
      var svg = d3.select("#lollipop")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // X axis
      // var x = d3.scaleBand()
      var x = d3.scaleLinear()
        .domain([0,this.width])
        .range([0,w ])
        
        // .domain(data.map(function(d) { return d.domain_name; }))
        // .padding(1);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
      //   .selectAll("text")
      //     .attr("transform", "translate(-10,0)rotate(-45)")
      //     .style("text-anchor", "end");
      if(this.width>w){x.clamp(true);}
      
  
      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 10])
        .range([ height,0]);
      svg.append("g")
        .call(d3.axisLeft(y));
      console.log(y)
      // Parse the Data
      // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {
      svg.append('rect')
          .attr('x',0)
          .attr('y',height-19)
          .attr('width',w)
          .attr('height',14)
          .attr('fill','#BABDB6')
          .enter()

      svg.selectAll('myrect')
          .data(data)
          .enter()
          .append('rect')
          .attr('x',function(d){
            console.log(d)
            console.log(d.seq_start)
            console.log(x.invert(d.seq_start))
            // return x.invert(d.seq_start)
            return this.width>w?x.invert(d.seq_start):x(d.seq_start)
          })
          .attr('y',height-24)
          .attr('width',function(d){

            // return x.invert(d.seq_end)-x.invert(d.seq_start)
            return this.width>w?x.invert(d.seq_end)-x.invert(d.seq_start):x(d.seq_end)-x(d.seq_start)
          })
          .attr('height',24)
          .attr('fill',function(d,i){
            console.log(_this.color)
            console.log(i)
            return _this.color[i]
          })
          .attr('class','domain-o')

      var text=svg.selectAll('mytext')
                  .data(data)
                  .enter()
                  .append('text')
                  .attr('x',function(d){
                    console.log(x(d.seq_start+(d.seq_end-d.seq_start)/2));
                    console.log(x.invert(d.seq_start+(d.seq_end-d.seq_start)/2));
                    // return d.domain_start+(d.domain_end-d.domain_start)/2+(this.getBBox().width/2)
                    // return x.invert(d.seq_start+(d.seq_end-d.seq_start)/2)
                    return this.width>w?x.invert(d.seq_start+(d.seq_end-d.seq_start)/2):x(d.seq_start+(d.seq_end-d.seq_start)/2)
                  })
                  .attr('y',height-12)
                  .style('font-size','12px')
                  .style('font-family','arial')
                  .attr('fill','#fff')
                  .attr('text-anchor',"middle")
                  .attr('dy','.3em')
                  .text(function(d){   
                    console.log(d.seq_end-d.seq_start) 
                    return d.domain_name
                  })
                  .attr('opacity',0)
          
      console.log(text._groups)
      var textData = text._groups[0]
      console.log(textData)
      svg.selectAll()
        .data(textData)
        .enter()
        .append('text')
        .attr('x',function(d){
          console.log(x(d.__data__.seq_start+(d.__data__.seq_end-d.__data__.seq_start)/2))
          console.log(x.invert(d.__data__.seq_start+(d.__data__.seq_end-d.__data__.seq_start)/2)) 
          // return x.invert(d.__data__.seq_start+(d.__data__.seq_end-d.__data__.seq_start)/2)
          return this.width>w?x.invert(d.__data__.seq_start+(d.__data__.seq_end-d.__data__.seq_start)/2):x(d.__data__.seq_start+(d.__data__.seq_end-d.__data__.seq_start)/2)
        })
        .attr('y',height-12)
        .style('font-size','12px')
        .style('font-family','arial')
        .attr('fill','#fff')
        .attr('text-anchor',"middle")
        .attr('dy','.3em')
        .text(function(d){   
          // var r = x.invert(d.__data__.seq_end-d.__data__.seq_start)
          var r = this.width>w?x.invert(d.__data__.seq_end-d.__data__.seq_start):x(d.__data__.seq_end-d.__data__.seq_start)
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
     svg.selectAll()
        .data(data)
        .enter()
        .append('rect')
        .attr('x',function(d){
          console.log(d)
          console.log(x(d.seq_start))
          console.log(x.invert(d.seq_start)) 
          // return x.invert(d.seq_start)
          return this.width>w?x.invert(d.seq_start):x(d.seq_start)
        })
        .attr('y',height-24)
        .attr('width',function(d){
          console.log(x(d.seq_end),x(d.seq_start))
          console.log(x.invert(d.seq_end),x.invert(d.seq_start)) 
          // return x.invert(d.seq_end)-x.invert(d.seq_start)
          return this.width>w?x.invert(d.seq_end)-x.invert(d.seq_start):x(d.seq_end)-x(d.seq_start)
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
      

      console.log(this.circle)
      let reg = /\d+/
      let circleArr =[]
      this.circle.forEach(ele => {
        let obj ={
          name:ele,
          point:ele.match(reg)
        }
        circleArr.push(obj)
        
      });
      
      console.log(circleArr)
      let random =[]
      circleArr.forEach(()=>{
        let d = Math.floor(Math.random()*4)
        random.push(d)
      })
      console.log(random)
      // Lines
      svg.selectAll("myline")
        .data(circleArr)
        .enter()
        .append("line")
          .attr("x1", function(d) { 
            console.log(d)
            console.log(x(d.point))
            console.log(x.invert(d.point))
            // return x.invert(d.point); 
            return this.width>w?x.invert(d.point):x(d.point); 
          })
          .attr("x2", function(d) { 
            // return x.invert(d.point); 
            return x(d.point); 
          })
          .attr("y1", y(0))
          .attr("y2", function(d,i){
            console.log(d,i,random[i])
            console.log(y(random[i]))
            // return random[i]
            return y(random[i])
          })
          .attr("stroke", "grey")

      // Circles
      svg.selectAll("mycircle")
        .data(circleArr)
        .enter()
        .append("circle")
          .attr("cx", function(d) {
            console.log(x(d.point))
            console.log(x.invert(d.point)) 
            // return x.invert(d.point); 
            return this.width>w?x.invert(d.point):x(d.point); 
          })
          .attr("cy", function(d,i){
            
            // return random[i]
            return y(random[i])
          })
          .attr("r", "4")
          .style("fill", "#69b3a2")
          .attr("stroke", "black")
          .attr('class','circle')
      svg.selectAll(".circle").on('mouseover', function () {
                
          d3.select(this)
          .attr("r", "6")
          .append("title").text(function (d,i) {

            console.log(_this.circle)
              console.log(d,i)
              // return  _this.circle[i];
              return d.name
          }).attr("id", "circletip")

      });
      svg.selectAll(".circle").on('mouseout', function () {
        d3.select(this)
          .attr("r", "4")
        d3.select("#circletip").remove();
          
      });    
      // })
          }
}
}
</script>
<style scoped>
#lollipop{
  text-align: left;
  padding-left: 30px;
}
body[theme-mode='dark'] #lollipop{
  background: #fff;
}
</style>