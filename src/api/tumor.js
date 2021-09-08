import Axios from '../utils/axios'

export const getCmpId = () => {
    return Axios({
        method:'GET',
        url:'/api/introduction/get_cmp_id/'
    })
}

export const getGeneClass = () => {
    return Axios({
        method:'GET',
        url:'/api/omics/gene_class/'
    })
}

export const getPathwayid = () => {
    return Axios({
        method:'GET',
        url:'/api/pathway/pathwayid/'
    })
}

export const getHlaAllele = () => {
    return Axios({
        method:'GET',
        url:'/api/immunity/hla_allele/'
    })
}

export const getDrugClass = () => {
    return Axios({
        method:'GET',
        url:'/api/drug/drugclass/'
    })
}
// overview
export const searchCmpId = (cmp_id) => {
    return Axios({
        method:'GET',
        url:'/api/introduction/cmp/?cmp_id='+cmp_id
    })
}
// omics
export const selectCcl = (cmp_id,omics_type,gene_set,gene_list) => {
    return Axios({
        method:'GET',
        url:'/api/omics/ccl/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&gene_set='+gene_set+'&gene_list='+gene_list
    })
}
export const selectCcltable = (cmp_id,omics_type,gene_set,gene_list,source) => {
    return Axios({
        method:'GET',
        url:'/api/omics/ccltable/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&gene_set='+gene_set+'&gene_list='+gene_list+'&source='+source
    })
}
//pathway
export const selectPathway= (cmp_id,omics_type,pathway_id,source) => {
    return Axios({
        method:'GET',
        url:'/api/pathway/pathway/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&pathway_id='+pathway_id+'&source='+source
    })
}
export const selectPathwaytable= (cmp_id,omics_type,pathway_id,source) => {
    return Axios({
        method:'GET',
        url:'/api/pathway/pathwaytable/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&pathway_id='+pathway_id+'&source='+source
    })
}
// immunology
export const selectImmunity= (cmp_id,hla_type) => {
    return Axios({
        method:'GET',
        url:'/api/immunity/immunity/?cmp_id='+cmp_id+'&hla_type='+hla_type
    })
}
export const selectHlatable= (cmp_id,hla_type,gene_set,gene_list) => {
    return Axios({
        method:'GET',
        url:'/api/immunity/hlatable/?cmp_id='+cmp_id+'&hla_type='+hla_type+'&gene_set='+gene_set+'&gene_list='+gene_list
    })
}
// oncogenesis
export const selectccl= (cmp_id,omics_type,gene_set,gene_list) => {
    return Axios({
        method:'GET',
        url:'/api/omics/ccl/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&gene_set='+gene_set+'&gene_list='+gene_list
    })
}
export const selectccltable= (cmp_id,omics_type,gene_set,gene_list,source) => {
    return Axios({
        method:'GET',
        url:'/api/omics/ccltable/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&gene_set='+gene_set+'&gene_list='+gene_list+'&source='+source
    })
}
// regulation
export const selectccl2= (cmp_id,omics_type,gene_set,gene_list) => {
    return Axios({
        method:'GET',
        url:'/api/omics/ccl/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&gene_set='+gene_set+'&gene_list='+gene_list
    })
}
export const selectccltable2= (cmp_id,omics_type,gene_set,gene_list,source) => {
    return Axios({
        method:'GET',
        url:'/api/omics/ccltable/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&gene_set='+gene_set+'&gene_list='+gene_list+'&source='+source
    })
}
// pharmacology
export const selectdrug_info= (drug_class) => {
    return Axios({
        method:'GET',
        url:'/api/drug/drug_info/?drug_class='+drug_class
    })
}
export const selectdrugtable= (drug_class) => {
    return Axios({
        method:'GET',
        url:'/api/drug/drugtable/?drug_class='+drug_class
    })
}