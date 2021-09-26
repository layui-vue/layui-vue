##### 基础

::: demo 传入 columns 数据，自动生成表格

<template>
  <ele-table
    :data="data"
    :columns="columns"
  />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const columns = ref([
      {
        label: '日期',
        prop: 'date',
      },
      {
        label: '姓名',
        prop: 'name',
      },
      {
        label: '地址',
        prop: 'address',
      },
    ])
    const data = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    return {
      data,
      columns,
    }
  }
}
</script>

:::

##### 索引

::: demo 通过配置 index 显示索引列，支持 columns 的参数

<template>
  <ele-table
    :data="data"
    :columns="columns"
    :index="{ label: '#' }"
  />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const columns = ref([
      {
        label: '日期',
        prop: 'date',
      },
      {
        label: '姓名',
        prop: 'name',
      },
      {
        label: '地址',
        prop: 'address',
      },
    ])
    const data = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    return {
      data,
      columns,
    }
  }
}
</script>

:::

##### 多选

::: demo 通过配置 selection 显示多选框，支持 columns 的参数

<template>
  <ele-table
    :data="data"
    :columns="columns"
    selection
  />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const columns = ref([
      {
        label: '日期',
        prop: 'date',
      },
      {
        label: '姓名',
        prop: 'name',
      },
      {
        label: '地址',
        prop: 'address',
      },
    ])
    const data = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    return {
      data,
      columns,
    }
  }
}
</script>

:::

##### 展开

::: demo 通过配置 expand 开启展开插槽，通过 #expand 插槽定制显示内容，支持 columns 的参数

<template>
  <ele-table
    :data="data"
    :columns="columns"
    expand
  >
    <template #expand="{ row }">
      {{ row }}
    </template>
  </ele-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const columns = ref([
      {
        label: '日期',
        prop: 'date',
      },
      {
        label: '姓名',
        prop: 'name',
      },
      {
        label: '地址',
        prop: 'address',
      },
    ])
    const data = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    return {
      data,
      columns,
    }
  }
}
</script>

:::

##### 操作

::: demo 通过配置 menu 开启按钮插槽，通过 #menu 插槽定制显示内容，支持 columns 的参数

<template>
  <ele-table
    :data="data"
    :columns="columns"
    :menu="menu"
  >
    <template #menu="{ size }">
      <el-button
        :size="size"
        type="text"
      >
        详情
      </el-button>
    </template>
  </ele-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const menu = ref({
      label: '操作',
      align: 'center',
    })
    const columns = ref([
      {
        label: '日期',
        prop: 'date',
      },
      {
        label: '姓名',
        prop: 'name',
      },
      {
        label: '地址',
        prop: 'address',
      },
    ])
    const data = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    return {
      menu,
      data,
      columns,
    }
  }
}
</script>

:::

##### 插槽

::: demo

<template>
  <ele-table
    :data="data"
    :columns="columns3"
  >
    <template #name-header="{ column }">
      <s>{{ column.label }}</s>
    </template>
    <template #name="{ row, size }">
      <el-tag :size="size">
        {{ row?.name }}
      </el-tag>
    </template>
    <template #menu="{ size }">
      <el-button
        :size="size"
        type="text"
      >
        详情
      </el-button>
    </template>
  </ele-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const columns3 = ref([
      {
        label: '日期',
        prop: 'date',
      },
      {
        label: '姓名',
        prop: 'name',
        slot: true,
      },
      {
        label: '地址',
        prop: 'address',
      },
    ])
    const data = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    return {
      data,
      columns3,
    }
  }
}
</script>

:::

##### 分页

::: demo 当传入 total 数据时，将自动显示分页。可以通过 `v-model:current-page` 绑定当前页数、通过 `v-model:page-size` 绑定每页显示条目个数

<template>
  <ele-table
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :data="data"
    :columns="columns"
    :total="total"
  />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(50)
    const columns = ref([
      {
        label: '日期',
        prop: 'date',
      },
      {
        label: '姓名',
        prop: 'name',
      },
      {
        label: '地址',
        prop: 'address',
      },
    ])
    const data = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    return {
      currentPage,
      pageSize,
      total,
      data,
      columns,
    }
  }
}
</script>

:::

##### 多级

::: demo 通过 columns 的 `children` 配置多级表头

<template>
  <ele-table
    :data="data"
    :columns="columns2"
  />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const columns2 = ref([
      {
        label: '日期',
        prop: 'date',
      },
      {
        label: '用户',
        children: [
          {
            label: '姓名',
            prop: 'name',
          },
          {
            label: '地址',
            prop: 'address',
          },
        ],
      },
    ])
    const data = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    return {
      data,
      columns2,
    }
  }
}
</script>

:::

##### 配置

| 参数                    | 说明                                                                | 类型                                                    | 可选值                         | 默认值                                               |
| :---------------------- | :------------------------------------------------------------------ | :------------------------------------------------------ | :----------------------------- | :--------------------------------------------------- |
| data                    | 显示的数据                                                          | array                                                   | -                              | -                                                    |
| columns                 | 自动生成表单的参数，参考下面 columns                                | array                                                   | -                              | -                                                    |
| selection               | 显示多选框，支持 columns 的配置                                     | boolean / object                                        | -                              | false                                                |
| index                   | 显示索引，支持 columns 的配置                                       | boolean / object                                        | -                              | false                                                |
| expand                  | 开启展开插槽，支持 columns 的配置                                   | boolean / object                                        | -                              | false                                                |
| menu                    | 开启操作按钮插槽，支持 columns 的配置                               | boolean / object                                        | -                              | false                                                |
| show-overflow-tooltip   | 当内容过长被隐藏时显示 tooltip                                      | boolean                                                 | -                              | false                                                |
| align                   | 对齐方式                                                            | string                                                  | left / center / right          | left                                                 |
| header-align            | 表头对齐方式                                                        | string                                                  | left / center / right          | 同 align                                             |
| total                   | 总条目数                                                            | number                                                  | -                              | -                                                    |
| current-page            | 当前页数，可以通过 `v-model:current-page` 绑定值                    | number                                                  | -                              | -                                                    |
| page-size               | 每页显示条目个数，可以通过 `v-model:page-size` 绑定值               | number                                                  | -                              | -                                                    |
| pagination              | pagination 的配置，同 el-pagination                                 | object                                                  | -                              | [参考全局配置](../guide/index#全局配置)              |
| height                  | Table 的高度                                                        | string / number                                         | -                              | 自动高度                                             |
| max-height              | Table 的最大高度                                                    | string / number                                         | -                              | -                                                    |
| stripe                  | 是否为斑马纹 table                                                  | boolean                                                 | -                              | false                                                |
| border                  | 是否带有纵向边框                                                    | boolean                                                 | -                              | false                                                |
| size                    | Table 的尺寸                                                        | string                                                  | medium / small / mini          | -                                                    |
| fit                     | 列的宽度是否自撑开                                                  | boolean                                                 | -                              | true                                                 |
| show-header             | 是否显示表头                                                        | boolean                                                 | -                              | true                                                 |
| highlight-current-row   | 是否要高亮当前行                                                    | boolean                                                 | -                              | false                                                |
| current-row-key         | 当前行的 key，只写属性                                              | string / number                                         | -                              | -                                                    |
| row-class-name          | 为行增加 className                                                  | Function({row, rowIndex}) / string                      | -                              | -                                                    |
| row-style               | 为行增加 style                                                      | Function({row, rowIndex}) / object                      | -                              | -                                                    |
| cell-class-name         | 为单元格增加 className                                              | Function({row, column, rowIndex, columnIndex}) / string | -                              | -                                                    |
| cell-style              | 为单元格增加 style                                                  | Function({row, column, rowIndex, columnIndex}) / object | -                              | -                                                    |
| header-row-class-name   | 为表头行增加 className                                              | Function({row, rowIndex}) / string                      | -                              | -                                                    |
| header-row-style        | 为表头行增加 style                                                  | Function({row, rowIndex}) / object                      | -                              | -                                                    |
| header-cell-class-name  | 为表头单元格增加 className                                          | Function({row, column, rowIndex, columnIndex}) / string | -                              | -                                                    |
| header-cell-style       | 为表头单元格增加 style                                              | Function({row, column, rowIndex, columnIndex}) / object | -                              | -                                                    |
| row-key                 | 行数据的 Key，使用 reserveSelection 功能时必填                      | Function(row) / string                                  | -                              | -                                                    |
| empty-text              | 空数据时显示的文本内容                                              | string                                                  | -                              | 暂无数据                                             |
| default-expand-all      | 是否默认展开所有行                                                  | boolean                                                 | -                              | false                                                |
| expand-row-keys         | Table 目前的展开行，与 row-key 配合使用                             | array                                                   | -                              | -                                                    |
| default-sort            | 默认的排序列的 prop 和顺序                                          | Object                                                  | `order`: ascending, descending | ascending                                            |
| tooltip-effect          | tooltip `effect` 属性                                               | String                                                  | dark / light                   | -                                                    |
| show-summary            | 是否在表尾显示合计行                                                | Boolean                                                 | -                              | false                                                |
| sum-text                | 合计行第一列的文本                                                  | String                                                  | -                              | 合计                                                 |
| summary-method          | 自定义的合计计算方法                                                | Function({ columns, data })                             | -                              | -                                                    |
| span-method             | 合并行或列的计算方法                                                | Function({ row, column, rowIndex, columnIndex })        | -                              | -                                                    |
| select-on-indeterminate | 当仅有部分行被选中时，点击表头的多选框时的行为，配合 selection 使用 | boolean                                                 | -                              | true                                                 |
| indent                  | 展示树形数据时，树节点的缩进                                        | number                                                  | -                              | 16                                                   |
| lazy                    | 是否懒加载子节点数据                                                | boolean                                                 | -                              | -                                                    |
| load                    | 加载子节点数据的函数，lazy 为 true 时生效                           | Function(row, treeNode, resolve)                        | -                              | -                                                    |
| tree-props              | 渲染嵌套数据的配置选项                                              | Object                                                  | -                              | { hasChildren: 'hasChildren', children: 'children' } |

##### 参数

| 参数                | 说明                                                                  | 类型                                    | 可选值                                                                                                                          | 默认值                            |
| :------------------ | :-------------------------------------------------------------------- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------- |
| prop                | 对应 data 的字段名 (**必填，需要是唯一值**)                           | string                                  | -                                                                                                                               | -                                 |
| label               | 显示的标题                                                            | string                                  | -                                                                                                                               | -                                 |
| slot                | 是否开启自定义插槽功能                                                | boolean                                 | -                                                                                                                               | false                             |
| hide                | 是否在表格中隐藏                                                      | boolean                                 | -                                                                                                                               | false                             |
| children            | 实现多级表头                                                          | array                                   | -                                                                                                                               | -                                 |
| columnKey           | 当前项的 key，使用 filter-change 事件时需要                           | string                                  | -                                                                                                                               | -                                 |
| width               | 对应列的宽度                                                          | string                                  | -                                                                                                                               | -                                 |
| minWidth            | 对应列的最小宽度                                                      | string                                  | -                                                                                                                               | -                                 |
| fixed               | 列是否固定，true 表示固定在左侧                                       | string / boolean                        | true / left / right                                                                                                             | -                                 |
| renderHeader        | 列标题 Label 区域渲染使用的 Function                                  | Function(h, { column, $index })         | -                                                                                                                               | -                                 |
| sortable            | 对应列是否可以排序                                                    | boolean / string                        | true / false / 'custom'                                                                                                         | false                             |
| sortMethod          | 对数据进行排序的时候使用的方法                                        | Function(a, b)                          | -                                                                                                                               | -                                 |
| sortBy              | 指定数据按照哪个属性进行排序                                          | string / array / Function(row, index)   | -                                                                                                                               | -                                 |
| sortOrders          | 数据在排序时所使用排序策略的轮转顺序                                  | array                                   | `ascending` 表示升序，`descending` 表示降序，`null` 表示还原为原始顺序                                                          | ['ascending', 'descending', null] |
| resizable           | 对应列是否可以通过拖动改变宽度，配合 border 使用                      | boolean                                 | -                                                                                                                               | true                              |
| formatter           | 用来格式化内容                                                        | Function(row, column, cellValue, index) | -                                                                                                                               | -                                 |
| showOverflowTooltip | 当内容过长被隐藏时显示 tooltip                                        | Boolean                                 | -                                                                                                                               | false                             |
| align               | 对齐方式                                                              | string                                  | left / center / right                                                                                                           | left                              |
| headerAlign         | 表头对齐方式                                                          | string                                  | left / center / right                                                                                                           | 同 align                          |
| className           | 列的 className                                                        | string                                  | -                                                                                                                               | -                                 |
| labelClassName      | 当前列标题的自定义类名                                                | string                                  | -                                                                                                                               | -                                 |
| filters             | 数据过滤的选项                                                        | Array[{ text, value }]                  | -                                                                                                                               | -                                 |
| filterPlacement     | 过滤弹出框的定位                                                      | string                                  | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | -                                 |
| filterMultiple      | 数据过滤的选项是否多选                                                | boolean                                 | -                                                                                                                               | true                              |
| filterMethod        | 数据过滤使用的方法                                                    | Function(value, row, column)            | -                                                                                                                               | -                                 |
| filteredValue       | 选中的数据过滤项                                                      | array                                   | -                                                                                                                               | -                                 |
| index               | 自定义索引，只能够在 index 中配置                                     | Function(index) / number                | -                                                                                                                               | -                                 |
| selectable          | 这一行的 CheckBox 是否可以勾选，只能够在 selection 中配置             | Function(row, index)                    | -                                                                                                                               | -                                 |
| reserveSelection    | 是否保留之前选中的数据（需指定 `row-key`），只能够在 selection 中配置 | boolean                                 | -                                                                                                                               | false                             |

##### 事件

| 事件名             | 说明                                                                                                                                         | 参数                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| select             | 当用户手动勾选数据行的 Checkbox 时触发的事件                                                                                                 | selection, row                    |
| select-all         | 当用户手动勾选全选 Checkbox 时触发的事件                                                                                                     | selection                         |
| selection-change   | 当选择项发生变化时会触发该事件                                                                                                               | selection                         |
| cell-mouse-enter   | 当单元格 hover 进入时会触发该事件                                                                                                            | row, column, cell, event          |
| cell-mouse-leave   | 当单元格 hover 退出时会触发该事件                                                                                                            | row, column, cell, event          |
| cell-click         | 当某个单元格被点击时会触发该事件                                                                                                             | row, column, cell, event          |
| cell-dblclick      | 当某个单元格被双击击时会触发该事件                                                                                                           | row, column, cell, event          |
| row-click          | 当某一行被点击时会触发该事件                                                                                                                 | row, column, event                |
| row-contextmenu    | 当某一行被鼠标右键点击时会触发该事件                                                                                                         | row, column, event                |
| row-dblclick       | 当某一行被双击时会触发该事件                                                                                                                 | row, column, event                |
| header-click       | 当某一列的表头被点击时会触发该事件                                                                                                           | column, event                     |
| header-contextmenu | 当某一列的表头被鼠标右键点击时触发该事件                                                                                                     | column, event                     |
| sort-change        | 当表格的排序条件发生变化的时候会触发该事件                                                                                                   | { column, prop, order }           |
| filter-change      | 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。 | filters                           |
| current-change     | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性                                          | currentRow, oldCurrentRow         |
| header-dragend     | 当拖动表头改变了列的宽度的时候会触发该事件                                                                                                   | newWidth, oldWidth, column, event |
| expand-change      | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）                     | row, (expandedRows \| expanded)   |
| size-change        | pageSize 改变时会触发                                                                                                                        | 每页条数                          |
| current-change     | currentPage 改变时会触发                                                                                                                     | 当前页                            |
| prev-click         | 用户点击上一页按钮改变当前页后触发                                                                                                           | 当前页                            |
| next-click         | 用户点击下一页按钮改变当前页后触发                                                                                                           | 当前页                            |

##### 方法

| 方法名             | 说明                                                                                                                    | 参数                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| clearSelection     | 用于多选表格，清空用户的选择                                                                                            | -                           |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）             | row, selected               |
| toggleAllSelection | 用于多选表格，切换全选和全不选                                                                                          | -                           |
| toggleRowExpansion | 用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开） | row, expanded               |
| setCurrentRow      | 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。                                    | row                         |
| clearSort          | 用于清空排序条件，数据会恢复成未排序的状态                                                                              | -                           |
| clearFilter        | 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由 columnKey 组成的数组以清除指定列的过滤条件       | columnKey                   |
| doLayout           | 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法                                      | -                           |
| sort               | 手动对 Table 进行排序。参数`prop`属性指定排序列，`order`指定排序顺序。                                                  | prop: string, order: string |

::: tip 提示
如果使用 `typescript` 可以从组件中导出 `ITableExpose` 提供更好的类型推导
:::

### 插槽

| name          | 说明                                                                     |
| :------------ | :----------------------------------------------------------------------- |
| -             | 在右侧菜单前插入的任意内容                                               |
| menu          | 表格右侧自定义按钮，参数为 { size, row, column, $index }                 |
| expand        | 当 expand 为 true 时，配置展开显示的内容，参数为 { row, column, $index } |
| append        | 插入至表格最后一行之后的内容                                             |
| [prop]        | 当前这列的内容，参数为 { size, row, column, $index }                     |
| [prop]-header | 当前这列表头的内容，参数为 { size, column, $index }                      |

::: tip 提示
[prop] 为 columns 中定义的 prop
:::
