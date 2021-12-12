<template>
    <transition v-show="visible">
        <div :class="['layui-popper', {'layui-dark' : isDark}]" :style="style" :position="innnerPosition">
            <slot>{{content}}</slot>
            <div class="layui-popper-arrow"></div>
        </div>
    </transition>
</template>
<script lang="ts">
    const NAME = "LayPopper";
    export default {
        name: NAME
    }
</script>

<script setup lang="ts">
    import "./index.less";
    import postionFns from "./calcPosition";
    import { getCurrentInstance, CSSProperties, ref, watch, onUpdated, defineEmits, onMounted} from "vue";
    import {on} from "../../tools/domUtil";
    const props = withDefaults(
        defineProps<{
            el : any,
            content ?: string,
            position ?: string,
            trigger ?: string,
            enterable ?: boolean,
            isDark ?: boolean,
            modelValue ?: boolean
        }>(),
        {
            position : 'top',
            enterable : true,
            isDark : false,
            trigger : 'hover',
            modelValue : true
        }
    );

    const EVENT_MAP : any = {
        'hover' : ['mouseenter', null, 'mouseleave', false],
        'click' : ['click', document, 'click', true]
    }

    const triggerArr = EVENT_MAP[props.trigger];
    if (!triggerArr) {
        console.error(`${NAME} render error!cause: 'Trigger' must be 'hover/click' `)
    }

    const style = ref<CSSProperties>({top: (-window.innerHeight) + 'px',left:0});
    const visible = ref(props.modelValue);
    const checkTarget = ref(false);
    const popper = ref();
    const innnerPosition = ref(props.position);

    const emit = defineEmits(['update:modelValue'])
    watch(visible, (val)=>{
        emit('update:modelValue', val);
    })

    const doShow = function(){
        visible.value = true;
    }

    const doHidden = function(e : MouseEvent){
        if ((checkTarget.value && props.el.contains(e.target)) || (props.enterable && popper.value.contains(e.target))) return;
        style.value = {top: (-window.innerHeight) + 'px',left:0};
        visible.value = false;
        innnerPosition.value = props.position;
    }

    // 事件绑定
    on(props.el, triggerArr[0], doShow);
    on(triggerArr[1]??props.el, triggerArr[2], doHidden);
    checkTarget.value = triggerArr[3];

    // 计算位置显示
    const showPosistion = function(){
        postionFns[props.position] && (style.value = postionFns[props.position](props.el, popper.value, innnerPosition));
    }

    // 节点变化, 获取当前实例对应的dom, 如果为显示状态，则计算位置显示
    const nodeChange = function(){
        popper.value = getCurrentInstance()?.vnode.el;
        visible.value && (popper.value.offsetWidth === 0 ? setTimeout(showPosistion, 0) : showPosistion());
    }
    onMounted(nodeChange)
    onUpdated(nodeChange)
</script>