import baseUrl from '../../utils/baseurl'
import { AgetCmpId,AgetGeneClass,AgetPathwayid,AgetHlaAllele,AgetDrugClass } from '../../api/tumor';
const theme = {
    state: {
      cmp_id:[],  
      gene_class:[],
      pathway_list:[],
      hla_allele:[],
      drugclass:[],
    },
  
    mutations: {
      SET_CMPID:(state, cmp_id) => {    
        state.cmp_id = cmp_id;    
      },
      SET_GENECLASS: (state, gene_class) => {    
        state.gene_class = gene_class;
      },
      SET_PATHWAYLIST: (state, pathway_list) => {    
        state.pathway_list = pathway_list;
      },
      SET_HLAALLELE: (state, hla_allele) => {    
        state.hla_allele = hla_allele;
      },
      SET_DRUGCLASS: (state, drugclass) => {    
        state.drugclass = drugclass;
      },
    },
  
    actions: {   
      GetCmpId({commit}){
        console.log(baseUrl)
        
        // fetch(baseUrl+'/api/introduction/get_cmp_id/').then((res)=>{
        //     return res.json()
        // }).then((data)=>{
        //     commit('SET_CMPID', data.data_info.cmp_id)
        // }).catch(res=>{
        //   console.log(res)
        //   console.log(this)
        // })   
        
        AgetCmpId().then((res)=>{
          commit('SET_CMPID', res.data.data_info.cmp_id)
        })
      },
      GetGeneClass({commit}){
        // fetch(baseUrl+'/api/omics/gene_class/').then((res)=>{
        //     return res.json()
        // }).then((data)=>{
        //     commit('SET_GENECLASS', data.datainfo.gene_class)
        // })
        AgetGeneClass().then((res)=>{
          commit('SET_GENECLASS', res.data.datainfo.gene_class)
        })  
      },
      GetPathwayList({commit}){

        // fetch(baseUrl+'/api/pathway/pathwayid/').then((res)=>{
        //     return res.json()
        // }).then((data)=>{
        //     commit('SET_PATHWAYLIST', data.datainfo)   
        // })
        AgetPathwayid().then((res)=>{
          commit('SET_PATHWAYLIST', res.data.datainfo)
        }) 
      },
      GetHlaAllele({commit}){
        // fetch(baseUrl+'/api/immunity/hla_allele/').then((res)=>{
        //     return res.json()
        // }).then((data)=>{
        //     commit('SET_HLAALLELE', data.data_info)   
        // })
        AgetHlaAllele().then((res)=>{
          commit('SET_HLAALLELE', res.data.data_info)
        })
      },
      GetDrugclass({commit}){
        // fetch(baseUrl+'/api/drug/drugclass/').then((res)=>{
        //     return res.json()
        // }).then((data)=>{
        //     commit('SET_DRUGCLASS', data.data_info)   
        // })
        AgetDrugClass().then((res)=>{
          commit('SET_DRUGCLASS', res.data.data_info)
        })
      },
    }
  }
  
  export default theme
  