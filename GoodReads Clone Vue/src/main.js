import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'

import Home from '@views/Home.vue'
import WantToRead from '@views/WantToRead.vue'
import Read from '@views/Read.vue'
import BookDetails from './views/BookDetails.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/want-to-read', name: 'WantToRead', component: WantToRead },
        { path: '/read', name: 'Read', component: Read },
        { path: '/want-to-read/:id', component: BookDetails },
    ]
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')