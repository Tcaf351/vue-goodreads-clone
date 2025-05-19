<template>
    <div class="relative">
        <!-- modal overlay -->
        <div class="overlay fixed inset-0 w-screen h-screen bg-black/50 blur-sm z-10"></div>

        <!-- modal (book details) - start -->
        <section id="individual-book-modal" class="absolute z-20 w-full flex flex-col items-center justify-center bg-gray-50 rounded-md shadow-lg">

            <div id="modal-book-covers" class="relative w-full flex items-center justify-center" >
                <div class="z-20 h-full w-full absolute backdrop-blur bg-gray-400/70"></div>

                <img class="absolute h-full w-full bg-no-repeat bg-cover rounded-t-md z-10" :src="bookCover" alt="blurred book cover behind main book cover">

                <img class="book-cover relative inset-0 bg-no-repeat bg-cover py-3 z-30" :src="bookCover" alt="book cover">
            </div>


            <div class="h-full w-full">
            <h1 class="book-title text-xl text-center mt-2">{{ bookTitle }}</h1>
            <h3 class="book-subtitle text-md text-center">{{ subTitle }}</h3>
            <p class="author-name text-sm text-center">by {{ author }}</p>

            <hr class="mt-4 w-[96%] mx-auto">
                <div class="flex items-center justify-center">

                <ul class="px-3">
                    <span id="publisher" class="text-xs"></span>
                </ul>
                </div>

            <hr class="w-[96%] mx-auto">

            <!-- dropdown -->
            <div class="flex justify-center flex-col my-2 w-1/2 mx-auto">
                <select v-model="selectedOption" class="radius my-4 py-1 px-2 rounded-md bg-gray-300 hover:bg-gray-400 transition-colors ease-linear">
                    <option disabled value="select">Select</option>
                    <option value="want-to-read">Want to Read</option>
                    <option value="currently-reading">Currently Reading</option>
                    <option value="read">Read</option>
                </select>
                <div id="message-container"></div>
                <button @click="handleSubmit" class="py-1 px-2 mb-4 rounded-md bg-gray-300 hover:bg-gray-400 transition-colors ease-linear">Submit</button>
            </div>

                <div class="min-h-[25vh] overflow-auto"> <!-- book description -->
                    <p id="book-description" class="px-3 text-center max-h-[25vh]"></p>
                </div>
            </div>
        </section>
        <!-- modal (book details) - finish -->
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    // bring in props from Home.vue
    const props = defineProps({
        bookTitle: String,
        subTitle: String,
        author: String,
        bookDescription: String,
        bookCover: String,
        publisher: String,
    })

    // grab dropdown v-model
    const selectedOption = ref('select')

    // let Home.vue (homepage - parent) know of the change
    const emit = defineEmits(['book-added'])

    // handle users selection on the dropdown & submit to local storage
    const handleSubmit = () => {
    switch (selectedOption.value) {
        case 'want-to-read':
        {
            const existing = JSON.parse(localStorage.getItem('want-to-read')) || []
            existing.push(props)
            localStorage.setItem('want-to-read', JSON.stringify(existing))
        }
        break

        case 'currently-reading':
        {
            const existing = JSON.parse(localStorage.getItem('currently-reading')) || []
            existing.push(props)
            localStorage.setItem('currently-reading', JSON.stringify(existing))
        }
        break

        case 'read':
        {
            const existing = JSON.parse(localStorage.getItem('read')) || []
            existing.push(props)
            localStorage.setItem('read', JSON.stringify(existing))
        }
        break

        default:
        console.log('Please select a valid option.')
        break
    }
    emit('book-added')
}


</script>