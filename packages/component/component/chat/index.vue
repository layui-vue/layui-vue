<script lang="ts" setup>
import { nextTick, ref, watch } from "vue";
import "./index.less";

const chatInput = ref("");
const messageQueue = ref<string[]>([]);
const messages = ref<{
  id: number;
  content: string;
  avatar: string;
  direction: "left" | "right";
}[]>([]);
const messageScroll = ref<HTMLElement>();

function handleSendClick() {
  if (chatInput.value.length > 0) {
    messages.value.push({
      id: Date.now(),
      content: chatInput.value,
      avatar: "",
      direction: "right",
    });
    messageQueue.value.push(chatInput.value);
    chatInput.value = "";
  }
}

watch(
  () => messages.value.length,
  (_) => {
    nextTick(() => {
      if (messageScroll.value) {
        const el = (messageScroll.value as any).scrollRef as HTMLElement;
        el.scrollTo(0, el.scrollHeight);
      }
    });
  },
);

watch(
  () => messageQueue.value.length,
  (_) => {
    const m = messageQueue.value.shift();
    if (m) {
      (new Promise(r => setTimeout(r, 1000))).then(() => {
        messages.value.push({
          id: Date.now(),
          content: `收到消息 ${m}`,
          avatar: "",
          direction: "left",
        });
      });
    }
  },
);
</script>

<template>
  <div class="center">
    <div class="layui-chat" style="width: 350px;">
      <LayRow>
        <div class="layui-chat-header">
          <LayCol :md="24">
            <LayPanel shadow="never" style="margin-bottom: 0;">
              <span>LayChat</span>
            </LayPanel>
          </LayCol>
        </div>
        <div class="layui-chat-content">
          <LayCol :md="24" class="layui-chat-content-wrapper" style="position: relative;">
            <template v-if="!messages.length">
              <div style="inset: 0; display: flex; align-items: center; justify-content: center; position: absolute;">
                <LayEmpty />
              </div>
            </template>
            <template v-else>
              <LayScroll ref="messageScroll" height="300px">
                <div
                  v-for="message in messages" :key="message.id" class="layui-chat-content-item" :class="[
                    `layui-chat-content-item-${message.direction}`,
                  ]"
                >
                  <div class="layui-chat-content-item-wrapper">
                    <div style="width: 32px; height: 32px;">
                      <LayAvatar />
                    </div>
                    <span class="layui-chat-content-message">
                      {{ message.content }}
                    </span>
                    <LayIcon type="layui-icon-ok" />
                  </div>
                </div>
              </LayScroll>
            </template>
          </LayCol>
        </div>
        <div class="layui-chat-input">
          <LayCol :md="24">
            <LayInput v-model="chatInput" placeholder="Input..." class="layui-chat-input-box">
              <template #suffix>
                <LayButton @click="handleSendClick">
                  Send
                </LayButton>
              </template>
            </LayInput>
          </LayCol>
        </div>
      </LayRow>
    </div>
  </div>
</template>
