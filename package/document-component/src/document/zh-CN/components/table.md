::: anchor
:::

::: title 基本介绍
:::

::: describe 以表格的承载方式对数据进行渲染、重载、排序、统计、分页等等一系列交互操作，并提供了丰富的 API 用于扩展，基本涵盖了日常业务所涉及的大部分需求。
:::

::: title 综合演示
:::

::: demo 所有示例中演示的数据均为「静态模拟数据」，实际使用时换成您的真实接口即可。

<template>
  <lay-table 
      height="300px"
      :default-toolbar="true"
      :columns="columns" 
      :loading="loading"
      :data-source="dataSource" 
      :page="page" 
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
</template>

<script>
import { ref, watch, reactive } from 'vue';
import { layer } from '@layui/layui-vue';

export default {
  setup() {

    const loading = ref(false);

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
      layer.msg(`字段${key} - 排序${sort}`)
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
      remove
    }
  }
}
</script>

:::

::: title 嵌套表单
:::

::: demo

<template>
  <lay-table :columns="columns2" :data-source="dataSource2" v-model:expandKeys="expandKeys2">
    <template v-slot:expand="{ data }"> 
      <div class="expand-content">
        <lay-progress :percent="data.chinese" theme="red" :show-text="true" text="语文"></lay-progress>
        <lay-progress :percent="data.mathematics" theme="orange" :show-text="true" text="数学"></lay-progress>
        <lay-progress :percent="data.english" theme="green" :show-text="true" text="英语"></lay-progress>
        <lay-progress :percent="data.organism" theme="cyan" :show-text="true" text="生物"></lay-progress>
        <lay-progress :percent="data.geography" theme="blue" :show-text="true" text="地理"></lay-progress>
        <lay-progress :percent="data.history" theme="black" :show-text="true" text="历史"></lay-progress>
        <lay-progress :percent="data.politics" color="#a233c6" :show-text="true" text="政治"></lay-progress>
      </div>
    </template>
  </lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns2 = [
      { title:"编号", width:"80px", key:"id", fixed: "left", sort: "desc" },
      { title:"姓名", width:"80px", key:"name" },
      { title:"班级", width:"120px", key:"classes" },
      { title:"语文", width:"80px", key:"chinese" },
      { title:"数学", width:"80px", key:"mathematics" },
      { title:"英语", width:"80px", key:"english" },
      { title:"生物", width:"80px", key:"organism" },
      { title:"地理", width:"80px", key:"geography" },
      { title:"历史", width:"80px", key:"history" },
      { title:"政治", width:"80px", key:"politics" },
      { title:"总分", width: "180px", key:"score" }
    ]

    const dataSource2 = [
      {id:"1", name:"张三1", classes:"六年级一班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:454},
      {id:"2", name:"张三2", classes:"六年级二班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:432},
      {id:"3", name:"张三3", classes:"六年级三班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:534},
      {id:"4", name:"张三4", classes:"六年级四班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:342},
      {id:"5", name:"张三5", classes:"六年级五班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:653},
      {id:"6", name:"张三6", classes:"六年级六班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:632},
    ]

    const expandKeys2 = ref(["1"])
    const defaultExpandAll2 = ref(false)

    return {
      columns2,
      dataSource2,
      expandKeys2,
      defaultExpandAll2
    }
  }
}
</script>

<style lang="less">
.expand-content {
  width: 100%;
  padding: 0px 20px 20px 0px;
  .layui-progress {
    margin-top: 24px;
  }
}
</style>

:::

::: title 选中数据
:::

::: demo

<template>
  <lay-table 
      height="300px" 
      ref="tableRef3" 
      :columns="columns3" 
      :data-source="dataSource3" 
      :default-toolbar="true"
      v-model:selectedKeys="selectedKeys3">
    <template #toolbar>
      <lay-button type="primary" size="sm" @click="getSelectedKeys3">获取选中主键</lay-button>
      <lay-button size="sm" @click="getCheckData3">获取选中数据</lay-button>
      <lay-button size="sm" @click="changeSelectedKeys3">修改选中数据</lay-button>
      <lay-button size="sm" @click="clearSelectedKeys3">清空选中数据</lay-button>
    </template>
  </lay-table>
</template>

<script>
import { ref } from 'vue';
import { layer } from "@layui/layui-vue";

export default {
  setup() {

    const tableRef3 = ref();

    const selectedKeys3 = ref(["2", "3", "6", "7"]);

    const changeSelectedKeys3 = () => {
      selectedKeys3.value = ["1", "2", "3"]
    }

    const clearSelectedKeys3 = () => {
      selectedKeys3.value = []
    }

    const getSelectedKeys3 = () => {
      layer.msg(selectedKeys3.value);
    }

    const getCheckData3 = () => {
      layer.msg(tableRef3.value.getCheckData());
    }

    const columns3 = [
      {
        fixed: "left",
        type: "checkbox",
      },
      {
        title:"用户",
        width:"80px",
        key:"name",
        fixed: "left"
      },{
        title:"城市",
        width: "80px",
        key:"city"
      },{
        title:"性别",
        key:"sex",
        width: "80px"
      },{
        title:"年龄",
        width: "80px",
        key:"age"
      },{
        title:"积分",
        width: "80px",
        key:"score"
      },{
        title:"签到",
        width: "80px",
        key:"sign"
      },{
        title:"加入时间",
        width: "120px",
        key:"joinTime"
      },{
        title:"签名",
        width: "300px",
        key:"remark"
      }
    ]

    const dataSource3 = ref([
      {id:"1", name:"张三1", city: "城市-1", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"2", name:"张三2", city: "城市-2", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"3", name:"张三3", city: "城市-3", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"4", name:"张三4", city: "城市-4", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"5", name:"张三5", city: "城市-5", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"6", name:"张三6", city: "城市-6", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"7", name:"张三7", city: "城市-7", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"8", name:"张三8", city: "城市-8", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"9", name:"张三9", city: "城市-9", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"10", name:"张三10", city: "城市-10", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"11", name:"张三11", city: "城市-11", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"12", name:"张三12", city: "城市-12", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"13", name:"张三13", city: "城市-13", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"14", name:"张三14", city: "城市-14", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"15", name:"张三15", city: "城市-15", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"16", name:"张三16", city: "城市-16", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"17", name:"张三17", city: "城市-17", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"18", name:"张三18", city: "城市-18", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
    ])

    return {
      columns3,
      dataSource3,
      selectedKeys3,
      getSelectedKeys3,
      getCheckData3,
      tableRef3,
      changeSelectedKeys3,
      clearSelectedKeys3
    }
  }
}
</script>

:::

::: title 开启排序
:::

::: demo

<template>
  <lay-table :columns="columns4" :data-source="dataSource4" @sort-change="sortChange4"></lay-table>
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

    const sortChange4 = (columnName, order) => {
      console.log( columnName + "字段执行了" + order + "排序")
    }

    return {
      columns4,
      dataSource4,
      sortChange4
    }
  }
}
</script>

:::

::: title 开启子表
:::

::: demo 当表格内容较多不能一次性完全展示时, 你可以将多余内容展示到 `expand` 插槽。

<template>
  <lay-table :columns="columns6" :data-source="dataSource6" v-model:expandKeys="expandKeys6">
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
  <lay-button @click="changeExpandAll7">切换 {{ expandKeys7 }}</lay-button>
  <lay-table :columns="columns7" :data-source="dataSource7" :default-expand-all="expandAll7" v-model:expandKeys="expandKeys7">
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
        key:"name",
        ellipsisTooltip: true
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
    const expandAll7 = ref(false)
    const changeExpandAll7 = () => {
      expandAll7.value = !expandAll7.value;
    }

    return {
      columns7,
      dataSource7,
      expandKeys7,
      expandAll7,
      changeExpandAll7
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
    :max-height="maxHeight"
  >
    <template v-slot:operator="{ data }">
      <lay-button size="xs" @click="deleteColumn(data)">删除</lay-button>
    </template>
  </lay-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const maxHeight = ref('300px');

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
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "300px",
        key:"password"
      },{
        fixed:"right",
        title:"性别",
        width: "300px",
        key:"sex"
      },{
        fixed:"right",
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
      {username:"woow", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) '},
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
        width:"500px",
        key:"username"
      },{
        title:"密码",
        width: "500px",
        key:"password"
      },{
        title:"性别",
        key:"sex"
      },{
        title:"年龄",
        width: "600px",
        key:"age"
      },{
        title:"备注",
        width: "380px",
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
        key:"age"
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
      <lay-input v-if="edingKeys.includes(data)" :model-value="data.username" @input="changeUsername($event, data)">
        <template #suffix>
          <lay-icon type="layui-icon-close" style="right:10px;" v-if="edingKeys.includes(data)"  @click="deleteEdit(data)"></lay-icon>
        </template>
      </lay-input>
      <span v-else>
        {{ data.username }} 
        <lay-icon type="layui-icon-edit" style="position: absolute;right: 10px;" v-if="!edingKeys.includes(data)"  @click="editHandle(data)"></lay-icon>
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

    const editHandle = (data) => {
      edingKeys.value.push(data);
    }

    const deleteEdit = (data) => {
      edingKeys.value.splice(edingKeys.value.indexOf(data),1);
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
      },
      {
        title:"地址",
        children: [
          { title: "省", key: "province", width: "300px" },
          { title: "市", key: "city", width: "300px" },
          { title: "区", key: "area", width: "300px" },
        ]
      },
      {
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true,
        fixed: "right",
        children: [
          {
            title:"性别",
            key:"sex"
          },{
            title:"年龄",
            width: "300px",
            totalRow:"统计",
            key:"age"
          }
        ]
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
        
        fixed: "left",
        title:"名称",
        key:"username"
      },{
        title:"地址",
        fixed: "left",
        children: [
          { title: "省",  key: "province"},
          { title: "市", key: "city"},
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
        {id:"1",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) ', xian:"1", cun: "2"},
        {id:"2",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"root",sex:"男", age:"18", remark: 'layui - vue（谐音：类 UI) ', xian:"1", cun: "2"},
        {id:"3",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) ', xian:"1", cun: "2"},
        {id:"4",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) ', xian:"1", cun: "2"},
        {id:"5",username:"就眠儀式",province:"山东",city:"济南",area: "高新区", password:"woow",sex:"男", age:"20", remark: 'layui - vue（谐音：类 UI) ', xian:"1", cun: "2"}
      ];
      loading.value = false;
      },5000)
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
  <lay-table 
      id="id" 
      :max-height="maxHeight5"
      :columns="columns5" 
      :expand-index="1" 
      :data-source="dataSource5" 
      :checkbox="checkbox5" :page="page5" 
      :default-toolbar="defaultToolbar5"
      :resize="true"
      :autoColsWidth="true"
      v-model:selected-keys="selectedKeys5"  
      @row="rowClick5"
      @change="change555">
    <template v-slot:toolbar>
      <lay-button size="sm" type="primary">新增</lay-button>
      <lay-button size="sm">删除</lay-button>
    </template>
    <template v-slot:name="{ row, column, rowIndex, columnIndex }"> {{ row.name }} </template>
    <template v-slot:name-title>😊</template>
    <template v-slot:operator="{ row }">
      <lay-button size="xs">修改</lay-button>
      <lay-button size="xs" type="primary">删除</lay-button>
    </template>
  </lay-table>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  setup() {

    const selectedKeys5 = ref(['1'])
    const checkbox5 = ref(true)
    const defaultToolbar5 = ref(['export','print','filter'])
    const maxHeight5 = ref('600px');

    const page5 = {
      total: 100,
      limit: 10,
      current: 1
    }

    const columns5 = ref([]);

    const change555 = function(page) {
      console.log(JSON.stringify(page));
    }

    setTimeout(() => {
      columns5.value = [
      {
        title: "序号",
        fixed: "left",
        type: "number",
        width: "50px",
      },
      {
        title:"姓名",
        titleSlot: "name-title",
        customSlot:"name",
        key:"name",
      },
      {
        title:"年龄",
        key:"age",
        ellipsisTooltip: true,
      },
      {
        title:"备注",
        key:"remark",
        ellipsisTooltip: true,
      }
      ,{
        title:"操作",
        width:"150px",
        fixed:"right",
        customSlot:"operator",
        key:"operator"
      }
    ]
    }, 2000)

    const dataSource5 = [
      {id:"1", name:"小明", age:"18",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'},
      {id:"2", name:"小红", age:"20",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'},
      {id:"3", name:"小刚", age:"20",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'},
      {id:"4", name:"小李", age:"20",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'},
      {id:"5", name:"小柏", age:"20",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'},
      {id:"6", name:"小吉", age:"20",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'}
    ]

    const rowClick5 = function(data) {
      console.log(JSON.stringify(data))
    }
    
    const rowDoubleClick5 = function(data) {
      console.log(JSON.stringify(data))
    }

    watch(selectedKeys5, () => {
      console.log("复选框监听:" + selectedKeys5.value);
    })

    return {
      columns5,
      dataSource5,
      selectedKeys5,
      checkbox5,
      defaultToolbar5,
      rowClick5,
      rowDoubleClick5,
      page5,
      change555
    }
  }
}
</script>

:::


::: title Table 属性
:::

::: table

| 属性                 | 描述                                                       | 类型                | 默认值     | 可选值                                       | 
| -------------------- | --------------------------------------------------------- | ------------------- | ---------- | -------------------------------------------- | 
| columns              | 列配置，具体详见 [更多](#tableColumn)                       | --                  | --         | --                                           | 
| dataSource           | 数组数组                                                   | --                  | --         | --                                           | 
| id                   | 数据主键                                                   | `string`            | --         | --                                           | 
| v-model:selectedKeys | 复选框选中项                                                | --                  | --         | --                                           | 
| v-model:selectedKey  | 单选框选中项                                                | --                  | --         | --                                           | 
| default-toolbar      | 工具栏                                                     | `boolean` `array`   | `false`    | `true` `false` `['filter','export','print']` | 
| size                 | 表格大小                                                   | `string`            | `md`       | `lg` `md` `sm`                               | 
| children-column-name | 指定树形结构的列名                                          | `string`            | `children` | --                                           | 
| indent-size          | 指定树形结构的缩进距离                                       | `number`            | `30`       | --                                           | 
| height               | 表格高度                                                   | `number`            | --         | --                                           | 
| maxHeight            | 表格最大高度                                               | `number`            | --         | --                                           | 
| even                 | 开启斑马条纹                                               | `boolean`           | `false`    | `true` `false`                               | 
| cellStyle            | 单元格样式 function(row, column, rowIndex, columnIndex)    | `string` `function` | --         | --                                           | 
| rowStyle             | 表格行样式 function(row, rowIndex)                         | `string` `function` | --         | --                                           | 
| cellClassName        | 单元格类名 function(row, column, rowIndex, columnIndex)    | `string` `function` | --         | --                                           | 
| rowClassName         | 表格行类名 function(row, rowIndex)                         | `string` `function` | --         | --                                           | 
| skin                 | 指定风格                                                    | `string`           | --         | `line` `row` `nob`                           |
| expand-index         | 指定展开操作所在列的索引，使用 children 字段或 expand 插槽时有效 | `number`          | --         | --                                           | 
| default-expand-all   | 初始时，是否展开所有行                                      | `boolean`           | `false`    | `true` `false`                               | 
| expand-keys          | 展开行，控制属性                                            | `array`             | `[]`       | --                                           | 
| span-method          | 单元格合并算法                                              | `function`          | --         | --                                           | 
| getCheckboxProps     | 复选框的默认属性配置                                         | `function`          | --         | --                                           | 
| getRadioProps        | 单选框的默认属性配置                                         | `function`          | --         | --                                           | 
| resize               | 开启列宽拉伸                                                | `boolean`           | `false`    | `true` `false`                               | 
| autoColsWidth        | 启用后，根据内容自动计算列宽                                 | `boolean`           | `false`    | `true` `false`                               | 
| defaultToolbar       | 是否启用默认工具栏                                          | `boolean`           | `false`    | `true` `false`                               | 
| loading              | 是否开启加载动画                                            | `boolean`           | `false`    | `true` `false`                               | 
 
:::

::: title Table 事件
:::

::: table

| 属性            | 描述     | 参数                                   |
| --------------- | -------- | -------------------------------------- |
| row             | 行单击   | { row: 当前行数据 }                    |
| row-double      | 行双击   | { row: 当前行数据 }                    |
| row-contextmenu | 行右击   | { row: 当前行数据 }                    |
| change          | 分页事件 | { current: 当前页码, limit: 每页数量 } |

:::

::: title Table 插槽
:::

::: table

| 插槽       | 描述         | 参数                                                                                                                                                    | 版本    |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| toolbar    | 自定义工具栏 | --                                                                                                                                                      | --      |
| footer     | 底部扩展     | --                                                                                                                                                      | `1.4.4` |
| expand     | 嵌套面板     | { row } 在 1.8.6 版本，data 参数由 row 替代，但 data 仍然可用                                                                                           | `1.4.4` |
| customSlot | 自定义列插槽 | { row，rowIndex，column，columnIndex } 在 1.8.6 版本，data 参数由 row 替代，但 data 仍然可用，新增 rowIndex 行索引 columnIndex 列索引 column 列信息参数 | `1.4.4` |

:::

### <div id="tableColumn"></div>

::: title Table 数据
:::

::: table

| 插槽            | 描述                           | 类型      | 默认值  | 可选值                      | 版本    |
| --------------- | ------------------------------ | --------- | ------- | --------------------------- | ------- |
| title           | 列标题                         | --        | --      | --                          | --      |
| key             | 数据字段                       | --        | --      | --                          | --      |
| customSlot      | 自定义插槽                     | --        | --      | --                          | --      |
| width           | 宽度                           | --        | --      | --                          | --      |
| minWidth        | 最小宽度                       | --        | `100px` | --                          | --      |
| sort            | 排序                           | --        | --      | --                          | --      |
| titleSlot       | 标题插槽                       | --        | --      | --                          | --      |
| align           | 对齐方式                       | `string`  | `left`  | `left` `right` `center`     | --      |
| ellipsisTooltip | 当内容过长被隐藏时显示 tooltip | `boolean` | `false` | `true` `false`              | --      |
| fixed           | 列固定                         | `string`  | --      | `left` `right`              | --      |
| type            | 列类型                         | `string`  | --      | `number` `checkbox` `radio` | --      |
| children        | 表头分组                       | `string`  | --      | `number` `checkbox` `radio` | `1.4.0` |
| resize          | 单元格列宽拖动                 | `boolean` | `false` | `true` `false`              | `1.9.4` |

:::

::: previousNext table
:::
