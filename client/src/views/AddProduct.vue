<!-- src/views/AddProduct.vue -->
<template>
    <div class="p-4 max-w-md mx-auto">
        <h1 class="text-xl font-bold mb-4">Add New Product</h1>
        <form @submit.prevent="addProduct" class="bg-white p-4 rounded shadow-md">
            <input v-model="form.name" placeholder="Name" class="w-full p-2 border mb-2 rounded" required />
            <textarea v-model="form.description" placeholder="Description" class="w-full p-2 border mb-2 rounded"
                required></textarea>
            <input v-model.number="form.price" placeholder="Price" type="number" class="w-full p-2 border mb-2 rounded"
                required />
            <input type="file" @change="handleFile" class="w-full p-2 border mb-2 rounded" required />
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add
                Product</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const form = ref({
    name: '',
    description: '',
    price: 0,
    image: null,
})
const router = useRouter()

const handleFile = (e) => {
    form.value.image = e.target.files[0]
}

const addProduct = async () => {
    const fd = new FormData()
    fd.append('name', form.value.name)
    fd.append('description', form.value.description)
    fd.append('price', form.value.price)
    fd.append('image', form.value.image)

    try {
        await axios.post('http://localhost:5000/api/products', fd)
        alert('Product added!')
        router.push('/products') // redirect to product list
    } catch (err) {
        console.error(err)

    }
}
</script>