<template>
  <div class="p-4">
    <h1 class="text-xl mb-4">Product List</h1>

    <!-- Product List -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
      <div v-for="p in products" :key="p._id"
        class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <img :src="`http://localhost:5000/${p.image}`" alt="Product Image" class="w-full h-48 object-fit" />
        <div class="p-4 space-y-2">
          <h2 class="text-xl font-semibold text-gray-800">{{ p.name }}</h2>
          <p class="text-gray-600 text-sm line-clamp-3">{{ p.description }}</p>
          <p class="text-lg font-bold text-green-500">${{ p.price }}</p>
          <button @click="addToCart(p._id)"
            class="w-full bg-black text-white py-2 rounded-xl mt-2 hover:bg-gray-900 transition duration-200">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])


onMounted(async () => {
  await fetchProducts()
})

const fetchProducts = async () => {
  const res = await axios.get('http://localhost:5000/api/products')
  products.value = res.data
  console.log(products.value)
}

const addToCart = async (id) => {
  await axios.post('http://localhost:5000/api/cart', { productId: id })
  alert('Added to cart')
}
</script>
