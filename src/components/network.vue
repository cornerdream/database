<!-- -->
<template>
<div id="network"></div>
</template>
<script>
import G6 from '@antv/g6';
export default {
name: 'network',
data() {
return {
  netData:{
    nodes: [
      {
        id: 'a',
        x: 150,
        y: 250,
        label:'a',
        style: { fill: '#5B8FF9', stroke: null },
      },
      {
        id: 'b',
        x: 50,
        y: 350,
        label:'b',
        style: { fill: '#5AD8A6', stroke: null },
      },
      {
        id: 'c',
        x: 200,
        y: 350,
        label:'c',
        style: { fill: '#5D7092', stroke: null },
      },
      {
        id: 'd',
        x: 50,
        y: 150,
        label:'d',
        style: { fill: '#D50000', stroke: null },
      },
      {
        id: 'e',
        x: 200,
        y: 150,
        label:'e',
        // style: { fill: '#6200EA', stroke: null },
        size: 50,
        type: 'image',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
      },
    ],
    edges: [
      {
        id: 'a2a',
        source: 'a',
        target: 'a',
        type: 'loop',
        style: {
          stroke: '#212121',
          lineDash:[5],
          endArrow: {
            path: 'M 0,0 L 10,5 L 10,-5 Z',
            fill: '#eee',
          },
        },
        loopCfg: {
          position: 'top',
        },
      },
      {
        id: 'a2b',
        source: 'a',
        target: 'b',
        style: {
          
          stroke: '#FFAB00',
          lineWidth: 2,
          lineDash:[5],

          endArrow: {
            path: G6.Arrow.rect(10, 1, 10),
            d: 10,
          },
         
        },
      },
      {
        id: 'a2c',
        source: 'a',
        target: 'c',
        style: {
          
          stroke: '#FFAB00',
          lineWidth: 2,
          lineDash:[5],

          endArrow: {
            path: G6.Arrow.rect(10, 1, 10),
            d: 10,
          },
         
        },
      },
      {
        id: 'a2d',
        source: 'a',
        target: 'd',
        style: {
          
          stroke: '#3F51B5',
          lineWidth: 2,
          lineDash:[5],

          endArrow: {
            path: G6.Arrow.rect(10, 1, 10),
            d: 10,
          },
         
        },
      },
      {
        id: 'a2e',
        source: 'a',
        target: 'e',
        style: {
          
          stroke: '#3F51B5',
          lineWidth: 2,
          lineDash:[5],

          endArrow: {
            path: G6.Arrow.rect(10, 1, 10),
            d: 10,
          },
         
        },
      },
    ],
  }

}
},
created() {},
mounted() {
  
    this.antv()
},
methods:{
  antv(){
    let data = this.netData;
    const container = document.getElementById('network');
    const width = container.clientWidth;
    const height = container.clientHeight || 500;
    const graph = new G6.Graph({
      container: 'network',
      width,
      height,
      animate: true,
    });

    graph.data(data);
    graph.render();

    // setInterval(() => {
    //   data.nodes.forEach((node) => {
    //     node.x += Math.random() * 10 - 5;
    //     node.y += Math.random() * 10 - 5;
    //   });
    //   graph.changeData(data);
    // }, 600);
  }

}
}
</script>
<style scoped></style>