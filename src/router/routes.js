import { mapRoutes, default as lambdatt } from 'src/lambdatt'

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
    component: lambdatt.getModule('iam').getPage('AuthLogin')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
