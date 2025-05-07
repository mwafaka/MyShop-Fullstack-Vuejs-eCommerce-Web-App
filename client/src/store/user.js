import { defineStore } from 'pinia'
import axios from 'axios'


export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || ''
    }),
    actions: {
        async login(email, password) {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
            this.token = res.data.token
            this.user = res.data.user
            localStorage.setItem('token', this.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

            await this.fetchUser()
        },

        async fetchUser() {

            if (this.token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                const res = await axios.get('http://localhost:5000/api/auth/me')
                this.user = res.data.user
                return this.user
            }


        },
        logout() {
            this.token = ''
            this.user = null
            localStorage.removeItem('token')
        },
        setUser(user) {
            this.user = user
        }
    }
})
