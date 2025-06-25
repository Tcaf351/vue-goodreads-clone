import { defineStore } from "pinia";
import { useBookStore } from "./bookStore";

export const useModalStore = defineStore('modals', {
    state: () => ({
        currentlyReadingModal: false,
        currentProgress: 0,
    }),

    actions: {
        // when the currently reading modal is true
        showCurrentlyReadingModal() {
            this.currentlyReadingModal = true
        },

        // when the currently reading modal is false
        hideCurrentlyReadingModal() {
            this.currentlyReadingModal = false
        },

        // stores the calculated percentage from the updateprogress.vue file
        UpdateProgress(percentage) {
            const validPercentage = isNaN(percentage) ? 0 : Math.max(0, Math.min(100, percentage))
            this.currentProgress = validPercentage
            
            // Also update the progress in the book object
            const bookStore = useBookStore()
            if (bookStore.currentlyReading.length > 0) {
                bookStore.currentlyReading[0].progress = validPercentage
                localStorage.setItem('currently-reading', JSON.stringify(bookStore.currentlyReading))
            }
            
            // Check if book is 100% complete
            if (validPercentage >= 100) {
                const success = bookStore.moveCurrentlyReadingToRead()
                if (success) {
                    this.resetProgress()
                    this.hideCurrentlyReadingModal()
                }
            }
        },        
    }
})