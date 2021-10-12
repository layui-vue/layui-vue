<template>
  <div>
    <table id="test" class="layui-hide" lay-filter="test" />
    <div
      class="layui-form layui-border-box layui-table-view layui-table-view-1"
    >
      <div v-if="defaultToolbar || slot.toolbar" class="layui-table-tool">
        <div class="layui-table-tool-temp">
          <div class="layui-btn-container">
            <slot name="toolbar" />
          </div>
        </div>
        <div v-if="defaultToolbar" class="layui-table-tool-self">
          <div class="layui-inline" title="筛选列" lay-event="LAYTABLE_COLS">
            <i class="layui-icon layui-icon-cols" />
          </div>
          <div class="layui-inline" title="导出" lay-event="LAYTABLE_EXPORT">
            <i class="layui-icon layui-icon-export" />
          </div>
          <div class="layui-inline" title="打印" lay-event="LAYTABLE_PRINT">
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
                      v-model="allSelectedKeys"
                      skin="primary"
                      label="all"
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
                      <lay-checkbox
                        v-model="tableSelectedKeys"
                        skin="primary"
                        :label="data[id]"
                      />
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
<script setup name="LayTable" lang="ts">
import {
  defineProps,
  ref,
  useSlots,
  watch,
  withDefaults,
  defineEmits,
  computed,
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
    selectedKeys: Array<string>
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

const allSelectedKeys = ref([])
const tableSelectedKeys = ref(props.selectedKeys)

watch(
  allSelectedKeys,
  function (val: string[]) {
    const ids = props.dataSource.map((item: any) => {
      return item[props.id]
    })
    tableSelectedKeys.value.splice(0, ids.length)
    if (val.includes('all')) {
      ids.forEach((id) => {
        tableSelectedKeys.value.push(id)
      })
    }
  },
  { deep: true }
)

const emit = defineEmits(['change', 'changeSelectedKeys'])

const slot = useSlots()
const slots = slot.default && slot.default()

const change = function (page: any) {
  emit('change', page)
}
</script>
