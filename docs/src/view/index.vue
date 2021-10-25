<template>
  <div
    style="
      margin-top: 60px;
      background-color: whitesmoke;
      height: 100%;
      width: 100%;
    "
  >
    <div class="site-banner">
      <div class="site-banner-main">
        <div class="site-zfj site-zfj-anim">
          <i
            class="layui-icon"
            style="color: #fff; color: rgba(255, 255, 255, 0.6)"
            ></i
          >
        </div>
        <div class="layui-anim site-desc site-desc-anim">
          <p class="web-font-desc">layui - vue</p>
          <cite>layui vue, A component library for Vue 3 base on layui</cite>
        </div>
        <div class="site-download">
          <router-link
            class="layui-inline site-down"
            to="/zh-CN/guide/getStarted"
            >Get Started</router-link
          >
        </div>
        <div class="site-version">
          <span>当前版本：v<cite class="site-showv">0.2.1</cite></span>
          <span
            ><router-link
              class="layui-inline site-down"
              to="/zh-CN/guide/changelog"
              >更新日志</router-link
            ></span
          >
          <span>下载量：<em class="site-showdowns">1824</em></span>
        </div>
      </div>
      <div class="site-banner-other">
        <a
          href="https://gitee.com/layui-vue"
          target="_blank"
          rel="nofollow"
          class="site-star"
        >
          <i class="layui-icon"></i> Star <cite id="getStars">257</cite>
        </a>
        <a
          href="https://gitee.com/layui-vue"
          target="_blank"
          rel="nofollow"
          class="site-fork"
        >
          Gitee
        </a>
      </div>
    </div>
    <div style="margin-left: 10%; margin-right: 10%">
      <div>
        <ul class="layui-row layui-col-space30 site-idea">
          <li class="layui-col-md4">
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
          <li class="layui-col-md4">
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
          <li class="layui-col-md4">
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
      <p>
        Copyright © 2021 <a href="/index.html">layui-vue.pearadmin.com</a> MIT
        Licensed
      </p>
      <p></p>
    </div>
  </div>
</template>
<style>
.site-banner {
  position: relative;
  height: 600px;
  text-align: center;
  overflow: hidden;
  background-color: #393d49;
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
  padding: 0 50px 0 50px;
  height: 60px;
  line-height: 60px;
  border-radius: 4px;
  border: 1px solid #c2c2c2;
  border-color: rgba(255, 255, 255, 0.2);
  font-size: 24px;
  color: #ccc;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}
.site-download a:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 50px;
  color: #ccc;
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
  color: rgba(255, 255, 255, 0.8);
  font-size: 51px;
}
.web-font-desc {
  font-style: normal;
  font-weight: 300;
}
.site-desc cite {
  position: absolute;
  bottom: -40px;
  left: 0;
  width: 100%;
  color: #c2c2c2;
  color: rgba(255, 255, 255, 0.66);
  font-style: normal;
}
.site-version {
  position: relative;
  margin-top: 18px;
  color: #ccc;
  font-size: 12px;
}
.site-version span {
  padding: 0 3px;
}
.site-version * {
  font-style: normal;
}
.site-version a {
  color: #e2e2e2;
  text-decoration: none;
  margin-top: -4px;
}
.site-banner-other {
  position: absolute;
  left: 0;
  bottom: 35px;
  width: 100%;
  text-align: center;
  font-size: 0;
}
.site-banner-other a {
  display: inline-block;
  vertical-align: middle;
  height: 28px;
  line-height: 28px;
  margin: 0 6px;
  padding: 0 8px;
  border-radius: 4px;
  color: #c2c2c2;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid #c2c2c2;
  border-color: rgba(255, 255, 255, 0.2);
  font-size: 14px;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}
.footer {
  width: 100%;
  padding: 30px 15px;
  line-height: 30px;
  text-align: center;
  color: #666;
  font-weight: 300;
}
</style>
