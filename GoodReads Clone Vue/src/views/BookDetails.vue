<template>
    <div>
        <Spinner v-if="isLoading" />
        <section v-else class="bg-gray-50 shadow-lg  min-h-[75vh]">
                <div id="modal-book-covers" class="relative w-full flex items-center justify-center">
                    <div class="z-20 h-full w-full absolute backdrop-blur bg-gray-500/70 bg-opacity-40 saturate-100 backdrop-contrast-100"></div>
            
                    <img class="absolute z-10 h-full w-full bg-no-repeat bg-cover" :src="bookCover" alt="blurred book cover behind main book cover">
                
                    <img class="book-cover relative inset-0 z-30 bg-no-repeat bg-cover py-3" :src="bookCover" alt="book cover">
                </div>

                <div class="w-full">
                    <h1 id="book-title" class="text-xl text-center mt-2">{{ bookTitle }}</h1>
                    <h3 id="book-subtitle" class="text-md text-center">{{ subTitle }}</h3>
                    <p id="author-name" class="text-sm text-center">{{ author }}</p>
                
                    <hr class="mt-4 w-[96%] mx-auto">
                    <div class="flex items-center justify-center">
                        
                        <ul class="px-3">
                            <span id="publisher" class="text-xs">{{ publisherName }}</span>
                        </ul>
                    </div>
                    <hr class="w-[96%] mx-auto mb-2">
                    
                    <div class="min-h-[25vh] overflow-auto">
                        <p id="book-description" class="px-3 text-center max-h-[25vh]">{{ bookDescription }}</p>
                    </div>
                    <button @click="handleRemoveBook" class="block mx-auto py-1 px-3 rounded-md bg-gray-300 hover:bg-gray-400 transition ease-in">Remove</button>
                </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Spinner from '../components/Spinner.vue'
import { useBookStore } from '../store/bookStore'

const router = useRouter()
const route = useRoute()

// declare bookstore
const bookStore = useBookStore()

// Spinner logic
const isLoading = ref(false)

// store variables from data property from api
const bookTitle = ref('')
const subTitle = ref('')
const author = ref('')
const bookDescription = ref('')
const bookCover = ref('')
const publisherName = ref('')

// call api
const handleApiCall = async () => {
    try {
        isLoading.value = true
        const api = `https://www.googleapis.com/books/v1/volumes?q=${route.params.id}` // get book title from url
        const response = await fetch(api)

        if (!response.ok) {
            throw new Error('api did not fetch correctly')
        }
        const data = await response.json()
        console.log(data?.items[0]?.volumeInfo);

        const { title, subtitle, description, authors, publisher, imageLinks } = data?.items[0]?.volumeInfo
        bookTitle.value = title || 'No title available'
        subTitle.value = subtitle || 'No subtitle available'
        bookDescription.value = description || 'no description available'
        author.value = authors[0] || 'No author available'
        publisherName.value = publisher || 'No publisher available'
        bookCover.value = imageLinks?.thumbnail || 'No image available'

    } catch (error) {
        console.log(error);
    }

    finally {
        isLoading.value = false
    }
}

onMounted(() => {
    handleApiCall()
})

// Since BookDetails.vue is used for both /want-to-read/ and /read/ the remove button needs to detect what url the user is on
const handleRemoveBook = () => {
    const currentPath = route.path

    if (currentPath.includes('/want-to-read/')) {
        bookStore.removeFromWantToRead(bookTitle.value)
    }

    else if (currentPath.includes('/read/')) {
        bookStore.removeFromRead(bookTitle.value)
    }

    router.push('/')
}
</script>