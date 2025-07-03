<script lang="ts" setup>
import type { Message } from "./interface";
import { computed, nextTick, ref, watch } from "vue";
import { select } from "../../utils";
import LayAvatar from "../avatar/index";
import LayButton from "../button/index";
import LayCol from "../col/index";
import LayEmpty from "../empty/index";
import LayIcon from "../icon/index";
import LayInput from "../input/index";
import LayRow from "../row/index";
import LayScroll from "../scroll/index";
import LayTooltip from "../tooltip/index";
import "./index.less";

export interface ChatProps {
  contentHeight?: string | number;
  title?: string;
  messages?: Message[];
  backgroundColor?: string;
  emptyText?: string;
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
    backgroundColor: "transparent",
    emptyText: "无消息",
  },
);

const emits = defineEmits<{
  (e: "before-send", message: Message): boolean | void;
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
    if (emits("before-send", msg) === false)
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
        el.scrollTo({
          behavior: "smooth",
          top: el.scrollHeight,
          left: 0,
        });
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
  searchMessage: (keyword: RegExp) => messages.value.filter(
    m => select(
      () => [typeof m.content === "string" && keyword.test(`${m.content}`), m.content],
      () => [keyword.test(`${m.name}`), m.name],
      () => [keyword.test(`${m.id}`), m.id],
    ),
  ),
  stash: (id: string | number = 0) => {
    const msgs = messages.value.splice(messageMap.has(id) ? messages.value.findIndex(m => m.id === id) : 0);
    nextTick();
    return JSON.stringify(msgs);
  },
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
            <div class="layui-chat-content-empty">
              <slot name="empty">
                <LayEmpty :description="props.emptyText" />
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
                    <LayTooltip :content="message.name ?? ''">
                      <LayAvatar :src="message.avatar ?? ''" />
                    </LayTooltip>
                  </div>
                  <template v-if="message.type === 'text'">
                    <template v-if="message.direction !== 'system'">
                      <slot name="text-content" v-bind="{ message }">
                        <span class="layui-chat-content-message" :style="{
                          color: message.textColor,
                          backgroundColor: message.backgroundColor,
                        }">
                          {{ message.content }}
                        </span>
                      </slot>
                    </template>
                    <template v-if="message.direction === 'system'">
                      <slot name="system-content" v-bind="{ message }">
                        <span class="layui-chat-content-message" :style="{
                          color: message.textColor,
                          backgroundColor: message.backgroundColor,
                        }">
                          {{ message.content }}
                        </span>
                      </slot>
                    </template>
                  </template>
                  <template v-if="message.type === 'image'">
                    <slot name="image-content" v-bind="{ message }">
                      <img :src="message.content as string" class="layui-chat-content-image">
                    </slot>
                  </template>
                  <template v-if="message.type === 'video'">
                    <slot name="video-content" v-bind="{ message }">
                      <video :src="message.content as string" controls class="layui-chat-content-video" />
                    </slot>
                  </template>
                  <template v-if="message.type === 'audio'">
                    <slot name="audio-content" v-bind="{ message }">
                      <audio :src="message.content as string" controls class="layui-chat-content-audio" />
                    </slot>
                  </template>
                  <template v-if="message.type === 'custom'">
                    <slot name="custom-content" v-bind="{ message }">
                      <span class="layui-chat-content-message">暂不支持该消息</span>
                    </slot>
                  </template>
                  <LayIcon v-if="message.direction !== 'system' && message.icon" :type="message.icon" />
                </div>
              </div>
            </LayScroll>
          </template>
        </LayCol>
      </div>
      <div class="layui-chat-input">
        <LayCol :md="24">
          <LayInput v-model="chatInput" placeholder="Input..." class="layui-chat-input-box"
            @keydown="(ev: KeyboardEvent) => ev.keyCode === 13 && handleSendClick()">
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
