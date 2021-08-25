<!-- -->
<template>
<div class="pathway">
    <div class="pathway_content" id="path">
      
      <div id="img">
        
      </div>
      <div id="switch">
        <v-switch
        v-model="switchTable"
        :label="switchTable ? 'ccle' : 'cosmic'"
        class="tabSwitch"
        @change="onchange"
        ></v-switch>     
      </div>
      <div id="legend"></div>
      <!-- <div id="colorData" class="hidden"></div> -->
      
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
import pathImg from '../assets/path.jpg'
import * as d3 from 'd3'
import {schemeBlues,schemeReds} from "d3-scale-chromatic";
import $ from 'jquery'
// import { geoConicEquidistant } from 'd3'
export default {
name: 'pathway',
props:['data','msg','pathway'],
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
    covItem:[
      {
        coords: [514, 339, 560, 355],
        // name:'cov1',
        gene:['CHUK'],
        value:[2.1]
        // value:[
        //   {
        //     value:2.1,
        //     gene:'CHUK'
        //   }
        // ]
      },
      {
        coords: [463, 250, 509, 266],
        // name:'cov2',
        gene:['CHUK','IKBKA','IKK-alpha'],
        value:[2.2,0.22,1.5]
        // value:[
        //   {
        //     value:0.1,
        //     gene:'CHUK'
        //   },
        //   {
        //     value:0.2,
        //     gene:'IKBKA'
        //   },
        //   {
        //     value:0.5,
        //     gene:'IKK-alpha'
        //   }
        // ]
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
    console.log('jianting')
    this.data&&this.load()
    
  }
},
created() {
},
mounted() {
  console.log('mount')
  this.emit()
  this.legend()
},
methods:{
    
    load(){    
      console.log(this.valueColor)
      $('#img').html(' ');
      this.map=[];
      this.rectItem=[];
      this.covItem=[];
      this.dragFlag = false; 
      console.log(this.data)
      if(!this.data.pathway_info.img_info){return}
      this.map = this.data.pathway_info.img_info.img_path;
      this.rectItem = this.data.pathway_info.pathway_gene_info;
      this.covItem = this.data.pathway
      console.log(this.map)
      console.log(this.rectItem)
      // this.rectItem = this.rectItem.filter((item)=>item.bgcolor!=='#FFFFFF')
      // console.log(this.rectItem)
      this.rectItem = [...this.rectItem,...this.covItem]
      console.log(this.rectItem)
      var boxW = this.data.pathway_info.img_info.image_width;
      var boxH = this.data.pathway_info.img_info.image_height;
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
                 
                  
      // g.append('image')
      //  .attr('xlink:href', 'http://'+this.map) 
      //  .attr('style',"mix-blend-mode:multiply")
      //  .attr("width", boxW)
      // .attr("height", boxH)    
      // .attr('style','position:absoulte;left:50%')
      // .attr("transform","translate(-50%,0)");        
      // this.rectItem.forEach((item)=>{
      console.log(this.valueColor)    
      console.log(this.pathway)  
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
        console.log(value)
        console.log(starndL)
        console.log(starnd)
        console.log(red)
        for(var i=0;i<starndL;i++){
          if(starnd[0]==red[0]){
            console.log('红')
            if(value<(point+maxValue*(i+1))){
              console.log(i)
              console.log(starnd[i])
              return starnd[i]
            }
          }else{
            console.log('蓝')
            if(value>(point-minValue*(i+1))){
              console.log(i)
              console.log(starnd[i])
              return starnd[i]
            }
          }
          
        }
      }
         
        g.selectAll().data(this.rectItem)
          .enter()
          .append('rect')
          .attr('fill',function(d){
            // console.log(d)
            if(d.value){    
              var value = Math.max.apply(null,d.value);
              console.log(value)
              if(value>=point){
                console.log('红')
                console.log(maxValue)
                return color(value,redL,red)
                // for(var i=0;i<redL;i++){
                //   console.log(maxValue*(i+1))
                //   if(value<(point+maxValue*(i+1))){
                //     console.log(i)
                //      console.log(red[i])
                //     return red[i]
                //   }
                // }
              }else{
                console.log('蓝')
                console.log(minValue)
                return color(value,blueL,blue)
                // for(var j=0;j<blueL;j++){
                //   console.log(minValue*(j+1))
                //   if(value>(point-minValue*(j+1))){
                //     console.log(j)
                //     console.log(blue[j])
                //     return blue[j]
                //   }
                // }
              }
              // if(this.pathway=='CNV'){  
              //   if(d.value>2){
              //     return '#FF0000'
              //   }else{
              //     return interpolateBlues(1)
              //   }
              // }else if(this.pathway=='Mutation'){
                
              //   if(d.value>1){
              //     return '#FF0000'
              //   }else{
              //     return interpolateBlues(1)
              //   }
                    
              // }else if(this.pathway=='Fusion'){
             
              //   if(d.value>1){
              //     return '#FF0000'
              //   }else{
              //     return interpolateBlues(1)
              //   }
              // }else if(this.pathway=='Methylation'){      
                
              //   if(d.value>0){
              //     return '#FF0000'
              //   }else{
              //     return interpolateBlues(1)
              //   }
              // }else{        
                
              //   if(d.value>0){
              //     return '#FF0000'
              //   }else{
              //     return interpolateBlues(1)
              //   }
                     
                            
              // }
            }else{
              return 'white'
            }
              
          })    
          // .attr('opacity','0.6')
          // .attr('coords',function(d){
          //   return d.coords
          // })
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
          // .enter()
          // g.selectAll().data(this.rectItem)
          //   .enter()
          //   .append('text')
          // .text(function(d){
          //   return d.link
          // })
          // .attr('fill',function(d){
          //   return d.fgcolor
          // })
          // .attr('font-size','12')
          // // .attr('coords',function(d){
          // //   return d.coords
          // // })
          // .attr('x',function(d){
          //   return d.coords[0]+7
          // })
          // .attr('y',function(d){
          //   return d.coords[1]+13
          // })
          .enter()
     
          .call(d3.drag().on("drag", dragged))
          
   g.append('image')
       .attr('xlink:href', 'http://'+this.map) 
       .style('mix-blend-mode','multiply')
      //  .attr('style',"mix-blend-mode:multiply")
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
      // })            
      
 
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
      //   svg.selectAll("rect").on('click', function (d) {
      //     console.log(d)
      //     if(d.value){
      //       console.log(d.value.length)
      //       if(d.value.length==1){
      //         console.log('1')
      //       // let routeUrl = this.$router.resolve({path: '/'+item.replace(/\s/g,''),query: {view:'Overview'}});
      //       // window.open(routeUrl.href, '_blank');
      //         window.open('http://www.baidu.com', '_blank');
      //       }else{
      //         console.log('2')
      //         let str = ''
      //         d.value.forEach((v,j) => {
      //           if(v>point){ 
      //             var redColor = color(v,redL,red)
      //             return str+='<a style="display:flex;align-items:center;justify-content:space-between;" href="http://www.baidu.com" target="_blank"><span style="width:50px;height:20px;background:'+redColor+'"></span>'+'<span>'+d.gene[j]+'</span></a>'
      //             // for(var i=0;i<redL;i++){
      //             //   console.log(maxValue*(i+1))
      //             //   if(v<(point+maxValue*(i+1))){
      //             //     console.log(i)
      //             //     console.log(red[i])
      //             //     return str+='<a style="display:flex;align-items:center;justify-content:space-between;" href="http://www.baidu.com" target="_blank"><span style="width:50px;height:20px;background:'+red[i]+'"></span>'+'<span>'+d.gene[j]+'</span></a>'
      //             //   }
      //             // }
      //           }else{
      //             var blueColor =color(v,blueL,blue)
      //             return str+='<a style="display:flex;align-items:center;justify-content:space-between;" href="http://www.baidu.com" target="_blank"><span style="width:50px;height:20px;background:'+blueColor+'"></span>'+'<span>'+d.gene[j]+'</span></a>'
      //             // for(var z=0;z<blueL;z++){
      //             //   console.log(maxValue*(z+1))
      //             //   if(v<(point+maxValue*(z+1))){
      //             //     console.log(z)
      //             //     console.log(blue[z])
      //             //     return str+='<a style="display:flex;align-items:center;justify-content:space-between;" href="http://www.baidu.com" target="_blank"><span style="width:50px;height:20px;background:'+blue[z]+'"></span>'+'<span>'+d.gene[j]+'</span></a>'
      //             //   }
      //             // }
      //           }
                
      //         });      
      //         console.log(str)
      //         d3.select('#img')
      //         .append('div')
      //         .html(str)
      //         .attr("id", "colorData")
      //         .attr("style", "width: 150px;height: auto;padding: 5px;background-color: white;border: 1px solid #ccc;border-radius: 10px;box-shadow: 4px 4px 10px rbga(0, 0, 0, 0.4);position:absolute;left:" + (d.coords[0]+(d.coords[2]-d.coords[0])) + "px" + ";top:" +( d.coords[1]+(d.coords[2]-d.coords[0]))+ "px")    
  
      //       }
            
      //     }

      //   });
      // svg.selectAll("image").on('click', function () {
      //   console.log('11')
      //   d3.select("#colorData").remove();
      // });
        
    },
    legend(){
      console.log(this.colorItem)
      var l = this.colorItem.length;
      var width = 50*l, height = 50; 
      var data = this.colorItem;
      // var data = [
      //   {
      //     color:interpolateBlues(1),
      //     label:'-1'
      //   },
      //   {
      //     color:interpolateBlues(-0.5),
      //     // label:'-1'
      //   },
      //   {
      //     color:interpolateYlGn(0),
      //     label:'0'
      //   },
      //   {
      //     color:interpolateYlGn(0.5),
      //     // label:'-1'
      //   },
      //   {
      //     color:interpolateReds(1),
      //     label:'1'
      //   }
      // ]
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
      // var g = svg.append('g')
      // g.selectAll().data(data)
      //     .enter()
      //     .append('rect')
      //     .attr('x', function(d,i){
      //       return (width/l)*i
      //     }) 
      //     .attr('y', 0) 
      //     .attr('width', width/l) 
      //     .attr('height', height/2) 
      //     .attr('fill', function(d){
      //       return d.color
      //     })
          
      
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
      // var g2 = svg.append('g')
      //           // .selectAll('.label') 
      //           .data(data)
                
    //   g.append('line') 
    //     .style('stroke', function(d) { 
    //       return d.color; 
    //     }) 
    //   .style('stroke-width', 2) 
    //   .attr('x1',function(d,i){ 
    //     return xPos(i) 
    //   }) 
    //   .attr('x2',function(d,i){ 
    //     return xPos(i) 
    //   }) 
    //  .attr('y1',function(){ 
    //     return height/2; 
    //  }) 
    //  .attr('y2',function(){ 
    //     return height/2
    //  }); 
 
    
     
    //  g2.append('text')
    //   .text(function(){
    //     return '1'
    //   })
    //   .attr('x',function(){
    //     return data.length
    //   })
    //   .attr('transform',function(){ 
    //     return 'translate(' + (width- 14) + ',' + ((height) -7) + ')'; 
    //   }) 
    
 
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