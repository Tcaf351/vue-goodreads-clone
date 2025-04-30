<template>
    <div id="want-to-read-and-read-container"> <!-- want to read/read containers - start -->
        <a href="/wantToRead">
        <div id="want-to-read-container" class="flex mx-4 mt-6">  
            <div class="mr-3">
            <img src="" alt="book cover" class="shadow-md rounded-md h-28"> <!-- make the most recent completed book the cover -->
            </div>

            <div class="flex justify-start  flex-col">
                <h4>Want to Read</h4>
                <p class="text-gray-400 text-xs"></p> <!-- make a dynamic number -->
            </div>
        </div>
        </a> 
        <hr>


        <a href="/read">
        <div id="read-container" class="flex mx-4 mt-6">  
            <div class="mr-3">
            <img src="" alt="book cover" class="shadow-md rounded-md h-28"> <!-- make the most recent completed book the cover -->
            </div>

            <div class="flex justify-start flex-col">
            <h4>Read</h4>
            <p class="text-gray-400 text-xs"></p> <!-- make a dynamic number -->
            </div>
        </div>
        </a> 
    <hr>
    </div> <!-- want to read/read containers - finish-->
</template>

<script setup>

</script>