<!-- 水平对称条形图 -->
<template>
<div :id="id"></div>
</template>
<script>
import $ from 'jquery'
import { Chart } from '@antv/g2';
export default {
name: '',
props:{
  id:{
    default:'barGroup'
  },
  data:{
    default:()=>[]
  },
  x:{
    default:''
  },
  y:{
    default:''
  },
  z:{
    default:''
  }
},
// props:['data'],
data() {
return {
    barData:[
        { country: '乌拉圭', type: '2016 年转基因种植面积', value: 1.3 },
        { country: '乌拉圭', type: '2016 年耕地总面积', value: 1.8 },
        { country: '巴拉圭', type: '2016 年转基因种植面积', value: 3.6 },
        { country: '巴拉圭', type: '2016 年耕地总面积', value: 5.5 },
        { country: '南非', type: '2016 年转基因种植面积', value: 3.7 },
        { country: '南非', type: '2016 年耕地总面积', value: 12.1 },
        
        
    ]
}
},
watch:{
    data(){
        console.log('data')
        this.antv()
    },
},
created() {},
mounted() {
    this.antv()
    
},
methods:{
    

    antv(){
        let _this = this;
        let newData = []
        $('#'+_this.id).html(' ');
        newData = this.data;
        const chart = new Chart({
        container: _this.id,
        autoFit: true,
        height: 500,
        padding: [20, 100, 10, 200],
        });
        chart.data(newData);
        // chart.scale('value', {
        // alias: '销售额（万）',
        // });

        chart.axis(_this.z, true);
        chart.coordinate().transpose();
        chart.facet('mirror', {
            fields: [_this.x],
            transpose: true,
            showTitle: true,
            eachView: (view, facet) => {
                const facetIndex = facet.columnIndex;
                if (facetIndex === 0) {
                    view.axis(_this.y, {
                        position: 'top',
                        label: {
                        style: {
                            fill: '#aaaaaa',
                            fontSize: 12
                        }
                        },
                        tickLine: {
                            alignTick: true,
                            length: 1
                        },
                        line: null,
                    });
                } else {
                    view.axis(_this.y, true);
                }
                const color = (facetIndex === 0) ? '#1890ff' : '#2fc25b';
                view.interval().position(_this.y+'*'+_this.z).color(color)
                .size(10)
                .label(_this.z, (val) => {
                    let offset = (facetIndex === 1) ? -4 : 4;
                    let shadowBlur = 2;
                    let textAlign = (facetIndex === 1) ? 'end' : 'start';
                    let fill = 'white';
                    if (val < 8) {
                        offset = (facetIndex === 1) ? 4 : -4;
                        textAlign = (facetIndex === 1) ? 'start' : 'end';
                        fill = '#666666';
                        shadowBlur = 0;
                    }
                    return {
                        offset,
                        style: {
                            fill,
                            stroke: null,
                            shadowBlur,
                            shadowColor: 'rgba(0, 0, 0, .45)',
                            textAlign
                        }
                    };
                });
            }
        });

        chart.interaction('element-highlight');
        chart.render();
    }
}
}
</script>
<style scoped></style>