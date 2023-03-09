import { createRouter, createWebHistory } from 'vue-router'
import RegView from '../views/RegView/RegView.vue'
import ChessView from '../views/ChessView/ChessView.vue'
import AuthView from '../views/AuthView/AuthView.vue'
import ReportView from '../views/ReportView/ReportView.vue'

const routes = [
  {
    path: '/',
    name: 'app',
    component: AuthView
  },
  {
    path: '/chess',
    name: '',
    component: ChessView
  },
  {
    path: '/reg',
    name: 'reg',
    component: RegView
  },
  {
    path: '/report',
    name: 'report',
    component: ReportView
  },
]

const router = createRouter({
  history: createWebHistory(),//createWebHashHistory
  routes
})


export default router
