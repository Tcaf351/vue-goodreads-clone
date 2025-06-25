<template>
  <div>
    <!-- spinner shown when api is being fetched -->
    <Spinner v-if="isLoading" />
    
    <div class="mx-4 min-h-[75vh]" v-if="showPage">

      <div v-if="showBookDetailsModal">
        <BookDetailsModal
                  :bookTitle="bookTitle"
                  :subTitle="subTitle"
                  :author="author"
                  :bookDescription="bookDescription"
                  :bookCover="bookCover"
                  :publisher="publisher"
                  :pageCount="pageCount"
                  @book-added="handleBookAdded"
                  @close-modal="closeModal"
      />
      </div>

        <div> <!-- search bar/container start -->
            <form @submit.prevent="handleSearch" id="search-form" class="flex items-center relative w-full top-2">
              <input type="text" 
                    placeholder="Search for a book..."
                    class="w-full rounded-full bg-[#f1f1f1] py-[5px] px-[10px] flex-1 pl-10"
                    required
                    v-model="inputValue"
                    >
              <span class="absolute left-3">&#x1F50D;</span> <!-- magnifying glass icon -->
              <input value="Search"
                    type="submit"
                    id="search-button" 
                    class="rounded-s-none cursor-pointer rounded-full absolute right-0 top-0 bottom-0 my-auto h-full px-4 bg-gradient-to-b from-gray-500 to-gray-300 transition ease-in duration-150">
            </form>
        </div> <!-- search bar/container finish -->

        <div v-if="currentlyReadingLength">
          <CurrentlyReading v-if="!showBookDetailsModal"
          :currentlyReadingLength="currentlyReadingLength"
          :currentlyReadingData="currentlyReadingData"
          />
        </div>
          <UpdateProgress />
        <WantToReadAndReadContainers />
        <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '../store/bookStore'
import CurrentlyReading from '../views/CurrentlyReading.vue'
import WantToReadAndReadContainers from '../components/WantToReadAndReadContainers.vue'
import BookDetailsModal from '../modals/BookDetailsModal.vue'
import Spinner from '../components/Spinner.vue'
import UpdateProgress from '../modals/UpdateProgress.vue'

// bring in vue router
const router = useRouter()

// bring in bookStore
const bookStore = useBookStore()
const currentlyReadingLength = computed(() => bookStore?.currentlyReading?.length)
const currentlyReadingData = computed(() => bookStore?.currentlyReading)

// components state
const inputValue = ref('')
const isLoading = ref(false) // this is for the spinner component
const showPage = ref(true) // the application itself. Hides when spinner is showing
const showBookDetailsModal = ref(false) // BookDetailsModal is hidden by default

// data from api
const bookTitle = ref('')
const subTitle = ref('')
const author = ref('')
const bookDescription = ref('')
const bookCover = ref('')
const publisher = ref('')
const pageCount = ref(null)
const errorMessage = ref('')

function handleBookAdded() {
  showBookDetailsModal.value = false
}

const closeModal = () => {
  showBookDetailsModal.value = false
}

// function to fetch api
const handleSearch = async () => {
showPage.value = false // the homepage disappears
isLoading.value = true // the spinner component shows
errorMessage.value = ''

bookStore.clearError()

try {
    // connect to google books api
    const googleBooksApi = `https://www.googleapis.com/books/v1/volumes?q=${inputValue.value}` // bring in value from input
    const response = await fetch(googleBooksApi)
    if (!response.ok) {
      throw new Error('api did not fetch correctly')
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      throw new Error(`No books found for "${inputValue.value}". Please try a different search term.`)
    }

    const book = data?.items.map(item => {
      return {
        id: item?.id,
        bookTitle: item?.volumeInfo?.title || 'No title available',  // ← Changed to bookTitle
        subTitle: item?.volumeInfo?.subtitle || 'No subtitle available',
        author: item?.volumeInfo?.authors ? item?.volumeInfo?.authors[0] : 'No author available',
        bookDescription: item?.volumeInfo?.description || 'No description available',
        bookCover: item?.volumeInfo?.imageLinks?.thumbnail || 'Image is not available',
        publisher: item?.volumeInfo?.publisher || 'Publisher is not available',
        pageCount: item?.volumeInfo?.pageCount || 'The total number of pages for this book is not available'
      }
    })
    bookStore.apiList = book

    router.push('/book-list/')

  } catch (error) {
    errorMessage.value = error.message

  } finally {
    isLoading.value = false // spinner component hides as data is fetched
    showPage.value = true // homepage is not hidden anymore
    inputValue.value = '' // to reset the input form after it's been submitted
  }
}
</script>