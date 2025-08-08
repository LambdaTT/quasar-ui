import { mapRoutes } from 'src/lambdatt.js'
import $sys from 'src/lambdatt.js'

const routes = [
  {
    path: '/',
    component: () => import('src/modules/ui-layout-admin1/src/layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      ...mapRoutes()
    ]
  },

  {
    path: '/login',
    component: $sys.getModule('iam')?.getPage('auth/login')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
