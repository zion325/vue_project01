import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '../views/Layout/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '../views/Detail/index.vue'
import CartList from '../views/CartList/index.vue'
import Checkout from '../views/Checkout/index.vue'
import Pay from '../views/Pay/index.vue'
import PayBack from '../views/Pay/PayBack.vue'
import Member from '../views/Member/index.vue'
import UserInfo from '../views/Member/components/UserInfo.vue'
import UserOrder from '../views/Member/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: LayoutView,
      children:[
        {
          path:'',
          name:'home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path:'category/:id',
          name: 'category',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path:'category/sub/:id',
          name: 'subcategory',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: Detail
        },
        {
          path: 'cartList',
          name: 'CartList',
          component: CartList
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: Checkout
        },
        {
          path: 'pay',
          name: 'pay',
          component: Pay
        },
        {
          path: 'paycallback',
          name: 'paycallback',
          component: PayBack
        },
        {
          path: 'member',
          name: 'member',
          component: Member,
          children: [
            {
              path: '',
              name: 'user',
              component: UserInfo
            },
            {
              path: 'order',
              name: 'order',
              component: UserOrder
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login/index.vue')
    },
  ],
  scrollBehavior(){
    return {
      top:0
    }
  }
})

export default router
