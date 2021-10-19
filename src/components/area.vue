<!-- -->
<template>
<div :id="id"></div>
</template>
<script>
import $ from 'jquery'
import { Chart } from '@antv/g2';
export default {
name: 'areab',
props:{
    id:{
        default:'areab'
    },
    data:{
        default:()=>[]
    }
},
// props:['data','id'],
data() {
return {
    areaChart:'',
   
    antvData:[
        {"year": 2040, "type": "Imports:Canada", "value": -1.222185}, 
        // {"year": 2040, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2040, "type": "Exports:Canada", "value": 1.02504}, 
        // {"year": 2040, "type": "Exports:Mexico", "value": 1.542886}, 
        // {"year": 2040, "type": "Exports:Natural", "value": 4.4365}, 
        {"year": 2039, "type": "Imports:Canada", "value": -1.222551}, 
        // {"year": 2039, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2039, "type": "Exports:Canada", "value": 1.033056}, 
        // {"year": 2039, "type": "Exports:Mexico", "value": 1.55467}, 
        // {"year": 2039, "type": "Exports:Natural", "value": 4.4365}, 
        {"year": 2038, "type": "Imports:Canada", "value": -1.220512}, 
        // {"year": 2038, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2038, "type": "Exports:Canada", "value": 1.035456}, 
        // {"year": 2038, "type": "Exports:Mexico", "value": 1.57112}, 
        // {"year": 2038, "type": "Exports:Natural", "value": 4.4365}, 
        {"year": 2037, "type": "Imports:Canada", "value": -1.217609}, 
        // {"year": 2037, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2037, "type": "Exports:Canada", "value": 1.03634}, 
        // {"year": 2037, "type": "Exports:Mexico", "value": 1.585366}, 
        // {"year": 2037, "type": "Exports:Natural", "value": 4.4365}, 
        {"year": 2036, "type": "Imports:Canada", "value": -1.233549}, 
        // {"year": 2036, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2036, "type": "Exports:Canada", "value": 1.031002}, 
        // {"year": 2036, "type": "Exports:Mexico", "value": 1.600677}, 
        // {"year": 2036, "type": "Exports:Natural", "value": 4.4365}, 
        {"year": 2035, "type": "Imports:Canada", "value": -1.270413}, 
        {"year": 2035, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2035, "type": "Exports:Canada", "value": 1.025825}, 
        // {"year": 2035, "type": "Exports:Mexico", "value": 1.615623}, 
        // {"year": 2035, "type": "Exports:Natural", "value": 4.4365}, 
        // {"year": 2034, "type": "Imports:Canada", "value": -1.308366}, 
        {"year": 2034, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2034, "type": "Exports:Canada", "value": 1.029956}, 
        // {"year": 2034, "type": "Exports:Mexico", "value": 1.636397}, 
        // {"year": 2034, "type": "Exports:Natural", "value": 4.369833}, 
        // {"year": 2033, "type": "Imports:Canada", "value": -1.32938}, 
        {"year": 2033, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2033, "type": "Exports:Canada", "value": 1.019988}, 
        // {"year": 2033, "type": "Exports:Mexico", "value": 1.650563}, 
        // {"year": 2033, "type": "Exports:Natural", "value": 4.303167}, 
        // {"year": 2032, "type": "Imports:Canada", "value": -1.3512}, 
        {"year": 2032, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2032, "type": "Exports:Canada", "value": 1.004413}, 
        // {"year": 2032, "type": "Exports:Mexico", "value": 1.663644}, 
        // {"year": 2032, "type": "Exports:Natural", "value": 4.2365}, 
        // {"year": 2031, "type": "Imports:Canada", "value": -1.360193}, 
        {"year": 2031, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2031, "type": "Exports:Canada", "value": 0.999239}, 
        // {"year": 2031, "type": "Exports:Mexico", "value": 1.681527}, 
        // {"year": 2031, "type": "Exports:Natural", "value": 4.169833}, 
        // {"year": 2030, "type": "Imports:Canada", "value": -1.391053}, 
        {"year": 2030,  "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2030, "type": "Exports:Canada", "value": 0.995885}, 
        {"year": 2030, "type": "Exports:Mexico", "value": 1.703352}, 
        // {"year": 2030, "type": "Exports:Natural", "value": 4.103167}, 
        // {"year": 2029, "type": "Imports:Canada", "value": -1.431479}, 
        // {"year": 2029, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2029, "type": "Exports:Canada", "value": 0.986615}, 
        {"year": 2029, "type": "Exports:Mexico", "value": 1.72385}, 
        // {"year": 2029, "type": "Exports:Natural", "value": 4.0365}, 
        // {"year": 2028, "type": "Imports:Canada", "value": -1.506199}, 
        // {"year": 2028, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2028, "type": "Exports:Canada", "value": 0.958383}, 
        {"year": 2028, "type": "Exports:Mexico", "value": 1.745559}, 
        // {"year": 2028, "type": "Exports:Natural", "value": 4.0365}, 
        // {"year": 2027, "type": "Imports:Canada", "value": -1.5403}, 
        // {"year": 2027, "type": "Imports:Natural", "value": -0.055}, 
        // {"year": 2027, "type": "Exports:Canada", "value": 0.940971}, 
        {"year": 2027, "type": "Exports:Mexico", "value": 1.768059}, 
        // {"year": 2027, "type": "Exports:Natural", "value": 3.969833},
        //  {"year": 2026, "type": "Imports:Canada", "value": -1.621321}, 
        //  {"year": 2026, "type": "Imports:Natural", "value": -0.055}, 
        //  {"year": 2026, "type": "Exports:Canada", "value": 0.919087}, 
         {"year": 2026, "type": "Exports:Mexico", "value": 1.79072}, 
        //  {"year": 2026, "type": "Exports:Natural", "value": 3.8365}, 
        //  {"year": 2025, "type": "Imports:Canada", "value": -1.647116}, 
        //  {"year": 2025, "type": "Imports:Natural", "value": -0.055}, 
        //  {"year": 2025, "type": "Exports:Canada", "value": 0.890608},
          {"year": 2025, "type": "Exports:Mexico", "value": 1.813576}, 
        //   {"year": 2025, "type": "Exports:Natural", "value": 3.703167}, 
        //   {"year": 2024, "type": "Imports:Canada", "value": -1.682715}, 
        //   {"year": 2024, "type": "Imports:Natural", "value": -0.055}, 
        //   {"year": 2024, "type": "Exports:Canada", "value": 0.861517}, 
        //   {"year": 2024, "type": "Exports:Mexico", "value": 1.833946}, 
        //   {"year": 2024, "type": "Exports:Natural", "value": 3.569834}, 
        //   {"year": 2023, "type": "Imports:Canada", "value": -1.72777}, 
        //   {"year": 2023, "type": "Imports:Natural", "value": -0.055}, 
        //   {"year": 2023, "type": "Exports:Canada", "value": 0.854424}, 
        //   {"year": 2023, "type": "Exports:Mexico", "value": 1.856797}, 
        //   {"year": 2023, "type": "Exports:Natural", "value": 3.369833}, 
        //   {"year": 2022, "type": "Imports:Canada", "value": -1.848947}, 
        //   {"year": 2022, "type": "Imports:Natural", "value": -0.055}, 
        //   {"year": 2022, "type": "Exports:Canada", "value": 0.826329}, 
        //   {"year": 2022, "type": "Exports:Mexico", "value": 1.862548}, 
        //   {"year": 2022, "type": "Exports:Natural", "value": 3.169834}, 
        //   {"year": 2021, "type": "Imports:Canada", "value": -1.969753}, 
        //   {"year": 2021, "type": "Imports:Natural", "value": -0.055}, 
        //   {"year": 2021, "type": "Exports:Canada", "value": 0.806774}, 
        //   {"year": 2021, "type": "Exports:Mexico", "value": 1.841015}, 
        //   {"year": 2021, "type": "Exports:Natural", "value": 3.0365}, 
        //   {"year": 2020, "type": "Imports:Canada", "value": -2.102675}, 
        //   {"year": 2020, "type": "Imports:Natural", "value": -0.055}, 
        //   {"year": 2020, "type": "Exports:Canada", "value": 0.780532}, 
        //   {"year": 2020, "type": "Exports:Mexico", "value": 1.826497}, 
        //   {"year": 2020, "type": "Exports:Natural", "value": 2.9135}, 
        //   {"year": 2019, "type": "Imports:Canada", "value": -2.267037}, 
        //   {"year": 2019, "type": "Imports:Natural", "value": -0.064}, 
        //   {"year": 2019, "type": "Exports:Canada", "value": 0.767211}, 
        //   {"year": 2019, "type": "Exports:Mexico", "value": 1.745285}, 
        //   {"year": 2019, "type": "Exports:Natural", "value": 1.8736}, 
        //   {"year": 2018, "type": "Imports:Canada", "value": -2.487323}, 
        //   {"year": 2018, "type": "Imports:Natural", "value": -0.073}, 
        //   {"year": 2018, "type": "Exports:Canada", "value": 0.736228}, 
        //   {"year": 2018, "type": "Exports:Mexico", "value": 1.582102}, 
        //   {"year": 2018, "type": "Exports:Natural", "value": 1.0174}, 
        //   {"year": 2017, "type": "Imports:Canada", "value": -2.655148}, 
        //   {"year": 2017, "type": "Imports:Natural", "value": -0.073}, 
        //   {"year": 2017, "type": "Exports:Canada", "value": 0.725}, 
        //   {"year": 2017, "type": "Exports:Mexico", "value": 1.177}, 
        //   {"year": 2017, "type": "Exports:Natural", "value": 0.5329}, 
        //   {"year": 2016, "type": "Imports:Canada", "value": -2.925014}, 
        //   {"year": 2016, "type": "Imports:Natural", "value": -0.08052}, 
        //   {"year": 2016, "type": "Exports:Canada", "value": 0.730001}, 
        //   {"year": 2016, "type": "Exports:Mexico", "value": 1.166}, 
        //   {"year": 2016, "type": "Exports:Natural", "value": 0.171982}, 
        //   {"year": 2015, "type": "Imports:Canada", "value": -2.626342}, 
        //   {"year": 2015, "type": "Imports:Natural", "value": -0.091073}, 
        //   {"year": 2015, "type": "Exports:Canada", "value": 0.700903}, 
        //   {"year": 2015, "type": "Exports:Mexico", "value": 1.054466}, 
        //   {"year": 2015, "type": "Exports:Natural", "value": 0.028144}
    ],
    
}
},
watch:{
 data(){
    this.antv();
 }
},
created() {
   
},
mounted() {
    this.antv();
},
methods:{
    
    antv(){
        $('#'+this.id).html('') 
        this.antvData=[];
        if(!this.data){return}
        for(var item in this.data){

            for(var obj in this.data[item]){
            
                let type1 = {'type':item}
            
                type1['year'] = obj;
                var value1;
                if(typeof this.data[item][obj]=='object'){
                value1 = Object.values(this.data[item][obj]).reduce((prev,next)=>prev+next)
                }else{
                value1 = this.data[item][obj]
                }
            
                type1['value'] = value1;
            
                this.antvData.push(type1)
            } 
        
        }
        this.areaChart = new Chart({
            container: this.id,
            autoFit: true,
            height: 500,
            padding: [50, 20, 30, 30]
        });
        console.log(this.antvData)
        // this.antvChart = chart;
        this.areaChart.data(this.antvData);
        this.areaChart.scale({
            year: {
                // type: 'linear',
                // tickInterval: 1,
            },
            value: {
                nice: true,
            }
        });

        this.areaChart.tooltip({
        showCrosshairs: true,
        shared: true
        });
        // // Y轴单位
        // chart.annotation().text({
        // position: [2015, 8],
        // content: '万立方/英尺',
        // style: {
        //     fill: '#8c8c8c',
        //     fontWeight: 300
        // },
        // offsetY: -30,
        // offsetX: -20
        // });
        // // export mexico
        // chart.annotation().text({
        // position: [2040, 6.3],
        // content: '出口至墨西哥',
        // style: {
        //     fill: '#eee',
        //     fontWeight: 300,
        //     textAlign: 'end',
        //     textBaseline: 'center'
        // },
        // offsetX: -10
        // });
        // // export canada
        // chart.annotation().text({
        // position: [2040, 5],
        // content: '出口至加拿大',
        // style: {
        //     fill: '#eee',
        //     fontWeight: 300,
        //     textAlign: 'end',
        //     textBaseline: 'center'
        // },
        // offsetX: -10
        // });
        // // export nature
        // chart.annotation().text({
        // top: true,
        // position: [2040, 2],
        // content: '来自40个州的液化天然气出口',
        // style: {
        //     fill: '#eee',
        //     fontWeight: 300,
        //     textAlign: 'end',
        //     textBaseline: 'center'
        // },
        // offsetX: -10
        // });
        // // import canada
        // chart.annotation().text({
        // position: [2015, -1.5],
        // content: '从加拿大进口',
        // style: {
        //     fill: '#eee',
        //     fontWeight: 300,
        //     textAlign: 'start',
        //     textBaseline: 'center'
        // },
        // offsetX: 10
        // });
        // // import nature
        // chart.annotation().text({
        // position: [2019, -3.5],
        // content: '从其他国家进口',
        // style: {
        //     fill: '#6b6b6b',
        //     fontWeight: 300,
        //     textAlign: 'start',
        //     textBaseline: 'center'
        // },
        // });

        this.areaChart.annotation().region({
        start: [2019, 8],
        end: [2040, -4],
        style: {
            lineWidth: 0,
            fill: '#dcdcdc',
            fillOpacity: 0.3,
            stroke: '#ccc'
        }
        });

        this.areaChart.legend(false);
        this.areaChart
        .area()
        .adjust('stack')
        .position('year*value')
        .color('type', ['#1890ff', '#40a9ff', '#0050b3', '#003a8c', '#002766'])
        .style({
            fillOpacity: 1,
        });
        this.areaChart
        .line()
        .adjust('stack')
        .position('year*value')
        .color('type', ['white'])
        .size(1)
        .tooltip(false)
        .style({
            fillOpacity: 0.2,
        });
        this.areaChart.render();
        
    }
}
}
</script>
<style scoped></style>