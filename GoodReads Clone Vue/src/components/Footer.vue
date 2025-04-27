<template>
    <footer class="flex items-start justify-center bg-[#E4E2D5] h-16 rounded-b-md">
        <div class="border-solid border-t-2  border-gray-900 py-2 px-4 text-center w-24">
            <img 
              src="../../public/bookmark-white.png" 
              alt="book unicode" 
              class="mx-auto h-6">
            <span class="text-xs">{{ message }}</span>
          </div>
    </footer>
</template>

<script setup>
defineProps({
    message: String,
})
</script>
