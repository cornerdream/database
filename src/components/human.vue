<!-- 人类老鼠互切图 -->
<template>
<div id="human">
    <div id="homeImageContainer">
        <v-card
        flat
        id="homeImage"
        class="mx-auto"
        dark
        max-width="800"
        height="800"
        >
    
        <v-img :src="tab?mouse:human" id="image">
          
        </v-img>
        <div id="homeImageNode">
              <!-- <ul id="contextMenu"></ul> -->
          </div>
      <!-- <v-card-title>
        <v-icon
          large
          left
        >
          mdi-twitter
        </v-icon>
        <span class="text-h6 font-weight-light">Twitter</span>
      </v-card-title>
  
      <v-card-text class="text-h5 font-weight-bold">
        "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
      </v-card-text>
  
      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              alt=""
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title>Evan You</v-list-item-title>
          </v-list-item-content>
  
          <v-row
            align="center"
            justify="end"
          >
            <v-icon class="mr-1">
              mdi-heart
            </v-icon>
            <span class="subheading mr-2">256</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">
              mdi-share-variant
            </v-icon>
            <span class="subheading">45</span>
          </v-row>
        </v-list-item>
      </v-card-actions> -->
    </v-card>
    </div>
    <div id="homeImageChange">
        <v-card flat>
            <v-tabs
                v-model="tab"
                background-color="primary"
                dark
                @change="antv"
            >
                <v-tab
                v-for="item in tabItems"
                :key="item.text"
                >
                {{ item.text }}
                </v-tab>
            </v-tabs>
        
            <v-tabs-items v-model="tab">
                <v-tab-item
                v-for="item in tabItems"
                :key="item.text"
                >
                <v-card flat height="40" width="40">
                    <v-img :src="item.icon"></v-img>
                    <!-- <v-card-text>{{ item.icon }}</v-card-text> -->
                </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</div>
</template>
<script>

import G6 from '@antv/g6';
import human from '../assets/human.png'
import mouse from '../assets/mouse.png'
import humanIcon from '../assets/human_icon.png'
import mouseIcon from '../assets/mouse_icon.png'
import eye from '../assets/eye.png'
import brain from '../assets/brain.png'
export default {
name: 'human',
data() {
return {
    human:human,
    mouse:mouse,
    tab: null,
    tabItems: [
        {text:'human',icon:humanIcon},{text:'mouse',icon:mouseIcon}
    ],
    nodesHumanData:{
        nodes: [
            {
              id: 'image',
              img: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
              description: 'antv',
              menus:['antv1','antv2','antv3'],
              x: 80,
              y: 50,
              size: [70, 30],
              color:'#d3d3d2',
              title: 'node1',
              error: true,
              nodeType: 'a',              
              nodeLevel: 2,
              panels: [
                { title: '成功率', value: '11%' },
                { title: '耗时', value: '111' },
                { title: '错误数', value: '111' },
              ],
             
              
            },
            
            {
              id: 'image1',
              img: eye,
              description: 'eye',
              menus:['eye1','eye2','eye3'],
              menuShow:true,
              x: 45,
              y: 150,
              size: [45, 45],
              color:'#d3d3d2',
              title: 'node2',
              error: false,
              nodeType: 'b',     
              nodeLevel: 0,
              panels: [
                { title: '成功率', value: '11%' },
                { title: '耗时', value: '111' },
                { title: '错误数', value: '111' },
              ],
            },
            {
              id: 'image2',
              img: brain,
              description: 'brain',
              menus:['brain1','brain2','brain3'],
              menuShow:true,
              x: 440,
              y: 0,
              size: [45, 45],
              color:'#d3d3d2',
              title: 'node3',
              error: false,
              nodeType: 'a',             
              nodeLevel: 3,
              panels: [
                { title: '成功率', value: '11%' },
                { title: '耗时', value: '111' },
                { title: '错误数', value: '111' },
              ],
              collapse: true,
             
            },
        ],
    },
    nodesMouseData:{
        nodes: [
            {
              id: 'image1',
              img: eye,
              description: 'eye',
              menus:['eye1','eye2','eye3'],
              menuShow:true,
              x: 45,
              y: 250,
              size: [45, 45],
              color:'#d3d3d2',
              title: 'node2',
              error: false,
              nodeType: 'b',     
              nodeLevel: 0,
              panels: [
                { title: '成功率', value: '11%' },
                { title: '耗时', value: '111' },
                { title: '错误数', value: '111' },
              ],
            },
            {
              id: 'image2',
              img: brain,
              description: 'brain',
              menus:['brain1','brain2','brain3'],
              menuShow:true,
              x: 440,
              y: 150,
              size: [45, 45],
              color:'#d3d3d2',
              title: 'node3',
              error: false,
              nodeType: 'a',             
              nodeLevel: 3,
              panels: [
                { title: '成功率', value: '11%' },
                { title: '耗时', value: '111' },
                { title: '错误数', value: '111' },
              ],
              collapse: true,
             
            },
        ],
    },
}
},
created() {},
mounted() {

  this.antv()

  
},
methods:{
    antv(){
      console.log(111)
      const container = document.getElementById('homeImageNode');
      if(!container) return;
      container.innerHTML ='';
      const tooltip = new G6.Tooltip({
            offsetX: 10,
            offsetY: 10,
            // the types of items that allow the tooltip show up
            // 允许出现 tooltip 的 item 类型
            itemTypes: ['node'],
            // custom the tooltip's content
            // 自定义 tooltip 内容
            getContent: (e) => {
                const outDiv = document.createElement('div');
                outDiv.style.width = 'fit-content';
                //outDiv.style.padding = '0px 0px 20px 0px';
                outDiv.innerHTML = `
                <h4>${e.item.getModel().description}</h4>
                `;
                return outDiv;
            },
      });
      const menu = new G6.Menu({
            offsetX: 6,
            offsetY: 10,
            itemTypes: ['node'],
            trigger:'click',
            getContent(e) {
                var ulD= document.createElement('ul');
                console.log(e.item)
                // var nodeMenu = e.item._cfg.model;
                var nodeMenu = e.item.getModel();
                ulD.className = nodeMenu.id
                var li='';
                nodeMenu.menus.forEach(el => {
                    li += '<li><a href="www.baidu.com">'+el+'</a></li>';
                });
                ulD.innerHTML = li;              
                return ulD
            },
            handleMenuClick(target, item) {
                console.log(target, item)
            },

      });
      G6.registerNode(
          'card-node',
          {
            drawShape: function drawShape(cfg, group) {
              const shape = group.addShape('rect', {
                attrs: {
                  x: 0,
                  y: 0,
                  width: 2,
                  height: cfg.size[1],
                  fill: cfg.color,
                },
                name: 'main-box',
                draggable: true,
              });

              // group.addShape('rect', {
              //   attrs: {
              //     x: 0,
              //     y: 0,
              //     width: 200,
              //     height: 20,
              //     fill: color,
              //     radius: [r, r, 0, 0],
              //   },
              //   name: 'title-box',
              //   draggable: true,
              // });

              // left icon
              group.addShape('image', {
                attrs: {
                  x: -cfg.size[0],
                  y: 0,
                  height: cfg.size[1],
                  width: cfg.size[0],
                  cursor: 'pointer',
                  img: cfg.img || 'app',
                },
                name: 'node-icon',
              });

              // title text
              // group.addShape('text', {
              //   attrs: {
              //     textBaseline: 'top',
              //     y: 2,
              //     x: 24,
              //     lineHeight: 20,
              //     text: cfg.title,
              //     fill: '#fff',
              //   },
              //   name: 'title',
              // });

              // if (cfg.nodeLevel > 0) {
              //   group.addShape('marker', {
              //     attrs: {
              //       x: 184,
              //       y: 30,
              //       r: 6,
              //       cursor: 'pointer',
              //       symbol: cfg.collapse ? G6.Marker.expand : G6.Marker.collapse,
              //       stroke: '#666',
              //       lineWidth: 1,
              //     },
              //     name: 'collapse-icon',
              //   });
              // }

              // The content list
              cfg.panels.forEach((item, index) => {
                // name text
                group.addShape('text', {
                  attrs: {
                    textBaseline: 'top',
                    y: 2,
                    x: 10 + index * 40,
                    lineHeight: 20,
                    text: item.title,
                    fill: 'rgba(0,0,0, 0.4)',
                  },
                  name: `index-title-${index}`,
                });

                // value text
                group.addShape('text', {
                  attrs: {
                    textBaseline: 'top',
                    y: 24,
                    x: 10 + index * 40,
                    lineHeight: 20,
                    text: item.value,
                    fill: '#595959',
                  },
                  name: `index-title-${index}`,
                });
              });
              return shape;
            },
          },
          'single-node',
        );
      const width = container.scrollWidth;
        const height = container.scrollHeight || 500;
        let graph = new G6.Graph({
          container: 'homeImageNode',
          width,
          height,
          plugins: [tooltip,menu],
          // translate the graph to align the canvas's center, support by v3.5.1
          // fitCenter: true,
          // defaultNode: {
          //     type: 'image',           
          //     clipCfg: {
          //     show: false,
          //     type: 'circle',
          //     r: 30,
          //     style: {
          //         lineWidth: 1,
          //     },
          //     },
          // },
          defaultNode: {
            type: 'card-node',
          },
          modes: {
              default: ['drag-canvas', 'drag-node'],
          },
        });
        console.log(this.tab)
        let data = this.tab?this.nodesMouseData:this.nodesHumanData   
        console.log(data)
        graph.clear()
        graph.data(data);
        graph.render();  
    },
    load2(){
      const descriptionDiv = document.createElement('div');
descriptionDiv.id = 'discription';
descriptionDiv.innerHTML = 'Right click a node to activate a contextMenu.';
document.getElementById('homeImageContainer').appendChild(descriptionDiv);

const container = document.getElementById('homeImageContainer');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const contextMenu = new G6.Menu({
  getContent(evt) {
    let header;
    if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
      header = 'Canvas ContextMenu';
    } else if (evt.item) {
      const itemType = evt.item.getType();
      header = `${itemType.toUpperCase()} ContextMenu`;
    }
    return `
    <h3>${header}</h3>
    <ul>
      <li title='1'>li 1</li>
      <li title='2'>li 2</li>
      <li>li 3</li>
      <li>li 4</li>
      <li>li 5</li>
    </ul>`;
  },
  handleMenuClick: (target, item) => {
    console.log(target, item);
  },
  // offsetX and offsetY include the padding of the parent container
  // 需要加上父级容器的 padding-left 16 与自身偏移量 10
  offsetX: 16 + 10,
  // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
  offsetY: 0,
  // the types of items that allow the menu show up
  // 在哪些类型的元素上响应
  itemTypes: ['node', 'edge', 'canvas'],
  trigger:'click'
});

const graph = new G6.Graph({
  // 使用 contextMenu plugins 时，需要将 container 设置为 position: relative;
  container: 'homeImageContainer',
  width,
  height,
  linkCenter: true,
  plugins: [contextMenu],
  defaultNode: {
    size: [80, 40],
    type: 'rect',
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    style: {
      stroke: '#b5b5b5',
      lineAppendWidth: 3, // Enlarge the range the edge to be hitted
    },
    labelCfg: {
      autoRotate: true,
      style: {
        // A white stroke with width 5 helps show the label more clearly avoiding the interference of the overlapped edge
        stroke: 'white',
        lineWidth: 5,
      },
    },
  },
  modes: {
    default: ['drag-node'],
  },
});

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      x: 200,
      y: 100,
      type: 'rect',
    },
    {
      id: 'node2',
      label: 'node2',
      x: 250,
      y: 250,
      type: 'rect',
    },
    {
      id: 'node3',
      label: 'node3',
      x: 350,
      y: 100,
      type: 'rect',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      label: 'Test Label',
    },
    {
      source: 'node1',
      target: 'node3',
      label: 'Test Label 2',
    },
  ],
};

graph.data(data);
graph.render();

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };

    }
    
}
}
</script>
<style scoped>
#human{
    position: relative;
    height: 100%;
}
#homeImage{
   background: transparent;
   /* position: relative; */
}
#image{
  margin-top: 60px;
  position: absolute;
}
#homeImageNode{
    position: relative;
}

/* #contextMenu{
    display: none;
    color: #000;
    position: absolute;
} */
#homeImageChange{
    position: absolute;
    right: 0;
    top: 0;
}
</style>