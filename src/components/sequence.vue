<!-- -->
<template>
<div id="sequence">
    <v-row>
        <v-col class=".col-6" id="listChange">
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
                            v-for="(l, i) in item.list"
                            :key="i"
                            @mouseenter.native="liHover(l,$event)"
                            @mouseleave.native="liLeave"
                            >
                            <v-list-item-content>
                                <v-list-item-title>{{l.title}}</v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                        </v-list>  
                    </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-col>
        <v-col class=".col-6" id="listContainer">
            <v-card
            flat
            >
            <v-card-title>P04637</v-card-title>
        
            <v-card-text>
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
        
               
            </v-card-text>
        
            <v-divider class="mx-4"></v-divider>
        
            <v-card-title>
                <v-row
                align="center"
                class="mx-0"
                >
                <!-- <v-col class="charNumbers"> 
                    1<br>81<br>161<br>241<br>321<br>
                </v-col> -->
                <v-col class="charSeq" cols="11" id="spanBox">       
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
                <!-- <v-chip-group> -->
               <v-chip color="transparent">
                    <v-avatar
                    color="#e31a1c"
                    size="6"
                    class="mx-2"
                    ></v-avatar>
                    <a>5:30PM</a>
                </v-chip>
        
                <v-chip color="transparent">
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
                </v-chip>
                <!-- </v-chip-group> -->
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
data() {
return {
    tab: null,
    tabItems: [
        {
            text:'human',
            list:[
                {title:"GSDCTTIHY","start":225,"end":234,"protein_id":"P04637","source":"UniProt","aa":"C","ptm_pos":229,"mod":"Glutathione"}
            ]
        },
        {   
            text:'mouse',
            list:[
                {title:"KLLPENNVL",start:23,end:32,protein_id:"P04637",source:"UniProt"},
                {title:"MLSPDDIEQW",start:43,end:53,protein_id:"P04637",source:"UniProt"},
                {title:"APAPSWPL",start:85,end:93,protein_id:"P04637",source:"UniProt"},
                {title:"RLGFLHSGTAK",start:109,end:120,protein_id:"P04637",source:"UniProt"},
                {title:"GTAKSVTCTY",start:116,end:126,protein_id:"P04637",source:"UniProt"},
                {title:"TAKSVTCTY",start:117,end:126,protein_id:"P04637",source:"UniProt"},
                {title:"VTCTYSPALNK",start:121,end:132,protein_id:"P04637",source:"UniProt"},
                {title:"TYSPALNKMF",start:124,end:134,protein_id:"P04637",source:"UniProt"},
                {title:"TYSPALNK",start:124,end:132,protein_id:"P04637",source:"UniProt"},
                {title:"SPALNKMFCQL",start:126,end:137,protein_id:"P04637",source:"UniProt"}
                
            ]
        }
    ],
    model:1,
    str:'MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFTEDPGPDEAPRMPEAAPPVAPAPAAPTPAAPAPAPSWPLSSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNTSSSPQPKKKPLDGEYFTLQIRGRERFEMFRELNEALELKDAQAGKEPGGSRAHSSHLKSKKGQSTSRHKKLMFKTEGPDSD'
    ,
    color:[
        {"color":"#1f78b4","underscore":true,"start":99,"end":290},
        {"color":"#33a02c","underscore":true,"start":319,"end":359},
        {"color":"#e31a1c","underscore":true,"start":6,"end":31},
        {"color":"#ff7f00","underscore":true,"start":35,"end":60}
    ],
    
}
},
created() {
    
},
mounted() {
    this.load()
},
methods:{
    load(){
        let str=this.str.replace(/(.{10})/g, '$1 ')

        let strArr = str.split('')
        this.color.map((item)=>{
            let underscore = item.underscore?'underline':'none';
            
            let nStartStrArr = strArr.slice(0,item.start)
            let startCount = 0,endCount = 0;
            if(strArr[item.start+1]==' '){
                startCount+=1;
            }
            nStartStrArr.forEach((item)=>{
                if(item==' '){
                    startCount++
                }
            })
            let nEndStrArr = strArr.slice(0,item.end)
            if(strArr[item.end+1]==' '){
                endCount+=1;
            }
            nEndStrArr.forEach((item)=>{
                if(item==' '){
                    endCount++
                }
            })
            
            let searchStr  = strArr.slice(item.start+startCount,item.end+endCount).join('');
            
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
            let nStartStrArr = strArr.slice(0,item.start)
            console.log(nStartStrArr)
            let startCount = 0,endCount = 0;
            if(strArr[item.start+1]==' '){
                startCount+=1;
            }
            nStartStrArr.forEach((item)=>{
                if(item==' '){
                    startCount++
                }
            })
            let nEndStrArr = strArr.slice(0,item.end)
            console.log(nEndStrArr)
            if(strArr[item.end+1]==' '){
                endCount+=1;
            }
            nEndStrArr.forEach((item)=>{
                if(item==' '){
                    endCount++
                }
            })
            console.log(startCount,endCount)
            let searchStr  = strArr.slice(item.start+startCount,item.end+endCount).join('');
            // let searchStr  = strArr.slice(item.start+endCount,item.end+endCount).join('');
            console.log(searchStr)

            let srtEndIndex = str.indexOf(searchStr) + searchStr.length;
            let srtStartIndex = str.indexOf(searchStr);
            console.log(srtStartIndex,srtEndIndex)
            let newStr = str.substring(0, srtEndIndex) + "</span>" + str.substring(srtEndIndex);           
            newStr = newStr.substring(0, srtStartIndex) + (item.bgcolor?'<span style="color:'+item.color+';text-decoration:'+underscore+';background:'+item.bgcolor+'">':'<span style="color:'+item.color+';text-decoration:'+underscore+'">' )+ newStr.substring(srtStartIndex);          
            str = newStr;
            console.log(str)
        })
        $('#spanBox').html(str)
        // let hoverstrH = $('#spanBox').html()//有标签的
        // let nhoverstr = $('#spanBox').text()//有空格的
        // console.log(nhoverstr)
        // let hoverstr = nhoverstr.replace(/\s/g,'');//没有空格，匹配查找的
        
        // let hoverSearchStr = $(e.target).text()//查询的  

        // console.log(hoverstr)  
        // console.log(hoverstrH)
        // console.log(hoverSearchStr) 
        // // let textArr = []
        
        // // hoverstrH = hoverstrH.replace(/<[^>]+>/g,"")
        // // console.log(hoverstrH)
        // var reg = /<[^>]+>/g;//标签
        // var span = hoverstrH.match(reg);  //全局匹配所有标签
        // console.log(span);
        // var reg2 = /([^*]+?)/g
        // var s = hoverstrH.match(reg2);  //全局匹配所有标签
        // console.log(s);
        // // var obj = $("#spanBox").clone()
        // // var span = obj.find(':nth-child(n)')
        // // console.log(span)
        // // span.remove()
        // // var str=obj.html()
        // // console.log(str)
        // // textArr.push(str)
        // let strArr = nhoverstr.split('')
        // console.log(strArr)
        // // $('#spanBox span').each(function(){
        //     // let hoverstr  = $(this).text()
        //     // hoverstr = hoverstr.replace(/\s/g,'')
        //     // console.log(hoverstr)
        //     console.log(hoverstr.indexOf(hoverSearchStr))
        //     let srtEndIndex = hoverstr.indexOf(hoverSearchStr) + hoverSearchStr.length;
        //     let srtStartIndex = hoverstr.indexOf(hoverSearchStr);
        //     console.log(srtEndIndex,srtStartIndex)
        // let nStartStrArr = strArr.slice(0,srtStartIndex)
        // let startCount = 0,endCount = 0;          
        // nStartStrArr.forEach((item)=>{
        //     if(item==' '){
        //         startCount++
        //     }
        // })

        // let nEndStrArr = strArr.slice(0,srtEndIndex)
        // nEndStrArr.forEach((item)=>{
        //     if(item==' '){
        //         endCount++
        //     }
        // })
        // console.log(startCount,endCount)
        //     let newStr = hoverstr.substring(0, srtEndIndex) + "</span>" + hoverstr.substring(srtEndIndex); 
        //     newStr = newStr.substring(0, srtStartIndex) + '<span style="background:#ffd891;">' + newStr.substring(srtStartIndex);
        //     $('#spanBox').html(newStr)    
                 
            // textArr.push()
        // })
         
        // let strArr = hoverstr.split('')
        // this.strData.color.map((item)=>{
        //     let underscore = item.underscore?'underline':'none';
        //     let nStartStrArr = strArr.slice(0,item.start)
        //     let startCount = 0,endCount = 0;          
        //     nStartStrArr.forEach((item)=>{
        //         if(item==' '){
        //             startCount++
        //         }
        //     })
        //     let nEndStrArr = strArr.slice(0,item.end)
        //     nEndStrArr.forEach((item)=>{
        //         if(item==' '){
        //             endCount++
        //         }
        //     })

        //     let searchStr  = strArr.slice(item.start+startCount,item.end+endCount).join('');

        //     console.log(searchStr)
        //     let srtEndIndex = hoverstr.indexOf(searchStr) + searchStr.length;
        //     let srtStartIndex = hoverstr.indexOf(searchStr);
        //     let newStr = hoverstr.substring(0, srtEndIndex) + "</span>" + hoverstr.substring(srtEndIndex);           
        //     newStr = newStr.substring(0, srtStartIndex) + '<span style="color:'+item.color+';text-decoration:'+underscore+'">' + newStr.substring(srtStartIndex);          
        //     hoverstr = newStr;
        // })
        // console.log(hoverSearchStr.length)
        // console.log(nhoverstr.indexOf(hoverSearchStr))
        
        // let hoversrtEndIndex = nhoverstr.indexOf(hoverSearchStr) + hoverSearchStr.length;
        // let hoversrtStartIndex = nhoverstr.indexOf(hoverSearchStr);
        // console.log(hoversrtEndIndex,hoversrtStartIndex)
        // let nStartStrArr = strArr.slice(0,hoversrtStartIndex)
        // let hoverstartCount = 0,hoverendCount = 0;
        
        // nStartStrArr.forEach((item)=>{
        //     if(item==' '){
        //         hoverstartCount++
        //     }
        // })
        // let nEndStrArr = strArr.slice(0,hoversrtEndIndex)
        
        // nEndStrArr.forEach((item)=>{
        //     if(item==' '){
        //         hoverendCount++
        //     }
        // })
        // console.log(hoverstartCount,hoverendCount)
        // let newHoverStr = hoverstr.substring(0, hoversrtEndIndex+hoverendCount+1) + "</span>" + hoverstr.substring(hoversrtEndIndex+hoverendCount+1);           
        // newHoverStr = newHoverStr.substring(0, hoversrtStartIndex+hoverstartCount+1) + '<span style="background:#ffd891;">' + newHoverStr.substring(hoversrtStartIndex+hoverstartCount+1);          
        // hoverstr = newHoverStr;
        // console.log(hoverstr)
        // $('#spanBox').html(hoverstr)
        
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

</style>