<script setup lang="ts">
import type { Payload } from "@/types";

// const props = defineProps<{
//     url: string
//     temperature: number
// }>()

const form = ref<Payload>({
    url: '',
    temperature: 1
})

const emit = defineEmits<{
  (e: 'createPost', payload: Payload): void
}>()

function createPost() {
    emit('createPost', form.value)
    form.value.url = ''
    form.value.temperature = 1
}
</script>

<template>
  <div class="p-4 mt-4 border border-gray-700 rounded-md">
    <form @submit.prevent="createPost">
      <div class="flex gap-4 ">
        
          <button class="btn btn-primary h-[110px]">Generate</button>
        
        <div class="w-full">
          <input
          v-model="form.url"
            type="text"
            placeholder="Full Article URL"
            class="input input-bordered w-full"
          />
          <input
            v-model="form.temperature"
            type="range"
            min="0"
            max="1"
            step=".1"
            class="range range-accent mt-4"
          />
          <h3 class="text-xs text-gray-500">Temperature: 1 - random and creative</h3>
        </div>
      </div>
    </form>
  </div>
</template>
