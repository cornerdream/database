<!-- 饼图 -->
<template>
<div id="pie">

</div>
</template>
<script>
import { Pie } from '@antv/g2plot';
export default {
name: 'pie',
data() {
return {
    data:[
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: '其他', value: 5 },
    ]
}
},
created() {},
mounted() {
  this.antv()
    
},
methods:{
    antv(){
     const piePlot = new Pie('pie', {
        appendPadding: 10,
        data:this.data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
        });

        piePlot.render();

    }
}
}
</script>
<style scoped></style>