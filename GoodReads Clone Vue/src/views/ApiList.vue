<template>
    <div class="mx-4 min-h-[75vh]">
        <section class="max-h-[75vh] overflow-auto">
            <ul class="flex flex-col items-center">
                <RouterLink :to="{ path: `/${book.title}/` }" v-for="book in apiList" :key="book.id">
                    <img :src="book.bookCover" alt="book cover" class="my-3 shadow-md rounded-md">
                </RouterLink>
            </ul>
        </section>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
// import pinia values
import { useBookStore } from '../store/bookStore';
import { storeToRefs } from 'pinia'

// call stores
const bookStore = useBookStore()
const { apiList } = storeToRefs(bookStore)
</script>