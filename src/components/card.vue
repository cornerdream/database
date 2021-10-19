<!-- 卡片信息 -->
<template>
<div class="card">
    <v-card
      class="mx-auto"
      max-width="400"
      elevation="2"
      outlined
    >
    
      <v-card-title class="cardTitle">NM_000546 | ENST00000269305</v-card-title>
      <v-card-title class="cardTitle">CCDS11118 | P53_HUMAN</v-card-title>
      <v-card-text>
         <v-list dense>
            <v-subheader>Somatic Mutation Frequency <v-icon>mdi-alert-circle</v-icon> 35%</v-subheader>
            
                    <v-list-item
                        v-for="(item, i) in infoData"
                        :key="i"
                    >
                        <v-list-item-icon :style="{'color':getColor(item.count)}">
                            <v-chip
                                class="chip"
                                :color="getColor(item.count)"
                            >
                                {{item.count}}
                            </v-chip>
                            
                        </v-list-item-icon>
                        <p class="pvalue">{{item.Variant_Classification}}</p>    
                    </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
</div>
</template>
<script>
export default {
name: '',
props:['infoData'],
data() {
return {
    items: [
      { text: 'Driver', color: '#263238' ,value:4206},
      { text: 'VUS', color: '#455A64' ,value:44},
      { text: 'Missense', color: '#2E7D32' ,value:2688},
      { text: 'Missense', color: '#9CCC65',value:43 },
      { text: 'truncating', color: '#2E7D32',value:1068 },
      { text: 'truncating', color: '#455A64',value:0 },
      { text: 'Inframe', color: '#BF360C',value:90 },
      { text: 'Inframe', color: '#827717',value:1 },
      { text: 'Splice', color: '#FFA726',value:335  },
      { text: 'Splice', color: '#FFB300',value:0 },
      { text: 'SV/Fusion', color: '#7E57C2',value:25 },
      { text: 'SV/Fusion', color: '#B388FF',value:0 },
    ],
}
},
created() {},
mounted() {},
methods:{
  getColor (calories) {
    if (calories > 20) return '#96a7f3'
    else if(calories > 15) return '#acddf2'
    else if (calories > 10) return '#93afcd'
    else if (calories > 5) return '#e0c3aa'
    else return '#aae0da'
  },
}
}
</script>
<style scoped>
.v-card__text{
    overflow: hidden;
}
.v-list-item{
    float: left;
    width: 170px;
    padding: 0;
}
.v-list-item--dense .v-list-item__icon, .v-list--dense .v-list-item .v-list-item__icon{
    display: inline-block;
    margin: 0;
}
/* .pvalue{
  line-height: 30px;
  margin: 10px 0 10px 16px;
} */
.cardTitle{
  color: #1f78b4;
}
.v-chip.chip{
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #777777;
  border-radius: 10px;
  height: auto;
  margin-right: 2px;
}
.v-application p{
  margin-bottom: 5px;
}
.v-list-item--dense, .v-list--dense .v-list-item{
  min-height: 20px;
}
.v-card__subtitle, .v-card__text, .v-card__title{
  padding: 6px 6px 0 6px;
}
.v-list--dense .v-subheader{
  height: 20px;
  padding: 0 8px 6px 8px;
}
.v-list{
  padding: 0;
}
</style>