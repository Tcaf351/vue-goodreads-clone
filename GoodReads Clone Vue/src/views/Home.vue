<template>
  <div>
    <!-- spinner shown when api is being fetched -->
    <Spinner v-if="isLoading" />
    
    <div class="mx-4 min-h-[75vh]" v-if="showPage">

      <BookDetails v-if="showBookDetailsModal"
                  :bookTitle="bookTitle"
                  :subTitle="subTitle"
                  :author="author"
                  :bookDescription="bookDescription"
                  :bookCover="bookCover"
                  :publisher="publisher"
                  @book-added="handleBookAdded"
      />

        <div> <!-- search bar/container start -->
            <form @submit.prevent="handleSearch" id="search-form" class="flex items-center relative w-full top-2">
              <input type="text" 
                    placeholder="Search for a book"
                    class="w-full rounded-full bg-[#f1f1f1] py-[5px] px-[10px] flex-1 pl-10"
                    id="search-bar"
                    v-model="inputValue"
                    >
              <span class="absolute left-3">&#x1F50D;</span> <!-- magnifying glass icon -->
              <input value="Search"
                    type="submit"
                    id="search-button" 
                    class="rounded-s-none cursor-pointer rounded-full absolute right-0 top-0 bottom-0 my-auto h-full px-4 bg-gradient-to-b from-gray-500 to-gray-300 transition ease-in duration-150">
            </form>
        </div> <!-- search bar/container finish -->

        <WantToReadAndReadContainers :latest-book="latestBook" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBookStore } from '../store/bookStore'
import WantToReadAndReadContainers from '../components/WantToReadAndReadContainers.vue'
import BookDetails from '../modals/BookDetails.vue'
import Spinner from '../components/Spinner.vue'


  const bookStore = useBookStore()

  console.log(bookStore);


// components state
const inputValue = ref('')
const isLoading = ref(false) // this is for the spinner component
const showPage = ref(true) // the application itself. Hides when spinner is showing
const showBookDetailsModal = ref(false)

// data from api
const bookTitle = ref('')
const subTitle = ref('')
const author = ref('')
const bookDescription = ref('')
const bookCover = ref('')
const publisher = ref('')

function handleBookAdded(bookData) {
  // hide the BookDetails modal after user submits their book to want to read, currently reading or read
  showBookDetailsModal.value = false
  latestBook.value = bookData
}

// function to fetch api
const handleSearch = async () => {
showPage.value = false
isLoading.value = true

try {
    // connect to google books api
    const googleBooksApi = `https://www.googleapis.com/books/v1/volumes?q=${inputValue.value}`
    const response = await fetch(googleBooksApi)
    if (!response.ok) {
      throw new Error('api did not fetch correctly')
    }

    const data = await response.json()

    bookTitle.value = data?.items[0]?.volumeInfo?.title
    subTitle.value = data?.items[0]?.volumeInfo?.subtitle
    author.value = data?.items[0]?.volumeInfo?.authors[0]
    bookDescription.value = data?.items[0]?.volumeInfo?.description
    bookCover.value = data?.items[0]?.volumeInfo?.imageLinks?.thumbnail
    publisher.value = data?.items[0]?.volumeInfo?.publisher

  } catch (error) {
    console.log('data is not ok', error);

  } finally {
    isLoading.value = false
    showPage.value = true
    inputValue.value = '' // to reset the input form after it's been submitted
    showBookDetailsModal.value = true
  }
}

const latestBook = ref(null)

</script>