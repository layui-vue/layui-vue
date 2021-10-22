<template>
  <lay-body style="left: 0px;background-color:whitesmoke">
    <div class="site-banner">
      <div
        class="site-banner-bg"
        style1="background-image: url(/static/images/layui/banner/autumn.jpg?v=66); background-size: cover;"
      ></div>
      <div class="site-banner-main">
        <div class="site-download">
          <router-link
            class="layui-inline site-down"
            to="/zh-CN/guide/getStarted"
            >Get Started</router-link
          >
        </div>
      </div>
    </div>
    <div style="margin-left:10%;margin-right:10%;">
      
    </div>
  </lay-body>
</template>
<script>
</script>
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
  margin-top: 80px;
  font-size: 0;
}
.site-download a {
  position: relative;
  padding: 0 60px 0 60px;
  height: 65px;
  line-height: 65px;
  border-radius: 6px;
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
</style>