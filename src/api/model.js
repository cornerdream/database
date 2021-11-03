import Axios from '../utils/axios'
//search
//单条件搜索选项提示，t是类型，v是用户输入，
export const Agetsearch_list = (t,v) => {
    return Axios({
        method:'GET',
        url:'/api/search/searchhint/?Entity_Type='+t+'&value='+v
    })
}
//用户输入的是在cancer type类型下那就将用户输入的v放在cancer type字段里，请求对应的id
export const Agetsearch_list_id = (t,v) => {
    
    return Axios({
        method:'GET',
        url:'/api/search/modelsearch/?Cancer Type='+(t=='Cancer Type'?v:'')+'&Model Name='+(t=='Model Name'?v:'')
    })
}
//单条件搜索引擎结果页modelresult的根据返回id请求表格数据
export const Agetsearch_list_id_table = ({model_id,page,page_num,order_by_field,desc}) => {
    
    return Axios({
        method:'GET',
        url:'/api/model_db/model/modelpanel/?model_id='+model_id+'&page='+page+'&page_num='+page_num+'&order_by_field='+order_by_field+'&desc='+desc,
    
    })
}
//废弃，之前的modelresult表格数据
export const Agetsearch_table = ({Entity_Type,value,order_by_field,desc}) => {
    return Axios({
        method:'GET',
        url:'/api/search/modelsearch/?Entity_Type='+Entity_Type+'&value='+value+'&order_by_field='+order_by_field+'&desc='+desc
    })
}
//废弃
export const Agetsearch_tables = ({model_Entity_Type,model_value,gene_Entity_Type,gene_value,order_by_field,desc}) => {
    return Axios({
        method:'GET',
        url:'/api/search/advancedsearch/?model_Entity_Type='+model_Entity_Type+'&model_value='+model_value+'&gene_Entity_Type='+gene_Entity_Type+'&gene_value='+gene_value+'&order_by_field='+order_by_field+'&desc='+desc
    })
}
//model omics
//表格里的搜索,v是用户输入的值，k是哪个列，t是哪个表格
export const Agettable_input = (v,k,t,model_id) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/tableInputSeatch/?table='+t+'&field='+k+'&value='+v+'&model_id='+model_id
    })
}
//mutation表格获取筛选框列和下拉框列以及筛选框的选项
export const Agettable_search = (model_id) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Mutation/mutation_table_select/?search_data={"Variantion Type":[],"species":[]}&model_id='+model_id
    })
}
//mutation表格获取数据，可搜索可筛选search_data，可排序order_by_field,正序0倒序1参数desc
export const AgetMutation_table = ({model_id,gene_symbol,page,page_num,search_data,order_by_field,desc}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Mutation/mutation_table/?model_id='+model_id+'&gene_symbol='+gene_symbol+'&page='+page+'&page_num='+page_num+'&search_data='+search_data+'&order_by_field='+order_by_field+'&desc='+desc,
    })
}
//mutation下拉框
export const AgetMutation_select = ({model_id,search_data}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Mutation/mutation_barchart_select/?model_id='+model_id+'&search_data='+search_data
    })
}
//mutation bar
export const AgetMutation_bar = ({model_id,search_data}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Mutation/MutationCount/?model_id='+model_id+'&search_data='+search_data
    })
}
export const AgetFusion_table_search = (model_id) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Fusion/fusion_table_select/?search_data={"Left Gene":[],"Right Gene":[],"Fused Gene":[]}&model_id='+model_id
    })
}

export const AgetFusion_table = ({model_id,gene_symbol,page,page_num,search_data,order_by_field,desc}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Fusion/fusion_table/?model_id='+model_id+'&gene_symbol='+gene_symbol+'&page='+page+'&page_num='+page_num+'&search_data='+search_data+'&order_by_field='+order_by_field+'&desc='+desc,   
    })
}
//Fusion下拉框
export const AgetFusion_select = ({model_id,search_data}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Fusion/fusion_barchart_select/?model_id='+model_id+'&search_data='+search_data
    })
}
//Fusion bar
export const AgetFusion_bar = ({model_id,search_data}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/Fusion/FusionFfpm/?model_id='+model_id+'&search_data='+search_data
    })
}
export const AgetExpression_table_search = (model_id) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/expression/expression_table_select/?search_data={"species":[],"gene symbol":[]}&model_id='+model_id
    })
}
export const AgetExpression_table = ({model_id,gene_symbol,page,page_num,search_data,order_by_field,desc}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/expression/expression_table/?model_id='+model_id+'&gene_symbol='+gene_symbol+'&page='+page+'&page_num='+page_num+'&search_data='+search_data+'&order_by_field='+order_by_field+'&desc='+desc,
    })
}
//Expression下拉框
export const AgetExpression_select = ({model_id,search_data}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/expression/expression_barchart_select/?model_id='+model_id+'&search_data='+search_data
    })
}
//Expression bar
export const AgetExpression_bar = ({model_id,search_data}) => {
    return Axios({
        method:'GET',
        url:'/api/model_db/model/expression/expression_logtpm/?model_id='+model_id+'&search_data='+search_data
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

