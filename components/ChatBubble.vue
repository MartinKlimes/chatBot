<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import {Message, User} from "@/types"
import Markdown from "vue3-markdown-it";

const props = defineProps<{
    user: User
    message?: Message
    myMessage?: Boolean
}>()

</script>

<template>
 <div class="chat" :class="[myMessage ? 'chat-end' : 'chat-start']">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="user.avatar" />
      </div>
    </div>
    <div class="chat-header">
      <span class="font-bold mr-2">{{ user.name }}</span>
      <time v-if="message" class="text-xs opacity-50">{{ useTimeAgo(message.createdAt) }}</time>
    </div>
    <div class="chat-bubble">
        <slot>
            <Markdown :source="message?.text" class="w-full" />
        </slot>
    </div>
</div>


</template>