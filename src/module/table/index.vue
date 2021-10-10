<template>
  <div>
    <table class="layui-hide" id="test" lay-filter="test"></table>
    <div
      class="layui-form layui-border-box layui-table-view layui-table-view-1"
    >
      <div class="layui-table-tool" v-if="defaultToolbar || slot.toolbar">
        <div class="layui-table-tool-temp">
          <div class="layui-btn-container">
            <slot name="toolbar"></slot>
          </div>
        </div>
        <div class="layui-table-tool-self" v-if="defaultToolbar">
          <div class="layui-inline" title="筛选列" lay-event="LAYTABLE_COLS">
            <i class="layui-icon layui-icon-cols"></i>
          </div>
          <div class="layui-inline" title="导出" lay-event="LAYTABLE_EXPORT">
            <i class="layui-icon layui-icon-export"></i>
          </div>
          <div class="layui-inline" title="打印" lay-event="LAYTABLE_PRINT">
            <i class="layui-icon layui-icon-print"></i>
          </div>
        </div>
      </div>
      <div class="layui-table-box">
        <div class="layui-table-header">
          <table cellspacing="0" cellpadding="0" border="0" class="layui-table">
            <thead>
              <tr>
                <th class="layui-table-col-special" v-if="checkbox">
                  <div class="layui-table-cell laytable-cell-checkbox">
                    <lay-checkbox skin="primary" v-model="tableSelectedKeys" label="all"></lay-checkbox>
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
                  <td class="layui-table-col-special" v-if="checkbox">
                    <div class="layui-table-cell laytable-cell-checkbox">
                      <lay-checkbox skin="primary" v-model="tableSelectedKeys" :label="data[id]"></lay-checkbox>
                    </div>
                  </td>

                  <template v-for="column in columns" :key="column">
                    <template v-if="column.customSlot">
                      <td>
                        <div
                          :style="{ width: column.width }"
                          style="padding: 0px 16px"
                        >
                          <slot :name="column.customSlot" :data="data"></slot>
                        </div>
                      </td>
                    </template>

                    <template
                      v-else
                      v-for="(value, key, index) in data"
                      :key="index"
                    >
                      <td v-if="column.key == key">
                        <div
                          :style="{ width: column.width }"
                          style="padding: 0px 16px"
                        >
                          <span v-if="column.slot">
                            <slot :name="column.slot" :data="data"></slot>
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
          @jump="change"
          showPage
          showLimit
          showSkip
        ></lay-page>
      </div>
    </div>
  </div>
</template>
<script setup name="LayTable" lang="ts">
import { defineProps, ref, useSlots, watch, withDefaults, defineEmits } from 'vue'

const props = withDefaults(
  defineProps<{
    columns?: Object[]
    dataSource?: Object[]
    skin?: string
    page?: Object
    defaultToolbar?: Boolean
    checkbox?: Boolean
    id?: string,
    selectedKeys: Array<String>
  }>(),
  {
    id: "id",
    selectedKeys: function() { return [] }
  }
)

const tableSelectedKeys = ref(props.selectedKeys)

const emit = defineEmits(['change'])

const slot = useSlots()
const slots = slot.default && slot.default()

const change = function (page: any) {
  emit('change', page)
}
</script>