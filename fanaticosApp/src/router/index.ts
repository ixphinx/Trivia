import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'
import tab1 from '../views/Tab1.vue'
import tab2 from '../views/Tab2.vue'
import tab3 from '../views/Tabs.vue'
import preguntaspaises from '../views/preguntaspaises.vue'
import panelusuario from '../views/panelusuario.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Tabs,
  },
  {
    path: '/panelusuario',
    component: panelusuario,
  },
  {
    path: '/preguntaspaises',
    component: preguntaspaises,
  },
  {
    path: '/tab1',
    component: tab1,
  },
  {
    path: '/tab2',
    component: tab2, 
  },
  {
    path: '/tab3',
    component: tab3,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
