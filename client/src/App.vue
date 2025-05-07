<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div class="flex gap-6 items-center">
        <RouterLink to="/" class="text-2xl font-bold text-blue-600 tracking-tight hover:opacity-90">MyShop</RouterLink>
        <RouterLink v-if="isAuthenticated" to="/" class="text-sm text-gray-700 hover:text-blue-500 transition">Home
        </RouterLink>
        <RouterLink v-if="isAuthenticated" to="/cart" class="text-sm text-gray-700 hover:text-blue-500 transition">Cart
        </RouterLink>
        <RouterLink v-if="isAdmin" to="/admin" class="text-sm text-gray-700 hover:text-blue-500 transition">Admin
        </RouterLink>
      </div>

      <div class="flex gap-4 items-center">
        <RouterLink v-if="!isAuthenticated" to="/login" class="text-sm text-gray-700 hover:text-blue-500 transition">
          Login</RouterLink>
        <RouterLink v-if="!isAuthenticated" to="/register" class="text-sm text-gray-700 hover:text-blue-500 transition">
          Register</RouterLink>
        <button v-if="isAuthenticated" @click="logout"
          class="text-sm text-red-600 hover:text-red-800 transition">Logout</button>
      </div>
    </nav>

    <!-- Route View -->
    <main class="p-6 max-w-5xl mx-auto">
      <RouterView />
    </main>
  </div>
</template>


<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useUserStore } from './store/user'

const router = useRouter()
const store = useUserStore()
onMounted(async () => {
  if (store.token) {
    await store.fetchUser()
  }
})
const isAuthenticated = computed(() => !!store.token)
const isAdmin = computed(() => store.user?.role === 'admin')

const logout = () => {
  store.logout()
  router.push('/login')
}
</script>

