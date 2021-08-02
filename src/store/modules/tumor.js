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
        fetch('http://192.168.1.128:8000/api/introduction/get_cmp_id/').then((res)=>{
            return res.json()
        }).then((data)=>{
            commit('SET_CMPID', data.data_info.cmp_id)
        })        
      },
      GetGeneClass({commit}){
        fetch('http://192.168.1.128:8000/api/omics/gene_class/').then((res)=>{
            return res.json()
        }).then((data)=>{
            commit('SET_GENECLASS', data.datainfo.gene_class)
        })
      },
      GetPathwayList({commit}){
        fetch('http://192.168.1.128:8000/api/pathway/pathwayid/').then((res)=>{
            return res.json()
        }).then((data)=>{
            commit('SET_PATHWAYLIST', data.datainfo)   
        })
      },
      GetHlaAllele({commit}){
        fetch('http://192.168.1.128:8000/api/immunity/hla_allele/').then((res)=>{
            return res.json()
        }).then((data)=>{
            commit('SET_HLAALLELE', data.data_info)   
        })
      },
      GetDrugclass({commit}){
        fetch('http://192.168.1.128:8000/api/drug/drugclass/').then((res)=>{
            return res.json()
        }).then((data)=>{
            commit('SET_DRUGCLASS', data.data_info)   
        })
      },
    }
  }
  
  export default theme
  