<script lang="ts" setup>
import { Message} from '@/types'

const messageContent = ref('')
const messages = ref<Message[]>([])

async function sendMessage() {
  const newMessage: Message = {
    role: 'user',
    content: messageContent.value,
  }
  messages.value.push(newMessage)

  const { data } = await $fetch('/api/ai', {
    method: 'POST',
    body: {message: messages.value},
  })
  console.log(data);
  // messages.value.push(data)
  messageContent.value = ''
}
</script>

<template>
  <div>
    <input @keyup.enter.exact="sendMessage" v-model="messageContent" type="text">
  </div>
</template>

<style scoped></style>
