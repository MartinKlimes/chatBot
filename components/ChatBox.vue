<script lang="ts" setup>
import { Message, User } from "@/types";
import { nanoid } from "nanoid";

const messageContent = ref("");
const messageBox = ref();
const isOpen = ref(true);

const props = defineProps<{
  me: User;
  bot: User;
  messages: Message[];
  usersTyping?: User[];
}>();

const emit = defineEmits<{
  (e: "sendMessage", payload: Message): void;
}>();

function sendMessage() {
  const newMessage: Message = {
    id: nanoid(),
    userId: "user",
    createdAt: new Date(),
    text: messageContent.value,
  };
  emit("sendMessage", newMessage);
  messageContent.value = "";
}

function getUser(userId: string) {
  return userId === props.me.id ? props.me : props.bot;
}

watch(props.messages, () => {
  nextTick(() => (messageBox.value.scrollTop = messageBox.value.scrollHeight));
});
</script>

<template>
  <div class="">
    <button
      v-show="!isOpen"
      @click="isOpen = true"
      class="w-12 p-1 bg-gray-700 hover:bg-gray-600 cursor-pointer"
    >
      <IconChat />
    </button>

    <div
      v-if="isOpen"
      class=" bg-gray-300 lg:w-[800px] md:w-[600px] dark:bg-gray-800 rounded-md h-[70vh]"
      
    >
      <header
        class="dark:bg-gray-900 bg-gray-200 px-4 flex justify-between items-center"
      >
        Customer Support Chat
        <button class="p-4 pr-0" @click="isOpen = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </header>

      <div v-if="!messages.length" class="text-center m-auto p-4">
        <strong class="text-lg">Chat with Botman!</strong>
        <p>Our A.I. powered assistant</p>
        <strong class="block mt-10">Go ahead and ask us something:</strong>
        <ul class="list-inside list-disc text-left">
          <li>What is social media post generator?</li>
          <li>How can I get human support?</li>
          <li>How was this tool built?</li>
        </ul>
      </div>
      <div v-else class="h-[70vh] overflow-y-auto my-2 p-4" ref="messageBox">
        <ChatBubble
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :user="getUser(message.userId)"
          :my-message="message.userId === me.id"
        />
        <ChatBubble v-for="user in usersTyping" :key="user.id" :user="user">
          <AppLoading />
        </ChatBubble>
      </div>

      <footer class="p-2">
        <input
          @keyup.enter.exact="sendMessage"
          v-model="messageContent"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
        />

        <div class="h-6 py-1 px-2 text-sm italic">
          <span v-if="usersTyping?.length">
            {{ usersTyping.map(user => user.name).join(" and ") }}
            {{ usersTyping.length > 1 ? 'are' : 'is' }} typing
          
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
