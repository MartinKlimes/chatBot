<script lang="ts" setup>
import { Message, User } from "@/types";
import { nanoid } from "nanoid";

const messageContent = ref("");
const messageBox = ref()

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
  console.log('ted');
  nextTick(() => messageBox.value.scrollTop = messageBox.value.scrollHeight)
  

})

</script>

<template>
  <div id="chatBox"
    class="fixed bottom-[10px] right-[10px] w-[350px] bg-gray-700 rounded-md p-1"
  >
    <div class="max-h-[500px] overflow-y-auto my-2 " ref="messageBox">
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
    <input
      @keyup.enter.exact="sendMessage"
      v-model="messageContent"
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full max-w-xs"
    />
  </div>
</template>

<style scoped></style>
