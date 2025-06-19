<template>
    <div class="relative min-h-[75vh] max-h-[75vh]">
        <section class="bg-gray-50">
                <div id="modal-book-covers" class="relative w-full flex items-center justify-center">
                    <div class="z-20 h-full w-full absolute backdrop-blur bg-gray-500/70 bg-opacity-40 saturate-100 backdrop-contrast-100"></div>
            
                    <img class="absolute z-10 h-full w-full bg-no-repeat bg-cover" :src="apiList[0]?.bookCover" alt="blurred book cover behind main book cover">
                
                    <img class="book-cover relative inset-0 z-30 bg-no-repeat bg-cover py-3" :src="apiList[0]?.bookCover" alt="book cover">
                </div>

                <div class="w-full">
                    <h1 id="book-title" class="text-xl text-center mt-2">{{ apiList[0]?.title }}</h1>
                    <p id="author-name" class="text-sm text-center">by {{ apiList[0]?.author }}</p>
                
                    <hr class="mt-4 w-[96%] mx-auto">
                    <div class="flex items-center justify-center">
                        
                        <ul class="px-3">
                            <span id="publisher" class="text-xs">{{ apiList[0]?.publisher }}</span>
                        </ul>
                    </div>
                    <hr class="w-[96%] mx-auto mb-2">
                    
                    <div class="max-h-[14vh] overflow-auto">
                        <p id="book-description" class="px-3 text-center max-h-[25vh]">{{ apiList[0]?.bookDescription }}</p>
                    </div>
                </div>


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

        <!-- show error message is it exists -->
        <div class="flex justify-center" v-if="error">{{ error }}</div>
    </section>
    </div>
</template>

<script setup>
    // import pinia values
    import { storeToRefs } from 'pinia'

    import { computed, ref } from 'vue'
    import { useBookStore } from '../store/bookStore'
    import { useModalStore } from '../store/modalStore'

    const bookStore = useBookStore()
    const modalStore = useModalStore()

    // call stores
    const { apiList } = storeToRefs(bookStore)
    console.log(apiList.value[0]);

    // bring in props from Home.vue
    const props = defineProps({
        bookTitle: String,
        subTitle: String,
        author: String,
        bookDescription: String,
        bookCover: String,
        publisher: String,
        pageCount: Number,
    })

    // grab dropdown v-model
    const selectedOption = ref('select')

    // close modal when user clicks on the overlay
    const closeModal = () => {
        emit('close-modal')
    }

    // let Home.vue know of the change
    const emit = defineEmits(['book-added', 'close-modal'])

    // handle users selection on the dropdown & submit to localStorage
    const error = computed(() => bookStore.error)

    const handleSubmit = () => {
    // Check if user selected a valid option
    if (selectedOption.value === 'select') {
        bookStore.setError('Please select a valid option.')
        return
    }

    let success = false

    switch (selectedOption.value) {
        case 'want-to-read':
            success = bookStore.addToWantToRead(props)
            break

        case 'currently-reading':
            success = bookStore.addToCurrentlyReading(props)
            if (success) {
                // Reset progress for the new book
                modalStore.resetProgress()
            }
            break

        case 'read':
            success = bookStore.addToRead(props)
            break

        default:
            bookStore.setError('Please select a valid option.')
            return
    }

    // Only emit and close modal if the book was successfully added
    if (success) {
        emit('book-added')
        closeModal()
    }
}
</script>