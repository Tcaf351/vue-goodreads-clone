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
                    
                    <!-- Start Reading Button - Only show for want-to-read URLs -->
                    <div v-if="isWantToReadPage" class="flex justify-center mb-3">
                        <button 
                            @click="moveToCurrentlyReading"
                            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors duration-200 mr-2"
                            :disabled="bookStore.currentlyReading.length >= 1"
                            :class="{ 'opacity-50 cursor-not-allowed': bookStore.currentlyReading.length >= 1 }">
                            {{ bookStore.currentlyReading.length >= 1 ? 'Currently Reading Full' : 'Start Reading' }}
                        </button>
                    </div>
                    
                    <!-- Remove Button -->
                    <button @click="handleRemoveBook" class="block mx-auto py-1 px-3 rounded-md bg-gray-300 hover:bg-gray-400 transition ease-in">Remove</button>
                    
                    <!-- Error message display -->
                    <div v-if="bookStore.error" class="text-red-500 text-center mt-2">
                        {{ bookStore.error }}
                    </div>
                </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Spinner from '../components/Spinner.vue'
import { useBookStore } from '../store/bookStore'
import { useModalStore } from '../store/modalStore'

const router = useRouter()
const route = useRoute()

// declare bookstore
const bookStore = useBookStore()
const modalStore = useModalStore()

// Check if current page is want-to-read
const isWantToReadPage = computed(() => {
    return route.path.includes('/want-to-read/')
})

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
        
        const routeParam = route.params.id
        let api
        
        // Check if it's a Google Books ID (usually long alphanumeric) or a book title
        if (routeParam && routeParam.length > 15 && !routeParam.includes(' ')) {
            // Looks like a Google Books ID
            api = `https://www.googleapis.com/books/v1/volumes/${routeParam}`
        } else {
            // Looks like a book title - decode and search
            const bookTitleParam = decodeURIComponent(routeParam)
            api = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitleParam)}`
        }
        
        console.log('API URL:', api)
        const response = await fetch(api)

        if (!response.ok) {
            throw new Error('api did not fetch correctly')
        }
        
        const data = await response.json()
        
        // Handle both direct ID fetch and search results
        let bookInfo
        if (data.volumeInfo) {
            // Direct ID fetch
            bookInfo = data.volumeInfo
        } else if (data.items && data.items.length > 0) {
            // Search results - take first result
            bookInfo = data.items[0].volumeInfo
        } else {
            throw new Error('No book data found')
        }
        
        console.log('Book info:', bookInfo);

        const { title, subtitle, description, authors, publisher, imageLinks } = bookInfo
        bookTitle.value = title || 'No title available'
        subTitle.value = subtitle || 'No subtitle available'
        bookDescription.value = description || 'no description available'
        author.value = authors?.[0] || 'No author available'
        publisherName.value = publisher || 'No publisher available'
        bookCover.value = imageLinks?.thumbnail || 'No image available'

    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false
    }
}

// Move book from want-to-read to currently-reading
const moveToCurrentlyReading = () => {
    // Clear any existing errors
    bookStore.clearError()
    
    // Find the book in want-to-read list
    const book = bookStore.wantToRead.find(b => b.bookTitle === bookTitle.value)
    
    if (!book) {
        bookStore.setError('Book not found in want-to-read list')
        return
    }
    
    // Reset progress when starting a new book
    modalStore.resetProgress()
    
    // Try to add to currently reading
    const success = bookStore.addToCurrentlyReading(book)
    
    if (success) {
        // If successfully added, remove from want to read
        bookStore.removeFromWantToRead(book.bookTitle)
        // Navigate back to home
        router.push('/')
    }
}

onMounted(() => {
    handleApiCall()
})

// Since BookDetails.vue is used for both /want-to-read/ and /read/ the remove button needs to detect what url the user is on
const handleRemoveBook = () => {
    const currentPath = route.path

    if (currentPath.includes('/want-to-read/')) {
        const success = bookStore.removeFromWantToRead(bookTitle.value)
        if (!success) {
            console.log('Book not found in want-to-read list')
        }
    }
    else if (currentPath.includes('/read/')) {
        const success = bookStore.removeFromRead(bookTitle.value)
        if (!success) {
            console.log('Book not found in read list')
        }
    }

    router.push('/')
}
</script>