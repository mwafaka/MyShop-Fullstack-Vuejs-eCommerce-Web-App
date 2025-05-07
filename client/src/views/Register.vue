<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 class="text-3xl font-semibold text-center mb-6 text-gray-800">Register</h2>
        <form @submit.prevent="handleRegister">
            <div class="mb-4">
                <input v-model="email" type="email" placeholder="Email"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    required />
            </div>
            <div class="mb-4">
                <input v-model="password" type="password" placeholder="Password"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    required />
            </div>
            <button type="submit"
                class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                Register
            </button>
            <p v-if="error.value" class="text-red-600 mt-2 text-center">{{ error }}</p>
        </form>
        <p class="text-center mt-4 text-sm text-gray-600">
            Already have an account?
            <router-link to="/login" class="text-blue-600 hover:underline">Login here</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function handleRegister() {
    if (!email.value || !password.value) {
        error.value = 'Please fill in all fields.'
        alert(error.value)
    }

    if (password.value.length < 6) {
        error.value = 'Password must be at least 6 characters.'
        alert(error.value)
    }

    error.value = ''

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.msg || 'Registration failed.')
        }

        console.log('User registered:', data)
        setTimeout(() => {
            router.push('/login')
        }, 1500)

    } catch (err) {
        error.value = err.message
        console.log(error.value)
    }
}

</script>

<style scoped>
/* You can add custom styles if needed */
</style>