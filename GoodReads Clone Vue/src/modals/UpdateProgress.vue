<template>
    <!-- get the modal state -->
    <div v-if="modalStore.currentlyReadingModal">
        <!-- modal overlay -->
        <div @click="hideCurrentlyReadingModal" class="overlay fixed inset-0 w-screen h-screen z-40 bg-black/50 blur-sm"></div>

        <!-- modal to update progress - start -->
        <section class="absolute inset-0 z-40 flex items-center justify-center px-4 py-5"> 
            <div class="h-1/4 w-full max-w-md bg-gray-300 rounded-md"> <!-- max-w-md keeps modal centered -->
            <nav class="flex justify-between my-5 px-4">
                <button @click="hideCurrentlyReadingModal">Cancel</button>
                <li class="list-none">Progress</li>
                <button @click="calculateBookPercentage">Done</button>
            </nav>

            <div class="flex justify-center items-center mb-4">
                <span>I'm on page</span>
                <form @submit.prevent="calculateBookPercentage">
                    <input 
                    type="text" 
                    name="page number" 
                    placeholder="Enter page number..."
                    v-model="inputPageCount"
                    class="mx-1 border border-gray-400 rounded px-2">
                </form>
            </div>
            <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
        </div>
        </section>
        <!-- modal - finish -->
    </div>
</template>

<script setup>
import { ref } from 'vue'

// bring in pinia
import { useModalStore } from '../store/modalStore';
import { useBookStore } from '../store/bookStore';
const bookStore = useBookStore()
const modalStore = useModalStore()

// get bookStore pagecount
const fullBookLength = bookStore?.currentlyReading[0]?.pageCount

// get page number the user typed in
const inputPageCount = ref('')
const errorMessage = ref('')

const calculateBookPercentage = () => {
    const currentPage = parseInt(inputPageCount.value)
    const totalPages = parseInt(fullBookLength)
    
    errorMessage.value = ''

    // Check if totalPages is valid
    if (!totalPages || isNaN(totalPages) || totalPages <= 0) {
        errorMessage.value = 'This book does not have page count information. Cannot calculate progress by pages.'
        return
    }

    if (isNaN(currentPage) || currentPage <= 0) {
        errorMessage.value = 'Please enter a valid page number'
        return
    }

    if (currentPage > totalPages) {
        errorMessage.value = `Page number cannot exceed ${totalPages}`
        return
    }

    // calculate percentage
    const percentage = Math.round((currentPage / totalPages) * 100)

    try {
        modalStore.UpdateProgress(percentage)
        inputPageCount.value = ''
        hideCurrentlyReadingModal()
    } catch (error) {
        console.error('Error updating progress:', error)
        errorMessage.value = 'Error updating progress. Please try again.'
    }
}

// bring in pinia functions
const showCurrentlyReadingModal = () => modalStore.showCurrentlyReadingModal()
const hideCurrentlyReadingModal = () => modalStore.hideCurrentlyReadingModal()
</script>