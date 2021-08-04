<!-- -->
<template>
<div class="pathway">
    <div class="pathway_content" id="path">
      
      <div id="img"></div>
      <div id="switch">
        <v-switch
        v-model="switchTable"
        :label="switchTable ? 'ccle' : 'cosmic'"
        class="tabSwitch"
        @change="onchange"
        ></v-switch>     
      </div>
      <div id="legend"></div>
      <div id="tooltip" class="hidden"></div>
      
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
import $ from 'jquery'
export default {
name: 'pathway',
props:['data','msg'],
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
        text:'Clk',
        color:'green'
      },
      {
        x:426,
        y:220,
        width:44,
        height:16,
        text:'Pre',
        color:'red'
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
    ],
}
},
watch:{
  data(){
    console.log('jianting')
    this.data&&this.load()
  }
},
created() {
  // this.load()
},
mounted() {
  console.log('mount')
  this.emit()
  this.data&&this.load()
  this.legend()
},
methods:{
    
    load(){
      $('#img').html(' ');
      this.map=[],this.rectItem=[];
      console.log(this.data)
      if(!this.data.img_info){return}
      this.map = this.data.img_info.img_path;
      this.rectItem = this.data.xml_data
      console.log(this.map)
      console.log(this.rectItem)
      
      var boxW = this.data.img_info.image_width;
      var boxH = this.data.img_info.image_height;
      console.log(boxW,boxH)
      $('#path').css({width:boxW,height:boxH})
      // var margin = {top: 10, right: 30, bottom: 30, left: 50},
          // width = 460 - margin.left - margin.right,
          // height = 400 - margin.top - margin.bottom;
      // var data = this.rectItem;
      var svg = d3.select("#img")
                  .append("svg")
                  // .attr('style','position:absolute;left:0;top:50px;')
                  .attr("width", boxW)
                  .attr("height", boxH)  
                  
      var g = svg.append('g')
                  
                  
             
                  
      g.append('image')
       .attr('xlink:href', 'http://'+this.map) 
       .attr("width", boxW)
      .attr("height", boxH)    
      // .attr('style','position:absoulte;left:50%')
      // .attr("transform","translate(-50%,0)");        
      // this.rectItem.forEach((item)=>{
        
        
          // .attr("transform","translate(" + margin.left + "," + margin.top + ")")
        g.selectAll().data(this.rectItem)
          .enter()
          .append('rect')
          .attr('fill',function(d){
              return d.bgcolor
          }) 
          .attr('fill-opacity','0.1')
          
          
          // .attr('coords',function(d){
          //   return d.coords
          // })
          .attr('x',function(d){
              return d.coords[0]
          })
          .attr('y',function(d){
            return d.coords[1]
          })
          .attr('width',function(d){
            return d.coords[2]-d.coords[0]
          })
          .attr('height',function(d){
            return d.coords[3]-d.coords[1]
          })
          
          // g.selectAll().data(this.rectItem)
          //   .enter()
          //   .append('text')
          // .text(function(d){
          //   return d.name
          // })
          // .attr('fill',function(d){
          //   return d.fgcolor
          // })
          // .attr('font-size','12')
          // // .attr('coords',function(d){
          // //   return d.coords
          // // })
          // .attr('x',function(d){
          //   return d.coords[0]
          // })
          // .attr('y',function(d){
          //   return d.coords[1]
          // })
          
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
        
        svg.selectAll("rect").on('mouseover', function (d) {
        //显示提示信息方案一：更新提示条位置和值
          d3.select("#tooltip")
              .attr("style", "left:" + (d.coords[0]+(d.coords[2]-d.coords[0])) + "px" + ";top:" +( d.coords[1]+(d.coords[2]-d.coords[0]))+ "px")          
              .text(d.name);
          //显示提示条
          d3.select("#tooltip").classed("hidden", false);
  
          //显示提示信息方案二：
          // d3.select(this).attr("fill", "#f34848").append("title").text(function (d) {
          //     return  d.name;
          // }).attr("id", "tooltip");
        });
        svg.selectAll("rect").on('mouseout', function () {
          //显示提示信息方案一：隐藏提示条
          d3.select("#tooltip").classed("hidden", true);
  
          //显示提示信息方案二：
          // d3.select(this).attr("fill", "rgb(0,0," + (v * 10) + ")");
          // d3.select("#tooltip").remove();
        });

        
        
    },
    legend(){
      console.log(this.colorItem)
      var width = 300, height = 50; 
      var data = this.colorItem;
      var svg = d3.select('#legend') 
                  .append('svg') 
                  // .attr('style','position:absolute;right:0;top:0;')
                  .attr('width', width) 
                  .attr('height', height); 
      var grad = svg.append('defs') 
                    .append('linearGradient') 
                    .attr('id', 'grad') 
                    .attr('x1', '0%') 
                    .attr('x2', '100%') 
                    .attr('y1', '0%') 
                    .attr('y2', '0%'); 
      // console.log(grad)              
      grad.selectAll('stop') 
          .data(data) 
          .enter() 
          .append('stop') 
          .attr('offset', function(d,i) { 
            // console.log(data)
            // console.log(data.length)
            // console.log(i)
            return (i/data.length) * 100 + '%'; 
          }) 
          .style('stop-color', function(d) { 
            return d.color; 
          }) 
          .style('stop-opacity', 0.9); 
      // console.log(grad)
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
 
    },
    emit(){
      var source = this.switchTable?'ccle':'cosmic'
      this.$EventBus.$emit(this.msg, source)
    },
    onchange(){
      this.emit()
    }
}
}
</script>
<style scoped>
.pathway_content{
  position: relative;
}
#img{
  /* position: absolute;
  left: 0;
  top: 0; */
  position: relative;
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
#legend{
  width:300px;
  height: 50px;
  position: absolute;
  right: 5px;
  top: 5px;
}
#switch{
  position: absolute;
  left: 10px;
  top: -10px;
}
.tipDiv{
  /* position: absolute;
    left: 0;
    right: 0; */
    background: red;
    width: 200px;
    height: 200px;
}
#tooltip {
  position: absolute;
  width: 150px;
  height: auto;
  padding: 5px;
  background-color: white;
  border: 1px solid #ccc;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  font-style: 12px;
  -webkit-box-shadow: 4px 4px 10px rbga(0, 0, 0, 0.4);
  -moz-box-shadow: 4px 4px 10px rbga(0, 0, 0, 0.4);
  box-shadow: 4px 4px 10px rbga(0, 0, 0, 0.4);
  pointer-events: none;
}

#tooltip.hidden {
  display: none;
}

</style>