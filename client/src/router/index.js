import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import addProduct from '../views/AddProduct.vue'
import AdminPanel from '../views/AdminPanel.vue'
import { useUserStore } from '../store/user'

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/addProduct', component: addProduct },
  { path: '/cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/admin', component: AdminPanel, meta: { requiresAuth: true, adminOnly: true } },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  const isLoggedIn = !!store.token

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.meta.adminOnly && store.user?.role !== 'admin') {
    next('/')
  } else {
    next()
  }
})

export default router
