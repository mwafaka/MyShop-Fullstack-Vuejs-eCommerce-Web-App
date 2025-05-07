<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">🛠 Admin Product Management</h1>

    <!-- Add Product Form -->
    <form
      @submit.prevent="addProduct"
      enctype="multipart/form-data"
      class="bg-white p-6 rounded-2xl shadow-md space-y-5 border border-gray-100"
    >
      <input
        v-model="form.name"
        placeholder="Product Name"
        class="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />

      <textarea
        v-model="form.description"
        placeholder="Product Description"
        rows="3"
        class="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      ></textarea>

      <input
        v-model.number="form.price"
        type="number"
        min="0"
        placeholder="Price"
        class="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />

      <input
        type="file"
        name="image"
        @change="handleImageUpload"
        ref="fileInput"
        class="w-full text-sm file:rounded-lg file:border file:border-gray-300 file:bg-gray-50 file:py-2 file:px-4 file:text-gray-700"
        required
      />

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
      >
        ➕ Add Product
      </button>
    </form>

    <!-- Product List -->
    <div class="mt-10 space-y-5">
      <div
        v-for="p in products"
        :key="p._id"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between p-4 transition hover:shadow-md"
      >
        <div class="flex gap-4 items-center">
          <img
            v-if="p.image"
            :src="`http://localhost:5000/${p.image}`"
            alt="Product image"
            class="w-16 h-16 object-fit rounded-lg border border-gray-200"
          />
          <div>
            <h2 class="text-base font-semibold text-gray-800">{{ p.name }}</h2>
            <p class="text-gray-500 text-sm truncate w-56">{{ p.description }}</p>
            <p class="text-green-600 font-bold text-sm">${{ p.price }}</p>
          </div>
        </div>
        <button
          @click="deleteProduct(p._id)"
          class="text-red-500 hover:text-red-700 transition text-sm font-medium"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const form = ref({ name: '', description: '', price: 0, image: null })
const fileInput = ref(null);
onMounted(loadProducts)

async function loadProducts() {
  const res = await axios.get('http://localhost:5000/api/products')
  products.value = res.data

}
function handleImageUpload(e) {
  form.value.image = e.target.files[0]

}

async function addProduct() {
  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('description', form.value.description)
  formData.append('price', form.value.price)
  formData.append('image', form.value.image)

  try {
    await axios.post('http://localhost:5000/api/products', formData);
    console.log('Product added successfully');
    // Reset form and refresh products
    form.value = { name: '', description: '', price: 0, image: null };
    fileInput.value.value = '';
    console.log(form.value)
    loadProducts();
  } catch (error) {
    console.error('Error adding product:', error);
  }


}

async function deleteProduct(id) {
  await axios.delete(`http://localhost:5000/api/products/${id}`)
  loadProducts()
}
</script>
