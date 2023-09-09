<script setup>
const data = ref(null)

async function makeRequest() {
  data.value = await $fetch('/api/ai')
}
</script>


<template>
  <div class="max-w-full w-[900px] m-auto">
    <ChatWidget/>
    <SocialPoster/>
  

  </div>
</template>
