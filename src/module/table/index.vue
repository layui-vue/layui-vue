<template>
  <div>
    <table class="layui-hide" id="test" lay-filter="test"></table>
    <div
      class="layui-form layui-border-box layui-table-view layui-table-view-1"
    >
      <div class="layui-table-tool">
        <div class="layui-table-tool-self">
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
                <th class="layui-table-col-special">
                  <div class="layui-table-cell laytable-cell-checkbox">
                    <input
                      type="checkbox"
                      name="layTableCheckbox"
                      lay-skin="primary"
                    />
                    <div
                      class="layui-unselect layui-form-checkbox"
                      lay-skin="primary"
                    >
                      <i class="layui-icon layui-icon-ok"></i>
                    </div>
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
                  <td class="layui-table-col-special">
                    <div class="layui-table-cell laytable-cell-checkbox">
                      <input
                        type="checkbox"
                        name="layTableCheckbox"
                        lay-skin="primary"
                      />
                      <div
                        class="layui-unselect layui-form-checkbox"
                        lay-skin="primary"
                      >
                        <i class="layui-icon layui-icon-ok"></i>
                      </div>
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
      <div class="layui-table-page">
        <lay-page total="100" limit="10" showPage showLimit showSkip></lay-page>
      </div>
    </div>
  </div>
</template>
<script setup name="LayTable" lang="ts">
import { defineProps, useSlots } from 'vue'

const props =
  defineProps<{
    columns?: Object[]
    dataSource?: Object[]
    skin?: string
  }>()

const slot = useSlots()
const slots = slot.default && slot.default()
</script>