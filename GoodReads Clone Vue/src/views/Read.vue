<template>
    <div class="mx-4 min-h-[75vh]">
        <h2>You have read {{ bookStore?.read?.length }} books this year</h2>

        <main>
          <section class="max-h-[75vh] overflow-auto">
          <!-- dynamic javascript map goes here -->
          <a href="#" class="relative h-full flex items-center justify-center" v-for="(readBook, index) in bookStore.read" :key="index">
            <div>
                <img class="book-cover inset-0 z-30 py-3" :src="readBook?.bookCover" alt="book cover">
            </div>
            <div class="h-full w-full ml-4">
                <h1 class="book-title text-md text-start mt-2 my-1">{{ readBook?.bookTitle }}</h1>
                <p class="author-name text-sm text-start my-1">by {{ readBook?.author }}</p>
            </div>
        </a>
          </section>
      </main>
    </div>
</template>

<script setup>
import { useBookStore } from '../store/bookStore';

const bookStore = useBookStore()
</script>