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
        <ul class="layui-row layui-col-space6">
          <li class="layui-col-sm12">
            <div class="alone">
              <a href="http://layer.layui-vue.com/zh-CN/demo" target="_blank"
                >layer - vue<cite>通用型弹出层组件</cite></a
              >
            </div>
          </li>
          <li class="layui-col-sm12">
            <div class="alone">
              <router-link to="/zh-CN/components/icon"
                >icons - vue<cite>图标组件化解决方案</cite></router-link
              >
            </div>
          </li>
        </ul>
      </div>
    </fieldset>
    <fieldset class="layui-field layui-field-title">
      <legend style="margin-bottom: 20px; text-align: center">后台模板</legend>
      <div class="layui-field-box">
        <ul class="layui-row layui-col-space6">
          <li class="layui-col-sm24">
            <div class="alone">
              <a
                href="https://gitee.com/layui-vue/layui-vue-admin"
                target="_blank"
                >layui - vue - admin<cite
                  >开箱即用的 vue 3.0 后台管理模板
                </cite></a
              >
            </div>
          </li>
        </ul>
      </div>
    </fieldset>
  </div>
  <div class="footer footer-index">
    <p>Released under the <a href="/index.html">MIT License</a>.</p>
    <p>Copyright © 2021-2023 layui-vue.com</p>
  </div>
</template>

<style>
@import "@layui/layui-vue/es/container/index.css";
@import "@layui/layui-vue/es/quote/index.css";
@import "@layui/layui-vue/es/field/index.css";

.alone {
  text-align: center;
  background-color: #009688;
  color: #fff;
  font-weight: 300;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}
.alone:hover a {
  color: white !important;
  background-color: #5fb878;
}
.alone a {
  display: block;
  padding: 50px 20px;
  color: #fff;
  font-size: 30px;
}
.alone a cite {
  display: block;
  padding-top: 10px;
  font-size: 14px;
  letter-spacing: 2px;
}
</style>
