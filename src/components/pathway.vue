<!-- -->
<template>
<div class="pathway">
    <div class="pathway_content" id="path">
      <v-switch
      v-model="switchTable"
      :label="switchTable ? 'ccl_mutation_from_ccle' : 'ccl_mutation_from_cosmic'"
      class="switch"
      ></v-switch>  
      <!-- <img :src="map" alt="" id="img"> -->
        <!-- <v-img :src="map"></v-img> -->
    </div>
    <!-- <div class="pathway_btn">
        <v-btn-toggle
          v-model="text"
          tile
          color="deep-purple accent-3"
          group
        >
          <v-btn 
          v-for="item in btnItem"
          :key="item"
          :value="item">
            {{item}}
          </v-btn>
  
          
        </v-btn-toggle>
    </div> -->
</div>
</template>
<script>
// import { mapGetters } from 'vuex'
import pathImg from '../assets/map.png'
import * as d3 from 'd3'
// import $ from 'jquery'
export default {
name: 'pathway',
props:['data','id'],
// computed: {
//   ...mapGetters(['pathwaysData'])
// },
data() {
return {
    map:pathImg,
    text: '0h',
    btnItem:['0h','2h','4h','6h','8h','10h','12h','14h','16h','18h','20h','22h'],
    rectItem:[
      {
        x:280,
        y:210,
        width:44,
        height:16,
        text:'Clk'
      },
      {
        x:426,
        y:220,
        width:44,
        height:16,
        text:'Pre'
      }
    ],
    switchTable:false,
    colorItem:[
      { 
 
        color: 'white', 
 
        label: '-1' 
 
      }, 
      { 
  
        color: 'red', 
  
        // label: '-0.75' 
  
      }, 
      { 
  
        color: 'purple', 
  
        // label: '-0.5' 
  
      }, 
      { 
  
        color: 'blue', 
  
        // label: '-0.25' 
  
      }, 
      { 
  
        color: 'lightblue', 
  
        label: '0' 
  
      }, 
      { 
  
        color: 'green', 
  
        // label: '0.25' 
  
      }, 
      { 
  
        color: 'yellow', 

        // label: '0.5' 
  
      }, 
      { 
  
        color: 'orange', 
  
        // label: '0.75' 
  
      }, 
      // { 
  
      //   color: 'black', 
  
      //   label: '1' 
  
      // }
    ]

}
},
created() {
 
},
mounted() {
  this.load()
  this.legend()
},
methods:{
    
    load(){
      var boxW = 892;
      var boxH = 709;
      console.log(boxW,boxH)
      // var margin = {top: 10, right: 30, bottom: 30, left: 50},
          // width = 460 - margin.left - margin.right,
          // height = 400 - margin.top - margin.bottom;
      var data = this.rectItem;
      var svg = d3.select("#path")
                  .append("svg")
                  // .attr('style','position:absolute;left:0;top:50px;')
                  .attr("width", boxW)
                  .attr("height", boxH)  
                  
      var g = svg.append('g')
                  
                  
             
                  
      g.append('image')
       .attr('xlink:href', this.map) 
       .attr("width", boxW)
      .attr("height", boxH)    
      // .attr('style','position:absoulte;left:50%')
      // .attr("transform","translate(-50%,0)");        
      // this.rectItem.forEach((item)=>{
        
        
          // .attr("transform","translate(" + margin.left + "," + margin.top + ")")
        g.selectAll().data(data)
          .enter()
          .append('rect')
          .attr('fill','green') 
          .attr('x',function(d){
              return d.x
          })
          .attr('y',function(d){
            return d.y
          })
          .attr('width',function(d){
            return d.width
          })
          .attr('height',function(d){
            return d.height
          })
          
          g.selectAll().data(data)
            .enter()
            .append('text')
          .text(function(d){
            return d.text
          })
          .attr('fill','#000')
          .attr('font-size','12')
          .attr('x',function(d){
            return d.x+8
          })
          .attr('y',function(d){
            return d.y+10
          })
          .call(d3.drag().on("drag", dragged))
       
        
         
        
      // })            
      
 
        svg.call(d3.zoom().scaleExtent([1 / 2, 8]).on("zoom", zoomed));  
        
        function zoomed() {
          g.attr("transform", d3.event.transform);
        }
        
        function dragged(d) {
          console.log(d)
          d3.select(this).attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y);
        }           
    },
    legend(){
      console.log(this.colorItem)
      var width = 300, height = 50; 
      var data = this.colorItem;
      var svg = d3.select('#path') 
                  .append('svg') 
                  .attr('style','position:absolute;right:0;top:0;')
                  .attr('width', width) 
                  .attr('height', height); 
      var grad = svg.append('defs') 
                    .append('linearGradient') 
                    .attr('id', 'grad') 
                    .attr('x1', '0%') 
                    .attr('x2', '100%') 
                    .attr('y1', '0%') 
                    .attr('y2', '0%'); 
      console.log(grad)              
      grad.selectAll('stop') 
          .data(data) 
          .enter() 
          .append('stop') 
          .attr('offset', function(d,i) { 
            console.log(data)
            console.log(data.length)
            console.log(i)
            return (i/data.length) * 100 + '%'; 
          }) 
          .style('stop-color', function(d) { 
            return d.color; 
          }) 
          .style('stop-opacity', 0.9); 
      console.log(grad)
      svg.append('rect') 
          .attr('x', 0) 
          .attr('y', 0) 
          .attr('width', width) 
          .attr('height', height/2) 
          .attr('fill', 'url(#grad)'); 
 
      
      var g = svg.append('g')
                    .selectAll('.label') 
                    .data(data)
                    .enter()
      var g2 = svg.append('g')
                // .selectAll('.label') 
                .data(data)
                
      g.append('line') 
        .style('stroke', function(d) { 
          return d.color; 
        }) 
      .style('stroke-width', 2) 
      .attr('x1',function(d,i){ 
        return xPos(i) 
      }) 
      .attr('x2',function(d,i){ 
        return xPos(i) 
      }) 
     .attr('y1',function(){ 
        return height/2; 
     }) 
     .attr('y2',function(){ 
        return height/2
     }); 
 
    g.append('text') 
     .text(function(d){ 
        return d.label; 
     }) 
     .attr('transform',function(d,i){ 
      return 'translate(' + (xPos(i) ) + ',' + ((height) -7) + ')'; 
     }) 
     
     g2.append('text')
      .text(function(){
        return '1'
      })
      .attr('x',function(){
        return data.length
      })
      .attr('transform',function(){ 
        return 'translate(' + (width- 14) + ',' + ((height) -7) + ')'; 
      }) 
    function xPos(i){ 

      return (width/data.length) * i; 

    } 
 
  }
}
}
</script>
<style scoped>
.pathway_content{
  position: relative;
}
#img{
  position: absolute;
  left: 0;
  top: 0;
}
.svg{
  position: absolute;
  left: 0;
  top: 0;
}
.pathway_btn{
  position: absolute;
  left: 0;
  bottom: 0;
}

</style>