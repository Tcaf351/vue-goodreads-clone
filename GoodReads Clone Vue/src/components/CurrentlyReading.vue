<template>
    <!-- currently reading: book details/progress - start -->
    <div id="currently-reading-container" class="flex rounded-md relative overflow-hidden max-h-[25vh]"> 

        <div class="z-20 h-full w-full absolute backdrop-blur bg-gray-600 bg-opacity-60 saturate-100 backdrop-contrast-100"></div>

        <img id="currently-reading-cover-glassmorphism" class="absolute z-10 h-full w-full bg-no-repeat bg-cover" src="" alt="blurred book cover behind main book cover">
        <img id="currently-reading-book-cover" class="m-4 rounded-md z-30" src="" alt="book cover">


        <div class="z-30 py-4">
            <h3 class="book-title"></h3>
            <p class="text-xs mb-1 text-gray-50">by <span class="author-name"></span></p>

            <button id="update-progress-button" class="bg-[#E4E2D5] text-xs px-3 py-2 mb-2 rounded-md uppercase ">Update Progress</button>

            <div class="flex pb-7">
                <p class="text-xs uppercase mr-3 text-gray-50">progress:</p>
                <p class="text-xs ml-1 text-gray-50"><span id="percentage">0</span>%</p> <!-- percentage of progress bar -->
            </div>
        </div>
    </div>
    <!-- currently reading: book details/progress - finish -->
</template>

<script setup>

</script>