<template>
    <div id="sliderVerify" class="slider-item">
        <div class="slider-bg layui-bg-green"></div>
        <div class="slider-text">{{ prototype.isOk == false ? prototype.text : prototype.success}}</div>
        <div :class="prototype.isOk == false ? 'slider-btn layui-icon layui-icon-next' : 'slider-btn layui-icon layui-icon-ok-circle slider-btn-success'"
            @mousedown.stop="down"></div>

    </div>
</template>
<script setup lang='ts'>
import { reactive, ref, defineProps } from 'vue'
import { on, off } from "evtd";
import { throttle, handle_select } from "./utils/index";
interface  Prop {
    disabled?: boolean;
    bg?: string,
    text?: string,
    end?: string,
    success?: Function
}

const props = withDefaults(defineProps<Prop>(), {
  disabled: false,
});

//默认配置
const prototype = reactive({
    isOk: false,
    bg: props.bg, //默认滑块颜色
    text: props.text ? props.text : '请拖动滑块验证',
    success: props.end ? props.end : '验证通过',
    ok: props.success
});


//是否为移动端
/*  prototype.isMobile = function () {
   return (
     device.os == "ios" ||
     device.os == "android" ||
     device.android ||
     device.ios ||
     (device.weixin && typeof device.weixin === Boolean)
   );
 }; */

const moveAction = throttle(move);
let distance
let downX

//按下
const down = function (e) {
    e = e || window.event
    console.log(e.path)
    distance = e.path[1].offsetWidth - e.path[0].offsetWidth
    //按下的坐标
    downX = e.clientX;
    on("selectstart", window, handle_select, { once: true });
    on("mouseup", window, stop);
    on("mousemove", window, moveAction);
};



//移动
function move(e) {
    e = e || window.event
    let moveX = e.clientX;
    //鼠标水平位置的偏移量（鼠标移动时的位置 - 鼠标按下时的位置）
    let offsetX = moveX - downX;
    if (offsetX > 0) {
        e.path[0].style.left = offsetX + "px";
        e.path[1].childNodes[0].style.width = offsetX + "px";
        //鼠标的水平移动距离 >= 滑动成功的宽度
        if (offsetX >= distance) {
            prototype.isOk = true
            //成功后，清除掉鼠标按下事件和移动事件（因为移动时并不会涉及到鼠标松开事件）
            off("mousedown", window, down);
            off("mousemove", window, moveAction);
            //最后调用回调
            if (prototype.ok) prototype.ok()
        }
    }

};

//放开
const stop = function (e) {
    //鼠标松开，如果滑到了终点，则验证通过
    if (prototype.isOk === true) {
        return;
    } else {
        e.path[0].style.left = 0;
        e.path[1].childNodes[0].style.width = 0;
    }

    //鼠标松开了，不需要拖动就清除鼠标移动和松开事件。
    off("selectstart", document, handle_select);
    off("mouseup", window, stop);
    off("mousemove", window, moveAction);
};
</script>

<style scoped >
.slider-item {
    height: 38px;
    line-height: 38px;
    background-color: #d0d0d0;
    position: relative;
    border: 1px solid white;
}

.slider-bg {
    position: absolute;
    width: 40px;
    height: 100%;
    z-index: 100
}

.slider-btn {
    width: 40px;
    height: 96%;
    position: absolute;
    border: 1px solid #ccc;
    cursor: move;
    text-align: center;
    background-color: #fff;
    user-select: none;
    color: #666;
    z-index: 120;

}

.slider-btn:hover {

    cursor: pointer
}

.slider-btn-success {
    font-size: 22px
}

.slider-text {
    position: absolute;
    text-align: center;
    width: 100%;
    height: 100%;
    user-select: none;
    font-size: 14px;
    color: #fff;
    z-index: 120
}

.slider-error {
    animation: glow 800ms ease-out infinite alternate;
}

@keyframes glow {
    0% {
        border-color: #e6e6e6
    }

    100% {
        border-color: #ff5722
    }
}
</style>
