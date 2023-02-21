<template>
  <div class="site-container">
    <div class="site-banner">
      <div class="site-banner-main">
        <div class="site-zfj site-zfj-anim">
          <img
            src="../assets/logo-png.png"
            style="width: 220px; border-radius: 10px"
          />
        </div>
        <div class="layui-anim site-desc site-desc-anim">
          <p class="web-font-desc">layui - vue</p>
          <cite>{{ t("home.description") }}</cite>
        </div>
        <div class="site-download">
          <router-link class="layui-inline site-down" to="/zh-CN/guide">
            Get Started
          </router-link>
          <a
            class="layui-inline site-down"
            href="javascript:void(0);"
            @click="changeTheme"
          >
            {{ appStore.theme === "dark" ? "Turn Off" : "Turn On" }}
          </a>
        </div>
        <div class="site-version">
          <span
            >{{ t("home.version") }}：<cite class="site-showv">
              {{ version }}
            </cite></span
          >
          <span
            >{{ t("home.download") }}：<em class="site-showdowns"
              >47,494</em
            ></span
          >
        </div>
        <div class="site-banner-other">
          <a
            href="https://gitee.com/layui-vue"
            target="_blank"
            rel="nofollow"
            class="site-star"
          >
            <i class="layui-icon"></i> Star <cite id="getStars">1902</cite>
          </a>
          <a
            href="https://gitee.com/layui-vue"
            target="_blank"
            rel="nofollow"
            class="site-fork"
          >
            Gitee
          </a>
          <a
            href="https://github.com/layui-vue"
            target="_blank"
            rel="nofollow"
            class="site-fork"
          >
            Github
          </a>
        </div>
      </div>
    </div>
    <div class="box-list">
      <lay-row :space="30">
        <lay-col :md="8" :sm="12" :xs="12">
          <div class="box">
            <div class="icon">🐼</div>
            <h2 class="title">Classic design</h2>
            <p class="details">layui css.</p>
          </div>
        </lay-col>
        <lay-col :md="8" :sm="12" :xs="12">
          <div class="box">
            <div class="icon">🐝</div>
            <h2 class="title">Small volume</h2>
            <p class="details">only 14.9 MB.</p>
          </div>
        </lay-col>
        <lay-col :md="8" :sm="12" :xs="12">
          <div class="box">
            <div class="icon">☀️</div>
            <h2 class="title">Dark theme</h2>
            <p class="details">provide theme variables.</p>
          </div>
        </lay-col>
        <lay-col :md="8" :sm="12" :xs="12">
          <div class="box">
            <div class="icon">🚀</div>
            <h2 class="title">Piu allegro</h2>
            <p class="details">provide vscode plugin.</p>
          </div>
        </lay-col>
        <lay-col :md="8" :sm="12" :xs="12">
          <div class="box">
            <div class="icon">☁️</div>
            <h2 class="title">Complete ecology</h2>
            <p class="details">admin and form design.</p>
          </div>
        </lay-col>
        <lay-col :md="8" :sm="12" :xs="12">
          <div class="box">
            <div class="icon">⚡</div>
            <h2 class="title">Setup script</h2>
            <p class="details">use grammar sugar.</p>
          </div>
        </lay-col>
      </lay-row>
    </div>
    <div class="link-list">
      <lay-row :space="30">
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="layui" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://layui.gitee.io/v2"
              target="_blank"
            >
              <lay-avatar
                src="https://unpkg.com/outeres@0.0.6/img/layui/icon-1.png"
                style="border-radius: 2px"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="furion" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://dotnetchina.gitee.io/furion"
              target="_blank"
            >
              <lay-avatar
                src="https://dotnetchina.gitee.io//furion/img/furionlogo.png"
                style="background: transparent"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="mybatis plus" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://baomidou.com"
              target="_blank"
            >
              <lay-avatar
                src="https://baomidou.com/img/logo.svg"
                style="background: transparent"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="aizuda" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="http://doc.aizuda.com"
              target="_blank"
            >
              <lay-avatar
                src="http://doc.aizuda.com//img/azd.png"
                style="background: transparent"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="LiteFlow" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://liteflow.yomahub.com"
              target="_blank"
            >
              <lay-avatar
                src="https://liteflow.yomahub.com//img/logo.svg"
                style="background: transparent"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="CCFlow" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="http://ccflow.org/"
              target="_blank"
            >
              <lay-avatar
                src="https://portrait.gitee.com/uploads/avatars/namespace/289/868254_opencc_1578989593.png"
                style="background: transparent"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="Sa-Token" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://sa-token.cc"
              target="_blank"
            >
              <lay-avatar
                src="https://sa-token.dev33.cn/logo.png"
                style="background: transparent"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="Jpom" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://jpom.top"
              target="_blank"
            >
              <lay-avatar
                src="https://jpom.top/images/jpom_logo.png"
                style="background: transparent; width: 60px"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
      </lay-row>
    </div>
    <div class="footer footer-index">
      <p>Released under the <a href="/index.html">MIT License</a>.</p>
      <p>Copyright © 2021-2022 layui-vue.com</p>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "../store/app";

export default {
  name: "index",
  setup() {
    const { t } = useI18n();
    const appStore = useAppStore();

    const changeTheme = () => {
      if (appStore.theme === "dark") {
        appStore.theme = "light";
      } else {
        appStore.theme = "dark";
      }
    };

    const version = inject("version");

    return {
      t,
      version,
      appStore,
      changeTheme,
    };
  },
};
</script>
<style>
#app,
html,
body {
  height: 100%;
}

.site-container {
  background: #fff;
  margin-top: 60px;
  height: 100%;
  width: 100%;
}

.site-banner {
  overflow: hidden;
  text-align: center;
  position: relative;
  height: calc(100% - 60px);
  background-image: url(../assets/background.svg);
  background-repeat: no-repeat;
  background-size: 100%;
}

.site-banner-main {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
  justify-content: center;
  position: relative;
  text-align: center;
}

.site-download {
  margin-top: 72px;
  font-size: 0;
}

.site-download a {
  position: relative;
  padding: 0 20px 0 20px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  background: #f1f1f1;
  border: 1px solid #f1f1f1;
  font-size: 16px;
  color: #476582;
  font-weight: 500;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  letter-spacing: 0.2px;
}

.site-download a:hover {
  border-radius: 10px;
}

.site-download a:first-child {
  background: #009688;
  color: white;
}

.site-download a + a {
  margin-left: 20px;
}

.site-zfj {
  padding-top: 25px;
  height: 220px;
}

.site-zfj-anim i {
  -webkit-animation-name: site-zfj;
  animation-name: site-zfj;
  -webkit-animation-duration: 5s;
  animation-duration: 5s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

.site-zfj i {
  position: absolute;
  left: 50%;
  top: 50px;
  width: 200px;
  height: 200px;
  margin-left: -100px;
  font-size: 180px;
  color: #c2c2c2;
}

.site-desc-anim {
  -webkit-animation-name: site-desc;
  animation-name: site-desc;
}

.site-desc {
  position: relative;
  height: 70px;
  margin-top: 20px;
}

.site-desc .web-font-desc {
  color: #fff;
  color: #213547;
  font-size: 52px;
  opacity: 0.82;
}

.web-font-desc {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0 auto;
}

.site-desc cite {
  position: absolute;
  bottom: -40px;
  left: 0;
  width: 100%;
  color: rgba(60, 60, 60, 0.7);
  font-style: normal;
}

.site-version {
  position: relative;
  margin-top: 18px;
  color: rgba(60, 60, 60, 0.7);
  font-size: 12px;
}

.site-version span {
  padding: 0 3px;
}

.site-version * {
  font-style: normal;
}

.site-version a {
  color: rgba(60, 60, 60, 0.7);
  text-decoration: none;
  margin-top: -4px;
}

.site-banner-other {
  position: relative;
  left: 0;
  top: 40px;
  bottom: 90px;
  width: 100%;
  text-align: center;
  font-size: 0;
}

.box-list {
  padding: 50px 250px;
}

.link-list {
  padding: 50px 250px;
  border-top: 1px solid #eeeeee;
}

.link-list .layui-col {
  text-align: center;
}

.box {
  background-color: #f9f9f9;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  padding: 24px;
  height: 100%;
}

.box .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: #e5e5e5;
  width: 48px;
  height: 48px;
  font-size: 24px;
}

.box .title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.box .details {
  font-size: 14px;
  padding-top: 8px;
  font-weight: 500;
  line-height: 24px;
  color: rgba(56 56 56 / 70%);
}

.site-container .layui-field-title {
  border-top: 1px solid #d2d2d2;
}

.site-banner-other a {
  display: inline-block;
  vertical-align: middle;
  height: 28px;
  line-height: 28px;
  margin: 0 6px;
  padding: 0 8px;
  border-radius: 4px;
  color: rgba(60, 60, 60, 0.7);
  border: 1px solid rgba(60, 60, 60, 0.7);
  background: white;
  font-size: 14px;
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
