<script setup>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import Body from './components/Body.vue'
</script>

<template>
  <main id="body" class="bg-gradient-to-br from-gray-300 to-sky-200 bg-no-repeat h-screen overflow-hidden">
      <div class="relative sm:max-w-lg mx-auto mt-4">
          <div class="bg-gray-50 rounded-md shadow-lg relative sm:max-w-lg mx-auto mt-4">
            <!-- components -->
            <Header message="My Books" />
            <Body />
            <Footer message="My Books" />
          </div>
      </div>
  </main>
</template>