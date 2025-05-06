import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import Home from '@views/Home.vue'
import WantToRead from '@views/WantToRead.vue'
import Read from '@views/Read.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/want-to-read', name: 'WantToRead', component: WantToRead },
        { path: '/read', name: 'Read', component: Read },
    ]
})

createApp(App).use(router).mount('#app')