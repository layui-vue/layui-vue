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
          <router-link class="layui-inline site-down" to="/zh-CN/guide">
            Switch Dark
          </router-link>
        </div>
        <div class="site-version">
          <span
            >{{ t("home.version") }}：<cite class="site-showv"
              >1.0.0</cite
            ></span
          >
          <span
            >{{ t("home.download") }}：<em class="site-showdowns"
              >5463</em
            ></span
          >
        </div>
      </div>
      <div class="site-banner-other">
        <a
          href="https://gitee.com/layui-vue"
          target="_blank"
          rel="nofollow"
          class="site-star"
        >
          <i class="layui-icon"></i> Star <cite id="getStars">716</cite>
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
    <div style="margin-left: 10%; margin-right: 10%; margin-top: 40px">
      <div>
        <ul class="layui-row layui-col-space30 site-idea">
          <li class="layui-col-md8">
            <div>
              <fieldset class="layui-elem-field layui-field-title">
                <legend>返璞归真</legend>
                <p>
                  身处在前端社区的繁荣之下，我们都在有意或无意地追逐。而 layui
                  偏偏回望当初，奔赴在返璞归真的漫漫征途，自信并勇敢着，追寻于原生态的书写指令，试图以最简单的方式诠释高效。
                </p>
              </fieldset>
            </div>
          </li>
          <li class="layui-col-md8">
            <div>
              <fieldset class="layui-elem-field layui-field-title">
                <legend>双面体验</legend>
                <p>
                  拥有双面的不仅是人生，还有
                  layui。一面极简，一面丰盈。极简是视觉所见的外在，是开发所念的简易。丰盈是倾情雕琢的内在，是信手拈来的承诺。一切本应如此，简而全，双重体验。
                </p>
              </fieldset>
            </div>
          </li>
          <li class="layui-col-md8">
            <div>
              <fieldset class="layui-elem-field layui-field-title">
                <legend>星辰大海</legend>
                <p>
                  如果眼下还是一团零星之火，那运筹帷幄之后，迎面东风，就是一场烈焰燎原吧，那必定会是一番尽情的燃烧。待，秋风萧瑟时，散作满天星辰，你看那四季轮回<!--海天相接-->，正是
                  layui 不灭的执念。
                </p>
              </fieldset>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer footer-index">
      <p>Released under the <a href="/index.html">MIT License</a>.</p>
      <p>Copyright © 2021-2022 layui-vue.com</p>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
export default {
  name: "index",
  setup() {
    const { t } = useI18n();

    return {
      t,
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
  height: 100%;
  overflow: hidden;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #eee;
  background-image: url(../assets/background.svg);
  background-repeat: no-repeat;
  background-size: 100%;
}
.site-banner-bg {
  background-position: center 0;
}

.site-banner-bg,
.site-banner-main {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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
  border-radius: 6px;
  background: #f1f1f1;
  border: 1px solid #f1f1f1;
  font-size: 16px;
  color: #476582;
  font-weight: 500;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
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
.site-download a+a {
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
  position: absolute;
  left: 0;
  bottom: 90px;
  width: 100%;
  text-align: center;
  font-size: 0;
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
  font-size: 14px;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}
.footer {
  width: 100%;
  padding: 30px 15px;
  line-height: 30px;
  text-align: center;
  color: rgba(60, 60, 60, 0.7);
  font-weight: 300;
  font-size: 13.6px;
  background: #f9f9f9;
}
</style>
