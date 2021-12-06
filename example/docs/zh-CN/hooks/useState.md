::: title 基础使用
:::

::: block 使 用 useState 创 建 Ref 响 应 变 量
:::

```vue
<script>
import { useState } from '@layui/hooks-vue'

export default {
  setup() {
    const { state, setState } = useState(0)
    return {
        state,
        setState
    }
  },
}
</script>
```