import Axios from '../utils/axios'
//model omics
export const Agettable_input = (v) => {
    return Axios({
        method:'GET',
        url:'api/model_db/model/tableInputSeatch/?table=mutation&field=Gene Symbol&value='+v
    })
}
export const Agettable_search = () => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Mutation/mutation_table_select/?search_data={"Variantion Type":["Frame_Shift_Ins"],"species":["mouse"]}&model_id=R21082254LR01-YK-0020,R21066457LR01-YK-0002'
    })
}
export const AgetMutation_table = ({gene_symbol,page,page_num,search_data}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Mutation/mutation_table/?model_id=R21082254LR01-YK-0020&gene_symbol='+gene_symbol+'&page='+page+'&page_num='+page_num+'&search_data='+search_data,
    })
}
export const AgetFusion_table_search = () => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Fusion/fusion_table_select/?search_data={"Left Gene":[],"Right Gene":[],"Fused Gene":[]}&model_id=R21082254LR01-YK-0020,R21066457LR01-YK-0002'
    })
}
export const AgetFusion_table = ({gene_symbol,page,page_num,search_data}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Fusion/fusion_table/?model_id=R21082254LR01-YK-0020&gene_symbol='+gene_symbol+'&page='+page+'&page_num='+page_num+'&search_data='+search_data,   
    })
}
export const AgetExpression_table_search = () => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/expression/expression_table_select/?search_data={"species":[],"gene symbol":[]}&model_id=R21082254LR01-YK-0020,R21066457LR01-YK-0002'
    })
}
export const AgetExpression_table = ({gene_symbol,page,page_num,search_data}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/expression/expression_table/?model_id=R21082254LR01-YK-0020&gene_symbol='+gene_symbol+'&page='+page+'&page_num='+page_num+'&search_data='+search_data,
    })
}

export const AgetFusionbar = ({species,gene_symbol}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Fusion/fusionbarchartFFPM/?omics=Gene%20expression&model_id=R21082254LR01-YK-0020&species='+species+'&gene_symbol='+gene_symbol
    })
}

export const AgetExpressionbar = ({species,gene_symbol}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/expression/expression_logtpm/?omics=Gene%20expression&model_id=R21082254LR01-YK-0020&species='+species+'&gene_symbol='+gene_symbol
    })
}
export const AgetCard = ({species,gene_symbol}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Mutation/variationclass_count/?omics=Gene expression&model_id=R21082254LR01-YK-0020&species='+species+'&gene_symbol='+gene_symbol
    })
}
export const AgetSequence = (id) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Mutation/sequence/?mutation_id='+id
    })
}
//immunology
export const AgetBarGroup = ({model_list,species}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/MfpData/?model_list='+model_list+'&model_id=R21082254LR01-YK-0020&species='+species
    })
}
export const AgetScatter = ({species}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/PathwaySsgsea/?model_id=R21082254LR01-YK-0020&species='+species
    })
}
// gene
export const AgetTable = ({species}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/gene/Mutation/mutation_table/?model_id=R21082254LR01-YK-0020&gene_symbol=MT-ATP8&species='+species
    })
}
export const AgetGeneSequence= (id) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/gene/Mutation/Sequence/?mutation_id='+id
    })
}
export const AgetGeneCard= ({species}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/gene/Mutation/variationclass_count/?cancer_type=liver cancer&gene_symbol=MT-ATP8&pathway_id=mmu03050&species='+species
    })
}
export const AgetGeneHeatmap= ({species}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/gene/Mutation/MutationHeatMap/?cancer_type=liver cancer&gene_symbol=MT-ATP8&species='+species
    })
}
export const AgetGeneFusionHeatmap= ({species}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/gene/Fusion/FusionHeatMap/?cancer_type=liver cancer&gene_symbol=MTATP6P1&species='+species
    })
}

export const AgetGeneFusionTable= ({species}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/gene/Fusion/FusionTable/?model_id=R21082254LR01-YK-0020&gene_symbol=MT-ATP8&species='+species
    })
}
export const AgetGeneExpressionTable= ({species}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/gene/Expression/ExpressionTable/?model_id=R21082254LR01-YK-0020&gene_symbol=MT-ATP8&species='+species
    })
}
export const AgetGeneFusionBar= ({species}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/gene/Fusion/FusionBarchartFFPM/?omics=Gene expression&gene_symbol=MTATP6P1&species='+species
    })
}
export const AgetGeneExpressionBar= ({species}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/gene/Expression/expression_logtpm/?cancer_type=liver cancer&gene_symbol=MTATP6P1&species='+species
    })
}
//pathway
export const AselectPathwayHeatmap= ({species}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/pathway/PathwayHeatMap/?cancer_type=liver cancer&gene_symbol=MTATP6P1&pathway_id=mmu03050&species='+species
    })
}

