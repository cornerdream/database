import Axios from '../utils/axios'

export const AgetCmpId = () => {
    return Axios({
        method:'GET',
        url:'/api/introduction/get_cmp_id/'
    })
}

export const AgetGeneClass = () => {
    return Axios({
        method:'GET',
        url:'/api/omics/gene_class/'
    })
}

export const AgetPathwayid = () => {
    return Axios({
        method:'GET',
        url:'/api/pathway/pathwayid/'
    })
}

export const AgetHlaAllele = () => {
    return Axios({
        method:'GET',
        url:'/api/immunity/hla_allele/'
    })
}

export const AgetDrugClass = () => {
    return Axios({
        method:'GET',
        url:'/api/drug/drugclass/'
    })
}
// overview
export const AsearchCmpId = (cmp_id) => {
    return Axios({
        method:'GET',
        url:'/api/introduction/cmp/?cmp_id='+cmp_id
    })
}
// omics
export const AselectCcl = (cmp_id,omics_type,gene_set,gene_list) => {
    return Axios({
        method:'GET',
        url:'/api/omics/ccl/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&gene_set='+gene_set+'&gene_list='+gene_list
    })
}
export const AselectCcltable = (cmp_id,omics_type,gene_set,gene_list,source) => {
    return Axios({
        method:'GET',
        url:'/api/omics/ccltable/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&gene_set='+gene_set+'&gene_list='+gene_list+'&source='+source
    })
}
//pathway
export const AselectPathway= (cmp_id,omics_type,pathway_id,source) => {
    return Axios({
        method:'GET',
        url:'/api/pathway/pathway/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&pathway_id='+pathway_id+'&source='+source
    })
}
export const AselectPathwaytable= (cmp_id,omics_type,pathway_id,source) => {
    return Axios({
        method:'GET',
        url:'/api/pathway/pathwaytable/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&pathway_id='+pathway_id+'&source='+source
    })
}
// immunology
export const AselectImmunity= (cmp_id,hla_type) => {
    return Axios({
        method:'GET',
        url:'/api/immunity/immunity/?cmp_id='+cmp_id+'&hla_type='+hla_type
    })
}
export const AselectHlatable= (cmp_id,hla_type,gene_set,gene_list) => {
    return Axios({
        method:'GET',
        url:'/api/immunity/hlatable/?cmp_id='+cmp_id+'&hla_type='+hla_type+'&gene_set='+gene_set+'&gene_list='+gene_list
    })
}
// oncogenesis
export const Aselectccl= (cmp_id,omics_type,gene_set,gene_list) => {
    return Axios({
        method:'GET',
        url:'/api/omics/ccl/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&gene_set='+gene_set+'&gene_list='+gene_list
    })
}
export const Aselectccltable= (cmp_id,omics_type,gene_set,gene_list,source) => {
    return Axios({
        method:'GET',
        url:'/api/omics/ccltable/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&gene_set='+gene_set+'&gene_list='+gene_list+'&source='+source
    })
}
// regulation
export const Aselectccl2= (cmp_id,omics_type,gene_set,gene_list) => {
    return Axios({
        method:'GET',
        url:'/api/omics/ccl/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&gene_set='+gene_set+'&gene_list='+gene_list
    })
}
export const Aselectccltable2= (cmp_id,omics_type,gene_set,gene_list,source) => {
    return Axios({
        method:'GET',
        url:'/api/omics/ccltable/?cmp_id='+cmp_id+'&omics_type='+omics_type+'&gene_set='+gene_set+'&gene_list='+gene_list+'&source='+source
    })
}
// pharmacology
export const Aselectdrug_info= (drug_class) => {
    return Axios({
        method:'GET',
        url:'/api/drug/drug_info/?drug_class='+drug_class
    })
}
export const Aselectdrugtable= (drug_class) => {
    return Axios({
        method:'GET',
        url:'/api/drug/drugtable/?drug_class='+drug_class
    })
}