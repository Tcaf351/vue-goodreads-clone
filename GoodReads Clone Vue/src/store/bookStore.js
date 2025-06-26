import { defineStore } from 'pinia'
import { useModalStore } from './modalStore'

export const useBookStore = defineStore('bookStore', {
    state: () => ({
        wantToRead: JSON.parse(localStorage.getItem('want-to-read')) || [],
        currentlyReading: JSON.parse(localStorage.getItem('currently-reading')) || [],
        read: JSON.parse(localStorage.getItem('read')) || [],
        apiList: [],
        error: null,
    }),

    actions: {
        // Set error message
        setError(message) {
            this.error = message
        },

        // Clear error message
        clearError() {
            this.error = null
        },

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
            this.error = null
        
            // Check for duplicate book in currently reading
            const duplicateCurrently = this.currentlyReading.find(item => item.bookTitle === book.bookTitle)
            if (duplicateCurrently) {
                this.error = 'You already added this book to currently reading.'
                return false
            }
        
            // Check if book has already been read
            const alreadyRead = this.read.find(item => item.bookTitle === book.bookTitle)
            if (alreadyRead) {
                this.error = 'This book has already been read.'
                return false
            }
        
            // Check if already at the limit (only 1 book can be currently reading)
            if (this.currentlyReading.length >= 1) {
                this.error = 'You can only have one book in currently reading at a time.'
                return false
            }
        
            // Check for default/empty book values
            if (!book.bookTitle || book.bookTitle === 'No title available' || 
                !book.author || book.author === 'No author available' ||
                !book.bookCover || book.bookCover === 'Image not available') {
                this.error = 'Cannot add incomplete book data to currently reading.'
                return false
            }
        
            // Add progress property AND fix pageCount if invalid
            const bookWithProgress = {
                ...book,
                progress: 0,
                pageCount: parseInt(book.pageCount) || null
            }
        
            this.currentlyReading.push(bookWithProgress)
            localStorage.setItem('currently-reading', JSON.stringify(this.currentlyReading))
            
            // IMPORTANT: Reset modalStore progress when adding a new book
            const modalStore = useModalStore()
            modalStore.currentProgress = 0
            
            return true
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
                return true
            }
            return false
        },

        // Move book from currently reading to read when 100% complete
        moveCurrentlyReadingToRead() {
            if (this.currentlyReading.length > 0) {
                const completedBook = this.currentlyReading[0]
                
                // Check if book is already in read list (just in case)
                const duplicate = this.read.find(item => item.bookTitle === completedBook.bookTitle)
                if (!duplicate) {
                    // Add to read list
                    this.read.push(completedBook)
                    localStorage.setItem('read', JSON.stringify(this.read))
                }
                
                // Remove from currently reading
                this.currentlyReading = []
                localStorage.setItem('currently-reading', JSON.stringify(this.currentlyReading))
                
                return true
            }
            return false
        },

        removeFromWantToReadById(bookId) {
            const index = this.wantToRead.findIndex(book => book.id === bookId)
            if (index !== -1) {
                this.wantToRead.splice(index, 1)
                localStorage.setItem('want-to-read', JSON.stringify(this.wantToRead))
                return true
            }
            return false
        },
        
        removeFromReadById(bookId) {
            const index = this.read.findIndex(book => book.id === bookId)
            if (index !== -1) {
                this.read.splice(index, 1)
                localStorage.setItem('read', JSON.stringify(this.read))
                return true
            }
            return false
        },
    }
})