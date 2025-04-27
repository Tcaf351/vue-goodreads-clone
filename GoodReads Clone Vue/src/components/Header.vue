<template>
    <nav class="bg-[#E4E2D5] h-12 flex items-center relative rounded-t-md">
        <div id="back-arrow" class="absolute left-4 hover:cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </div>

        <div class="absolute left-1/2 transform -translate-x-1/2">
            <h1 class="text-md text-gray-900">{{ message }}</h1>
        </div>
    </nav>
</template>

<script setup>
defineProps({
    message: String,
})
</script>
