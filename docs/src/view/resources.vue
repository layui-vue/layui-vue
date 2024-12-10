<template>
  <div style="margin-top: 60px; width: 80%" class="layui-container">
    <blockquote
      class="layui-quote layui-text"
      style="margin: 30px 0; letter-spacing: 1px"
    >
      以创造性的行为实践于人世。若能以写作为工具，为道途，先帮助自己一程，再以领悟帮助他人一程。这是一种服务
      - 庆山
    </blockquote>
    <fieldset class="layui-field layui-field-title">
      <legend style="margin-bottom: 20px; text-align: center">独立组件</legend>
      <div class="layui-field-box">
        <ul class="layui-row layui-col-space20">
          <li class="layui-col-sm12">
            <div class="alone">
              <router-link to="/zh-CN/components/layer">
                layer - vue
                <cite>通用型弹出层组件</cite>
                <img src="https://img.shields.io/badge/npm-v2.4.6-blue" alt="Version"/>
                <img src="https://img.shields.io/badge/license-MIT-green" />
              </router-link>
            </div>
          </li>
          <li class="layui-col-sm12">
            <div class="alone">
              <router-link to="/zh-CN/components/icon"
                >icons - vue<cite>图标组件化解决方案</cite>
                <img
                  src="https://img.shields.io/npm/v/@layui/icons-vue.svg?sanitize=true"
                  alt="Version" />
                <img
                  src="https://img.shields.io/npm/l/@layui/icons-vue.svg?sanitize=true"
              /></router-link>
            </div>
          </li>
        </ul>
      </div>
    </fieldset>
    <fieldset class="layui-field layui-field-title">
      <legend style="margin-bottom: 20px; text-align: center">研发产品</legend>
      <div class="layui-field-box">
        <ul class="layui-row layui-col-space6">
          <li class="layui-col-sm24">
            <div class="alone">
              <a
                href="https://gitee.com/layui-vue/layui-vue-admin"
                target="_blank"
                >layui - vue - admin<cite
                  >开箱即用的 vue 3.0 后台管理模板
                </cite>
                <img
                  src="https://img.shields.io/badge/version-v2.1.0-blue"
                  alt="Version"
                />
                <img src="https://img.shields.io/badge/license-MIT-green" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </fieldset>
    <fieldset class="layui-field layui-field-title">
      <legend style="margin-bottom: 20px; text-align: center">高阶组件</legend>
      <div class="layui-field-box">
        <ul class="layui-row layui-col-space6">
          <li class="layui-col-sm24">
            <div class="alone">
              <router-link to="/zh-CN/components/jsonSchemaForm"
                >json - schema - form<cite>配 置 化 高 级 表 单 组 件</cite>
                <img
                  src="https://img.shields.io/npm/v/@layui/json-schema-form.svg?sanitize=true"
                  alt="Version" />
                <img
                  src="https://img.shields.io/npm/l/@layui/json-schema-form.svg?sanitize=true"
              /></router-link>
            </div>
          </li>
        </ul>
      </div>
    </fieldset>
  </div>
  <div class="footer footer-index">
    <p>Released under the <a href="/index.html">MIT License</a>.</p>
    <p>Copyright © 2021-2023 www.layui-vue.com</p>
    <p>
      鸣谢：
      <a
        href="https://www.oschina.net"
        style="color: #16b777; font-weight: 800; margin: 0px 5px"
        >Oschina</a
      >
      <a
        href="https://gitee.com"
        style="color: #c71d23; font-weight: 800; margin: 0px 5px"
        >Gitee</a
      >
      <a
        href="https://www.iconfont.cn/"
        style="color: #9b16ff; font-weight: 800; margin: 0px 5px"
        >iconfont</a
      >
    </p>
  </div>
</template>

<style>
@import "@layui/layui-vue/es/container/index.css";
@import "@layui/layui-vue/es/quote/index.css";
@import "@layui/layui-vue/es/field/index.css";

.alone {
  border-radius: var(--global-border-radius);
  text-align: center;
  background-color: var(--global-primary-color);
  color: #fff;
  font-weight: 300;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}

.alone:hover a {
  color: white !important;
  border-radius: var(--global-border-radius) !important;
  background-color: var(--global-checked-color);
}

.alone > a {
  display: block;
  padding: 50px 20px;
  color: #fff;
  font-size: 30px;
}

.alone > a cite {
  display: block;
  padding-top: 10px;
  font-size: 14px;
  letter-spacing: 2px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.alone > a img {
  margin: 0px 5px;
}
</style>
