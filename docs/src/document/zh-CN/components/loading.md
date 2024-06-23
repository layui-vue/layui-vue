::: anchor
:::

::: title 基本介绍
:::

::: describe 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。
:::

::: title 基础使用
:::

::: demo 通过 `lay-loading` 创建局部加载。

<template>
    <lay-loading></lay-loading>
    <hr />
    <lay-loading :type="1"></lay-loading>
    <hr />
    <lay-loading :type="2"></lay-loading>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 控制状态
:::

::: demo 通过 `loading` 属性，控制加载状态。

<template>
    <lay-switch v-model="loading1"></lay-switch>
    <lay-loading :type="2" :loading="loading1"></lay-loading>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const loading1 = ref(true)

    return {
        loading1
    }
  }
}
</script>

:::

::: title 延迟时间
:::

::: demo 通过 `delay` 属性, 设置延迟时间。

<template>
    <lay-switch v-model="loading2"></lay-switch>
    <lay-loading :type="2" :loading="loading2" :delay="500"></lay-loading>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const loading2 = ref(true)

    return {
        loading2
    }
  }
}
</script>

:::

::: title 提示信息
:::

::: demo 通过 `tip` 属性，设置提示内容。

<template>
    <lay-switch v-model="loading3"></lay-switch>
    <lay-loading :type="2" :loading="loading3" tip="loading..."></lay-loading>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const loading3 = ref(true)

    return {
        loading3
    }
  }
}
</script>

:::

::: title 应用场景
:::

::: demo 通过 `lay-loading` 与 `lay-table` 搭配使用。

<template>
    <lay-switch v-model="loading4"></lay-switch>
    <br/>
    <br/>
    <lay-loading :type="2" :loading="loading4">
        <lay-table 
            :page="page" 
            :resize="true"
            :height="'300px'"
            :columns="columns" 
            :default-toolbar="true"
            :data-source="dataSource" 
            v-model:selected-keys="selectedKeys"  
            @change="change"
            @sortChange="sortChange">
            <template #status="{ row }">
                <lay-switch :model-value="row.status" @change="changeStatus($event , row)"></lay-switch>
            </template>
            <template v-slot:toolbar>
                <lay-button size="sm" type="primary">新增</lay-button>
                <lay-button size="sm" @click="remove">删除</lay-button>
            </template>
            <template v-slot:operator="{ row }">
                <lay-button size="xs" type="primary">编辑</lay-button>
                <lay-button size="xs">查看</lay-button>
            </template>
        </lay-table>
    </lay-loading>
</template>

<script>
import { ref, watch, reactive } from 'vue';
import { layer } from '@layui/layui-vue';

export default {
  setup() {

    const loading4 = ref(false);

    const selectedKeys = ref([]);

    const page = reactive({ current: 1, limit: 10, total: 100 });

    const columns = ref([
      { title:"选项", width: "55px", type: "checkbox", fixed: "left" },
      { title:"编号", width: "80px", key:"id", fixed: "left", sort: "desc" },
      { title:"姓名", width: "80px", key:"name", sort: "desc" },
      { title:"状态", width: "80px", key:"status", customSlot: "status"},
      { title:"邮箱", width: "120px", key:"email" },
      { title:"性别", width: "80px", key:"sex" },
      { title:"年龄", width: "80px", key:"age" },
      { title:"城市", width: "120px", key:"city" },
      { title:"签名", width: "260px", key:"remark" },
      { title:"隐藏", width: "260px", key:"hide", hide: true },
      { title:"时间", width: "120px", key:"joinTime" },
      { title:"操作", width: "150px", customSlot:"operator", key:"operator", fixed: "right" }
    ]);

    const change = (page) => {
      loading.value = true;
      setTimeout(() => {
        dataSource.value = loadDataSource(page.current, page.limit);
        loading.value = false;
      }, 1000);
    }

    const sortChange = (key, sort) => {
      layer.msg(`字段${key} - 排序${sort}, 你可以利用 sort-change 实现服务端排序`)
    }

    const dataSource = ref([
      {id:"1", name:"张三1", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"18",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"2", name:"张三2", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"3", name:"张三3", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"4", name:"张三4", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"5", name:"张三5", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"6", name:"张三6", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"7", name:"张三7", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"18",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"8", name:"张三8", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"9", name:"张三9", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"10", name:"张三10", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true}
    ])

    const changeStatus = (isChecked, row) => {
      dataSource.value.forEach((item) => {
        if(item.id === row.id) {
          layer.msg("Success", { icon: 1 }, () => {
            item.status = isChecked;
          })
        }
      })
    }

    const remove = () => {
      layer.msg(selectedKeys.value, { area: '50%'})
    }

    const loadDataSource = (page, pageSize) => {
      var response = [];
      var startIndex = ((page - 1) * pageSize) + 1;
      var endIndex = page * pageSize;
      for (var i = startIndex; i <= endIndex; i++) {
          response.push({
            id:`${i}`, 
            age:"18",
            sex: "男", 
            name:`张三${i}`, 
            email: "test@qq.com",
            remark: '花开堪折直须折,莫待无花空折枝.',  
            joinTime: "2022-02-09", 
            city: "浙江杭州", 
            status: true
          })
      }
      return response;
    }

    return {
      columns,
      dataSource,
      selectedKeys,
      page,
      change,
      changeStatus,
      remove,
      loading4
    }
  }
}
</script>

:::

::: title Loading 属性
:::

::: table

| 名称                | 描述             | 类型               | 默认值   | 可选值         |
| ------------------- | ----------------| ------------------ | ------- | -------------- |
| loading             | 加载状态         | `boolean`          | `true`  | `true` `false` |
| delay               | 延迟时间（毫秒   |  `number`           |  `0`    |              |
| type                | 动画类型         | `number`           | `0`      | `0` `1` `2`  |
| tip                 | 提示信息         | `string`           |  --      | --            |

:::

::: title Loading 插槽
:::

::: table

| 插槽 | 说明          |
| ------ | ---------- |
| default| 默认插槽    |

::: 

::: previousNext loading
:::