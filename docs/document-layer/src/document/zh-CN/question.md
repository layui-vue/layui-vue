<fieldset class="layui-elem-field layui-field-title">
    <legend>问题</legend>
</fieldset>

直接调用 layer 的方法，组件会通过 Vue.render 动态创建新的 Vue 实体。其 context 与当前代码所在 context 并不相同，因而无法获取 context 信息。

当你需要 context 信息（例如使用全局注册的组件）时，可以通过 appContext 属性传递当前组件 context。

```
import { getCurrentInstance, ref } from 'vue';
import { layer } from "@layui/layer-vue";

const appContext = getCurrentInstance().appContext;

const title = ref("标题")

layer.open({
    title: () => title.value,
    content: h("children"),
    appContext: appContext
})
```