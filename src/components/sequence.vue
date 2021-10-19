<!-- 序列图 -->
<template>
<div id="sequence">
    <!-- <v-row>
        <v-col class=".col-2" id="listChange" v-if="!neoepitope">
            <v-card flat>
                <v-tabs
                    v-model="tab"
                    background-color="transparent"
                    class="seqTab"
                    active-class="seqTabActive"
                >
                    <v-tab
                    v-for="item in tabItems"
                    :key="item.text"
                    @change="onchange"
                    >
                    {{ item.text }}
                    </v-tab>
                </v-tabs>
            
                <v-tabs-items v-model="tab">
                    <v-tab-item
                    v-for="item in tabItems"
                    :key="item.text"
                    >
                    <v-card flat height="450">
                    <v-list
                        nav
                        dense                          
                    >  
                        <v-list-item-group
                                                   
                            color="indigo"
                        >
                            <v-list-item                            
                            v-for="list in item.list"
                            :key="list.title"
                            @mouseenter.native="liHover(list,$event)"
                            @mouseleave.native="liLeave"
                            >
                            <v-list-item-content>
                                <v-list-item-title>{{list.title}}</v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                        </v-list>  
                    </v-card>
                    
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-col>
        <v-col class=".col-10" id="listContainer"> -->
            <v-card flat>
            <!-- <v-card-title>{{gene}}</v-card-title> -->
        
            <v-card-text>
                <v-row
                align="center"
                class="mx-0"
                >
                <v-avatar
                    color="primary"
                    size="36"
                >{{cov.length>0?cov[0].id:'id'}}</v-avatar>
        
                <div class="grey--text ms-4">       
                    {{cov.length>0?cov[0].domain_id:'domain_id'}}
                </div>
                </v-row>
        
               
            </v-card-text>
        
            <v-divider class="mx-4"></v-divider>
        
            <v-card-title>
                <v-row
                align="center"
                class="mx-0"
                >
                
                <v-col class="charNumbers"> 
                    <span 
                    v-for="i in str.length!==0?Math.ceil(str.length/80):null"
                    :key="i"
                    >{{1+80*(i-1)}}<br></span>
                    <!-- {{1+this.seq/80}}<br>81<br>161<br>241<br>321<br> -->
                </v-col>
                <v-col class="charSeq" cols="12" id="spanBox" ref="seqBox">       
                    <!-- <span style="color:black;">MEEPQS</span>
                    <span style="text-decoration:underline;color:#e31a1c;">DPSV EPPLSQETFS DLWKLLPENN V</span>
                    <span style="color:black;">LSPL</span>
                    <span style="text-decoration:underline;color:#ff7f00;">PSQAM DDLMLSPDDI EQWFTEDPGP </span>
                    <span style="color:black;">DEAPRMPEAA PPVAPAPAAP <br>TPAAPAPAPS WPLSSSVPS</span>
                    <span style="text-decoration:underline;color:#1f78b4;">Q KTYQGSYGFR LGFLHSGTAK SVTC</span>
                    <span style="text-decoration:underline;color:black;background:#ffd891;">TYSPAL NKMF</span>
                    <span style="text-decoration:underline;color:#1f78b4;">CQLAKT CPVQLWVDST PPPGTRVRAM <br>AIYKQSQHMT EVVRRCPHHE RCSDSDGLAP PQHLIRVEGN LRVEYLDDRN TFRHSVVVPY EPPEVGSDCT TIHYNYMCNS <br>SCMGGMNRRP ILTIITLEDS SGNLLGRNSF EVRVCACPGR DRRTEEENLR </span>
                    <span style="color:black;">KKGEPHHELP PGSTKRALPN NTSSSPQPK</span>
                    <span style="text-decoration:underline;color:#33a02c;">K <br>KPLDGEYFTL QIRGRERFEM FRELNEALEL KDAQAGKEP</span>
                    <span style="color:black;">G GSRAHSSHLK SKKGQSTSRH KKLMFKTEGP DSD</span> -->
                </v-col>
                </v-row>
            </v-card-title>
        
            <v-card-text>
                <v-chip-group> 
                <v-chip 
                v-for="(item,i) in str.length!==0?chipItems:null"
                :key="item.text+i"
               color="transparent"
               >
                    <v-avatar
                    :color="item.color"
                    size="6"
                    class="mx-2"
                    >_{{item.text}}</v-avatar>
                    <a>{{item.text}}</a>
                </v-chip>
        
                <!-- <v-chip color="transparent">
                    <v-avatar
                    color="#ff7f00"
                    size="6"
                    class="mx-2"
                    ></v-avatar>
                    <a>7:30PM</a>
                </v-chip>
        
                <v-chip color="transparent">
                    <v-avatar
                    color="#1f78b4"
                    size="6"
                    class="mx-2"
                    ></v-avatar>
                    <a>8:00PM</a>
                </v-chip>
        
                <v-chip color="transparent">
                    <v-avatar
                    color="#33a02c"
                    size="6"
                    class="mx-2"
                    ></v-avatar>
                    <a>9:00PM</a>
                </v-chip>  -->
                </v-chip-group>
            </v-card-text>
        
            
            </v-card>
        <!-- </v-col>
    </v-row> -->
</div>
</template>
<script>
import $ from 'jquery'
export default {
name: 'sequence',
props:['seq','cov','neoepitope','gene'],
data() {
return {
    tab: null,
    tabItems: [
        {   
            text:'neoepitope',
            list:[
                // {title:"KLLPENNVL",start:23,end:32,protein_id:"P04637",source:"UniProt"},
            ]
        }
    ],
    str:'',
    strGroup:8,
    color:[
        // {"color":"#1f78b4","underscore":true,"start":99,"end":290},
    ],
    colorItems:['#1f78b4','#33a02c','#e31a1c','#ff7f00','#025DF4','#DB6BCF','#2498D1','#BBBDE6','#4045B2','#21A97A','#FF745A','#007E99','#FFA8A8','#2391FF','#FFC328','#A0DC2C',
        '#946DFF',
        '#626681',
        '#EB4185',
        '#CD8150',
        '#36BCCB',
        '#327039',
        '#803488',
        '#83BC99',
    ],
    chipItems:[
        // {color:'#1f78b4',text:'a'},
    ],
    box:null,
}
},
watch:{
    seq(){
        console.log('seq')
        this.onchange()
        
    },
},
created() {
    console.log('create')
},
mounted() {
    console.log('mount')
    this.seq.length!==0&&this.onchange()
},
methods:{
    onchange(){
        this.loadseq()
        this.loadcolor()
        this.loadneoepitope()  
        this.$nextTick(()=>{
            // this.box = this.$refs.seqBox
            this.load()
        })
    },
    loadseq(){
        this.str='';
        if(this.seq.length==0){return} 
        this.str = this.seq;
    },
    loadcolor(){
        this.color=[];
        this.chipItems=[];
        if(this.cov.length==0){return} 
        this.cov.map((item,i)=>{
            var colorObj = {
                color:this.colorItems[i],
                underscore:true,
                start:item.domain_start||item.seq_start,
                end:item.domain_end||item.seq_end
            }
            this.color.push(colorObj)
            var chipObj = {
                color:this.colorItems[i],
                text:item.domain_name
            }
            this.chipItems.push(chipObj)
        })
    },
    loadneoepitope(){
        this.tabItems[0].list=[];
        this.neoepitope.map((item)=>{
            let obj = {
                title:item['neo-epitope'],
                start:item.start,
                end:item.end
            }
            this.tabItems[0].list.push(obj)
        })
    },
    
    load(){   
        
        // this.box.innerHTML = ''
        $('#spanBox').html(' ')
        if(this.seq.length==0) {
            $('.charNumbers').html(' ')
            return 
        }
        let l=this.str.length/80
        let str=this.str.replace(/(.{10})/g, '$1 ')
        // console.log(str)
        
        // console.log(l)
        let p=''
        for(var i=0;i<l;i++){
            p += str.slice(88*i,88*(i+1))+'<br>';
            
        }
        // console.log(p)
        str = p;
        let strArr = str.split('')
        // console.log(strArr)
        this.color.map((item)=>{
            let underscore = item.underscore?'underline':'none';
            let startCount = parseInt(item.start/10),endCount = parseInt(item.end/10),startBarCount = parseInt(item.start/80),endBarCount = parseInt(item.end/80);
            // console.log(startBarCount,endBarCount)
            // console.log(startCount,endCount)
            // let start = item.start+startCount ,end = item.end+endCount;  
            let start = item.start+startCount+startBarCount*4  ,end = item.end+endCount+endBarCount*4 ; 
            // console.log(start,end)                
            let searchStr  = strArr.slice(start,end).join('');
            // console.log(searchStr)
            let srtEndIndex = str.indexOf(searchStr) + searchStr.length;
            let srtStartIndex = str.indexOf(searchStr);
            // console.log(srtEndIndex,srtStartIndex)
            let newStr = str.substring(0, srtEndIndex) + "</span>" + str.substring(srtEndIndex);           
            newStr = newStr.substring(0, srtStartIndex) + '<span style="color:'+item.color+';text-decoration:'+underscore+'">' + newStr.substring(srtStartIndex);          
            str = newStr;
            
        })
        // console.log(str)
        $('#spanBox').html(str)
        // this.box.innerHTML = str;
    },
    liHover(li,e){
        $('#spanBox').html(' ')
        let obj = {start: li.start, end: li.end, color: "black", underscore: false, bgcolor: "#ffd891"}
        let hoverData =[...this.color]
        hoverData.push(obj)
        let str=this.str.replace(/(.{10})/g, '$1 ')

        let strArr = str.split('')
        
        hoverData.map((item)=>{
            
            let underscore = item.underscore?'underline':'none';
            
            let startCount = parseInt(item.start/10),endCount = parseInt(item.end/10);            
            
            let start = item.start+startCount,end = item.end+endCount
           
            let searchStr  = strArr.slice(start,end).join('');
                       
            var reg=searchStr.split('').reduce((total,next)=>{
                return total+'(<[^>]+>)?'+next
            })
           
            var m = str.match(reg)
            if(!m){return}
            let search = m[0]
            var regs = /<[^>]+>/g
            var span = search.match(regs)
  
            let spanCount =span?span.reduce((p,n)=>p.length+n.length).split('').length:0
            
            let srtEndIndex = m.index+spanCount + searchStr.length;
            let srtStartIndex = m.index;
            
           
            var spanH = span?span[0]:"";
            
            let newStr = str.substring(0, srtEndIndex) + "</span>" +spanH + str.substring(srtEndIndex);   
                
            let replace = newStr.substring(srtStartIndex,srtEndIndex)
           
            let replacestr = replace.replace(/<[^>]+>/g,'')
            
            let replaceL = replacestr.length;
            

            if(span){ 
                newStr = newStr.substring(0, srtStartIndex) + '</span>' +(item.bgcolor?'<span style="color:'+item.color+';text-decoration:'+underscore+';background:'+item.bgcolor+'">':'<span style="color:'+item.color+';text-decoration:'+underscore+'">' )+ replacestr+newStr.substring(srtStartIndex+replaceL+spanCount);
                //newStr = newStr.substring(0, srtStartIndex) + '</span>'+(item.bgcolor?'<span style="color:'+item.color+';text-decoration:'+underscore+';background:'+item.bgcolor+'">':'<span style="color:'+item.color+';text-decoration:'+underscore+'">' )+ replacestr+newStr.substring(srtStartIndex+replaceL+spanCount);          
            }else{
                newStr = newStr.substring(0, srtStartIndex) + (item.bgcolor?'<span style="color:'+item.color+';text-decoration:'+underscore+';background:'+item.bgcolor+'">':'<span style="color:'+item.color+';text-decoration:'+underscore+'">' )+ newStr.substring(srtStartIndex);          
            }
            //newStr = newStr.substring(0, srtStartIndex) + (item.bgcolor?'<span style="color:'+item.color+';text-decoration:'+underscore+';background:'+item.bgcolor+'">':'<span style="color:'+item.color+';text-decoration:'+underscore+'">' )+ newStr.substring(srtStartIndex);          
            
            str = newStr;
            
        })
        $('#spanBox').html(str)
        $(e.target).addClass('liactiveClass').siblings().removeClass('liactiveClass')
    },
    liLeave(){
        $('.v-list-item').removeClass('liactiveClass')
    }
}
}
</script>
<style scoped>
#listChange >>>.v-tab{
    color: #0079b5;
    padding: .5rem 1rem;
    border-radius: .25rem;
}
#listChange .seqTabActive{
    color: #fff;
    background-color: #0079b5;
}
.charNumbers{
    max-width: 50px;
    padding: 0 5px;
    border-right: 1px solid #000;
    text-align: right;
}
.charSeq{
    flex: 1;
    text-align: left;
}
.liactiveClass{
    background: #0079b5;
    
}
.liactiveClass.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: #fff !important;
}

</style>