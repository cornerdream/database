<!-- -->
<template>
<div id="sequence">
    <v-row>
        <v-col class=".col-2" id="listChange">
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
        <v-col class=".col-10" id="listContainer">
            <v-card
            flat
            >
            <v-card-title>{{gene}}</v-card-title>
        
            <!-- <v-card-text>
                <v-row
                align="center"
                class="mx-0"
                >
                <v-avatar
                    color="primary"
                    size="36"
                >393</v-avatar>
        
                <div class="grey--text ms-4">       
                    Protein Sequence
                </div>
                </v-row>
        
               
            </v-card-text> -->
        
            <v-divider class="mx-4"></v-divider>
        
            <v-card-title>
                <v-row
                align="center"
                class="mx-0"
                >
                <!-- <v-col class="charNumbers"> 
                    1<br>81<br>161<br>241<br>321<br>
                </v-col> -->
                <v-col class="charSeq" cols="12" id="spanBox">       
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
                v-for="item in chipItems"
                :key="item.text"
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
        </v-col>
    </v-row>
</div>
</template>
<script>
import $ from 'jquery'
export default {
name: 'sequence',
props:['seq','cov','gene'],
data() {
return {
    tab: null,
    tabItems: [
        {
            text:'HLA',
            list:[
                // {title:"GSDCTTIHY","start":225,"end":234,"protein_id":"P04637","source":"UniProt","aa":"C","ptm_pos":229,"mod":"Glutathione"}
            ]
        },
        // {   
        //     text:'mouse',
        //     list:[
        //         {title:"KLLPENNVL",start:23,end:32,protein_id:"P04637",source:"UniProt"},
        //         {title:"MLSPDDIEQW",start:43,end:53,protein_id:"P04637",source:"UniProt"},
        //         {title:"APAPSWPL",start:85,end:93,protein_id:"P04637",source:"UniProt"},
        //         {title:"RLGFLHSGTAK",start:109,end:120,protein_id:"P04637",source:"UniProt"},
        //         {title:"GTAKSVTCTY",start:116,end:126,protein_id:"P04637",source:"UniProt"},
        //         {title:"TAKSVTCTY",start:117,end:126,protein_id:"P04637",source:"UniProt"},
        //         {title:"VTCTYSPALNK",start:121,end:132,protein_id:"P04637",source:"UniProt"},
        //         {title:"TYSPALNKMF",start:124,end:134,protein_id:"P04637",source:"UniProt"},
        //         {title:"TYSPALNK",start:124,end:132,protein_id:"P04637",source:"UniProt"},
        //         {title:"SPALNKMFCQL",start:126,end:137,protein_id:"P04637",source:"UniProt"}
                
        //     ]
        // }
    ],
    // str:'MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFTEDPGPDEAPRMPEAAPPVAPAPAAPTPAAPAPAPSWPLSSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNTSSSPQPKKKPLDGEYFTLQIRGRERFEMFRELNEALELKDAQAGKEPGGSRAHSSHLKSKKGQSTSRHKKLMFKTEGPDSD'
    // ,
    str:'',
    color:[
        // {"color":"#1f78b4","underscore":true,"start":99,"end":290},
        // {"color":"#33a02c","underscore":true,"start":319,"end":359},
        // {"color":"#e31a1c","underscore":true,"start":6,"end":31},
        // {"color":"#ff7f00","underscore":true,"start":35,"end":60}
    ],
    colorItems:[
        '#1f78b4',
        '#33a02c',
        '#e31a1c',
        '#ff7f00'
    ],
    chipItems:[
        // {color:'#1f78b4',text:'a'},
        // {color:'#33a02c',text:'b'},
        // {color:'#e31a1c',text:'c'},
        // {color:'#ff7f00',text:'d'}
    ]
}
},
watch:{
    seq(){
        this.loadseq()
        this.load()
    },
    cov(){
        this.loadcolor()
        this.load()
    }
},
created() {
    this.loadseq()
    this.loadcolor()
    this.load()
},
mounted() {
    this.loadseq()
    this.loadcolor()
    this.load()
},
methods:{
    loadcolor(){
        this.color=[];
        this.chipItems=[];
        this.cov.map((item,i)=>{
            var colorObj = {
                color:this.colorItems[i],
                underscore:true,
                start:item.domain_start,
                end:item.domain_end
            }
            this.color.push(colorObj)
            // this.color[i].start = item.domain_start;
            // this.color[i].end = item.domain_end;
            var chipObj = {
                color:this.colorItems[i],
                text:item.domain_name
            }
            this.chipItems.push(chipObj)
            // this.chipItems[i].text = item.domain_name
        })
    },
    loaddomain(){
        console.log(this.domain)
        this.tabItems[0].list=[];
        let obj = {
            title:this.domain.domain_name,
            start:this.domain.domain_start,
            end:this.domain.domain_end
        }
        this.tabItems[0].list.push(obj)
        console.log(this.tabItems)
    },
    loadseq(){
        // console.log(this.data)
        // let data = this.data[this.id];
        // console.log(data)
        // Object.keys(data).map((item)=>{
        //     let obj = {title:item}
        //     this.tabItems[0].list.push(obj)
        // })
        
        console.log(this.seq)
        
        this.str='';
        
        this.str = this.seq.seq;
        
        console.log(this.str)
    },
    load(){
        if(!this.str) return
        let str=this.str.replace(/(.{10})/g, '$1 ')
        console.log(str)
        // let brstr = str.replace(/(.{88}))/g,'$1<br>')
        // console.log(brstr)
        let strArr = str.split('')
        // strArr.forEach((item,i)=>{
            
        //     if(i%91==0){
        //         console.log(i)
        //         str = str.substring(0,i)+'<br>'+str.substring(i)
        //     }
        // })
        console.log(str)
        this.color.map((item)=>{
            let underscore = item.underscore?'underline':'none';
            let startCount = parseInt(item.start/10),endCount = parseInt(item.end/10); 
            let start = item.start+startCount,end = item.end+endCount                   
            let searchStr  = strArr.slice(start,end).join('');
            
            console.log(searchStr)

            let srtEndIndex = str.indexOf(searchStr) + searchStr.length;
            let srtStartIndex = str.indexOf(searchStr);
            let newStr = str.substring(0, srtEndIndex) + "</span>" + str.substring(srtEndIndex);           
            newStr = newStr.substring(0, srtStartIndex) + '<span style="color:'+item.color+';text-decoration:'+underscore+'">' + newStr.substring(srtStartIndex);          
            str = newStr;
            
        })

        $('#spanBox').html(str)
        
    },
    liHover(li,e){
        let obj = {start: li.start, end: li.end, color: "black", underscore: false, bgcolor: "#ffd891"}
        let hoverData =[...this.color]
        hoverData.push(obj)
        console.log(hoverData)
        let str=this.str.replace(/(.{10})/g, '$1 ')

        let strArr = str.split('')
        
        console.log(strArr)
        
        hoverData.map((item)=>{
            console.log(str)
            let underscore = item.underscore?'underline':'none';
            console.log(item.start,item.end)
            let startCount = parseInt(item.start/10),endCount = parseInt(item.end/10);            
            console.log(startCount,endCount)
            let start = item.start+startCount,end = item.end+endCount
            console.log(start,end)
            let searchStr  = strArr.slice(start,end).join('');
            // let searchStr  = strArr.slice(item.start,item.end).join('');
            console.log(searchStr)
            var reg=searchStr.split('').reduce((total,next)=>{
                return total+'[<span>|</span>]*?'+next
            })
            console.log(reg)
            var m = str.match(reg)
            console.log(m)
            let search = m.reduce((p,n)=>p+n)
            console.log(search)
            
            var regs = /<[^>]+>/g
            var span = search.match(regs)
            console.log(span)
            
            let spanCount =span?span.reduce((p,n)=>p.length+n.length).split('').length:0
            console.log(spanCount)
            let srtEndIndex = m.index+spanCount + searchStr.length;
            let srtStartIndex = m.index;
            // let srtEndIndex = str.indexOf(searchStr) + searchStr.length;
            // let srtStartIndex = str.indexOf(searchStr);
            console.log(srtStartIndex,srtEndIndex)
            let newStr = str.substring(0, srtEndIndex) + "</span>" + str.substring(srtEndIndex);   
            console.log(newStr)     
            let replace = newStr.substring(srtStartIndex,srtEndIndex)
            console.log(replace)
            console.log(newStr)   
            let replacestr = replace.replace(/<[^>]+>/g,'')
            console.log(replacestr)
            let replaceL = replacestr.length;
            console.log(replaceL)
            console.log(newStr.substring(srtStartIndex+replaceL+spanCount))
            console.log(newStr.substring(srtStartIndex+replaceL+spanCount))
            if(span){
                newStr = newStr.substring(0, srtStartIndex) + '</span>'+(item.bgcolor?'<span style="color:'+item.color+';text-decoration:'+underscore+';background:'+item.bgcolor+'">':'<span style="color:'+item.color+';text-decoration:'+underscore+'">' )+ replacestr+newStr.substring(srtStartIndex+replaceL+spanCount);          
            }else{
                newStr = newStr.substring(0, srtStartIndex) + (item.bgcolor?'<span style="color:'+item.color+';text-decoration:'+underscore+';background:'+item.bgcolor+'">':'<span style="color:'+item.color+';text-decoration:'+underscore+'">' )+ newStr.substring(srtStartIndex);          
            }
            //newStr = newStr.substring(0, srtStartIndex) + (item.bgcolor?'<span style="color:'+item.color+';text-decoration:'+underscore+';background:'+item.bgcolor+'">':'<span style="color:'+item.color+';text-decoration:'+underscore+'">' )+ newStr.substring(srtStartIndex);          
            console.log(newStr)
            str = newStr;
            console.log(str)
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
}
.liactiveClass{
    background: #0079b5;
    
}
.liactiveClass.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: #fff !important;
}
#spanbox{
    text-align: left;
}
</style>