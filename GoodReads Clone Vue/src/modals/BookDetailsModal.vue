<template>
    <div class="relative min-h-[75vh] max-h-[75vh]">
        <section class="bg-gray-50">
            <div id="modal-book-covers" class="relative w-full flex items-center justify-center">
                <div class="z-20 h-full w-full absolute backdrop-blur bg-gray-500/70 bg-opacity-40 saturate-100 backdrop-contrast-100"></div>
                <img class="absolute z-10 h-full w-full bg-no-repeat bg-cover" :src="currentBook?.bookCover" alt="blurred book cover">
                <img class="book-cover relative inset-0 z-30 bg-no-repeat bg-cover py-3" :src="currentBook?.bookCover" alt="book cover">
            </div>

            <div class="w-full">
                <h1 class="text-xl text-center mt-2">{{ currentBook?.title }}</h1>
                <p class="text-sm text-center">by {{ currentBook?.author }}</p>
                <hr class="mt-4 w-[96%] mx-auto">
                <div class="flex items-center justify-center">
                    <ul class="px-3">
                        <span class="text-xs">{{ currentBook?.publisher }}</span>
                    </ul>
                </div>
                <hr class="w-[96%] mx-auto mb-2">
                <div class="max-h-[14vh] overflow-auto">
                    <p class="px-3 text-center">{{ currentBook?.bookDescription }}</p>
                </div>
            </div>

            <!-- Your form stays the same -->
            <div class="flex justify-center flex-col w-1/2 mx-auto">
                <select v-model="selectedOption" class="radius mb-2 py-1 px-2 rounded-md bg-gray-300 hover:bg-gray-400 transition-colors ease-linear">
                    <option disabled value="select">Select</option>
                    <option value="want-to-read">Want to Read</option>
                    <option value="currently-reading">Currently Reading</option>
                    <option value="read">Read</option>
                </select>
                <button @click="handleSubmit" class="py-1 px-2 mb-4 rounded-md bg-gray-300 hover:bg-gray-400 transition-colors ease-linear">Submit</button>
            </div>

            <div class="flex justify-center" v-if="error">{{ error }}</div>
        </section>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookStore } from '../store/bookStore'
import { useModalStore } from '../store/modalStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()
const modalStore = useModalStore()
const { apiList } = storeToRefs(bookStore)

// Find the current book based on the route parameter
const currentBook = computed(() => {
    const bookTitle = decodeURIComponent(route.params.title || route.path.split('/')[1])
    return apiList.value.find(book => book.title === bookTitle) || apiList.value[0]
})

const selectedOption = ref('select')
const error = computed(() => bookStore.error)

const handleSubmit = () => {
    if (selectedOption.value === 'select') {
        bookStore.setError('Please select a valid option.')
        return
    }

    const bookData = {
        bookTitle: currentBook.value?.title,
        subTitle: currentBook.value?.subTitle, 
        author: currentBook.value?.author,
        bookDescription: currentBook.value?.bookDescription,
        bookCover: currentBook.value?.bookCover,
        publisher: currentBook.value?.publisher,
        pageCount: currentBook.value?.pageCount
    }

    let success = false

    switch (selectedOption.value) {
        case 'want-to-read':
            success = bookStore.addToWantToRead(bookData)
            break

        case 'currently-reading':
            success = bookStore.addToCurrentlyReading(bookData)
            if (success) {
                modalStore.resetProgress()
            }
            break

        case 'read':
            success = bookStore.addToRead(bookData)
            break
        default:
            bookStore.setError('Please select a valid option.')
            return
    }

    if (success) {
        bookStore.apiList.pop()
        router.push('/') // Go back to home
    }
}
</script>