<script setup>
const data = ref(null)

async function makeRequest() {
  data.value = await $fetch('/api/ai')
}
</script>


<template>
  <div class="max-w-full flex items-center justify-center m-auto h-screen w-screen bg-gray-200">
    <ChatWidget/>

  </div>
</template>
