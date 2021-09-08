<!-- -->
<template>
<div id="img" >
    
        <v-card
          flat
          color="transparent"
          :width="canvasWidth"
          class="card"
        >
        
        <canvas id="galaxyCanvas" :width="canvasWidth" :height="canvasHeight"> </canvas>
        <v-slider
          v-model="fruits"
          :max="5"
          step="1"
          ticks
          tick-size="2"
          :tick-labels="ticksLabels"
          class="slider"
          @end="sliderEnd"
        ></v-slider>
        </v-card>
   
</div>
</template>
<script>

import {CanvasZoom2} from '../utils/canvaszoom2'

export default {
name: '',
data() {
return {
    file:'http://192.168.1.62:89/images/helloworld_file',

    canvasWidth: 700, // 画布大小
    canvasHeight: 500,
    imgWidth:16384,
    imgHeight:15360,
    imgType:'jpg',
    tileSize:256,
    
    fruits: 0,
    ticksLabels: [1,2,4,10,20,40],
    galaxy:null,
    scale:[1,2,4,10,20,40],
    wheelNumber:0,

}
},
created() {
  this.$EventBus.$on('fruits', (msg) => {
    console.log(msg)
    this.fruits = msg;   
  })
  
},
mounted() {
   

    this.load()

    
},
methods:{
    sliderEnd(n){
      console.log(n)
      this.fruits = n;
      var size = this.scale[n]
      this.galaxy.zoomInCentre(size)
    },
   
    load(){
      var canvas = document.getElementById('galaxyCanvas');
      var size = this.scale[this.wheelNumber]
      var min = this.scale[0]
      var max = this.scale[this.scale.length-1]
      this.galaxy = new CanvasZoom2( canvas, this.file, this.imgWidth, this.imgHeight,size,min,max,this,this.tileSize,this.imgType);
    },
    
}
}
</script>
<style scoped>
#img{
  position: relative;
}
#btnBox{
    position: absolute;
    bottom: 0;
    right: 0;
}
.card{
  margin: 0 auto;
}
#galaxyCanvas{
  background: none transparent; 
  border: none; 
  margin: 0px; 
  padding: 0px;
}
.slider{
  position: relative;
  left: 10px;
  bottom: 50px;
  width: 25%;
  color: #1976d2;
}
</style>