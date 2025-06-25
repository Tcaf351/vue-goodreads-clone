<template>
    <div class="mx-4 min-h-[75vh]">
        <h2 class="text-center">You have {{ bookStore?.wantToRead?.length }} books you want to read</h2>

        <main class="flex justify-center items-center">
          <section class="max-h-[75vh] overflow-auto">

          <div v-for="(wantToReadBook, index) in bookStore.wantToRead" :key="index" 
               class="relative h-full flex items-center justify-center mb-4">
            
            <!-- Book Info -->
            <RouterLink :to="{ path: `/want-to-read/${encodeURIComponent(wantToReadBook.bookTitle)}`}" 
              class="flex items-center justify-center">
              <div>
                  <img class="book-cover inset-0 z-30 py-3" :src="wantToReadBook?.bookCover" alt="book cover">
              </div>
              <div class="h-full w-full ml-4">
                  <h1 class="book-title text-md text-start mt-2 my-1">{{ wantToReadBook?.bookTitle }}</h1>
                  <p class="author-name text-sm text-start my-1">by {{ wantToReadBook?.author }}</p>
                  
                </div>
            </RouterLink>
          </div>

          <!-- Show message if no books -->
          <div v-if="bookStore.wantToRead.length === 0" class="text-center text-gray-500 mt-8">
            No books in your want to read list yet.
          </div>
          </section>
      </main>

      <!-- Error message display -->
      <div v-if="bookStore.error" class="text-red-500 text-center mt-4">
        {{ bookStore.error }}
      </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router';
import { useBookStore } from '../store/bookStore'

// initialise pinia store
const bookStore = useBookStore()

onMounted(() => {
    bookStore.clearError()
})
</script>