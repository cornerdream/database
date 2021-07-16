const theme = {
    state: {
      cmp_id:[],  
      tableData:[],
      gene_class:[],
      scatterData:[],
      pathway_list:[],
      pathwaysData:{},
      
    },
  
    mutations: {
      SET_CMPID:(state, cmp_id) => {    
        state.cmp_id = cmp_id;    
      },
      SET_TABLEDATA: (state, tableData) => {    
        state.tableData = tableData;
      },
      SET_GENECLASS: (state, gene_class) => {    
        state.gene_class = gene_class;
      },
      SET_SCATTERDATA: (state, scatterData) => {    
        state.scatterData = scatterData;
      },
      SET_PATHWAYLIST: (state, pathway_list) => {    
        state.pathway_list = pathway_list;
      },
      SET_PATHWAYSDATA: (state, pathwaysData) => {    
        state.pathwaysData = pathwaysData;
      },
    },
  
    actions: {   
      GetCmpId({commit}){
        fetch('http://192.168.1.128:8000/api/introduction/get_cmp_id/').then((res)=>{
            return res.json()
        }).then((data)=>{
            commit('SET_CMPID', data.datainfo.cmp_id)
        })        
      },
      GetTableData({commit},cmpId){
        fetch('http://192.168.1.128:8000/api/introduction/cmp/?cmp_id='+cmpId).then((res)=>{
            return res.json()
        }).then((data)=>{
            commit('SET_TABLEDATA', data.datainfo)
        })
      },
      GetGeneClass({commit}){
        fetch('http://192.168.1.128:8000/api/omics/gene_class/').then((res)=>{
            return res.json()
        }).then((data)=>{
            commit('SET_GENECLASS', data.datainfo.gene_class)
        })
      },
      GetScatterData({commit},option){
        fetch('http://192.168.1.128:8000/api/omics/ccl/?cmp_id='+option.cmp_id+'&omics_type='+option.omics_type+'&gene_set='+option.gene_set+'&gene_list='+option.gene_list).then((res)=>{
            return res.json()
        }).then((data)=>{
            if(data.code==200){
                commit('SET_SCATTERDATA', data.datainfo)    
            }else{
                this.$alert.error(data.message)
            }        
        })
      },
      GetPathwayList({commit}){
        fetch('http://192.168.1.128:8000/api/pathway/pathwayid/').then((res)=>{
            return res.json()
        }).then((data)=>{
            commit('SET_PATHWAYLIST', data.datainfo)   
        })
      },
      GetPathwaysData({commit},option){
        fetch('http://192.168.1.128:8000/api/pathway/pathwaytable/?cmp_id='+option.cmp_id+'&omics_type='+option.omics_type+'&pathway_id='+option.pathway_id).then((res)=>{
            return res.json()
        }).then((data)=>{
            if(data.code==200){
                commit('SET_PATHWAYSDATA', data.datainfo)   
            }else{
                this.$alert.error(data.message)
            }
            
        })
      }  
    }
  }
  
  export default theme
  