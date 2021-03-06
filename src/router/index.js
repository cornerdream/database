import Vue from 'vue'
import VueRouter from 'vue-router'

const Layout = () => import(/* webpackChunkName: "layout" */ '../layout/default.vue')
const ModelLayout = () => import(/* webpackChunkName: "layout" */ '../layout/modelLayout.vue')
const SelectLayout = () => import(/* webpackChunkName: "layout" */ '../layout/selectLayout.vue')

const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
// const Login = () => import(/* webpackChunkName: "home" */ '../components/login.vue')

const Search = () => import(/* webpackChunkName: "search" */ '../views/search.vue')
const Result = () => import(/* webpackChunkName: "result" */ '../views/result.vue')
const ModelResult = () => import(/* webpackChunkName: "result" */ '../views/ModelResult.vue')

const TumorCellAtlas = () => import(/* webpackChunkName: "TumorCellAtlas" */ '../views/TumorCellAtlas.vue')
const ImmuneCellAtlas = () => import(/* webpackChunkName: "ImmuneCellAtlas" */ '../views/ImmuneCellAtlas.vue')
const ModelAtlas = () => import(/* webpackChunkName: "ModelAtlas" */ '../views/ModelAtlas.vue')
const AtrainAtlas = () => import(/* webpackChunkName: "AtrainAtlas" */ '../views/AtrainAtlas.vue')
const DrugAtlas = () => import(/* webpackChunkName: "DrugAtlas" */ '../views/DrugAtlas.vue')
const BiosampleAtlas = () => import(/* webpackChunkName: "BiosampleAtlas" */ '../views/BiosampleAtlas.vue')
const BiomarkerAtlas = () => import(/* webpackChunkName: "BiomarkerAtlas" */ '../views/BiomarkerAtlas.vue')
const TargetAtlas = () => import(/* webpackChunkName: "TargetAtlas" */ '../views/TargetAtlas.vue')

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  // },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/search',
    name: 'search',
    component: Layout,
    children:[        
      {
        path: '',
        name: 'Search',
        component: Search
      }, 
      {
        path: '/result',
        name: 'Result',
        component: Result
      }, 
      {
        path: '/modelresult',
        name: 'ModelResult',
        component: ModelResult
      }, 
    ]
  },
  {
    path: '',
    name: 'ModelLayout',
    component: ModelLayout,
    children:[  
      // {
      //   path: '/result',
      //   name: 'Result',
      //   component: Result
      // }, 
      // {
      //   path: '/modelresult',
      //   name: 'ModelResult',
      //   component: ModelResult
      // },       
      {
        path: '/ModelAtlas',
        name: 'ModelAtlas',
        component: ModelAtlas
      },       
    ]
  },
  {
    path: '/TumorCellAtlas',
    name: 'SelectLayout',
    component: SelectLayout,
    children:[        
      {
        path: '/TumorCellAtlas',
        name: 'TumorCellAtlas',
        component: TumorCellAtlas
      },
      {
        path: '/ImmuneCellAtlas',
        name: 'ImmuneCellAtlas',
        component: ImmuneCellAtlas
      }, 
      // {
      //   path: '/ModelAtlas',
      //   name: 'ModelAtlas',
      //   component: ModelAtlas
      // }, 
      {
        path: '/AtrainAtlas',
        name: 'AtrainAtlas',
        component: AtrainAtlas
      }, 
      {
        path: '/DrugAtlas',
        name: 'DrugAtlas',
        component: DrugAtlas
      }, 
      {
        path: '/BiosampleAtlas',
        name: 'BiosampleAtlas',
        component: BiosampleAtlas
      }, 
      {
        path: '/BiomarkerAtlas',
        name: 'BiomarkerAtlas',
        component: BiomarkerAtlas
      }, 
      {
        path: '/TargetAtlas',
        name: 'TargetAtlas',
        component: TargetAtlas
      },        
    ]
  },
]

const router  = new VueRouter({
   
    routes
})

export default router
