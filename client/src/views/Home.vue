<template>
  <div class="p-4">
    <h1 class="text-xl mb-4">Product List</h1>

    <!-- Add Product Form -->


    <!-- Product List -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
  <div
    v-for="p in products"
    :key="p._id"
    class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
  >
    <img
      :src="`http://localhost:5000/${p.image}`"
      alt="Product Image"
      class="w-full h-48 object-fit"
    />
    <div class="p-4 space-y-2">
      <h2 class="text-xl font-semibold text-gray-800">{{ p.name }}</h2>
      <p class="text-gray-600 text-sm line-clamp-3">{{ p.description }}</p>
      <p class="text-lg font-bold text-green-500">${{ p.price }}</p>
      <button
        @click="addToCart(p._id)"
        class="w-full bg-black text-white py-2 rounded-xl mt-2 hover:bg-gray-900 transition duration-200"
      >
        🛒 Add to Cart
      </button>
    </div>
  </div>
</div>


  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../store/user'
import axios from 'axios'

const products = ref([])
const newProduct = ref({
  name: '',
  description: '',
  price: 0,
  image: ''
})

const userStore = useUserStore()

const user = userStore

// Computed boolean to check if user has 'admin' role
/* const isAdmin = computed(() => {
  return Array.isArray(user?.role) && user.role=='admin'
}) */

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

/* const addProduct = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/products', newProduct.value)
    products.value.push(res.data)
    newProduct.value = { name: '', description: '', price: 0, image: '' }
    alert('Product added!')
  } catch (err) {
    alert('Failed to add product.')
    console.error(err)
  }
} */
</script>
