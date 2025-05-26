<template>
    <div id="want-to-read-and-read-container"> <!-- want to read/read containers - start -->
        <RouterLink to="/want-to-read">
            <div id="want-to-read-container" class="flex mx-4 mt-6">  
                <div class="mr-3">
                <img v-if="wantToReadBookCover" :src="wantToReadBookCover" alt="book cover" class="shadow-md rounded-md h-28">
                </div>

                <div class="flex justify-start  flex-col">
                    <h4>Want to Read</h4>
                    <p class="text-gray-400 text-xs">{{ wantToReadBookCount }} books</p>
                </div>
            </div>
        </RouterLink> 
        <hr class="border-gray-300">


        <RouterLink to="/read">
            <div id="read-container" class="flex mx-4 mt-6">  
                <div class="mr-3">
                <img v-if="readBookCover" :src="readBookCover" alt="book cover" class="shadow-md rounded-md h-28">
                </div>

                <div class="flex justify-start flex-col">
                <h4>Read</h4>
                <p class="text-gray-400 text-xs">{{ readBookCount }} books</p>
                </div>
            </div>
        </RouterLink>
        <hr class="border-gray-300">
    </div> <!-- want to read/read containers - finish-->
</template>

<script setup>
import { computed } from 'vue'
import { useBookStore } from '../store/bookStore'

const bookStore = useBookStore()

const wantToReadBookCount = computed(() => bookStore?.wantToRead?.length)

const wantToReadBookCover = computed(() => bookStore?.wantToRead[bookStore.wantToRead.length - 1]?.bookCover)

const readBookCount = computed(() => bookStore?.read?.length)

const readBookCover = computed(() => bookStore?.read[bookStore.read.length - 1]?.bookCover)
</script>