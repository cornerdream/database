import Vue from 'vue'
import VueRouter from 'vue-router'

const Layout = () => import(/* webpackChunkName: "layout" */ '../layout/default.vue')
const SelectLayout = () => import(/* webpackChunkName: "layout" */ '../layout/selectLayout.vue')

const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
const Login = () => import(/* webpackChunkName: "home" */ '../components/login.vue')

const Search = () => import(/* webpackChunkName: "about" */ '../views/search.vue')


const Select = () => import(/* webpackChunkName: "selectabout" */ '../views/searchSelect.vue')
const TableAbout = () => import(/* webpackChunkName: "tableabout" */ '../views/TableAbout.vue')
const TumorCellAtlas = () => import(/* webpackChunkName: "tableabout" */ '../views/TumorCellAtlas.vue')
const ImmuneCellAtlas = () => import(/* webpackChunkName: "tableabout" */ '../views/ImmuneCellAtlas.vue')
const ModelAtlas = () => import(/* webpackChunkName: "tableabout" */ '../views/ModelAtlas.vue')
const AtrainAtlas = () => import(/* webpackChunkName: "tableabout" */ '../views/AtrainAtlas.vue')
const DrugAtlas = () => import(/* webpackChunkName: "tableabout" */ '../views/DrugAtlas.vue')
const BiosampleAtlas = () => import(/* webpackChunkName: "tableabout" */ '../views/BiosampleAtlas.vue')
const BiomarkerAtlas = () => import(/* webpackChunkName: "tableabout" */ '../views/BiomarkerAtlas.vue')
const TargetAtlas = () => import(/* webpackChunkName: "tableabout" */ '../views/TargetAtlas.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    
  },
  {
    path: '',
    name: 'Layout',
    component: Layout,
    children:[        
      {
        path: '/search',
        name: 'Search',
        component: Search
      },       
    ]
  },
  {
    path: '',
    name: 'SelectLayout',
    component: SelectLayout,
    children:[        
      {
        path: '/select',
        name: 'Select',
        component: Select
      },
      {
        path: '/table',
        name: 'table',
        component: TableAbout
      },
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
      {
        path: '/ModelAtlas',
        name: 'ModelAtlas',
        component: ModelAtlas
      }, 
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
