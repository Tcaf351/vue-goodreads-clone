<template>
    <div>
      <!-- spinner shown when api is being fetched -->
      <Spinner v-if="isLoading" />
      
      <div class="mx-4 min-h-[75vh]" v-if="showPage">
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

          <WantToReadAndReadContainers /> <!-- storedBooksCount="" -->
      </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WantToReadAndReadContainers from '../components/WantToReadAndReadContainers.vue'
import Spinner from '../components/Spinner.vue'

const inputValue = ref('')
const isLoading = ref(false)
const showPage = ref(true)

// connect to google books api
const googleBooksApi = computed(() => `https://www.googleapis.com/books/v1/volumes?q=${inputValue.value}`)

// function to fetch api
const handleSearch = async () => {
  showPage.value = false
  isLoading.value = true

  try {
      const response = await fetch(googleBooksApi.value)
      if (!response.ok) {
        throw new error('api did not fetch correctly')
      }

      const data = await response.json()
      console.log(data?.items[0]?.volumeInfo);
      
    } catch (error) {
      console.log('data is not ok', error);

    } finally {
      isLoading.value = false
      showPage.value = true
      inputValue.value = ''
    }
}

// pull from localStorage and give the data to WantToReadAndReadContainers as props. This will give a dynamic number to the p tag
</script>