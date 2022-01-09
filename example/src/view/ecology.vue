<template>
  <div
    style="margin-top: 60px; height: 100%; width: 80%"
    class="layui-container"
  >
    <blockquote class="layui-elem-quote layui-text" style="margin: 30px 0">
      尽管 layui 中包含了这些组件，但因为它们受众群体广泛或应用广泛，特从 layui
      中抽取出来个副本，可独立引用。我们也会对它们进行同步维护。
    </blockquote>
    <fieldset class="layui-elem-field layui-field-title">
      <legend style="margin-bottom: 20px; text-align: center">独立组件</legend>
      <div class="layui-field-box">
        <ul class="layui-row layui-col-space6">
          <li class="layui-col-sm12">
            <div class="alone">
              <a href="https://gitee.com/layui-vue/layer-vue" target="_blank"
                >layer - vue<cite>通用型弹出层组件</cite></a
              >
            </div>
          </li>
          <li class="layui-col-sm12">
            <div class="alone">
              <a href="https://gitee.com/layui-vue/icons-vue" target="_blank"
                >icons - vue<cite>图标组件化解决方案</cite></a
              >
            </div>
          </li>
        </ul>
      </div>
    </fieldset>
    <fieldset class="layui-elem-field layui-field-title">
      <legend style="margin-bottom: 20px; text-align: center">后台模板</legend>
      <div class="layui-field-box">
        <ul class="layui-row layui-col-space6">
          <li class="layui-col-sm24">
            <div class="alone">
              <a href="https://gitee.com/layui-vue/layui-vue-admin" target="_blank"
                >layui - admin<cite>通用型 vue 3.0 后台模板</cite></a
              >
            </div>
          </li>
        </ul>
      </div>
    </fieldset>
  </div>
</template>

<style>
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
  letter-spacing:2px;
}
</style>