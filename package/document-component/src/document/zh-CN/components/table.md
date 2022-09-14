::: anchor
:::

::: title 基本介绍
:::

::: describe 展示行列数据。
:::

::: title 基础使用
:::

::: demo 使用 `lay-table` 标签, 创建表格

<template>
  <lay-table :columns="columns1" :data-source="dataSource1"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns1 = [
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "180px",
        key:"password"
      },{
        title:"年龄",
        width: "180px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true,
      }
    ]

    const dataSource1 = [
      {username:"root", password:"root", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"root", password:"root", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow", age:"20", remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'}
    ]

    return {
      columns1,
      dataSource1
    }
  }
}
</script>

:::

::: title 不同尺寸
:::

::: demo

<template>
  <lay-form>
    <lay-radio v-model="size2" name="action" value="sm">sm</lay-radio>
    <lay-radio v-model="size2" name="action" value="md">md</lay-radio>
    <lay-radio v-model="size2" name="action" value="lg">lg</lay-radio>
  </lay-form>
  <lay-table :columns="columns2" :data-source="dataSource2" :size="size2"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns2 = [
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "180px",
        key:"password"
      },{
        title:"年龄",
        width: "180px",
        key:"age"
      }
    ]

    const dataSource2 = [
      {username:"root", password:"root", age:"18"},
      {username:"woow", password:"woow", age:"20"}
    ]
    
    const size2 = ref('md');

    return {
      size2,
      columns2,
      dataSource2
    }
  }
}
</script>

:::

::: title 开启分页
:::

::: demo

<template>
  page props: {{ page3 }}
  <lay-table :columns="columns3" :data-source="dataSource3" :page="page3" @change="change3"></lay-table>
</template>

<script>
import { ref } from 'vue';
import { layer } from "@layui/layer-vue";

export default {
  setup() {
    
    const page3 = ref({
      total: 100,
      limit: 10,
      current: 2,
      showRefresh: true,
    })

    const change3 = ({ current, limit }) => {
      layer.msg("current:" + current + " limit:" + limit);
    }

    const columns3 = [
      {
        title:"账户",
        width:"200px",
        slot:"username",
        key:"username"
      },{
        title:"密码",
        width: "180px",
        slot:"password",
        key:"password"
      },{
        title:"年龄",
        width: "180px",
        key:"age"
      }
    ]

    const dataSource3 = [
      {username:"root", password:"root", age:"18"},
      {username:"woow", password:"woow", age:"20"}
    ]

    return {
      page3,
      change3,
      columns3,
      dataSource3
    }
  }
}
</script>

:::

::: title 开启排序
:::

::: demo

<template>
  <lay-table :columns="columns4" :data-source="dataSource4"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns4 = [
      {
        title:"姓名",
        width:"200px",
        key:"name"
      },{
        title:"成绩",
        width: "180px",
        key:"score",
        sort: true
      }
    ]

    const dataSource4 = [
      {name:"张三", score:100},
      {name:"李四", score:80},
      {name:"王二", score:99},
      {name:"麻子", score:92},
      {name:"无名", score:60},
      {name:"有名", score:70},
    ]

    return {
      columns4,
      dataSource4
    }
  }
}
</script>

:::

::: title 开启子表
:::

::: demo 当表格内容较多不能一次性完全展示时。

<template>
  {{ expandKeys6 }}
  <lay-table :columns="columns6" :data-source="dataSource6" :default-expand-all="defaultExpandAll6" v-model:expandKeys="expandKeys6">
    <template v-slot:expand="{ data }"> 
      <lay-table :columns="columns6" :data-source="dataSource6"></lay-table>
    </template>
  </lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns6 = [
      {
        title:"姓名",
        width:"200px",
        key:"name"
      },{
        title:"成绩",
        width: "180px",
        key:"score"
      }
    ]

    const dataSource6 = [
      {id:"1", name:"张三", score:100},
      {id:"2", name:"李四", score:80},
      {id:"3", name:"王二", score:99},
      {id:"4", name:"麻子", score:92},
      {id:"5", name:"无名", score:60},
      {id:"6", name:"有名", score:70},
    ]

    const expandKeys6 = ref(["1"])
    const defaultExpandAll6 = ref(false)

    return {
      columns6,
      dataSource6,
      expandKeys6,
      defaultExpandAll6
    }
  }
}
</script>

:::

::: title 树形表格
:::

::: demo 树形数据的展示，当数据中有 children 字段时会自动展示为树形表格, 通过设置 indentSize 以控制每一层的缩进宽度, 使用 childrenColumnName 替换默认字段

<template>
  {{ expandKeys7 }}
  <lay-table :columns="columns7" :data-source="dataSource7" :default-expand-all="defaultExpandAll7" v-model:expandKeys="expandKeys7">
    <template #score="{ data }">{{ data }}</template>
  </lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns7 = [
      {
        title:"姓名",
        width:"200px",
        key:"name"
      },{
        title:"成绩",
        width: "180px",
        key:"score"
      },
    ]

    const dataSource7 = [
      {id: "1", name:"系统管理", score:100, children: [{id: "3", name:"用户管理", score:99},{id: "5", name:"角色管理", score:96,children: [{id: "7", name:"用户管理", score:99},{id: "8", name:"角色管理", score:96}]}]},
      {id: "2", name:"电商管理", score:100, children: [{id: "4", name:"商品管理", score:11},{id: "6", name:"分类管理", score:22}]},
    ]

    const expandKeys7 = ref(["1"])
    const defaultExpandAll7 = ref(false)

    return {
      columns7,
      dataSource7,
      expandKeys7,
      defaultExpandAll7
    }
  }
}
</script>

:::

::: title 固定表头
:::

::: demo 设置 `height` 或者 `max-height` 即可实现

<template>
  <lay-table
    :columns="columns8"
    :data-source="dataSource8"
    size="sm"
    max-height="300px"
  >
              <template v-slot:operator="{ data }">
              <lay-button size="xs" @click="deleteColumn(data)">删除</lay-button>
            </template>
  </lay-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const deleteColumn = ({ username }) => {
  const findIndex = dataSource8.value.findIndex((item) => item.username === username);
  dataSource8.value.splice(findIndex, 1);
};
  
const columns8 = [
  {
    title: '账户',
    minWidth: '200px',
    key: 'username',
  },
  {
    title: '密码',
    minWidth: '180px',
    key: 'password',
  },
  {
    title: '年龄',
    minWidth: '180px',
    key: 'age',
  },
    {
    title: "操作",
    width: "200px",
    customSlot: "operator",
    key: "operator",
    align: "center",
  }
]

const dataSource8 = ref([
  {
    username: '1',
    password: 'root',
    age: '18',
    remark: 'layui - vue（谐音：类 UI) ',
  },
  {
    username: '2',
    password: 'root',
    age: '18',
    remark: 'layui - vue（谐音：类 UI) ',
  },
  {
    username: '3',
    password: 'root',
    age: '18',
    remark: 'layui - vue（谐音：类 UI) ',
  },
  {
    username: '4',
    password: 'root',
    age: '18',
    remark: 'layui - vue（谐音：类 UI) ',
  },
  {
    username: '5',
    password: 'root',
    age: '18',
    remark: 'layui - vue（谐音：类 UI) ',
  },
  {
    username: '6',
    password: 'root',
    age: '18',
    remark: 'layui - vue（谐音：类 UI) ',
  },
  {
    username: '7',
    password: 'root',
    age: '18',
    remark: 'layui - vue（谐音：类 UI) ',
  },
  {
    username: '8',
    password: 'woow',
    age: '20',
    remark:
      'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.',
  },
  {
    username: '9',
    password: 'woow',
    age: '20',
    remark:
      'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.',
  },
  {
    username: '10',
    password: 'woow',
    age: '20',
    remark:
      'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.',
  },
  {
    username: '11',
    password: 'woow',
    age: '20',
    remark:
      'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.',
  },
])
</script>

:::

::: title 斑马条纹
:::

::: demo 通过 `even` 属性, 开启斑马条纹, 默认为 false。

<template>
  <lay-table :columns="columns1" :data-source="dataSource1" even></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns1 = [
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "180px",
        key:"password"
      },{
        title:"年龄",
        width: "180px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true,
      }
    ]

    const dataSource1 = [
      {username:"root", password:"root", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"root", password:"root", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow", age:"20", remark: 'layui - vue（谐音：类 UI) '}
    ]

    return {
      columns1,
      dataSource1
    }
  }
}
</script>

:::

::: title 定义样式
:::

::: demo 通过 `cellStyle` `rowStyle` `cellClassName` `rowClassName` 属性, 自定义单元格样式。

<template>
  <lay-table :columns="columns1" :data-source="dataSource1" :cell-style="cellStyle" :row-style="rowStyle"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns1 = [
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "180px",
        key:"password"
      },{
        title:"年龄",
        width: "180px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true,
      }
    ]

    const dataSource1 = [
      {username:"root", password:"root", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"root", password:"root", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow", age:"20", remark: 'layui - vue（谐音：类 UI) '}
    ]

    const cellStyle = function(row, column, rowIndex, columnIndex) {
      if(columnIndex % 2 == 0) {
        return 'color:red';
      }
    }

    const rowStyle = function(row, rowIndex) {
      if(rowIndex % 2 == 0) {
        return 'color:blue';
      }
    }

    return {
      columns1,
      dataSource1,
      cellStyle,
      rowStyle
    }
  }
}
</script>

:::

::: title 不同风格
:::

::: demo 通过 `skin` 属性, 切换 table 风格。

<template>
  <lay-form>
    <lay-radio v-model="skin1" name="action" value="line">line</lay-radio>
    <lay-radio v-model="skin1" name="action" value="nob">nob</lay-radio>
    <lay-radio v-model="skin1" name="action" value="row">row</lay-radio>
  </lay-form>
  <lay-table :columns="columns1" :data-source="dataSource1" :skin="skin1"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const skin1 = ref("line");

    const columns1 = [
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "180px",
        key:"password"
      },{
        title:"年龄",
        width: "180px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true
      }
    ]

    const dataSource1 = [
      {username:"root", password:"root", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"root", password:"root", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow", age:"20", remark: 'layui - vue（谐音：类 UI) '}
    ]

    return {
      skin1,
      columns1,
      dataSource1,
    }
  }
}
</script>

:::

::: title 固定行列
:::

::: demo 通过 `fixed` 属性实现列固定, 可选值为 `left` 与 `right`。

<template>
  <lay-table :columns="columns20" :data-source="dataSource20"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns20 = [
      {
        fixed:"left",
        title:"账户",
        width:"200px",
        key:"username"
      },{
        fixed:"left",
        title:"密码",
        width: "300px",
        key:"password"
      },{
        title:"性别",
        width: "300px",
        key:"sex"
      },{
        title:"年龄",
        width: "300px",
        key:"age"
      },{
        fixed:"right",
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true
      }
    ]

    const dataSource20 = [
      {username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '}
    ]

    return {
      columns20,
      dataSource20,
    }
  }
}
</script>

:::

::: title 开启序号
:::

::: demo 通过 `columns` 配置 `type:'number'` 开启序号列。

<template>
  <lay-table :columns="columns21" :data-source="dataSource21"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns21 = [
      {
        type: "number",
      },
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "300px",
        key:"password"
      },{
        title:"性别",
        key:"sex"
      },{
        title:"年龄",
        width: "300px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true
      }
    ]

    const dataSource21 = [
      {username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '}
    ]

    return {
      columns21,
      dataSource21,
    }
  }
}
</script>

:::

::: title 开启多选
:::

::: demo 通过 `columns` 配置 `type:'checkbox'` 开启单选列。

<template>
  <lay-button @click="changeSelectedKeys">修改选中</lay-button>
  <lay-button @click="changeDataSource23">修改数据</lay-button>
  <lay-table :columns="columns23" :data-source="dataSource23" v-model:selectedKeys="selectedKeys5"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selectedKeys5 = ref(["1"]);

    const getCheckboxProps = (data,index) => {
      if(index == 2) {
        return {disabled: true}
      }
      return {};
    }

    const changeSelectedKeys = () => {
      selectedKeys5.value = ["2"]
    }

    const changeDataSource23 = () => {
      dataSource23.value = [      
        {id:"1",username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
        {id:"2",username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '}
      ]
    }

    const columns23 = [
      {
        fixed: "left",
        type: "checkbox",
      },
      {
        title:"账户",
        width:"200px",
        key:"username",
        fixed: "left"
      },{
        title:"密码",
        width: "300px",
        key:"password"
      },{
        title:"性别",
        key:"sex"
      },{
        title:"年龄",
        width: "300px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true
      }
    ]

    const dataSource23 = ref([
      {id:"1",username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {id:"2",username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {id:"3",username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {id:"4",username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {id:"5",username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '}
    ])

    return {
      columns23,
      dataSource23,
      selectedKeys5,
      changeSelectedKeys,
      getCheckboxProps,
      changeDataSource23
    }
  }
}
</script>

:::

::: title 开启单选
:::

::: demo 通过 `columns` 配置 `type:'radio'` 开启单选列。

<template>
  <lay-table :columns="columns24" :data-source="dataSource24" v-model:selected-key="selectedKey24"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns24 = [
      {
        type: "radio"
      },
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "300px",
        key:"password"
      },{
        title:"性别",
        key:"sex"
      },{
        title:"年龄",
        width: "300px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true
      }
    ]
    
    const selectedKey24 = ref("2");

    const dataSource24 = [
      {id:"1",username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {id:"2",username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {id:"3",username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {id:"4",username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {id:"5",username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '}
    ]

    return {
      columns24,
      dataSource24,
      selectedKey24,
    }
  }
}
</script>

:::

::: title 暂无数据
:::

::: demo 通过 `columns` 配置 `type:'radio'` 开启单选列。

<template>
  <lay-table :columns="columns25" :data-source="dataSource25"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns25 = [
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "300px",
        key:"password"
      },{
        title:"性别",
        key:"sex"
      },{
        title:"年龄",
        width: "300px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true
      }
    ]

    const dataSource25 = [
    ]

    return {
      columns25,
      dataSource25,
    }
  }
}
</script>

:::

::: title 刷新数据
:::

::: demo 通过 `data-source` 的赋值，实现数据的更新

<template>
  <lay-button @click="changeDataSource22">更新数据</lay-button>
  <lay-table :columns="columns22" :data-source="dataSource22"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns22 = [
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "300px",
        key:"password"
      },{
        title:"性别",
        width: "300px",
        key:"sex"
      },{
        title:"年龄",
        width: "300px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true
      }
    ]

    const dataSource22 = ref([
      {username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '}
    ])
    
    const changeDataSource22 = () => {
      dataSource22.value = [{username:"update", password:"update",sex:"boy", age:"18", remark: '更新数据 '}]
    }

    return {
      columns22,
      dataSource22,
      changeDataSource22
    }
  }
}
</script>

:::

::: title 开启统计
:::

::: demo 通过 `columns` 配置 `totalRow` 开启行统计。

<template>
  <lay-table :columns="columns26" :data-source="dataSource26"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns26 = [
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "300px",
        key:"password"
      },{
        title:"性别",
        key:"sex",
        totalRow:"合并:"
      },{
        title:"年龄",
        width: "300px",
        key:"age",
        totalRow: true
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true
      }
    ]

    const dataSource26 = [
      {username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '}
    ]

    return {
      columns26,
      dataSource26,
    }
  }
}
</script>

:::

::: title 合并行列
:::

::: demo 通过 `span-method` 属性, 自定义行列合并的逻辑。

<template>
  <lay-table :columns="columns27" :data-source="dataSource27" :span-method="spanMethod27" :default-toolbar="true"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns27 = [
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "300px",
        key:"password"
      },{
        title:"性别",
        key:"sex"
      },{
        title:"年龄",
        width: "300px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true
      }
    ]

    const dataSource27 = [
      {id:"1",username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {id:"2",username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {id:"3",username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {id:"4",username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {id:"5",username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '}
    ]

    const spanMethod27 = (
      row,
      column,
      rowIndex,
      columnIndex,
    ) => {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    }

    return {
      columns27,
      dataSource27,
      spanMethod27,
    }
  }
}
</script>

:::

::: title 行内编辑
:::

::: demo 通过 `span-method` 属性, 自定义行列合并的逻辑。

<template>
  <lay-table :columns="columns28" :data-source="dataSource28">
    <template #username="{ data }">
      <lay-input v-if="edingKeys[data.id]" :model-value="data.username" @input="changeUsername($event, data)">
        <template #suffix>
          <lay-icon type="layui-icon-close" style="right:10px;" v-if="edingKeys[data.id]"  @click="deleteEdit(data.id)"></lay-icon>
        </template>
      </lay-input>
      <span v-else>
        {{ data.username }} 
        <lay-icon type="layui-icon-edit" style="position: absolute;right: 10px;" v-if="!edingKeys[data.id]"  @click="editHandle(data.id)"></lay-icon>
      </span>
    </template>
  </lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const edingKeys = ref([])

    const columns28 = [
      {
        title:"账户",
        width:"200px",
        key:"username",
        customSlot: "username"
      },{
        title:"密码",
        width: "300px",
        key:"password"
      },{
        title:"性别",
        key:"sex"
      },{
        title:"年龄",
        width: "300px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true
      }
    ]

    const dataSource28 = ref([
      {id:"1",username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {id:"2",username:"root", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {id:"3",username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {id:"4",username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {id:"5",username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '}
    ])

    const editHandle = (key) => {
      edingKeys.value.push(key);
    }

    const deleteEdit = (key) => {
      edingKeys.value.splice(edingKeys.value.indexOf(key),1);
    }

    const changeUsername = (val, data) => {
      dataSource28.value.forEach(element => {
        if(element.id == data.id) {
          element.username = val;
        }
      });
    }

    return {
      edingKeys,
      deleteEdit,
      columns28,
      editHandle,
      dataSource28,
      changeUsername,
    }
  }
}
</script>

:::

::: title 复杂表头
:::

::: demo 通过 `span-method` 属性, 自定义行列合并的逻辑。

<template>
  <lay-table :columns="columns29" :data-source="dataSource29" :default-toolbar="true"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns29 = [
      {
        title:"名称",
        width:"200px",
        key:"username"
      },{
        title:"地址",
        children: [
          { title: "省", key: "province", width: "300px" },
          { title: "市", key: "city", width: "300px" },
          { title: "区", key: "area", width: "300px" },
        ]
      },{
        title:"性别",
        key:"sex"
      },{
        title:"年龄",
        width: "300px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true
      }
    ]

    const dataSource29 = [
      {id:"1",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {id:"2",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {id:"3",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {id:"4",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
      {id:"5",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '}
    ]

    return {
      columns29,
      dataSource29,
    }
  }
}
</script>

:::

::: title 加载过渡
:::

::: demo 通过 `span-method` 属性, 自定义行列合并的逻辑。

<template>
  <lay-button @click="loadData">加载数据</lay-button>
  <lay-table :columns="columns30" :data-source="dataSource30" :loading="loading"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const loading = ref(false);

    const columns30 = [
      {
        title:"名称",
        width:"200px",
        key:"username"
      },{
        title:"地址",
        children: [
          { title: "省", key: "province", width: "300px" },
          { title: "市", key: "city", width: "300px" },
          { title: "区", key: "area", width: "300px" },
        ]
      },{
        title:"性别",
        key:"sex"
      },{
        title:"年龄",
        width: "300px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true
      }
    ]

    const dataSource30 = ref([])

    const loadData = () => {
      loading.value = true;
      setTimeout(() => {
      dataSource30.value = [
        {id:"1",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
        {id:"2",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) '},
        {id:"3",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
        {id:"4",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
        {id:"5",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '}
      ];
      loading.value = false;
      },50000000)
    }

    return {
      columns30,
      dataSource30,
    }
  }
}
</script>

:::

::: title 完整表格
:::

::: demo 使用了绝大部分属性的 table 案例

<template>
  <lay-table :columns="columns4" :data-source="dataSource4">
        <template v-slot:name="{ data }">
          {{ data.person != null ? data.person.name : '--' }}
        </template>
        <template v-slot:idcard="{ data }">
          {{ data.person != null ? data.person.idcard : '--' }}
        </template>
        <template v-slot:bank_name="{ data }">
          {{ data.person != null ? data.person.bank_name : '--' }}
        </template>
        <template v-slot:bank_no="{ data }">
          {{ data.person != null ? data.person.bank_no : '--' }}
        </template>
        <template v-slot:alipay_account="{ data }">
          {{
            data.person != null
              ? data.person.alipay_account != null
                ? data.person.alipay_account
                : '未配置支付宝账号'
              : '--'
          }}
        </template>
        <template v-slot:phone="{ data }">
          {{ data.person != null ? data.person.phone : '--' }}
        </template>
        <template v-slot:status="{ data }">
          <lay-badge v-if="data.status == 0">未发放</lay-badge>
          <lay-badge v-else-if="data.status == 1" theme="orange">处理中</lay-badge>
          <lay-badge v-else-if="data.status == 2">发放中</lay-badge>
          <lay-badge v-else-if="data.status == 3" theme="blue">发放完成</lay-badge>
          <lay-badge v-else-if="data.status == -1">发放失败</lay-badge>
          <lay-badge v-else theme="orange">状态异常</lay-badge>
        </template>
        <template v-slot:pay_time="{ data }">
          {{ data.pay_time != null ? data.pay_time : '--' }}
        </template>
  </lay-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const columns4 = [
    {
      fixed: 'left',
      type: 'checkbox'
    },
    {
      title: 'ID',
      key: 'id',
      width: '50px',
      align: 'center'
    },
    {
      title: '订单编号',
      key: 'order_no',
      width: '120px',
      align: 'center',
      ellipsisTooltip: true
    },
    {
      title: '姓名',
      key: 'name',
      width: '120px',
      align: 'center',
      customSlot: 'name',
      ellipsisTooltip: true
    },
    {
      title: '身份证号码',
      key: 'idcard',
      width: '120px',
      align: 'center',
      customSlot: 'idcard',
      ellipsisTooltip: true
    },
    {
      title: '手机号码',
      key: 'phone',
      width: '120px',
      align: 'center',
      customSlot: 'phone',
      ellipsisTooltip: true
    },
    {
      title: '银行名称',
      key: 'bank_name',
      width: '120px',
      align: 'center',
      customSlot: 'bank_name',
      ellipsisTooltip: true
    },
    {
      title: '银行卡号',
      key: 'bank_no',
      width: '120px',
      align: 'center',
      customSlot: 'bank_no',
      ellipsisTooltip: true
    },
    {
      title: '支付宝账号',
      key: 'alipay_account',
      width: '120px',
      align: 'center',
      customSlot: 'alipay_account',
      ellipsisTooltip: true
    },
    {
      title: '结算金额（元）',
      width: '120px',
      key: 'money',
      align: 'center',
      ellipsisTooltip: true
    },
    {
      title: '服务费（元）',
      width: '100px',
      key: 'service_charge',
      align: 'center'
    },
    {
      title: '申请时间',
      width: '140px',
      key: 'created_at',
      align: 'center',
      ellipsisTooltip: true
    },

    {
      title: '发放状态',
      width: '120px',
      key: 'status',
      align: 'center',
      customSlot: 'status'
    },
    {
      title: '发放时间',
      width: '120px',
      key: 'pay_time',
      align: 'center',
      customSlot: 'pay_time',
      ellipsisTooltip: true
    }
]

const dataSource4 = [
{"id":1,
"appid":"wpdmbzljhdfbkbpgqwiy",
"garden_id":11,
"batch_no":"22090910255151523560045140",
"order_no":"22090910215803185650",
"person_id":2,
"task_id":11,
"money":"10.00",
"service_charge":"0.01",
"status":0,
"pay_time":null,
"created_at":"2022-09-09 11:14:49",
"task":{
"id":11,
"name":"业务推广咨询",
"task_no":"123"
},
"person":{
"id":2,
"name":"朱xx",
"idcard":"3304021xxxxxxxxx",
"phone":"13686xxxxxxxx4",
"bank_name":"招商银行xxxxx支行",
"bank_no":"621485xxxx",
"alipay_account":null
}}
]
</script>

:::

::: title Table 属性
:::

::: table

| 属性                 | 描述                                                  | 类型                | 默认值     | 可选值             |    版本   |
| -------------------- | ----------------------------------------------------- | ------------------- | ---------- | ------------------ | ------------------ |
| columns              | 列配置 - [更多](#tableColumn)                         | --                  | --         | --                 |--                 |
| dataSource           | 数据源                                                | --                  | --         | --                 |--                 |
| checkbox             | 开启复选框                                            | `boolean`           | `false`    | `true` `false`     |--                 |
| id                   | 主键                                                  | `string`            | --         | --                 |--                 |
| v-model:selectedKeys | 选中项 (多选)                                         | --                  | --         | --                 |--                 |
| v-model:selectedKey  | 选中项 (单选)                                         | --                  | --         | --                 |--                 |
| default-toolbar      | 工具栏                                                | `boolean`           | `false`    | `true` `false`     |--                 |
| size                 | 尺寸                                                  | `string`            | `md`       | `lg` `md` `sm`     |--                 |
| children-column-name | 树节点字段                                            | `string`            | `children` | --                 |--                 |
| indent-size          | 树表行级缩进                                          | `number`            | `30`       | --                 |--                 |
| height               | 表格高度                                              | `number`            | --         | --                 |--                 |
| maxHeight            | 表格最大高度                                          | `number`            | --         | --                 |--                 |
| even                 | 斑马条纹                                              | `boolean`           | `false`    | `true` `false`     |--                 |
| cellStyle            | 列样式 function(row, column, rowIndex, columnIndex)   | `string` `function` | --         | --                 |--                 |
| rowStyle             | 行样式 function(row, rowIndex)                        | `string` `function` | --         | --                 |--                 |
| cellClassName        | 列类名称 function(row, column, rowIndex, columnIndex) | `string` `function` | --         | --                 |--                 |
| rowClassName         | 行类名称 function(row, rowIndex)                      | `string` `function` | --         | --                 |--                 |
| skin                 | 风格                                                  | `string`            | --         | `line` `row` `nob` |--                 |
| expand-index         | 展开所在列                                            | `number`            | --         | --                 |--                 |
| default-expand-all   | 默认展开所有列                                        | `boolean`           | `false`    | `true` `false`     |--                 |
| expand-keys          | 展开的列                                              | `array`             | `[]`       | --                 |--                 |
| span-method          | 合并算法                                              | `function`          | --         | --                 |`1.4.0`                 |
| getCheckboxProps     | 多选行属性                                            | `function`          | --         | --                 |`1.4.0`                 |
| getRadioProps        | 单选行属性                                            | `function`          | --         | --                 |`1.4.0`                 |

:::

::: title Table 事件
:::

::: table

| 属性            | 描述   | 参数          |
| --------------- | ------ | ------------- |
| row             | 行单击 | data : 当前行 |
| row-double      | 行双击 | data : 当前行 |
| row-contextmenu | 行右击 | data : 当前行 |
| change          | 分页事件 | { current: 当前页码, limit: 每页数量 } |
:::

::: title Table 插槽
:::

::: table

| 插槽    | 描述          | 参数 | 版本 |
| ------- | ------------ | ---- |----  |
| toolbar | 自定义工具栏  | --   |--    |
| footer  | 底部扩展      | --   | `1.4.4` |

:::

### <div id="tableColumn"></div>

::: title Table 数据
:::

::: table

| 插槽            | 描述                           | 类型      | 默认值  | 可选值                      | 版本                      |
| --------------- | ------------------------------ | --------- | ------- | --------------------------- | --------------------------- |
| title           | 列标题                         | --        | --      | --                          | --                          |
| key             | 数据字段                       | --        | --      | --                          | --                          |
| customSlot      | 自定义插槽                     | --        | --      | --                          | --                          |
| width           | 宽度                           | --        | --      | --                          | --                          |
| minWidth        | 最小宽度                       | --        | `100px` | --                          | --                          |
| sort            | 排序                           | --        | --      | --                          | --                          |
| titleSlot       | 标题插槽                       | --        | --      | --                          | --                          |
| align           | 对齐方式                       | `string`  | `left`  | `left` `right` `center`     | --                          |
| ellipsisTooltip | 当内容过长被隐藏时显示 tooltip | `boolean` | `false` | `true` `false`              | --                          |
| fixed           | 列固定                         | `string`  | --      | `left` `right`              | --                          |
| type            | 列类型                         | `string`  | --      | `number` `checkbox` `radio` | --                          |
| children        | 表头分组                         | `string`  | --      | `number` `checkbox` `radio` | `1.4.0`                          |

:::

::: contributor table
:::

::: previousNext table
:::
