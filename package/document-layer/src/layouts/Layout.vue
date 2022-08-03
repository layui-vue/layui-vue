<template>
  <lay-scroll height="100%">
    <div class="markdown-body light-scheme">
      <div class="alone-header">
        <img class="alone-logo" src="../assets/logo.png" />
        <a class="version">{{ version }}</a>
        <a
          href="https://gitee.com/layui/layui-vue"
          style="position: absolute; right: 10%; line-height: 75px"
        >
          <svg width="1.7em" height="1.7em" viewBox="0 0 24 24">
            <path
              fill="#fff"
              d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"
            ></path>
          </svg>
        </a>
      </div>
      <div class="alone-banner layui-bg-black">
        <div class="layui-main">
          <img src="../assets/logo.jpg" />
          <h1>layer vue</h1>
          <p>首 选 的 函 数 式 弹 出 层 解 决 方 案 ⭐</p>
        </div>
      </div>
      <div class="layui-container" style="width: 80%; margin-left: 10%">
        <lay-tab type="brief" v-model="active">
          <lay-tab-item title="入门" id="/zh-CN/index"></lay-tab-item>
          <lay-tab-item title="示例" id="/zh-CN/demo"></lay-tab-item>
          <lay-tab-item title="帮助" id="/zh-CN/help"></lay-tab-item>
          <lay-tab-item title="问题" id="/zh-CN/question"></lay-tab-item>
        </lay-tab>
        <router-view></router-view>
      </div>
      <div class="footer footer-index">
        <p>Released under the <a href="/index.html">MIT License</a>.</p>
        <p>Copyright © 2021-2022 layui-vue.com</p>
      </div>
    </div>
  </lay-scroll>
</template>

<script setup>
import config from "../../../layer/package.json";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const version = config.version;
const active = ref(route.path);

watch(active, (val) => {
  router.push(val);
});
</script>

<style>
body {
  margin: 0px;
}

.alone-header {
  width: 100%;
  height: 60px;
  background: #393d49;
  border-bottom: 1px solid #404553;
  overflow: hidden;
}

.alone-header .alone-logo {
  display: inline-block;
  width: 82px;
  height: 31px;
  background: transparent;
  margin-top: 16px;
  margin-left: 10%;
}

.alone-banner {
  height: 250px;
  text-align: center;
  font-weight: 300;
  color: #fff;
  background: #393d49;
}

.version {
  position: absolute;
  color: rgba(255, 255, 255, 0.8) !important;
  line-height: 60px;
  font-size: 15px;
  right: 16%;
}

.alone-banner img {
  width: 100px;
}

.alone-banner h1 {
  margin: 0px !important;
  padding: 0px !important;
  padding-top: 10px !important;
  line-height: 32px !important;
  font-size: 30px !important;
  font-weight: 300 !important;
  color: white !important;
  border-bottom: none !important;
  letter-spacing: 3px;
}

.alone-banner p {
  padding-top: 40px;
  color: #e2e2e2;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.alone-download {
  width: 77.5%;
  border-radius: 4px;
  background: whitesmoke;
  margin-left: 10%;
  margin-top: 30px;
  padding: 20px;
}

.layui-field-title {
  margin: 10px 0 20px;
  border-width: 1px 0 0;
}

.layui-container {
  padding-bottom: 50px !important;
}

.layui-elem-field {
  padding: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  border-top: 1px solid #eee;
  border-style: solid;
}

.layui-tab-content {
  padding: 0 !important;
}

.footer {
  width: 100%;
  padding: 30px 0px;
  line-height: 30px;
  text-align: center;
  border-top: 1px solid #eee;
  color: rgba(60, 60, 60, 0.7);
  font-weight: 300;
  font-size: 13.6px;
  background: #f9f9f9;
}
</style>
