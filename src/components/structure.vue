<!-- -->
<template>
<div id="structure">

    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col
              cols="2"
              sm="4"
              md="4"
            >
              <v-radio-group
                v-model="primary"
                column               
              >
                <v-radio
                  v-for="item in radioItems"
                  :key="item"
                  :label="item"
                  color="primary"
                  :value="item"
                  @change="changeModel(item)"
                ></v-radio>
                <!-- <v-radio
                  label="primary"
                  color="primary"
                  value="primary"
                ></v-radio>
                <v-radio
                  label="primary"
                  color="primary"
                  value="primary"
                ></v-radio>
                <v-radio
                  label="primary"
                  color="primary"
                  value="primary"
                ></v-radio> -->
                <v-checkbox
                    v-model="checkbox1"
                    label="Show Hydrogens"
                    required
                    @change="setHydrogens(checkbox1)"
                    @blur="$v.checkbox.$touch()"
                ></v-checkbox>
                <v-checkbox
                    v-model="checkbox2"
                    label="Animate"
                    required
                    @change="animate(checkbox2)"
                    @blur="$v.checkbox.$touch()"
                ></v-checkbox>
              </v-radio-group>
            </v-col>
            <v-col
              cols="20"
              sm="8"
              md="8"
            >
              <div id="canvas_box">
                <canvas id="canvas">
                    
                </canvas>
                <div id="btnBox">
                    <div class="my-2" v-show="this.resetShow">
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="primary"
                            id="btnReset"
                            
                            @click="reset"
                        >
                            <v-icon dark>
                            mdi-undo-variant
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
                </div>
                
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
</div>
</template>
<script>

import $ from 'jquery'
export default {
name: 'structure',
data() {
return {
    primary:'Ball and Stick',
    resetShow:false,
    checkbox1: true,
    checkbox2: false,
    radioItems:['Ball and Stick','Sticks','Wire-Frame','Space-Filling'],
    checkItems:['Show Hydrogens','Animate'],
    chem:null,
    data:[],
    zoom:1
}
},
created() {
    // this.load()
},
mounted() {
    this.load()
},
methods:{
    load(){
        if(this.chem){
        this.chem.clear();
        this.chem.destroy();
        this.chem=null;
		}
        this.reset()
        fetch('../C22H18N4OS.txt')
        .then((res)=>{
            console.log(res)
            return res.text()
        })
        .then((result)=>{
            
            this.data = result;
            console.log(this.chem)
            this.chem = new window.PubChem3D_WebGL.Molecule({
                sdf:result,
                showOverlay:false,
                canvas:document.getElementById("canvas"),
                setting:{
                    backgroundColor:'transparent',
                    hydrogens:true,
                    scale:this.zoom,
                    mousewheel:false,
                    cylinder_size:0.2,
                    sphere_size:1,
                    quality:'High',
                    nQuality:64
                },
                tracker:function(){
                    $("#btnReset").removeAttr('disabled')
                }
            })
            console.log(this.chem)
        })
    },
    zoomIn(){
        if(this.zoom<20){
            this.zoom+=1;
            this.chem.setScale(this.zoom);
            $('#btnReset').removeAttr('disabled');
            $('#btnZoomOut').removeAttr('disabled');
            if(this.zoom>19){
                $('#btnZoomIn').attr('disabled','disbaled')
            }
        }
    },
    zoomOut(){
        if(this.zoom>1){
            this.zoom-=1;
            this.chem.setScale(this.zoom)
            $('#btnReset').removeAttr('disabled');
            $('#btnZoomIn').removeAttr('disabled');
            if(this.zoom<=1){
                $('#btnZoomOut').attr('disabled','disabled')
            }
        }
    },
    reset(){
        this.zoom = 1;
        if(this.chem){
            console.log(this.chem)
            this.chem.resetScale();
            this.chem.setModel('Ball and Stick');
            this.primary = 'Ball and Stick'
            this.resetShow = false;
        }
        $('#btnReset').attr('disabled','disabled')
        $('#btnZoomIn').removeAttr('disabled');
        $('#btnZoomOut').attr('disabled','disabled')
        
    },
    setHydrogens(isShow){
        this.chem.setHydrogens(isShow)
    },
    changeModel(value){
        console.log(value)
        if(value!=='Ball and Stick'){this.resetShow=true}
        // if(isCheck){
            this.chem.setModel(value)
        // }
    },
    animate(isShow){
        this.chem.animate(isShow)
    }
}
}
</script>
<style scoped>
#canvas_box{
    /* width:860px; */
    height:300px;
    border:solid 1px #ccc;
    position: relative;
}
#canvas{
    touch-action: none; 
    width: 100%; 
    height: 100%;
}
#btnBox{
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>