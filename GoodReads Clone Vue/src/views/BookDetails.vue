<template>
    <div>
        <section class="bg-gray-50 shadow-lg  min-h-[75vh]">
                <div id="modal-book-covers" class="relative w-full flex items-center justify-center">
                    <div class="z-20 h-full w-full absolute backdrop-blur bg-gray-500 bg-opacity-40 saturate-100 backdrop-contrast-100"></div>
            
                    <img class="book-cover-background absolute z-10 h-full w-full bg-no-repeat bg-cover" src="" alt="blurred book cover behind main book cover">
                
                    <img class="book-cover relative inset-0 z-30 bg-no-repeat bg-cover py-3" src="" alt="book cover">
                </div>

                <div class="w-full">
                    <h1 id="book-title" class="text-xl text-center mt-2"></h1>
                    <h3 id="book-subtitle" class="text-md text-center"></h3>
                    <p id="author-name" class="text-sm text-center"></p>
                
                    <hr class="mt-4 w-[96%] mx-auto">
                    <div class="flex items-center justify-center">
                        
                        <ul class="px-3">
                        <span id="publisher" class="text-xs"></span>
                        </ul>
                    </div>
                    <hr class="w-[96%] mx-auto mb-2">
                    
                    <div class="min-h-[25vh] overflow-auto">
                        <p id="book-description" class="px-3 text-center max-h-[25vh]"></p>
                    </div>
                    <button id="remove-button" class="block mx-auto py-1 px-3 rounded-md bg-gray-300 hover:bg-gray-400 transition ease-in">Remove</button>
                    <p>{{ route.params.id }}</p>
                </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// call api
const handleApiCall = async () => {
    try {
        const api = `https://www.googleapis.com/books/v1/volumes?q=${route.params.id}` // get book title from url
        const response = await fetch(api)

        if (!response.ok) {
            throw new Error('api did not fetch correctly')
        }
        const data = await response.json()
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    handleApiCall()
})
</script>