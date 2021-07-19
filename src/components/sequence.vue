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
                            @mouseenter.native="liHover"
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
                <v-col class="charSeq" cols="11">       
                    <span style="color:black;">MEEPQS</span>
                    <span style="text-decoration:underline;color:#e31a1c;">DPSV EPPLSQETFS DLWKLLPENN V</span>
                    <span style="color:black;">LSPL</span>
                    <span style="text-decoration:underline;color:#ff7f00;">PSQAM DDLMLSPDDI EQWFTEDPGP </span>
                    <span style="color:black;">DEAPRMPEAA PPVAPAPAAP <br>TPAAPAPAPS WPLSSSVPS</span>
                    <span style="text-decoration:underline;color:#1f78b4;">Q KTYQGSYGFR LGFLHSGTAK SVTC</span>
                    <span style="text-decoration:underline;color:black;background:#ffd891;">TYSPAL NKMF</span>
                    <span style="text-decoration:underline;color:#1f78b4;">CQLAKT CPVQLWVDST PPPGTRVRAM <br>AIYKQSQHMT EVVRRCPHHE RCSDSDGLAP PQHLIRVEGN LRVEYLDDRN TFRHSVVVPY EPPEVGSDCT TIHYNYMCNS <br>SCMGGMNRRP ILTIITLEDS SGNLLGRNSF EVRVCACPGR DRRTEEENLR </span>
                    <span style="color:black;">KKGEPHHELP PGSTKRALPN NTSSSPQPK</span>
                    <span style="text-decoration:underline;color:#33a02c;">K <br>KPLDGEYFTL QIRGRERFEM FRELNEALEL KDAQAGKEP</span>
                    <span style="color:black;">G GSRAHSSHLK SKKGQSTSRH KKLMFKTEGP DSD</span>
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
                { title: 'Overview' },
            ]
        },
        {   
            text:'mouse',
            list:[
                { title: 'KLLPENNVL' },
                { title: 'MLSPDDIEQW' },
                { title: 'APAPSWPL' },
                { title: 'RLGFLHSGTAK' },
                { title: 'GTAKSVTCTY' },
                { title: 'TAKSVTCTY' },
                { title: 'VTCTYSPALNK' },
                { title: 'TYSPALNKMF' },
                { title: 'TYSPALNK' },
                { title: 'SPALNKMFCQL' }
            ]
        }
    ],
    model:1,
    strData:[
        {

        }
    ]
}
},
created() {},
mounted() {},
methods:{
    load(){
        
    },
    liHover(e){
        $(e.target).addClass('liactiveClass').siblings().removeClass('liactiveClass')
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