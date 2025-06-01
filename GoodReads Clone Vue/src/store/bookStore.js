import { defineStore } from 'pinia'

export const useBookStore = defineStore('bookStore', {
    state: () => ({
        wantToRead: JSON.parse(localStorage.getItem('want-to-read')) || [],
        currentlyReading: JSON.parse(localStorage.getItem('currently-reading')) || [],
        read: JSON.parse(localStorage.getItem('read')) || [],
    }),

    actions: {
        // add to localStorage
        addToWantToRead(book) {
            this.wantToRead.push(book)
            localStorage.setItem('want-to-read', JSON.stringify(this.wantToRead))
        },

        addToCurrentlyReading(book) {
            this.currentlyReading.push(book)
            localStorage.setItem('currently-reading', JSON.stringify(this.currentlyReading))
        },

        addToRead(book) {
            this.read.push(book)
            localStorage.setItem('read', JSON.stringify(this.read))
        },

        // remove from localStorage
        removeFromWantToRead(index) {
            this.wantToRead.splice(index, 1)
            localStorage.setItem('want-to-read', JSON.stringify(this.wantToRead))
        },

        removeFromCurrentlyReading(index) {
        this.currentlyReading.splice(index, 1)
        localStorage.setItem('currently-reading', JSON.stringify(this.currentlyReading))
        },

        removeFromRead(index) {
        this.read.splice(index, 1)
        localStorage.setItem('read', JSON.stringify(this.read))
        },
    }
})