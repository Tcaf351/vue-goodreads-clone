<template>
    <div>
        <h1>{{ message }}</h1>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    message: String,
})
</script>

<style>

</style>