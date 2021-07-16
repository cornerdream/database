const getters = {
  body: (state) => state.theme.body,
  cmp_id: (state) => state.tumor.cmp_id, 
  tableData: (state) => state.tumor.tableData, 
  gene_class: (state) => state.tumor.gene_class, 
  scatterData: (state) => state.tumor.scatterData, 
  pathway_list: (state) => state.tumor.pathway_list, 
  pathwaysData: (state) => state.tumor.pathwaysData, 
}
export default getters
