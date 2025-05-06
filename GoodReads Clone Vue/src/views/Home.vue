<template>
    <div class="mx-4 min-h-[75vh]">

        <div> <!-- search bar/container start -->
            <form id="search-form" class="flex items-center relative w-full top-2">
              <input type="text" 
                    placeholder="Search for a book"
                    class="w-full rounded-full bg-[#f1f1f1] py-[5px] px-[10px] flex-1 pl-10"
                    id="search-bar"
                    requ
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

    
</template>

<script setup>
import WantToReadAndReadContainers from '../components/WantToReadAndReadContainers.vue';

// pull from localStorage and give the data to WantToReadAndReadContainers as props. This will give a dynamic number to the p tag
</script>