<!-- -->
<template>
<div id="img" >
    
    
    <!-- <v-img
        :src="extraImg"
        :lazy-src="extraImg"
        aspect-ratio="1"
        class="grey lighten-2"
        @mousewheel="imgToSize(sfzGhImage,event)"
    > -->
        <!-- <img id="imgC" :src="map" /> -->
        <!-- <canvas id="imageC" :width="canvasWidth" :height="canvasHeight" ></canvas> -->
        <!-- <canvas ref="bargraphCanvas" :width="canvasWidth" :height="canvasHeight" ></canvas>   -->
        <v-card
          flat
          color="transparent"
          width="700"
          class="card"
        >
        
        <canvas id="galaxyCanvas" width="700" height="500" style="background: none transparent; border: none; margin: 0px; padding: 0px;"> </canvas>
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
        <!-- <div id="btnBox">
                   
                    <div class="my-2">  
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="primary"
                            id="btnZoomIn"
                            
                            @click="zoomIn"
                        >
                            <v-icon dark>
                            mdi-plus
                            </v-icon>
                        </v-btn>
                    </div>    
                    <div class="my-2">    
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="primary"
                            id="btnZoomOut"
                            
                            @click="zoomOut"
                        >
                            <v-icon dark>
                            mdi-minus
                            </v-icon>
                        </v-btn>
                    </div>
                </div> -->
    <!-- </v-img> -->
   
</div>
</template>
<script>
import {CanvasZoom} from '../utils/canvaszoom'
import {CanvasZoom2} from '../utils/canvaszoom2'
import * as d3 from 'd3'
import pathImg from '../assets/path.jpg'
import img1 from '../assets/img.png'
import img2 from '../assets/brain.png'
import img3 from '../assets/eye.png'
import $ from 'jquery'
export default {
name: '',
data() {
return {
    map:pathImg,
    canvasWidth: null, // 画布大小
    canvasHeight: 500,
    imgWidth:200,
    imgHeight:200,
    cols:2,
    imgSize:1,
    minSize:0.5,
    myCanvas: null,
    ctx: null,
    imgX: 0, // 图片在画布中渲染的起点x坐标
    imgY: 60,
    MINIMUM_SCALE: 0.2,
    imgScale: 0.2, // 图片启示的缩放大小
    // extraImg: [{url:require("../assets/img.png")},{url:require("../assets/img.png")}],
    extraImg:[img1,img1],
    loadImgObj: null,
    img: null,
    flag: false,
    pos: {},
    posl: {},
    
    flagPC: true,
    pageX:0,
    pageY:0,
    initX:0,
    initY:0,
    instances:[] ,
    finished :0,
    fruits: 0,
    ticksLabels: [1,2,4,10,20,40],
    galaxy:null,
    galaxy2:null,
    scale:[1,2,4,10,20,40],
    wheelNumber:0,
    outN:0,
}
},
created() {
  this.$EventBus.$on('fruits', (msg) => {
    console.log(msg)
    this.fruits = msg;   
  })
  
},
mounted() {
   
    // this.load1()
    this.load2()

    // this.flagPC = this.IsPC()
    // this.myCanvas = this.$refs.bargraphCanvas;
    // console.log(this.myCanvas)
    // this.ctx = this.myCanvas.getContext('2d');
    // console.log(this.ctx)
    // this.loadImg(this.extraImg);
    // this.canvasEventsInit();
    // this.load()
    // this.loadImg2()
},
methods:{
    sliderEnd(n){
      console.log(n)
      this.fruits = n;
      var size = this.scale[n]
      
      this.galaxy2.zoomInCentre(size)
    },
    zoomIn(){
      if(this.wheelNumber==this.scale.length){return}
      this.wheelNumber++;
      if(this.wheelNumber>=this.scale.length){this.wheelNumber=this.scale.length}
      var size = this.scale[this.wheelNumber]
      console.log(size)
      this.galaxy.zoomInCentre(size)
    },
    zoomOut(){
      if(this.wheelNumber==0){return}
      this.wheelNumber--;
      if(this.wheelNumber<=0){this.wheelNumber=0}
      var size = this.scale[this.wheelNumber]
      console.log(size)
      this.galaxy.zoomOutCentre(size)
    },
    load1(){
      var size = this.scale[this.wheelNumber]
      var min = this.scale[0]
      var max = this.scale[this.scale.length-1]
      //this.galaxy = new CanvasZoom( document.getElementById('galaxyCanvas'), './helloworld_file', 15723, 14815,size,min,max,this);
      this.galaxy = new CanvasZoom( document.getElementById('galaxyCanvas'), './helloworld_file', 16384, 15360,size,min,max,this);
      console.log(this.galaxy)
    },
    load2(){
      var size = this.scale[this.wheelNumber]
      var min = this.scale[0]
      var max = this.scale[this.scale.length-1]
      this.galaxy2 = new CanvasZoom2( document.getElementById('galaxyCanvas'), './helloworld_file', 16384, 15360,size,min,max,this,128);
      console.log(this.galaxy2)
    },
    load(){
        var svg = d3.select("#img")
                  .append("svg")
                  .attr("width", this.canvasWidth)
                  .attr("height", this.canvasHeight||500)  
                  
        var g = svg.append('g')
        g.append('image')
         .attr('xlink:href', this.map) 
         .style('mix-blend-mode','multiply')
         .attr("width", this.canvasWidth)
         .attr("height", this.canvasHeight||500) 
         .enter()
         .call(d3.drag().on("drag", dragged))
        svg.call(d3.zoom().scaleExtent([0.5, 1.5]).on("zoom", zoomed)); 
        function zoomed() {
          g.attr("transform", d3.event.transform);
        }
       
        function dragged() {
            console.log(d3.event)
          d3.select(this).attr("x", d3.event.x).attr("y", d3.event.y);
        }
    },
    loadImg2(){
      var image = new Image();
image.onload = cutImageUp;
image.src = this.map;
var imagePieces = []; 
function cutImageUp() {
    

    for(var x = 0; x < this.cols; ++x) {
        for(var y = 0; y < this.cols; ++y) {
            var canvas = document.createElement('canvas');
            canvas.width = this.imgWidth;
            canvas.height = this.imgHeight;
            var context = canvas.getContext('2d');
            context.drawImage(image, x * this.imgWidth, y * this.imgHeight,  this.imgWidth, this.imgHeight, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }
 
    // imagePieces now contains data urls of all the pieces of the image
 
    // load one piece onto the page
    var anImageElement = document.getElementById('imgC');
    anImageElement.src = imagePieces[0];
}

    },
    loadImg(data) {
      let _this = this;
      this.cols = this.extraImg.length;
      this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
      data.forEach((item,i)=>{
          console.log(item)
          var img = new Image();
          
        //   this.imgWidth = img.width;
        //   this.imgHeight = img.height;
          img.src = item
          console.log(img.width)  
          _this.imgWidth = img.width;
          _this.imgHeight = img.height;
          _this.canvasWidth = _this.imgWidth*this.extraImg.length;
          _this.canvasHeight = _this.imgHeight*this.extraImg.length;  
          img.onload = ()=>{
              _this.instances[i] = img;
              _this.finished++;
              // console.log(_this.finished)
              // if(_this.finished === data.length){
                  _this.instances.forEach((el,j)=>{
                      for(var z=0;z<this.cols;z++){
                          console.log(z)
                          console.log(j)
                          console.log(_this.imgWidth*j)
                          console.log(_this.imgHeight*j)
                          _this.ctx.drawImage(el,
                            _this.imgWidth*j,_this.imgHeight*z,
                            _this.imgWidth, _this.imgHeight,  //被剪切图像的高度。
                            )
                      }
                      
                  })
              // }
          }
          
      })
      this.myCanvas.toDataURL("image/png");
    //   let heights = this.extraImg.map(item=>this.canvasWidth/item.width*item.height)
    
    //   this.ctx.drawImage(img,
    //       400*i,0,
    //       400,500)
      console.log(this.ctx)
      
        // $('.img').append(newImg);
    //   _this.img = new Image();
    //   _this.img.src = this.extraImg[0].url
    //   _this.img.onload = function () {
    //     _this.drawImage();
    //   }
      // _this.imgX = _this.img.width*_this.imgScale/4
    },
    drawImage() {
      // let _this = this;
      this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
      // // 保证  imgX  在  [img.width*(1-imgScale),0]   区间内
    //   if(_this.imgX<_this.img.width*(1-_this.imgScale)) {
    //       _this.imgX = _this.img.width*(1-_this.imgScale);
    //   }
    //   else if(_this.imgX>0) {
    //       _this.imgX=0
    //   }
      // // 保证  imgY   在  [img.height*(1-imgScale),0]   区间内
    //   if(_this.imgY<_this.img.height*(1-_this.imgScale)) {
    //       _this.imgY = _this.img.height*(1-_this.imgScale);
    //   }else if(_this.imgY>0) {
    //       _this.imgY=0
    //   }
      // this.extraImg.forEach((item,i)=>{
      //     this.ctx.drawImage(item.url,
      //     _this.img.width*i,0,
      //     _this.img.width,_this.img.height,
      //     _this.imgX,_this.imgY,
      //     _this.img.width*_this.imgScale,_this.img.height*_this.imgScale)
      // })
      
    //   this.ctx.drawImage(
    //       _this.img, //规定要使用的图像、画布或视频。
    //       0, 0, //开始剪切的 x 坐标位置。
    //       _this.img.width, _this.img.height,  //被剪切图像的高度。
    //       _this.imgX, _this.imgY,//在画布上放置图像的 x 、y坐标位置。
    //       _this.img.width * _this.imgScale, _this.img.height * _this.imgScale  //要使用的图像的宽度、高度
    //   );
    },
    canvasEventsInit() {
      function size(event){
         var winW = $(window).width(),winH = $(window).height();
            var limW = 0.9*winW,limH = 0.9*winH;
            var rdW = limW/_this.canvasWidth,rdH = limH/_this.canvasHeight;
            var maxSize = rdW>rdH?rdH:rdW;
            console.log(winW,winH)
            console.log(limW,limH)
            console.log(rdW,rdH)
            console.log(maxSize)
            var driect=0,delta=0;
            if(event.wheelDelta){
              delta = event.wheelDelta
            }else if(event.deltaY){
              delta = event.deltaY*-1
            }else if(event.wheelDeltaY){
              delta = event.wheelDeltaY
            }else{
              console.log('no delta')
            }
            delta>0?driect=1:driect=-1
            console.log(driect)
            _this.imgSize = _this.imgSize+driect*0.1;
            _this.imgSize<_this.minSize?_this.imgSize=_this.minSize:'';
            _this.imgSize>maxSize?_this.imgSize=maxSize:'';
            console.log(_this.imgSize)
            console.log(_this.canvasWidth,_this.canvasHeight)
            if(_this.imgSize>1){
              _this.extraImg=[img2]
            }else{
              _this.cols += (1-_this.imgSize)/0.1
              console.log(_this.cols)
              _this.extraImg=[]
              for(var x=0;x<_this.cols;x++){
                _this.extraImg.push(img3)
              }
              
              
              console.log(_this.extraImg)
              
            }
            var newW = _this.canvasWidth*_this.imgSize;
            var newH = _this.canvasHeight*_this.imgSize;
            console.log(newW,newH)
            _this.canvasWidth = newW;
            _this.canvasHeight = newH;
      }


    //   var pageX, pageY, initX, initY;
      var start = [];
      let _this = this;
      console.log(this.flagPC)
      if(this.flagPC) {
        //PC
        this.myCanvas.onmousedown = function () {
          _this.flag = true;
          //_this.pos = _this.windowToCanvas(event.clientX, event.clientY);  //坐标转换，将窗口坐标转换成canvas的坐标
        };
        this.myCanvas.onmousemove = function (evt) {  //移动
            if(_this.flag ){
                console.log(evt)
                size(evt)
                //_this.posl = _this.windowToCanvas(evt.clientX, evt.clientY);
                // var x = _this.posl.x - _this.pos.x, y = _this.posl.y - _this.pos.y;
                // _this.imgX  += x;
                // _this.imgY  += y;
                // _this.pos = JSON.parse(JSON.stringify(_this.posl));
                // console.log(_this.pos)
                //_this.drawImage();  //重新绘制图片
                _this.loadImg(_this.extraImg)
            }
        };
        this.myCanvas.onmouseup = function () {
            _this.flag  = false;
        };
        this.myCanvas.onmousewheel = this.myCanvas.onwheel = function (event) {    //滚轮放大缩小
            console.log(event)
            size(event)
            // var pos = _this.windowToCanvas (event.clientX, event.clientY);
            // // event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltalY * (-40));  //获取当前鼠标的滚动情况
            // var newPos = {x:((pos.x-_this.imgX)/_this.imgScale).toFixed(2) , y:((pos.y-_this.imgY)/_this.imgScale).toFixed(2)};
            // console.log(newPos)
            // if (event.wheelDelta > 0) {// 放大
            //         _this.imgScale +=0.05;
            //         _this.imgX = (1-_this.imgScale)*newPos.x+(pos.x-newPos.x);
            //         _this.imgY = (1-_this.imgScale)*newPos.y+(pos.y-newPos.y);
            // } else {//  缩小
            //     _this.imgScale -=0.05;
            //     if(_this.imgScale<_this.MINIMUM_SCALE) {//最小缩放1
            //         _this.imgScale = _this.MINIMUM_SCALE;
            //     }
            //     _this.imgX = (1-_this.imgScale)*newPos.x+(pos.x-newPos.x);
            //     _this.imgY = (1-_this.imgScale)*newPos.y+(pos.y-newPos.y);
            //     // console.log(_this.imgX,_this.imgY);
            // }
            // console.log(_this.imgX,_this.imgY)
            //_this.drawImage();   //重新绘制图片
            _this.loadImg(_this.extraImg)
        };
      } else {
        //Phone
        this.myCanvas.ontouchstart = function (event) {
          _this.flag = true;
          if(event.touches && event.touches.length < 2) {
            let touch = event.touches[0];
            _this.pos = _this.windowToCanvas(touch.clientX, touch.clientY);  //坐标转换，将窗口坐标转换成canvas的坐标
          }else{
            let touches = event.touches;
            //手指按下时的手指所在的X，Y坐标  
            this.pageX = touches[0].pageX;
            this.pageY = touches[0].pageY;
            //初始位置的X，Y 坐标  
            this.initX = event.target.offsetLeft;
            this.initY = event.target.offsetTop;
            //记录初始 一组数据 作为缩放使用
            if (touches.length >= 2) { //判断是否有两个点在屏幕上
              start = touches; //得到第一组两个点
            }
          }
        };
        this.myCanvas.ontouchmove = function (evt) {  //移动
            if(_this.flag ){
              if(evt.touches && evt.touches.length < 2) {
                // console.log(evt)
                let touch = evt.touches[0];
                _this.posl = _this.windowToCanvas(touch.clientX, touch.clientY);
                var x = _this.posl.x - _this.pos.x, y = _this.posl.y - _this.pos.y;
                _this.imgX  += x;
                _this.imgY  += y;
                _this.pos = JSON.parse(JSON.stringify(_this.posl));
              }else{
                let touches = evt.touches;
                // 2 根 手指执行 目标元素放大操作
                //得到第二组两个点
                var now = touches;
                var pos = _this.windowToCanvas (now[0].clientX, now[0].clientY);
                var newPos = {x:((pos.x-_this.imgX)/_this.imgScale).toFixed(2) , y:((pos.y-_this.imgY)/_this.imgScale).toFixed(2)};
                // Math.abs(touches[0].pageX-touches[1].pageX)
                //当前距离变小， getDistance 是勾股定理的一个方法
                if(_this.getDistance(now[0], now[1]) < _this.getDistance(start[0], start[1])){
                  // 缩小
                  _this.imgScale -=0.03;
                  if(_this.imgScale<_this.MINIMUM_SCALE) {//最小缩放1
                      _this.imgScale = _this.MINIMUM_SCALE;
                  }
                  _this.imgX = (1-_this.imgScale)*newPos.x+(pos.x-newPos.x);
                  _this.imgY = (1-_this.imgScale)*newPos.y+(pos.y-newPos.y);
                  // console.log(_this.imgX,_this.imgY);
                }else if(_this.getDistance(now[0], now[1]) > _this.getDistance(start[0], start[1])){
                  // 放大
                  if(_this.imgScale < 1) {
                    _this.imgScale +=0.03;
                      _this.imgX = (1-_this.imgScale)*newPos.x+(pos.x-newPos.x);
                      _this.imgY = (1-_this.imgScale)*newPos.y+(pos.y-newPos.y);
                  }
                }
                start = now;
              }
              //_this.drawImage();  //重新绘制图片
              _this.loadImg()
            }
        };
        this.myCanvas.ontouchend = function () {
            _this.flag  = false;
        };
      }
    },
    /*坐标转换*/
    windowToCanvas(x,y) {
        var box = this.myCanvas.getBoundingClientRect();  //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
        return {
            x: x - box.left - (box.width - this.myCanvas.width) / 2,
            y: y - box.top - (box.height - this.myCanvas.height) / 2
        };
    },
    //缩放 勾股定理方法-求两点之间的距离
    getDistance(p1, p2) {
        var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
        return Math.sqrt((x * x) + (y * y));
    },
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = ["Android", "iPhone",
                  "SymbianOS", "Windows Phone",
                  "iPad", "iPod"];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
              flag = false;
              break;
          }
      }
      return flag;
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
.slider{
  position: relative;
  left: 10px;
  bottom: 50px;
  width: 25%;
  color: #1976d2;
}
</style>