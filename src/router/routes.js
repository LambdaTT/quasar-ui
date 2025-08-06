import { IAM } from 'src/modules/lambdatt-ui-iam'
const routes = [
  {
    path: '/',
    component: () => import('src/modules/ui-layout-admin1/src/layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },

    ]
  },

  {
    path: '/login',
    component: IAM.PAGES.AuthLogin.component
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
