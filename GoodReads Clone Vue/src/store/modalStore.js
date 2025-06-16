import { defineStore } from "pinia";
import UpdateProgress from "../modals/UpdateProgress.vue";

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
            this.currentProgress = percentage
        },
    }
})