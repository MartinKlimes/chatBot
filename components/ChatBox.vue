<script lang="ts" setup>
import {Message, User} from '@/types'
import { nanoid } from 'nanoid';
import { useTimeAgo } from '@vueuse/core'

const messageContent = ref('')

const props = defineProps<{
  me: User
  bot: User
  messages: Message[]
  usersTyping: User[]
}>()

const emit = defineEmits<{
 (e: 'sendMessage', payload: Message): void
}>()

function sendMessage() {
  const newMessage: Message = {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: messageContent.value,
  }
  emit('sendMessage', newMessage)
  messageContent.value = ''
}

function getUser(userId: string) {
  return userId === props.me.id ? props.me : props.bot 
}

</script>

<template>
  
  <div class="fixed bottom-[10px] right-[10px] w-[350px]  bg-gray-700 rounded-md  p-1">
    <div class="max-h-[500px] overflow-y-auto my-2">
      <div class="chat chat-start" :class="{'chat-end': message.userId === me.id}"
      v-for="message in messages" :key="message.id">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="getUser(message.userId).avatar" />
      </div>
    </div>
    <div class="chat-header">
      <span class="font-bold mr-2">{{ getUser(message.userId).name }}</span>
      <time class="text-xs opacity-50">{{ useTimeAgo(message.createdAt) }}</time>
    </div>
    <div class="chat-bubble">{{ message.text }}</div>
  </div>

  <div class="chat chat-start" v-if="usersTyping.length">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="usersTyping[0].avatar" />
      </div>
    </div>
    <div class="chat-header">
      <span class="font-bold mr-2">{{ usersTyping[0].name }}</span>
      <!-- <time class="text-xs opacity-50">{{ useTimeAgo(message.createdAt) }}</time> -->
    </div>
    <div class="chat-bubble"></div>
  </div>
  
</div>
<input @keyup.enter.exact="sendMessage" v-model="messageContent" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
  </div>
</template>

<style scoped></style>
