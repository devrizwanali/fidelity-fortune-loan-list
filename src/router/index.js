import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Dashboard from '@/views/Dashboard'
import Settings from '@/views/Settings'
import ApplicationParameters from '@/views/settings/ApplicationParameters'
import BranchCodes from '@/views/settings/BranchCodes'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    component: Home,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'settings',
        name: 'DashboardSettings',
        component: Settings,
        children: [
          {
            path: '',
            name: 'DashboardSettingsAppParameters',
            component: ApplicationParameters
          },
          {
            path: "branch-codes",
            name: 'DashboardSettingsBranchCodes',
            component: BranchCodes
          }
        ]
      }

    ]
   },
 
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: "active",
  mode: 'history'
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router;
