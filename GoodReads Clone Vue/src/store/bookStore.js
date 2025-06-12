import { defineStore } from 'pinia'

export const useBookStore = defineStore('bookStore', {
    state: () => ({
        wantToRead: JSON.parse(localStorage.getItem('want-to-read')) || [],
        currentlyReading: JSON.parse(localStorage.getItem('currently-reading')) || [],
        read: JSON.parse(localStorage.getItem('read')) || [],
        error: null,
    }),

    actions: {
        // add to localStorage
        addToWantToRead(book) {
            this.error = null
            const duplicate = this.wantToRead.find(item => item.bookTitle === book.bookTitle)
            if (duplicate) {
                this.error = 'You already added this book.'
                return false

            }
            this.wantToRead.push(book)
            localStorage.setItem('want-to-read', JSON.stringify(this.wantToRead))
            return true
        },

        addToCurrentlyReading(book) {
            this.currentlyReading.push(book)
            localStorage.setItem('currently-reading', JSON.stringify(this.currentlyReading))
        },

        addToRead(book) {
            this.error = null
            const duplicate = this.read.find(item => item.bookTitle === book.bookTitle)
            if (duplicate) {
                this.error = 'You already added this book.'
                return false

            }
            this.read.push(book)
            localStorage.setItem('read', JSON.stringify(this.read))
            return true
        },

        // remove from localStorage
        removeFromWantToRead(bookTitle) {
            const index = this.wantToRead.findIndex((book) => book.bookTitle === bookTitle)
            if (index !== -1) {
              this.wantToRead.splice(index, 1)
              localStorage.setItem('want-to-read', JSON.stringify(this.wantToRead))
            }
          },

        removeFromCurrentlyReading(index) {
            this.currentlyReading.splice(index, 1)
            localStorage.setItem('currently-reading', JSON.stringify(this.currentlyReading))
        },

        removeFromRead(bookTitle) {
            const index = this.read.findIndex((book) => book.bookTitle === bookTitle)
            if (index !== -1) {
              this.read.splice(index, 1)
              localStorage.setItem('read', JSON.stringify(this.read))
            }
        },
    }
})