<script setup>

const text = ref('')
const loading = ref(false)


const numberOfCharacter = computed(() => text.value.length)

</script>


<template>
<div class="card w-full mt-4 bg-base-100 shadow-xl">
  <div class="card-body">
    
    <h2 class="card-title border-b border-gray-500 rounded-b-md py-1 px-2 flex">Twitter <AppLoading v-if="loading"/></h2>
    <textarea v-model="text" class="textarea " placeholder="Import an article to generate an announcement"  cols="30" ></textarea>

    <footer class="card-actions justify-between">
        <span class="text-sm text-gray-500">Number of character: {{ numberOfCharacter }}</span>
      <button class="btn btn-primary">Post</button>
    </footer>
  </div>
</div>
</template>
