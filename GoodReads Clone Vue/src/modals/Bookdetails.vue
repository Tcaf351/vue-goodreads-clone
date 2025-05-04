<template>
    <!-- modal (book details) - start -->
    <section id="individual-book-modal" class="hidden flex flex-col items-center justify-center bg-gray-50 rounded-md shadow-lg">

        <div id="modal-book-covers" class="relative w-full flex items-center justify-center">
        <div class="z-20 h-full w-full absolute backdrop-blur bg-gray-500 bg-opacity-40 saturate-100 backdrop-contrast-100 rounded-t-md"></div>

            <img class="absolute z-10 h-full w-full bg-no-repeat bg-cover rounded-t-md" src="" alt="blurred book cover behind main book cover">

            <img class="book-cover relative inset-0 z-30 bg-no-repeat bg-cover py-3" src="" alt="book cover">
        </div>


        <div class="h-full w-full">
        <h1 class="book-title text-xl text-center mt-2"></h1>
        <h3 class="book-subtitle text-md text-center"></h3>
        <p class="author-name text-sm text-center"></p>

        <hr class="mt-4 w-[96%] mx-auto">
            <div class="flex items-center justify-center">

            <ul class="px-3">
                <span id="publisher" class="text-xs"></span>
            </ul>
            </div>

        <hr class="w-[96%] mx-auto">

        <div class="flex justify-center flex-col my-2 w-1/2 mx-auto">
            <select name="reading" id="reading-dropdown" class="radius my-4 py-1 px-2 rounded-md bg-gray-300 hover:bg-gray-400 transition-colors ease-linear">
                <option value="select">Select</option>
                <option value="want to read">Want to Read</option>
                <option value="currently reading">Currently Reading</option>
                <option value="read">Read</option>
            </select>
            <div id="message-container"></div>
            <button id="dropdown-button-submit" class="py-1 px-2 mb-4 rounded-md bg-gray-300 hover:bg-gray-400 transition-colors ease-linear">Submit</button>
        </div>

            <div class="min-h-[25vh] overflow-auto"> <!-- book description -->
                <p id="book-description" class="px-3 text-center max-h-[25vh]"></p>
            </div>
        </div>
    </section>
    <!-- modal (book details) - finish -->
</template>

<script setup>

</script>