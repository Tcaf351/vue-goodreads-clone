import { defineStore } from "pinia";

export const useModalStore = defineStore('modals', {
    state: () => ({
        currentlyReadingModal: false,
    }),

    actions: {
        // when the currently reading modal is true
        showCurrentlyReadingModal() {
            this.currentlyReadingModal = true
        },

        // when the currently reading modal is false
        hideCurrentlyReadingModal() {
            this.currentlyReadingModal = false
        }
    }
})