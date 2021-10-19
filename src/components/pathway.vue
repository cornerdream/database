<!-- 通路图 -->
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

    </div>
    
</div>
</template>
<script>
import * as d3 from 'd3'
import {schemeBlues,schemeReds} from "d3-scale-chromatic";
import $ from 'jquery'
export default {
name: 'pathway',
props:['data','msg','pathway'],
data() {
return {
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
    covItem:[
      {
        coords: [514, 339, 560, 355],
        gene:['CHUK'],
        value:[2.1]
      },
      {
        coords: [463, 250, 509, 266],
        gene:['CHUK','IKBKA','IKK-alpha'],
        value:[2.2,0.22,1.5]
      },
    ],
    switchTable:false,
    colorItem:[
      // { 
 
      //   color: 'white', 
 
      //   label: '-1' 
 
      // }, 
      // { 
  
      //   color: 'red', 
  
      //   // label: '-0.75' 
  
      // }, 
      // { 
  
      //   color: 'purple', 
  
      //   // label: '-0.5' 
  
      // }, 
      { 
  
        color: 'blue', 
  
        label: '-1' 
  
      }, 
      { 
  
        color: 'lightblue', 
  
        // label: '0' 
  
      }, 
      { 
  
        color: 'green', 
  
        label: '0' 
  
      }, 
      { 
  
        color: 'yellow', 

        // label: '0' 
  
      }, 
      { 
  
        color: 'red', 
  
        label: '1' 
  
      }, 
      // { 
  
      //   color: 'red', 
  
      //   label: '1' 
  
      // }
    ],
    valueColor:{
      
      'CNV':{
        min:0,
        max:10,
        point:2,
        blue:[ "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5"],
        red:[ "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d"],
      },
      'Mutation':{
        min:0,
        max:10,
        point:1,
        blue:[ "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5"],
        red:[ "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d"],
      },
      'Fusion':{
        min:0,
        max:10,
        point:1,
        blue:schemeBlues[9],
        red:schemeReds[9],
      },
      'Methylation':{
        min:-10,
        max:10,
        point:0,
        blue:schemeBlues[9],
        red:schemeReds[9],
      },
      'gene expression':{
        min:-10,
        max:10,
        point:0,
        blue:schemeBlues[9],
        red:schemeReds[9],
      },

        
      
    },
    
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
  this.emit()
  this.legend()
},
methods:{
    
    load(){    

      $('#img').html(' ');
      this.map=[];
      this.rectItem=[];
      this.covItem=[];
      this.dragFlag = false; 
      if(!this.data.pathway_info.img_info){return}
      this.map = this.data.pathway_info.img_info.img_path;
      this.rectItem = this.data.pathway_info.pathway_gene_info;
      this.covItem = this.data.pathway
      this.rectItem = [...this.rectItem,...this.covItem]
      var boxW = this.data.pathway_info.img_info.image_width;
      var boxH = this.data.pathway_info.img_info.image_height;

      $('#path').css({width:boxW,height:boxH})
      var svg = d3.select("#img")
                  .append("svg")
                  .attr("width", boxW)
                  .attr("height", boxH)  
                  
      var g = svg.append('g')
                 
                  
     
      var max = this.valueColor[this.pathway].max;
      var point = this.valueColor[this.pathway].point;
      var red = this.valueColor[this.pathway].red ;
      var redL = this.valueColor[this.pathway].red.length ;
      var min = this.valueColor[this.pathway].min;
      var blue = this.valueColor[this.pathway].blue ;
      var blueL = this.valueColor[this.pathway].blue.length ;
      var maxValue = (max - point)/redL;
      var minValue = (point - min)/blueL;
      
      function color(value,starndL,starnd){
        
        for(var i=0;i<starndL;i++){
          if(starnd[0]==red[0]){
            if(value<(point+maxValue*(i+1))){
              return starnd[i]
            }
          }else{
            if(value>(point-minValue*(i+1))){
              return starnd[i]
            }
          }
          
        }
      }
         
        g.selectAll().data(this.rectItem)
          .enter()
          .append('rect')
          .attr('fill',function(d){
            if(d.value){    
              var value = Math.max.apply(null,d.value);
              if(value>=point){
                return color(value,redL,red)
              }else{
                return color(value,blueL,blue)
              }
            }else{
              return 'white'
            }
              
          })    
          .attr('x',function(d){
              return Number(d.coords[0])+1
          })
          .attr('y',function(d){
            return Number(d.coords[1])
          })
          .attr('width',function(d){
            return Number(d.coords[2])-Number(d.coords[0])-1
          })
          .attr('height',function(d){
            return Number(d.coords[3])-Number(d.coords[1])
          })
          .enter()
          .call(d3.drag().on("drag", dragged))
          
   g.append('image')
       .attr('xlink:href', 'http://'+this.map) 
       .style('mix-blend-mode','multiply')
       .attr("width", boxW)
      .attr("height", boxH)   
        
   g.selectAll().data(this.rectItem)
          .enter()
          .append('rect')       
          .attr('fill','white')
          .attr('opacity','0')
          .attr('x',function(d){
              return Number(d.coords[0])+1
          })
          .attr('y',function(d){
            return Number(d.coords[1])
          })
          .attr('width',function(d){
            return Number(d.coords[2])-Number(d.coords[0])-1
          })
          .attr('height',function(d){
            return Number(d.coords[3])-Number(d.coords[1])
          })         
      
 
        svg.call(d3.zoom().scaleExtent([0.5, 1.5]).on("zoom", zoomed));  
        
        function zoomed() {
          g.attr("transform", d3.event.transform);
        }
       
        function dragged(d) {
          d3.select(this).attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y);
        }        
        
        svg.selectAll("rect").on('mouseover', function (d) {
          if(d.value){
            let str = ''
            d.value.forEach((v,j) => {
              if(v>=point){ 
                var redColor = color(v,redL,red)
                return str+='<a style="display:flex;align-items:center;justify-content:space-between;" href="http://www.baidu.com" target="_blank"><span style="width:50px;height:20px;background:'+redColor+'"></span>'+'<span>'+d.gene[j]+'</span></a>'
                
              }else{
                var blueColor =color(v,blueL,blue)
                return str+='<a style="display:flex;align-items:center;justify-content:space-between;" href="http://www.baidu.com" target="_blank"><span style="width:50px;height:20px;background:'+blueColor+'"></span>'+'<span>'+d.gene[j]+'</span></a>'
               
              }
            })  
            console.log(d3.event)
            d3.select('#img')
              .append('div')
              .html(str)
              .attr("id", "colorData")
              .attr("style", "padding:6px;background-color:white;border:1px solid #ccc;border-radius:10px;box-shadow: 4px 4px 10px rbga(0, 0, 0, 0.4);position:absolute;left:" + (d3.event.layerX) + "px" + ";top:" +(d3.event.layerY)+ "px")    
          }else{
            d3.select(this)
            .append("title").text(function (d) {
                return  d.gene;
            }).attr("id", "tooltip")
            
          }
 
        });
        svg.selectAll("rect").on('mouseout', function (d) {
          if(d.value){
            d3.select("#colorData").remove();
            
          }else{
            d3.select("#tooltip").remove();
          }   
        });
      svg.selectAll("rect").on('click', function () {
        window.open('http://www.baidu.com', '_blank');
      })  
      
        
    },
    legend(){

      var l = this.colorItem.length;
      var width = 50*l, height = 50; 
      var data = this.colorItem;
      
      var svg = d3.select('#legend') 
                  .append('svg') 
                  .attr('width', width) 
                  .attr('height', height); 
      var grad = svg.append('defs') 
                    .append('linearGradient') 
                    .attr('id', 'grad') 
                    .attr('x1', '0%') 
                    .attr('x2', '100%') 
                    .attr('y1', '0%') 
                    .attr('y2', '0%');              
      grad.selectAll('stop') 
          .data(data) 
          .enter() 
          .append('stop') 
          .attr('offset', function(d,i) { 
            return (i/data.length) * 100 + '%'; 
          }) 
          .style('stop-color', function(d) { 
            return d.color; 
          }) 
          .style('stop-opacity', 0.9); 
     
      svg.append('rect') 
          .attr('x', 0) 
          .attr('y', 0) 
          .attr('width', width) 
          .attr('height', height/2) 
          .attr('fill', 'url(#grad)'); 
     
          
      
      var g2 = svg.append('g')
      g2.selectAll() 
      .data(data)
      .enter()
      .append('text') 
        .text(function(d){ 
            return d.label; 
        }) 
        .attr('transform',function(d,i){ 
          if(d.label==0){
            return 'translate(' + ((width/l) * i+(width/l)/2) + ',' + ((height) -7) + ')'; 
          }
          if(i==(l-1)){
            return 'translate(' + (width-7) + ',' + ((height) -7) + ')'; 
          }
          return 'translate(' + ((width/l) * i) + ',' + ((height) -7) + ')'; 
        }) 
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
#switch.v-input{
  color: #000;
}
.tipDiv{
  /* position: absolute;
    left: 0;
    right: 0; */
    background: red;
    width: 200px;
    height: 200px;
}
svg #colorData{
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

/* #colorData.hidden {
  display: none;
} */

</style>