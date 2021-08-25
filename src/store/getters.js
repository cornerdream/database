const getters = {
  body: (state) => state.theme.body,
  cmp_id: (state) => state.tumor.cmp_id, 
  gene_class: (state) => state.tumor.gene_class, 
  pathway_list: (state) => state.tumor.pathway_list, 
  hla_allele: (state) => state.tumor.hla_allele, 
  drugclass: (state) => state.tumor.drugclass, 
  loading: (state) => state.load.loading, 
}
export default getters
