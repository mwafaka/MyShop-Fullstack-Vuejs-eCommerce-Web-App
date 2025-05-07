<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <input v-model="email" placeholder="Email"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
      </div>
      <div class="mb-6">
        <input v-model="password" type="password" placeholder="Password"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
      </div>
      <button type="submit"
        class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
        Login
      </button>
    </form>
    <p class="text-center mt-4 text-sm text-gray-600">
      Don't have an account?
      <router-link to="/register" class="text-blue-600 hover:underline">Register here</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'

const email = ref('')
const password = ref('')
const store = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    await store.login(email.value, password.value)
    router.push('/')
  } catch (err) {
    alert('Login failed')
  }
}
</script>

<style scoped>
.input {
  @apply w-full p-2 border rounded mb-2;
}

.btn {
  @apply bg-blue-500 text-white px-4 py-2 rounded;
}
</style>