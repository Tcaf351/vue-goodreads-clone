<template>
    <!-- currently reading: book details/progress - start -->
    <div class="flex rounded-md relative overflow-hidden max-h-[25vh] mt-5"> 

        <div class="z-20 h-full w-full absolute backdrop-blur bg-gray-600/70 saturate-100 backdrop-contrast-100"></div>

        <img class="absolute z-10 h-full w-full bg-no-repeat bg-cover" :src="bookCover" alt="blurred book cover behind main book cover">
        <img class="m-4 rounded-md z-30" :src="bookCover" alt="book cover">


        <div class="z-30 py-4">
            <h3 class="book-title text-gray-50">{{ bookTitle }}</h3>
            <p class="text-xs mb-1 text-gray-50">by <span class="author-name">{{ author }}</span></p>

            <button 
            @click="showCurrentlyReadingModal"
            class="bg-[#E4E2D5] text-xs px-3 py-2 mb-2 rounded-md uppercase">Update Progress</button>

            <div class="flex pb-7">
                <p class="text-xs uppercase mr-3 text-gray-50">progress:</p>
                <p class="text-xs ml-1 text-gray-50"><span id="percentage">{{ modalStore.currentProgress }}</span>%</p>
            </div>
        </div>
    </div>
    <!-- currently reading: book details/progress - finish -->
</template>

<script setup>
import { watch } from 'vue'
import { useModalStore } from '../store/modalStore'
import { useBookStore } from '../store/bookStore'

// bring in props
const props = defineProps(['currentlyReadingLength', 'currentlyReadingData'])

const bookTitle = props?.currentlyReadingData[0]?.bookTitle || 'Book title is not available'
const author = props?.currentlyReadingData[0]?.author || 'Author not available'
const bookCover = props?.currentlyReadingData[0]?.bookCover || 'Book cover not available'
const pageCount = props?.currentlyReadingData[0]?.pageCount || 'Page count is not available'

// import pinia stores
const modalStore = useModalStore()
const bookStore = useBookStore()

// bring in pinia functions
const showCurrentlyReadingModal = () => modalStore.showCurrentlyReadingModal()
const hideCurrentlyReadingModal = () => modalStore.hideCurrentlyReadingModal()
</script>