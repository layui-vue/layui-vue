<template>
  <div id="lay-table">
    <table class="layui-hide" lay-filter="test" />
    <div
      class="layui-form layui-border-box layui-table-view layui-table-view-1"
    >
      <div v-if="defaultToolbar || slot.toolbar" class="layui-table-tool">
        <div v-if="slot.toolbar" class="layui-table-tool-temp">
          <slot name="toolbar"></slot>
        </div>
        <div v-if="defaultToolbar" class="layui-table-tool-self">
          <div
            class="layui-inline"
            title="打印"
            lay-event="LAYTABLE_PRINT"
            @click="print()"
          >
            <i class="layui-icon layui-icon-print" />
          </div>
        </div>
      </div>
      <div class="layui-table-box">
        <div class="layui-table-header">
          <table cellspacing="0" cellpadding="0" border="0" class="layui-table">
            <thead>
              <tr>
                <th v-if="checkbox" class="layui-table-col-special">
                  <div class="layui-table-cell laytable-cell-checkbox">
                    <lay-checkbox
                      v-model:checked="allChecked"
                      skin="primary"
                      label="all"
                      @change="changeAll"
                    />
                  </div>
                </th>
                <th v-for="column in columns" :key="column">
                  <div
                    class="layui-table-cell"
                    :style="{ width: column.width }"
                  >
                    <span>{{ column.title }}</span>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="layui-table-body layui-table-main">
          <table cellspacing="0" cellpadding="0" border="0" class="layui-table">
            <tbody>
              <template v-for="data in dataSource" :key="data">
                <tr>
                  <td v-if="checkbox" class="layui-table-col-special">
                    <div class="layui-table-cell laytable-cell-checkbox">
                      <table-item-checkbox
                        v-model="tableSelectedKeys"
                        skin="primary"
                        :label="data[id]"
                      >
                      </table-item-checkbox>
                    </div>
                  </td>
                  <template v-for="column in columns" :key="column">
                    <template v-if="column.customSlot">
                      <td>
                        <div
                          :style="{ width: column.width }"
                          style="padding: 0px 16px"
                        >
                          <slot :name="column.customSlot" :data="data" />
                        </div>
                      </td>
                    </template>

                    <template
                      v-for="(value, key, index) in data"
                      v-else
                      :key="index"
                    >
                      <td v-if="column.key == key">
                        <div
                          :style="{ width: column.width }"
                          style="padding: 0px 16px"
                        >
                          <span v-if="column.slot">
                            <slot :name="column.slot" :data="data" />
                          </span>
                          <span v-else> {{ value }} </span>
                        </div>
                      </td>
                    </template>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="page" class="layui-table-page">
        <lay-page
          :total="page.total"
          :limit="page.limit"
          show-page
          show-limit
          show-skip
          @jump="change"
        />
      </div>
    </div>
  </div>
</template>
<script setup name="LayTable"></script>
<script setup lang="ts">
import tableItemCheckbox from './component/checkbox.vue'
import {
  defineProps,
  ref,
  useSlots,
  watch,
  withDefaults,
  defineEmits,
} from 'vue'
import { Recordable } from '/@src/module/type'

const props = withDefaults(
  defineProps<{
    id?: string
    skin?: string
    page?: Recordable
    checkbox?: boolean
    columns?: Recordable[]
    dataSource: Recordable[]
    defaultToolbar?: boolean
    selectedKeys?: Array<string>
  }>(),
  {
    id: 'id',
    dataSource: function () {
      return []
    },
    selectedKeys: function () {
      return []
    },
  }
)

const emit = defineEmits(['change', 'update:selectedKeys'])

const slot = useSlots()
const slots = slot.default && slot.default()

const allChecked = ref(false)
const tableSelectedKeys = ref([...props.selectedKeys])

const changeAll = function ({ checked, value }: any) {
  const ids = props.dataSource.map((item: any) => {
    return item[props.id]
  })
  tableSelectedKeys.value.splice(0, ids.length)
  if (checked) {
    ids.forEach((id) => {
      tableSelectedKeys.value.push(id)
    })
  }
  emit('update:selectedKeys', tableSelectedKeys.value)
}

watch(
  tableSelectedKeys,
  function () {
    if (tableSelectedKeys.value.length === props.dataSource.length) {
      allChecked.value = true
    } else {
      allChecked.value = false
    }
    emit('update:selectedKeys', tableSelectedKeys.value)
  },
  { deep: true }
)

const change = function (page: any) {
  emit('change', page)
}

const print = function () {
  let subOutputRankPrint = document.getElementById('lay-table') as HTMLElement
  let newContent = subOutputRankPrint.innerHTML
  let oldContent = document.body.innerHTML
  document.body.innerHTML = newContent
  window.print()
  window.location.reload()
  document.body.innerHTML = oldContent
}
</script>
