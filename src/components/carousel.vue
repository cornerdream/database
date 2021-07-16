<!-- -->
<template>
<div id="carousel">
	<!-- 轮播图 -->
	<div class="wrapper">	
		<div 
		class="slide" 
		v-for="(item,i) in items"
		:key="item">
		
			<router-link :to="{path:'/'+item.replace(/\s/g,''),query:{view:'Overview'}}" target="_blank">
				<div class="item">
					<v-avatar size="400" class="itemImg">
						<v-img :src="img[i]"></v-img>
					</v-avatar>
					<v-avatar size="440" class="itemImg2">
						<v-img :src="body=='dark'?dark_c:white_c"></v-img>
					</v-avatar>
					
				</div>
				<v-card
				height="186"
				class="mx-auto"       
				outlined
				id="card"
				>
				</v-card>	
				<p class="itemTitle">{{item}}</p>
				<p class="itemText">简介</p>
			</router-link>
			
		</div>
		
	</div>
	<!-- 分页器 -->
	<ul class="pagination">
		<li 
        v-for="(item,i) in items"
        :key="item"  
		:class="i==0?'active':''"
      >{{item}}</li>
	</ul>
    <!-- 左右按钮 -->
	<v-avatar
        size="60"
        class="arrow changeLeft mdi mdi-chevron-left"
        color="blue-grey lighten-3"
    ></v-avatar>
	<v-avatar
        size="60"
        class="arrow changeRight mdi mdi-chevron-right"
        color="blue-grey lighten-3"
    ></v-avatar>

</div>
</template>
<script>
import { mapGetters } from 'vuex'
import img1 from '../assets/img.png'
import img2 from '../assets/white_bg.png'
import img3 from '../assets/dark_bg.png'
import imgC from '../assets/white_center_left.png'
import imgC2 from '../assets/dark_center_left.png'
import $ from 'jquery'
export default {
name: 'carousel',
computed: {
  ...mapGetters(['body'])
},
data() {
return {
	white_c:imgC,
	dark_c:imgC2,
	img:[img1,img2,img3,img1,img1,img1,img1,img1],
    items:['Tumor Cell Atlas','Immune Cell Atlas','Model Atlas','Atrain Atlas','Drug Atlas','Biosample Atlas','Biomarker Atlas','Target Atlas']
}
},
created() {
	
},
mounted() {
  this.carousel()
},
methods:{
  carousel(){
    let $container = $('#carousel'),
		$slideList = $container.find('.slide'),
		$paginationList = $container.find('.pagination>li'),
		$changeLeft = $container.children('.changeLeft'),
		$changeRight = $container.children('.changeRight');
	let step = 0,
		prev = 0,
		interval = 3000,
		autoTimer = null,
		len = $slideList.length;

	// CHANGE实现切换
	function change() {
		let $cur = $slideList.eq(step),
			$pre = $slideList.eq(prev);
		$cur.css('zIndex', 1);
		$pre.css('zIndex', 0);

		$cur.css({
			transitionDuration: '.3s',
			opacity: 1
		}).one('transitionend', () => {
			$pre.css({
				transitionDuration: '0s',
				opacity: 0
			});
		});

		// 焦点自动对齐
		// $paginationList.eq(step).addClass('active')
		// 	.siblings().removeClass('active');
		$paginationList.each((index, item) => {
			if (index === step) {
				$(item).addClass('active');
				return;
			}
			$(item).removeClass('active');
		});
	}

	// AUTOMOVE自动切换
	function autoMove() {
		prev = step;
		step++;
		step > (len - 1) ? step = 0 : null;
		change();
	}
	
	// 加载页面开始自动切换
	autoTimer = setInterval(autoMove, interval);

	// 鼠标进入和离开控制自动的关闭和开启
	$container.on('mouseenter', () => clearInterval(autoTimer))
		.on('mouseleave', () => autoTimer = setInterval(autoMove, interval));

	// 点击焦点切换
	$paginationList.on('mouseenter', function () {
		//  $(this).index() 当前点击这一项的索引
		let index = $(this).index();
		if (index === step) return;
		prev = step;
		step = index;
		change();
	});

	// 点击左右按钮实现切换
	$changeRight.on('click', autoMove);
	$changeLeft.on('click', function () {
		prev = step;
		step--;
		step < 0 ? step = len - 1 : null;
		change();
	});
  }
}
}
</script>
<style scoped>
#carousel{
	padding:2rem 5rem;
	position: relative;
}

#card{
    top:50%;
    transform: translateY(-50%);
	color: #fff;
	background:rgba(0,129,204,0.4);
}
#card-link{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
#card-link {
    min-width: 300px;
    max-width: 700px;
    padding: 0;
}
#card-link li{
    float: left;
    line-height: 3rem;
    width: 150px;
    text-align: left;
	
}
#card-link li.active{
    color: aqua;
}
.wrapper {
	position: relative;
	width: 100%;
	height: 456px;
	background: url('../assets/white_center_line.png') no-repeat;
	/* background-position-x: 50px; */
	background-position: 100% 50%;
}
body[theme-mode='dark'] .wrapper{
	background: url('../assets/dark_center_line.png') no-repeat;
	/* background-position-x: 50px; */
	background-position: 100% 50%;
}
.wrapper .slide {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	/* background:url('../assets/white_center_line.png') no-repeat;
	background-position: 100% 50%; */
	/* background: url('../assets/white_center_left.png') no-repeat;
	background-position-x: 50px; */
	/* 初始默认样式 */
	z-index: 0;
	opacity: 0;
	/* 动画 */
	transition: opacity .3s;
}
body[theme-mode='dark'] .wrapper .slide{
	/* background:url('../assets/dark_center_line.png') no-repeat;
	background-position: 100% 50%; */
	/* background: url('../assets/dark_center_left.png') no-repeat;
	background-position-x: 50px; */
}
/* 默认展示第一张图片 */
.wrapper .slide:nth-child(1) ,body[theme-mode='dark'] .slide:nth-child(1){
	z-index: 1;
	opacity: 1;
}

.wrapper .slide img ,body[theme-mode='dark'] .wrapper .slide img{
	width: 100%;
	height: 100%;
}
.item{
	position: absolute;
	left: 70px;
	/* top: 20px; */
	/* margin-top: -20px; */
	color: #fff;
	
}
.itemImg{
	position: absolute;
	top: 20px;
}
.itemImg2{
	position: absolute;
	left: -20px;
}
.itemTitle{
	position: absolute;
	left: 270px;
	transform: translateX(-50%);
	top: 50%;
	margin-top: -25px;
	z-index: 8888;
	font-size: 3.4rem;
	color: #fff;
}
.itemText{
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: 50%;
	margin-top: -25px;
	z-index: 8888;
	font-size: 2.4rem;
	color: #fff;
}
/* 分页器 */
.pagination {
	/* width: 1000px; */
	padding: 0;
	position: absolute;
	z-index: 999;
	left: 50%;
	transform: translateX(-50%);
}

.pagination li {
  cursor: pointer;
  float: left;
  line-height: 2.4rem;
  width: 200px;
  text-align: left;
}
body[theme-mode='dark'] .pagination li{
	color: #fff;
}
.pagination li.active ,body[theme-mode='dark'] .pagination li.active{
	color: lightcoral;
}
/* 左右按钮 */
.arrow {
	position: absolute;
	z-index: 999;
	top: 50%;
	margin-top: -30px;
  font-size: 4rem;
  color: #fff;
}

.arrow.changeLeft {
	left: 20px;
}

.arrow.changeRight {
	right: 20px;
}

</style>