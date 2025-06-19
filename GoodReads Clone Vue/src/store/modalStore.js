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
            // Ensure percentage is a valid number
            const validPercentage = isNaN(percentage) ? 0 : Math.max(0, Math.min(100, percentage))
            this.currentProgress = validPercentage
            
            // Check if book is 100% complete
            if (validPercentage >= 100) {
                const bookStore = useBookStore()
                const success = bookStore.moveCurrentlyReadingToRead()
                
                if (success) {
                    // Reset progress since book is now complete
                    this.currentProgress = 0
                    // Close the modal
                    this.hideCurrentlyReadingModal()
                }
            }
        },

        // Reset progress (useful when a new book is added to currently reading)
        resetProgress() {
            this.currentProgress = 0
        },
    }
})