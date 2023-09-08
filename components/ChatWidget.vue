<script lang="ts" setup>
import { Message, User } from "@/types";
import { nanoid } from "nanoid";

const messages = ref<Message[]>([]);
const usersTyping = ref<User[]>([]);

const me = ref<User>({
  id: "user",
  name: "You",
  avatar: "avatar.jpg",
});
const bot = ref<User>({
  id: "assistant",
  name: "bot",
  avatar: "bot.jpg",
});


const messagesAi = computed(() => 
  messages.value.map((message) => ({
    role: message.userId, 
    content: message.text
  })).slice(-50)
)


async function sendMessage(message: Message) {
  messages.value.push(message);
  usersTyping.value.push(bot.value);

  const messagesAi = messages.value
    .map((message) => ({ role: message.userId, content: message.text }))
    .slice(-50);

  const res = await $fetch("/api/ai", {
    method: "POST",
    body: { message: messagesAi },
  });
  console.log(res.message);
  usersTyping.value = [];

  const botMessage: Message = {
    id: nanoid(),
    userId: res.message.role,
    createdAt: new Date(),
    text: res.message.content as string,
  };

  messages.value.push(botMessage);
}
</script>

<template>
  <div>
    <ChatBox
      @sendMessage="sendMessage"
      :me="me"
      :bot="bot"
      :usersTyping="usersTyping"
      :messages="messages"
    />
  </div>
</template>

<style scoped></style>
