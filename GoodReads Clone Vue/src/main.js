import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'

import Home from '@views/Home.vue'
import WantToRead from '@views/WantToRead.vue'
import Read from '@views/Read.vue'
import BookDetails from './views/BookDetails.vue'
import CurrentlyReading from './views/CurrentlyReading.vue'
import ApiList from './views/ApiList.vue'
import BookDetailsModal from './modals/BookDetailsModal.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/want-to-read', name: 'WantToRead', component: WantToRead },
        { path: '/read', name: 'Read', component: Read },
        { path: '/want-to-read/:id/', component: BookDetails },
        { path: '/read/:id/', component: BookDetails },
        { path: '/currently-reading/', component: CurrentlyReading },
        { path: '/book-list/', component: ApiList },
        { path: '/:id/', component: BookDetailsModal },
    ]
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')