<template>
    <div>
        <!-- modal overlay -->
        <div class="overlay fixed inset-0 w-screen h-screen z-40 bg-black/50 blur-sm"></div>

        <!-- modal to update progress - start -->
        <section class="absolute inset-0 z-40 flex items-center justify-center px-4 py-5"> 
            <div class="h-1/4 w-full max-w-md bg-gray-300 rounded-md"> <!-- max-w-md keeps modal centered -->
            <nav class="flex justify-between my-5 px-4">
                <button class="cancel-button">Cancel</button>
                <li class="list-none">Progress</li>
                <button id="update-progress-modal-done-button">Done</button>
            </nav>

            <div class="flex justify-center items-center mb-4">
                <span>I'm on page</span>
                <input type="text" name="page number" class="mx-1 border border-gray-400 rounded px-2">
            </div>
            </div>
        </section>
        <!-- modal - finish -->
            </div>
        </template>

<script setup>

</script>