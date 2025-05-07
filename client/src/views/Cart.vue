<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">🛒 Your Cart</h1>

    <div v-for="item in cart" :key="item._id"
      class="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-4 flex justify-between items-center transition hover:shadow-md">
      <div>
        <h2 class="text-gray-800 font-medium">{{ item.product.name }}</h2>
        <p class="text-gray-500 text-sm">Quantity: {{ item.quantity }}</p>
      </div>

      <button @click="removeFromCart(item.product._id)"
        class="text-red-600 hover:text-red-800 font-medium text-sm transition">
        ✖ Remove
      </button>
    </div>

    <div v-if="!cart.length" class="text-center text-gray-500 mt-10">
      Your cart is empty.
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const cart = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:5000/api/cart')
  cart.value = res.data
})

const removeFromCart = async (id) => {
  await axios.delete(`http://localhost:5000/api/cart/${id}`)
  cart.value = cart.value.filter(item => item.product._id !== id)
}
</script>