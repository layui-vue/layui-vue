<template>
  <div
    class="layui-carousel"
    id="test1"
    lay-anim=""
    lay-indicator="inside"
    lay-arrow="always"
    style="width: 100%; height: 280px"
  >
    <div carousel-item="">
      <div> </div>
      <div> </div>
      <div> </div>
      <div> </div>
      <div class="layui-this"></div>
    </div>
    <div class="layui-carousel-ind">
      <ul>
        <li class=""></li>
        <li class=""></li>
        <li class=""></li>
        <li class=""></li>
        <li class="layui-this"></li>
      </ul>
    </div>
    <button class="layui-icon layui-carousel-arrow" lay-type="sub"></button
    ><button class="layui-icon layui-carousel-arrow" lay-type="add"></button>
  </div>
</template>
<script setup name="LayCarousel" lang="ts">
</script>