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

<!-- <div class="h-full w-full">
    <h1 class="book-title text-xl text-center mt-2">{{ apiList[0]?.title }}</h1>
    <h3 class="book-subtitle text-md text-center">{{ apiList[0]?.subTitle }}</h3>
    <p class="author-name text-sm text-center">by {{ apiList[0]?.author }}</p>

    <hr class="mt-4 w-[96%] mx-auto">
        <div class="flex items-center justify-center">

        <ul class="px-3">
            <span id="publisher" class="text-xs">{{ apiList[0]?.publisher }}</span>
        </ul>
        </div>

    <hr class="w-[96%] mx-auto"></hr> -->

<script setup>
import { RouterLink } from 'vue-router';
// import pinia values
import { useBookStore } from '../store/bookStore';
import { storeToRefs } from 'pinia'

// call stores
const bookStore = useBookStore()
const { apiList } = storeToRefs(bookStore)
console.log(apiList.value[0]);

// need to have the looped data start from the top not the
</script>