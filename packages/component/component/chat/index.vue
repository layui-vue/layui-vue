<script lang="ts" setup>
import type { Message } from "./interface";
import { computed, nextTick, ref, watch } from "vue";
import "./index.less";

export interface ChatProps {
  contentHeight: string | number;
  title?: string;
  messages?: Message[];
  backgroundColor?: string;
};

defineOptions({
  name: "LayChat",
});

const props = withDefaults(
  defineProps<ChatProps>(),
  {
    contentHeight: 300,
    messages: () => [],
    title: undefined,
    backgroundColor: 'transparent',
  },
);

const emits = defineEmits<{
  (e: "beforeSend", message: Message): boolean | void;
  (e: "sent", message: Message): boolean | void;
}>();

const chatInput = ref("");
const messages = ref<Message[]>(props.messages);
const messageMap = new Map<string | number | bigint, Message>();
messages.value.forEach(m => messageMap.set(m.id, m));
const contentHeight = computed(() => typeof props.contentHeight == "number" ? `${props.contentHeight}px` : props.contentHeight);
const messageScroll = ref<HTMLElement>();

function handleSendClick() {
  if (chatInput.value.length > 0) {
    const msg: Message = {
      id: Date.now(),
      type: "text",
      content: chatInput.value,
      direction: "out",
    };
    chatInput.value = "";
    if (emits("beforeSend", msg) === false)
      return;
    messageMap.set(msg.id, msg);
    messages.value.push(msg);
    emits("sent", msg);
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

defineExpose({
  onMessage: (msg: Message) => {
    if (messageMap.has(msg.id))
      Object.assign(messages.value.find(m => m.id === msg.id) ?? {}, msg);
    else
      messages.value.push(msg);
    messageMap.set(msg.id, msg);
  },
  exportMessages: () => JSON.stringify(messages.value),
});
</script>

<template>
  <div class="layui-chat">
    <LayRow>
      <slot name="header">
        <template v-if="props.title">
          <LayCol :md="24" class="layui-chat-header">
            <span v-if="props.title">{{ props.title }}</span>
          </LayCol>
        </template>
      </slot>
      <div class="layui-chat-content">
        <LayCol :md="24" class="layui-chat-content-wrapper" style="position: relative;">
          <template v-if="!messages.length">
            <div style="inset: 0; display: flex; align-items: center; justify-content: center; position: absolute;">
              <slot name="empty">
                <LayEmpty />
              </slot>
            </div>
          </template>
          <template v-else>
            <LayScroll ref="messageScroll" :height="contentHeight">
              <div v-for="message in messages" :key="message.id" class="layui-chat-content-item" :class="[
                `layui-chat-content-item-${message.direction}`,
              ]">
                <div class="layui-chat-content-item-wrapper">
                  <div v-if="message.direction !== 'system'" style="width: 32px; height: 32px;">
                    <LayAvatar :src="message.avatar ?? ''" />
                  </div>
                  <span class="layui-chat-content-message">
                    {{ message.content }}
                  </span>
                  <LayIcon v-if="message.direction !== 'system' && message.icon" :type="message.icon" />
                </div>
              </div>
            </LayScroll>
          </template>
        </LayCol>
      </div>
      <div class="layui-chat-input">
        <LayCol :md="24">
          <LayInput @keydown="(ev: KeyboardEvent) => ev.keyCode === 13 && handleSendClick()" v-model="chatInput"
            placeholder="Input..." class="layui-chat-input-box">
            <template #prefix>
              <slot name="shortcuts" />
            </template>
            <template #suffix>
              <LayButton @click="handleSendClick">
                Send
              </LayButton>
            </template>
          </LayInput>
        </LayCol>
      </div>
      <div class="layui-chat-footer">
        <LayCol :md="24">
          <slot name="footer" />
        </LayCol>
      </div>
    </LayRow>
  </div>
</template>
