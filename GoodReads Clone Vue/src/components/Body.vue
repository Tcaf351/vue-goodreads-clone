<template>
    <div class="mx-4 min-h-[75vh]">

        <!-- reading: title in main body - start -->
        <div class="mt-6"> 
            <p class="uppercase text-xs pb-2">Reading:</p>
        </div>
        <!-- reading: title in main body - finish -->

        <CurrentlyReading />        
    </div>
</template>

<script setup>
import CurrentlyReading from './CurrentlyReading.vue';
</script>