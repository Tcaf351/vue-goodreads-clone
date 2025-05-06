<script setup>
import Header from '@components/Header.vue'
import Footer from '@components/Footer.vue'
</script>

<template>
  <div class="bg-gradient-to-br from-gray-300 to-sky-200 bg-no-repeat h-screen overflow-hidden">
    <main class="relative sm:max-w-lg mx-auto mt-4">
      <div class="bg-gray-50 rounded-md shadow-lg">

        <Header message="My Books" />
        <router-view />
        <Footer message="My Books" />

      </div>
    </main>
  </div>
</template>