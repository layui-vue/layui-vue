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
<div style="height: 800px;">
 <lay-table 
      :page="page" 
      :resize="true"
      :height="'100%'"
      :columns="columns" 
      :loading="loading"
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
</div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue';
import { layer } from '@layui/layui-vue';

const loading = ref(false);

const selectedKeys = ref([]);

const page = reactive({ current: 1, limit: 10, total: 100 });

const columns = ref([
  { title:"选项", width: "55px", type: "checkbox", fixed: "left" },
  { title:"编号", width: "80px", key:"id", fixed: "left", sort: true },
  { title:"姓名", width: "80px", key:"name", sort: true },
  { title:"状态", width: "180px", key:"status", customSlot: "status"},
  { title:"邮箱", width: "120px", key:"email" },
  { title:"性别", width: "80px", key:"sex" },
  { title:"年龄", width: "80px", key:"age", totalRow: true},
  { title:"城市", width: "120px", key:"city" },
  { title:"签名", width: "260px", key:"remark" },
  { title:"隐藏", width: "260px", key:"hide", hide: true, totalRow: "自定义" },
  { title:"时间", width: "120px", key:"joinTime"},
  { title:"操作", width: "150px", customSlot:"operator", key:"operator", fixed: "right", ignoreExport: true }
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
</script>

:::

::: title 展开内容
:::

::: demo 当表格内容较多不能一次性完全展示时, 你可以将多余内容展示到 `expand` 区域。

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

<script setup>
import { ref } from 'vue'

const columns2 = [
  { title:"编号", width:"80px", key:"id", fixed: "left", sort: true },
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

const expandKeys2 = ref([])
const defaultExpandAll2 = ref(false)

</script>

<style>
.expand-content {
  width: 100%;
  padding: 0px 20px 20px 0px;
}

.expand-content .layui-progress{
  margin-top: 24px;
}
</style>

:::

::: title 选中数据
:::

::: demo 通过 `selectedKey` 与 `selectedKeys` 可控属性设置与获取选中项的主键，亦或 `getCheckData` 方法获取选中行的所有内容。

<template>
  <lay-table 
      height="300px" 
      ref="tableRef3" 
      :columns="columns3" 
      :data-source="dataSource3" 
      :default-toolbar="true"
      v-model:selectedKey="selectedKey3"
      v-model:selectedKeys="selectedKeys3">
    <template #toolbar>
      <lay-button type="primary" size="sm" @click="getSelectedKeys3">获取选中主键</lay-button>
      <lay-button size="sm" @click="getCheckData3">获取选中数据</lay-button>
      <lay-button size="sm" @click="changeSelectedKeys3">修改选中数据</lay-button>
      <lay-button size="sm" @click="clearSelectedKeys3">清空选中数据</lay-button>
    </template>
  </lay-table>
</template>

<script setup>
import { ref } from 'vue';
import { layer } from "@layui/layui-vue";

const tableRef3 = ref();

const selectedKey3 = ref("1");

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
  layer.msg(JSON.stringify(tableRef3.value.getCheckData()));
}   

const columns3 = [
  { fixed: "left", type: "checkbox", title: "复选"},
  { fixed: "left", type: "radio", title: "单选" },
  { title:"用户", width:"80px", key:"name"},
  { title:"城市", width: "80px", key:"city" },
  { title:"性别", key:"sex", width: "80px" },
  { title:"年龄", width: "80px", key:"age" },
  { title:"积分", width: "80px", key:"score" },
  { title:"签到", width: "80px", key:"sign" },
  { title:"加入时间", width: "120px", key:"joinTime" },
  { title:"签名", width: "300px", key:"remark" }
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

</script>

:::

::: title 编辑表格
:::

::: demo 通过 `column` 的 `customSlot` 配置，借助 `data-source` 响应式的特性，完成复杂的编辑表格。

<template>
  <lay-table :columns="columns4" :data-source="dataSource4">
    <template #name="{ row }">
      <lay-input v-model="row.name" />
    </template>
    <template #switch="{ row }">
      <lay-switch v-model="row.switch"></lay-switch>
    </template>
    <template #date="{ row }">
      <lay-date-picker v-model="row.date"></lay-date-picker>
    </template>
    <template #dynasty="{ row }">
      <lay-select v-model="row.dynasty">
        <lay-select-option :value="1" label="清代"></lay-select-option>
        <lay-select-option :value="2" label="唐代"></lay-select-option>
        <lay-select-option :value="3" label="宋代"></lay-select-option>
      </lay-select>
    </template>
    <template #color="{ row }">
      <lay-color-picker v-model="row.color"></lay-color-picker>
    </template>
    <template #motto="{ row }">
      <template v-if="edingKeys4.includes(row)">
        <lay-input v-model="row.motto" @blur="deleteEdit4(row)" />
      </template>
      <template v-else>
        <span @click="editHandle4(row)"> {{ row.motto }} </span>     
      </template>
    </template>
  </lay-table>
</template>

<script setup>
import { ref } from 'vue'

const edingKeys4 = ref([])

const editHandle4 = (data) => {
  edingKeys4.value.push(data);
}

const deleteEdit4 = (data) => {
  edingKeys4.value.splice(edingKeys4.value.indexOf(data),1);
}

const columns4 = [
  {
    title:"编号",
    width:"80px",
    key:"id",
    fixed: "left"
  },{
    title:"用户",
    width: "120px",
    key:"name",
    customSlot: "name"
  },{
    title:"开关",
    width: "50px",
    key:"switch",
    customSlot: "switch"
  },{
    title:"日期",
    width: "140px",
    key:"date",
    customSlot: "date"
  },{
    title:"朝代",
    width: "140px",
    key:"dynasty",
    customSlot: "dynasty"
  },{
    title:"颜色",
    width: "50px",
    key:"color",
    customSlot: "color"
  },{
    title:"输入框",
    width: "220px",
    key:"motto",
    customSlot: "motto",
  }
]

const dataSource4 = [
  {id: 10000, name:"张三-1", switch: true, date: "2020-02-09", color: "#009688", dynasty: 1, motto: "知身无究竟，任运了残年。"},
  {id: 10001, name:"张三-2", switch: true, date: "2020-02-09", color: "#009688", dynasty: 2, motto: "知身无究竟，任运了残年。"},
  {id: 10002, name:"张三-3", switch: true, date: "2020-02-09", color: "#009688", dynasty: 3, motto: "知身无究竟，任运了残年。"},
  {id: 10003, name:"张三-4", switch: true, date: "2020-02-09", color: "#009688", dynasty: 1, motto: "知身无究竟，任运了残年。"},
  {id: 10004, name:"张三-5", switch: true, date: "2020-02-09", color: "#009688", dynasty: 2, motto: "知身无究竟，任运了残年。"},
  {id: 10005, name:"张三-6", switch: true, date: "2020-02-09", color: "#009688", dynasty: 3, motto: "知身无究竟，任运了残年。"},
]

</script>

:::

::: title 多级表头
:::

::: demo 通过 `column` 配置的 `children` 属性嵌套 `column` 配置, 以实现多级表头。

<template>
  <lay-table :default-toolbar="true" :columns="columns5" :data-source="dataSource5"></lay-table>
</template>

<script setup>
import { ref } from 'vue'

const columns5 = [
  {
    title:"编号",
    width:"120px",
    key:"id"
  },
  {
    title:"名称",
    width:"100px",
    key:"name"
  },
  {
    title:"性别",
    width:"100px",
    key:"sex"
  },
  {
    title:"地址",
    children: [
      { title: "省", key: "prov", width: "100px" },
      { title: "市", key: "city", width: "100px" },
      { title: "区", key: "area", width: "100px",
        children: [
          { title: "区1", key: "area1", width: "100px" },
          { title: "区2", key: "area2", width: "100px" },
          { title: "区3", key: "area3", width: "100px" },
        ] 
      },
    ]
  },
  {
    title:"签名",
    width:"240px",
    key:"remark"
  },
]

const dataSource5 = [
  {id:"10001", name:"夏娜1", area1: '区1', area2: "区2", area3: "区3", prov:"浙江", sex:"女", city:"杭州", area: "西湖区", remark: '不知江月待何人，但见长江送流水。'},
  {id:"10002", name:"夏娜2", area1: '区1', area2: "区2", area3: "区3", prov:"浙江", sex:"女", city:"杭州", area: "西湖区", remark: '不知江月待何人，但见长江送流水。'},
  {id:"10003", name:"夏娜3", area1: '区1', area2: "区2", area3: "区3", prov:"浙江", sex:"女", city:"杭州", area: "西湖区", remark: '不知江月待何人，但见长江送流水。'},
  {id:"10004", name:"夏娜4", area1: '区1', area2: "区2", area3: "区3", prov:"浙江", sex:"女", city:"杭州", area: "西湖区", remark: '不知江月待何人，但见长江送流水。'},
  {id:"10005", name:"夏娜5", area1: '区1', area2: "区2", area3: "区3", prov:"浙江", sex:"女", city:"杭州", area: "西湖区", remark: '不知江月待何人，但见长江送流水。'},      
  {id:"10006", name:"夏娜6", area1: '区1', area2: "区2", area3: "区3", prov:"浙江", sex:"女", city:"杭州", area: "西湖区", remark: '不知江月待何人，但见长江送流水。'},
  {id:"10007", name:"夏娜7", area1: '区1', area2: "区2", area3: "区3", prov:"浙江", sex:"女", city:"杭州", area: "西湖区", remark: '不知江月待何人，但见长江送流水。'},
  {id:"10008", name:"夏娜8", area1: '区1', area2: "区2", area3: "区3", prov:"浙江", sex:"女", city:"杭州", area: "西湖区", remark: '不知江月待何人，但见长江送流水。'},
]

</script>

:::

::: title 树形表格
:::

::: demo 数据 `dataSource` 中存在 `children` 字段时会自动展示为树形表格, 使用 `childrenColumnName` 指定默认字段。

<template>
  <lay-table ref="tableRef6" children-column-name="children" :columns="columns6" :data-source="dataSource6" :default-toolbar="true" :default-expand-all="defaultExpandAll6" :expand-index="2">
    <template #toolbar>
      <lay-button type="primary" size="sm" @click="getCheckData6">获取选中数据</lay-button>
      <lay-button size="sm" @click="expandAll6">{{ defaultExpandAll6 ? '收起全部':'全部展开'}}</lay-button>
    </template>
  </lay-table>
</template>

<script setup>
import { ref } from 'vue'

const tableRef6 = ref();

const columns6 = [
  { 
    fixed: "left", 
    type: "checkbox", 
    title: "复选"
  },
  {
    title:"编号",
    width:"100px",
    key:"id"
  },
  {
    title:"名称",
    width:"200px",
    key:"name"
  },
  {
    title:"性别",
    width:"100px",
    key:"sex"
  },
  {
    title:"城市",
    width:"120px",
    key:"city"
  },
  {
    title:"签到",
    width:"100px",
    key:"sign"
  },
  {
    title:"签名",
    width:"240px",
    key:"remark"
  },
]

const dataSource6 = [
  {
    id:"10001", name:"张三 1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。', children: [
      {
        id:"10009", name:"张三 1-1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。', children: [
          {
            id:"10010", name:"张三 1-1-1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。', children: [
              {id:"10029", name:"张三 1-1-1-1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'},
              {id:"10030", name:"张三 1-1-1-2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'}
            ]
          },
          {
            id:"10011", name:"张三 1-1-2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。', children: [
              {id:"10031", name:"张三 1-1-2-1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'},
              {id:"10032", name:"张三 1-1-2-2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'}
            ]
          }
        ]
      },
      {
        id:"10012", name:"张三 1-2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。', children: [
          {id:"10013", name:"张三 1-2-1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'},
          {id:"10014", name:"张三 1-2-2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'}
        ]
      }
    ]
  },
  {
    id:"10002", name:"张三 2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。', children: [
      {id:"10015", name:"张三 2-1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'},
      {id:"10016", name:"张三 2-2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'}
    ]
  },
  {
    id:"10003", name:"张三 3", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。', children: [
      {id:"10017", name:"张三 3-1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'},
      {id:"10018", name:"张三 3-2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'}
    ]
  },
  {
    id:"10004", name:"张三 4", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。', children: [
      {id:"10019", name:"张三 4-1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'},
      {id:"10020", name:"张三 4-2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'}
    ]
  },
  {
    id:"10005", name:"张三 5", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。', children: [
      {id:"10021", name:"张三 5-1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'},
      {id:"10022", name:"张三 5-2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'}
    ]
  },      
  {
    id:"10006", name:"张三 6", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。', children: [
      {id:"10023", name:"张三 6-1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'},
      {id:"10024", name:"张三 6-2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'}
    ]
  },
  {
    id:"10007", name:"张三 7", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。', children: [
      {id:"10025", name:"张三 7-1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'},
      {id:"10026", name:"张三 7-2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'}
    ]
  },
  {
    id:"10008", name:"张三 8", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。', children: [
      {id:"10027", name:"张三 8-1", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'},
      {id:"10028", name:"张三 8-2", sex:"男", age: 22, city: "浙江杭州", sign:"已签到", remark: '人生若只如初见，何事秋风悲画扇。'}
    ]
  }
]

const getCheckData6 = function() {
  layer.msg(JSON.stringify(tableRef6.value.getCheckData()));
}

const defaultExpandAll6 = ref(false);

const expandAll6 = function() {
  defaultExpandAll6.value = !defaultExpandAll6.value;
}

</script>

:::

::: title 行列合并
:::

::: demo 通过 `span-method` 属性, 自定义行列合并的逻辑。

<template>
  <lay-table :columns="columns7" :data-source="dataSource7" :span-method="spanMethod7" :default-toolbar="true"></lay-table>
</template>

<script setup>
import { ref } from 'vue'

const columns7 = [
  { 
    fixed: "left", 
    type: "checkbox", 
    title: "复选"
  },
  {
    title:"编号",
    width:"80px",
    key:"id"
  },
  {
    title:"名称",
    width: "100px",
    key:"name"
  },{
    title:"性别",
    width: "100px",
    key:"sex"
  },{
    title:"年龄",
    width: "100px",
    key:"age"
  },{
    title:"城市",
    width: "100px",
    key:"city"
  },{
    title:"签名",
    width: "240px",
    key:"remark"
  }
]

const dataSource7 = [
  {id:"10001",name:"夏娜-1", email:"test@email.com", city:"北京朝阳", sex:"男", age:"20", remark: '欲买桂花同载酒, 终不似, 少年游。'},
  {id:"10002",name:"夏娜-1", email:"test@email.com", city:"北京朝阳", sex:"男", age:"20", remark: '欲买桂花同载酒, 终不似, 少年游。'},
  {id:"10003",name:"夏娜-2", email:"test@email.com", city:"北京朝阳", sex:"男", age:"21", remark: '欲买桂花同载酒, 终不似, 少年游。'},
  {id:"10004",name:"夏娜-2", email:"test@email.com", city:"北京朝阳", sex:"男", age:"21", remark: '欲买桂花同载酒, 终不似, 少年游。'},
  {id:"10005",name:"夏娜-3", email:"test@email.com", city:"北京朝阳", sex:"男", age:"22", remark: '欲买桂花同载酒, 终不似, 少年游。'},
  {id:"10006",name:"夏娜-3", email:"test@email.com", city:"北京朝阳", sex:"男", age:"22", remark: '欲买桂花同载酒, 终不似, 少年游。'}
]

const spanMethod7 = (
  row,
  column,
  rowIndex,
  columnIndex,
) => {
  if (rowIndex % 2 === 0) {
    if (columnIndex === 2) {
      return [2, 1]
    } 
  } else {
    if (columnIndex === 2) {
      return [0, 0]
    } 
  }
}

</script>

:::

::: title 斑马条纹
:::

::: demo 通过 `even` 属性, 开启表格行斑马条纹, 默认为 `false`。

<template>
  <lay-table :columns="columns8" :data-source="dataSource8" even></lay-table>
</template>

<script setup>
import { ref } from 'vue'

const columns8 = [
  {
    title:"编号",
    width:"80px",
    key:"id"
  },
  {
    title:"用户",
    width:"200px",
    key:"name"
  },{
    title:"邮箱",
    width: "180px",
    key:"email"
  },
  {
    title:"年龄",
    width: "100px",
    key:"age"
  },
  {
    title:"城市",
    width: "180px",
    key:"city"
  },{
    title:"备注",
    width: "400px",
    key:"remark",
    ellipsisTooltip: true,
  }
]

const dataSource8 = [
  {id: "10001", name:"张三1", city: "浙江杭州", email:"test@email.com", age:"18", remark: '以创造性的行为实践于人世。若能以写作为工具，为道途，先帮助自己一程，再以领悟帮助他人一程。这是一种服务'},
  {id: "10002", name:"张三2", city: "浙江杭州", email:"test@email.com", age:"18", remark: '以创造性的行为实践于人世。若能以写作为工具，为道途，先帮助自己一程，再以领悟帮助他人一程。这是一种服务'},
  {id: "10003", name:"张三3", city: "浙江杭州", email:"test@email.com", age:"20", remark: '以创造性的行为实践于人世。若能以写作为工具，为道途，先帮助自己一程，再以领悟帮助他人一程。这是一种服务'},
  {id: "10004", name:"张三4", city: "浙江杭州", email:"test@email.com", age:"20", remark: '以创造性的行为实践于人世。若能以写作为工具，为道途，先帮助自己一程，再以领悟帮助他人一程。这是一种服务'},
  {id: "10005", name:"张三5", city: "浙江杭州", email:"test@email.com", age:"20", remark: '以创造性的行为实践于人世。若能以写作为工具，为道途，先帮助自己一程，再以领悟帮助他人一程。这是一种服务'},
  {id: "10006", name:"张三6", city: "浙江杭州", email:"test@email.com", age:"20", remark: '以创造性的行为实践于人世。若能以写作为工具，为道途，先帮助自己一程，再以领悟帮助他人一程。这是一种服务'},
  {id: "10007", name:"张三7", city: "浙江杭州", email:"test@email.com", age:"20", remark: '以创造性的行为实践于人世。若能以写作为工具，为道途，先帮助自己一程，再以领悟帮助他人一程。这是一种服务'},
  {id: "10008", name:"张三8", city: "浙江杭州", email:"test@email.com", age:"20", remark: '以创造性的行为实践于人世。若能以写作为工具，为道途，先帮助自己一程，再以领悟帮助他人一程。这是一种服务'}
]

</script>

:::

::: title 更多使用
:::

::: demo

<template>
  <lay-table
    :columns="columns9"
    :data-source="dataSource9"
  >
    <template #operator>
      <lay-space direction="vertical" style="width:100%;">
        <lay-input placeholder="表单 1" style="width:100%;" />
        <lay-input placeholder="表单 2" style="width:100%;" />
        <lay-button type="primary" fluid>提交</lay-button>
      </lay-space>
    </template>
  </lay-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
  
const columns9 = [
  {
    title: '签名',
    key: 'remark',
  },
  {
    title: "操作",
    width: "260px",
    customSlot: "operator",
    key: "operator",
  }
]

const dataSource9 = ref([
  {
    remark: '君不见，黄河之水天上来，奔流到海不复回。 君不见，高堂明镜悲白发，朝如青丝暮成雪。 人生得意须尽欢，莫使金樽空对月。 天生我材必有用，千金散尽还复来。 烹羊宰牛且为乐，会须一饮三百杯。 岑夫子，丹丘生，将进酒，杯莫停。 与君歌一曲，请君为我倾耳听。(倾耳听 一作：侧耳听) 钟鼓馔玉不足贵，但愿长醉不复醒。(不足贵 一作：何足贵；不复醒 一作：不愿醒/不用醒) 古来圣贤皆寂寞，惟有饮者留其名。(古来 一作：自古；惟 通：唯) 陈王昔时宴平乐，斗酒十千恣欢谑。 主人何为言少钱，径须沽取对君酌。 五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。',
  },
  {
    remark: '君不见，黄河之水天上来，奔流到海不复回。 君不见，高堂明镜悲白发，朝如青丝暮成雪。 人生得意须尽欢，莫使金樽空对月。 天生我材必有用，千金散尽还复来。 烹羊宰牛且为乐，会须一饮三百杯。 岑夫子，丹丘生，将进酒，杯莫停。 与君歌一曲，请君为我倾耳听。(倾耳听 一作：侧耳听) 钟鼓馔玉不足贵，但愿长醉不复醒。(不足贵 一作：何足贵；不复醒 一作：不愿醒/不用醒) 古来圣贤皆寂寞，惟有饮者留其名。(古来 一作：自古；惟 通：唯) 陈王昔时宴平乐，斗酒十千恣欢谑。 主人何为言少钱，径须沽取对君酌。 五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。',
  },
  {
    remark: '君不见，黄河之水天上来，奔流到海不复回。 君不见，高堂明镜悲白发，朝如青丝暮成雪。 人生得意须尽欢，莫使金樽空对月。 天生我材必有用，千金散尽还复来。 烹羊宰牛且为乐，会须一饮三百杯。 岑夫子，丹丘生，将进酒，杯莫停。 与君歌一曲，请君为我倾耳听。(倾耳听 一作：侧耳听) 钟鼓馔玉不足贵，但愿长醉不复醒。(不足贵 一作：何足贵；不复醒 一作：不愿醒/不用醒) 古来圣贤皆寂寞，惟有饮者留其名。(古来 一作：自古；惟 通：唯) 陈王昔时宴平乐，斗酒十千恣欢谑。 主人何为言少钱，径须沽取对君酌。 五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。',
  }
])
</script>

:::

::: title 开启统计
:::

::: demo 通过 `columns` 配置 `totalRow` 开启行统计。

<template>
  <lay-table :columns="columns2" :data-source="dataSource2" v-model:expandKeys="expandKeys2">
  </lay-table>
</template>

<script setup>
import { ref } from 'vue'

const columns2 = [
  { title:"编号", width:"80px", key:"id", fixed: "left", sort: true},
  { title:"姓名", width:"80px", key:"name" },
  { title:"班级", width:"120px", key:"classes" },
  {
    title: "分数",
    key: "total",
    children: [
      { title:"语文", width:"80px", key:"chinese", totalRow: true },
      { title:"数学", width:"80px", key:"mathematics", totalRow: true  },
      { title:"英语", width:"80px", key:"english", totalRow: true  },
      { title:"生物", width:"80px", key:"organism", totalRow: true  },
      { title:"地理", width:"80px", key:"geography", totalRow: true  },
      { title:"历史", width:"80px", key:"history", totalRow: true  },
      { title:"政治", width:"80px", key:"politics", totalRow: true  },
      { title:"总分", width: "180px", key:"score", totalRow: true  }
    ]
  }
]

const dataSource2 = [
  {id:"1", name:"张三1", classes:"六年级一班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:454},
  {id:"2", name:"张三2", classes:"六年级二班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:432},
  {id:"3", name:"张三3", classes:"六年级三班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:534},
  {id:"4", name:"张三4", classes:"六年级四班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:342},
  {id:"5", name:"张三5", classes:"六年级五班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:653},
  {id:"6", name:"张三6", classes:"六年级六班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:632},
]

const expandKeys2 = ref([])
const defaultExpandAll2 = ref(false)

</script>

<style>
.expand-content {
  width: 100%;
  padding: 0px 20px 20px 0px;
}

.expand-content .layui-progress{
  margin-top: 24px;
}
</style>

:::

::: title 添加工具栏图标
:::

::: demo 通过 `default-toolbar` 新增其他配置。

<template>
  <lay-table :columns="columns11" :data-source="dataSource11" :default-toolbar="defaultToolbars">
  </lay-table>
</template>

<script setup>
import { ref } from 'vue'

const columns11 = [
  { title:"编号", width:"80px", key:"id", fixed: "left", sort: true},
  { title:"姓名", width:"80px", key:"name" },
]

const dataSource11 = [
  {id:"1", name:"张三1"},
  {id:"2", name:"张三2"},
]

const defaultToolbars = [
  "filter",
  {
    icon: "layui-icon-refresh",
    title: "刷新",
    onClick: () => {
      console.log("导出")
    }
  },
  "export",
  "print"
]


</script>

:::

::: title Table 属性
:::

::: table

| 属性                 | 描述                                                             | 类型                | 默认值     | 可选值                                       |
| -------------------- | ---------------------------------------------------------------- | ------------------- | ---------- | -------------------------------------------- |
| columns              | 列配置，具体详见 [更多](#tableColumn)                            | --                  | --         | --                                           |
| dataSource           | 数组数组                                                         | --                  | --         | --                                           |
| id                   | 数据主键                                                         | `string`            | --         | --                                           |
| v-model:selectedKeys | 复选框选中项                                                     | --                  | --         | --                                           |
| v-model:selectedKey  | 单选框选中项                                                     | --                  | --         | --                                           |
| default-toolbar      | 工具栏                                                           | `boolean` `Array<TableDefaultToolbar>`   | `false`    | [TableDefaultToolbar](https://www.layui-vue.com/zh-CN/components/table#Types) `2.22.0` |
| page      | 分页配置 `2.22.0`新增`page.change`      | [TablePageProps](https://www.layui-vue.com/zh-CN/components/table#Types)    |  --   |--  |
| size                 | 表格大小                                                         | `string`            | `md`       | `lg` `md` `sm`                               |
| children-column-name | 指定树形结构的列名                                               | `string`            | `children` | --                                           |
| indent-size          | 指定树形结构的缩进距离                                           | `number`            | `30`       | --                                           |
| height               | 表格高度                                                         | `string`            | --         | --                                           |
| maxHeight            | 表格最大高度                                                     | `string`            | --         | --                                           |
| even                 | 开启斑马条纹                                                     | `boolean`           | `false`    | `true` `false`                               |
| cellStyle            | 单元格样式 function(row, column, rowIndex, columnIndex)          | `string` `function` | --         | --                                           |
| rowStyle             | 表格行样式 function(row, rowIndex)                               | `string` `function` | --         | --                                           |
| cellClassName        | 单元格类名 function(row, column, rowIndex, columnIndex)          | `string` `function` | --         | --                                           |
| rowClassName         | 表格行类名 function(row, rowIndex)                               | `string` `function` | --         | --                                           |
| skin                 | 指定风格                                                         | `string`            | --         | `line` `row` `nob`                           |
| expand-index         | 指定展开操作所在列的索引，使用 children 字段或 expand 插槽时有效 | `number`            | --         | --                                           |
| default-expand-all   | 初始时，是否展开所有行                                           | `boolean`           | `false`    | `true` `false`                               |
| expand-keys          | 展开行，控制属性                                                 | `array`             | `[]`       | --                                           |
| span-method          | 单元格合并算法                                                   | `function`          | --         | --                                           |
| getCheckboxProps     | 复选框的默认属性配置                                             | `function`          | --         | --                                           |
| getRadioProps        | 单选框的默认属性配置                                             | `function`          | --         | --                                           |
| resize               | 开启列宽拉伸                                                     | `boolean`           | `false`    | `true` `false`                               |
| autoColsWidth        | 启用后，根据内容自动计算列宽                                     | `boolean`           | `false`    | `true` `false`                               |
| defaultToolbar       | 是否启用默认工具栏                                               | `boolean`           | `false`    | `true` `false`                               |
| loading              | 是否开启加载动画                                                 | `boolean`           | `false`    | `true` `false`                               |
| emptyDescription     | 当没有数据时，显示的默认文本                                     | `string`            | --         | --                                           |
| initSort `2.18.3`    | 初始排序状态。用于在数据表格渲染完毕时，按某个字段排序显示。`field` 为 `columns.key` ， `type`可传 `''` `asc` `desc`| `object`            | --         | `{ field: name, type: 'asc' }`                                           |

:::

::: title Table 事件
:::

::: table

| 属性            | 描述       | 参数                                   |
| --------------- | ---------- | -------------------------------------- |
| row             | 行单击     | { row: 当前行数据 }                    |
| row-double      | 行双击     | { row: 当前行数据 }                    |
| row-contextmenu | 行右击     | { row: 当前行数据 }                    |
| cell-double     | 单元格双击 | data:当前单元格信息, event             |
| change          | 分页事件。<span style="color: red;">将在未来版本废弃，请替换为`page.change`</span>   | { current: 当前页码, limit: 每页数量 } |
| sort-change     | 点击排序事件   | key: 当前column.key， nextSort: 排序字段                 |
| expand-change  `2.18.0`   | 行展开/收起   | data:当前单元格信息, event        |
| checkbox  `2.22.0`   |  单行 checkbox 事件   | state: 是否选中, data: 点击行数据源  |
| checkbox-all  `2.22.0`   | 全选 checkbox 事件   | selectedKeys: 选中数据        |

:::

::: title Table 插槽
:::

::: table

| 插槽       | 描述              | 参数                                                                                                                                                    | 版本     |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| toolbar    | 自定义工具栏      | --                                                                                                                                                      | --       |
| footer     | 底部扩展          | --                                                                                                                                                      | `1.4.4`  |
| expand     | 嵌套面板          | { row } 在 1.8.6 版本，data 参数由 row 替代，但 data 仍然可用                                                                                           | `1.4.4`  |
| customSlot | 自定义列插槽      | { row，rowIndex，column，columnIndex } 在 1.8.6 版本，data 参数由 row 替代，但 data 仍然可用，新增 rowIndex 行索引 columnIndex 列索引 column 列信息参数 | `1.4.4`  |
| empty      | 无数据时显示的 UI | 此插槽意在替换整个无数据时的显示 UI，如果只是单纯替换文字，保留无数据时的图像，请使用`table`的`emptyDescription`属性                                    | `2.11.6` |
| page      | 分页组件右侧区域 | --                                    | `2.22.0` |

:::

::: title Table 方法
:::

::: table

| 方法         | 描述                                                                                                             | 参数 |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | ---- |
| getCheckData | 当存在 radio 和 checkbox 列时，该方法用于获取选中数据, 如果 radio 与 checkbox 列同时存在，获取去重后的唯一数据。 | --   |

:::

### <div id="tableColumn"></div>

::: title TableColumns
:::

::: table

| 插槽                 | 描述                           | 类型                           | 默认值  | 可选值                      | 版本     |
| -------------------- | ------------------------------ | ------------------------------ | ------- | --------------------------- | -------- |
| title                | 列标题                         | --                             | --      | --                          | --       |
| key                  | 数据字段                       | --                             | --      | --                          | --       |
| customSlot           | 自定义插槽                     | `string` `function` 参数{row, data, column, rowIndex, columnIndex}    | --      | --                          | `2.17.2`新增`function`       |
| width                | 宽度                           | --                             | --      | --                          | --       |
| minWidth             | 最小宽度                       | --                             | `100px` | --                          | --       |
| sort                 | 是否排序，当值为字符串 `custom` 不会触发内部排序逻辑，可通过 `sort-change` 事件自定义/服务端设置排序解结果                          | `boolean`/ `custom`            | `false`      | --                          | --       |
| titleSlot            | 标题自定义插槽                 | `string` `function` 参数{column, columnIndex} | --      | --                          | `2.22.1`新增`function`       |
| align                | 对齐方式                       | `string`                       | `left`  | `left` `right` `center`     | --       |
| ellipsisTooltip      | 当内容过长被隐藏时显示 tooltip | `boolean`                      | `false` | `true` `false`              | --       |
| ellipsisTooltipTheme | tooltip 主题 !!!建议替换为 `ellipsisTooltipProps.isDark` 属性，将在未来版本删除                   | `string`                       | `light` | `dark` `light`              | --       |
| ellipsisTooltipProps `2.22.0` | tooltip props          | [TooltipProps](https://www.layui-vue.com/zh-CN/components/tooltip#Tooltip%20%E5%B1%9E%E6%80%A7)                       | -- | --              | --       |
| fixed                | 列固定                         | `string`                       | --      | `left` `right`              | --       |
| type                 | 列类型                         | `string`                       | --      | `number` `checkbox` `radio` | --       |
| children             | 表头分组                       | `string`                       | --      | `number` `checkbox` `radio` | `1.4.0`  |
| resize               | 单元格列宽拖动                 | `boolean`                      | `false` | `true` `false`              | `1.9.4`  |
| hide                 | 默认是否隐藏                   | `boolean`                      | `false` | `true` `false`              | `1.9.4`  |
| ignoreExport         | 忽略导出                       | `boolean`                      | `false` | `true` `false`              | `2.10.0` |
| totalRow         | 开启统计(传`number` `string`则直接展示)                       | `boolean` `string` `number`   | `false` |               |  |
| totalRowMethod   | 自定义统计                       | `function` 参数{column, dataSource }  |  |           |  |
| exportCellType   | `DefaultToolbar.export` 导出控制单元格类型     | `string`  | `x:str`  |  [type](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-xp/aa140066(v=office.10))    |  |

:::

::: title Types

```ts

interface TablePageProps = {
  current: number;
  limit: number;
  total: number;
  limit?: number;
  theme?: string;
  pages?: number;
  limits?: number[];
  hideOnSinglePage?: boolean;
  ellipsisTooltip?: boolean;
  disabled?: boolean;
  layout?: LayoutKey[];
  change?: (pageData: { current: number; limit: number }) => void;
}

type TableDefaultToolbar =
  | "filter"
  | "export"
  | "print"
  | TableDefaultToolbarComplex;

interface TableDefaultToolbarComplex {
  title: string;
  icon: string;
  onClick?: () => void;
  render?: () => VNode;
}

```

::: previousNext table
:::
