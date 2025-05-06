<template>
    <div id="want-to-read-and-read-container"> <!-- want to read/read containers - start -->
        <RouterLink to="/want-to-read">
            <div id="want-to-read-container" class="flex mx-4 mt-6">  
                <div class="mr-3">
                <!-- make the most recent completed book the cover -->
                <img v-if="imageValue" :src="imageValue" alt="book cover" class="shadow-md rounded-md h-28">
                </div>

                <div class="flex justify-start  flex-col">
                    <h4>Want to Read</h4>
                    <!-- <p class="text-gray-400 text-xs">{{ storedBooksCount }}</p> -->
                    <p class="text-gray-400 text-xs">0 books</p>
                </div>
            </div>
        </RouterLink> 
        <hr class="border-gray-300">


        <RouterLink to="/read">
            <div id="read-container" class="flex mx-4 mt-6">  
                <div class="mr-3">
                <!-- make the most recent completed book the cover -->
                <img v-if="imageValue" :src="imageValue" alt="book cover" class="shadow-md rounded-md h-28">
                </div>

                <div class="flex justify-start flex-col">
                <h4>Read</h4>
                <!-- <p class="text-gray-400 text-xs">{{ storedBooksCount }}</p> -->
                <p class="text-gray-400 text-xs">0 books</p>
                </div>
            </div>
        </RouterLink>
        <hr class="border-gray-300">
    </div> <!-- want to read/read containers - finish-->
</template>

<script setup>
import { ref } from 'vue'
const imageValue = ref(null)
// defineProps[{

// }]
</script>