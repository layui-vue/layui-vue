<script lang="ts">
export default {
    name: "lay-config-provider"
}
</script>

<script setup lang="ts">

// 切换主题 (通过 less 特性提供的 api 更改变量)

// 切换语言 (通过 i18n 框架切换内置的语言包)

</script>

<template>
    <div class="lay-config-provider">
        <slot></slot>    
    </div>    
</template>