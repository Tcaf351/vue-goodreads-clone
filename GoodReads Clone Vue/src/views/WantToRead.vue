<template>
    <div class="mx-4 min-h-[75vh]">
        <h2 class="text-center">You have {{ bookStore?.wantToRead?.length }} books you want to read</h2>

        <main class="flex justify-center items-center">
          <section class="max-h-[75vh] overflow-auto">
          <!-- dynamic javascript map goes here -->
          <RouterLink :to="{ path: `/want-to-read/${wantToReadBook.bookTitle}` }" class="relative h-full flex items-center justify-center" v-for="(wantToReadBook, index) in bookStore.wantToRead" :key="index">
            <div>
                <img class="book-cover inset-0 z-30 py-3" :src="wantToReadBook?.bookCover" alt="book cover">
            </div>
            <div class="h-full w-full ml-4">
                <h1 class="book-title text-md text-start mt-2 my-1">{{ wantToReadBook?.bookTitle }}</h1>
                <p class="author-name text-sm text-start my-1">by {{ wantToReadBook?.author }}</p>
            </div>
        </RouterLink>
          </section>
      </main>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useBookStore } from '../store/bookStore'

// initialise pinia store
const bookStore = useBookStore()
</script>