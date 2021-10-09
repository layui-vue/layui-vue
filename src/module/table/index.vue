<template>
  <div id="LAY_preview">
    <table class="layui-hide" id="test" lay-filter="test"></table>
    <div
      class="layui-form layui-border-box layui-table-view layui-table-view-1"
      lay-filter="LAY-TABLE-FORM-DF-1"
      lay-id="test"
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
                <th
                  data-field="0"
                  data-key="1-0-0"
                  data-unresize="true"
                  class="layui-table-col-special"
                >
                  <div
                    class="
                      layui-table-cell
                      laytable-cell-1-0-0 laytable-cell-checkbox
                    "
                  >
                    <input
                      type="checkbox"
                      name="layTableCheckbox"
                      lay-skin="primary"
                      lay-filter="layTableAllChoose"
                    />
                    <div
                      class="layui-unselect layui-form-checkbox"
                      lay-skin="primary"
                    >
                      <i class="layui-icon layui-icon-ok"></i>
                    </div>
                  </div>
                </th>
                <th
                  data-field="id"
                  data-key="1-0-1"
                  data-unresize="true"
                  class="layui-unselect"
                >
                  <div class="layui-table-cell laytable-cell-1-0-1">
                    <span>ID</span
                    ><span class="layui-table-sort layui-inline"
                      ><i
                        class="layui-edge layui-table-sort-asc"
                        title="升序"
                      ></i
                      ><i
                        class="layui-edge layui-table-sort-desc"
                        title="降序"
                      ></i
                    ></span>
                  </div>
                </th>
                <th data-field="username" data-key="1-0-2" class="">
                  <div class="layui-table-cell laytable-cell-1-0-2">
                    <span>用户名</span>
                  </div>
                </th>
                <th data-field="email" data-key="1-0-3" class="">
                  <div class="layui-table-cell laytable-cell-1-0-3">
                    <span>邮箱</span>
                  </div>
                </th>
                <th
                  data-field="experience"
                  data-key="1-0-4"
                  class="layui-unselect"
                >
                  <div class="layui-table-cell laytable-cell-1-0-4">
                    <span>积分</span
                    ><span class="layui-table-sort layui-inline"
                      ><i
                        class="layui-edge layui-table-sort-asc"
                        title="升序"
                      ></i
                      ><i
                        class="layui-edge layui-table-sort-desc"
                        title="降序"
                      ></i
                    ></span>
                  </div>
                </th>
                <th data-field="sex" data-key="1-0-5" class="layui-unselect">
                  <div class="layui-table-cell laytable-cell-1-0-5">
                    <span>性别</span
                    ><span class="layui-table-sort layui-inline"
                      ><i
                        class="layui-edge layui-table-sort-asc"
                        title="升序"
                      ></i
                      ><i
                        class="layui-edge layui-table-sort-desc"
                        title="降序"
                      ></i
                    ></span>
                  </div>
                </th>
                <th data-field="logins" data-key="1-0-6" class="layui-unselect">
                  <div class="layui-table-cell laytable-cell-1-0-6">
                    <span>登入次数</span
                    ><span class="layui-table-sort layui-inline"
                      ><i
                        class="layui-edge layui-table-sort-asc"
                        title="升序"
                      ></i
                      ><i
                        class="layui-edge layui-table-sort-desc"
                        title="降序"
                      ></i
                    ></span>
                  </div>
                </th>
                <th data-field="sign" data-key="1-0-7" class="">
                  <div class="layui-table-cell laytable-cell-1-0-7">
                    <span>签名</span>
                  </div>
                </th>
                <th data-field="city" data-key="1-0-8" class="">
                  <div class="layui-table-cell laytable-cell-1-0-8">
                    <span>城市</span>
                  </div>
                </th>
                <th data-field="ip" data-key="1-0-9" class="">
                  <div class="layui-table-cell laytable-cell-1-0-9">
                    <span>IP</span>
                  </div>
                </th>
                <th data-field="joinTime" data-key="1-0-10" class="">
                  <div class="layui-table-cell laytable-cell-1-0-10">
                    <span>加入时间</span>
                  </div>
                </th>
                <th
                  data-field="11"
                  data-key="1-0-11"
                  class="layui-table-col-special"
                >
                  <div class="layui-table-cell laytable-cell-1-0-11">
                    <span>操作</span>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="layui-table-body layui-table-main">
          <table cellspacing="0" cellpadding="0" border="0" class="layui-table">
            <tbody>
              <tr data-index="0" class="">
                <td
                  data-field="0"
                  data-key="1-0-0"
                  class="layui-table-col-special"
                >
                  <div
                    class="
                      layui-table-cell
                      laytable-cell-1-0-0 laytable-cell-checkbox
                    "
                  >
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
                <td data-field="id" data-key="1-0-1" class="">
                  <div class="layui-table-cell laytable-cell-1-0-1">10001</div>
                </td>
                <td
                  data-field="username"
                  data-key="1-0-2"
                  data-edit="text"
                  class=""
                >
                  <div class="layui-table-cell laytable-cell-1-0-2">杜甫</div>
                </td>
                <td
                  data-field="email"
                  data-key="1-0-3"
                  data-edit="text"
                  data-content="test@email.com"
                  class=""
                >
                  <div class="layui-table-cell laytable-cell-1-0-3">
                    <em>test@email.com</em>
                  </div>
                </td>
                <td data-field="experience" data-key="1-0-4" class="">
                  <div class="layui-table-cell laytable-cell-1-0-4">116</div>
                </td>
                <td data-field="sex" data-key="1-0-5" data-edit="text" class="">
                  <div class="layui-table-cell laytable-cell-1-0-5">男</div>
                </td>
                <td data-field="logins" data-key="1-0-6" class="">
                  <div class="layui-table-cell laytable-cell-1-0-6">108</div>
                </td>
                <td data-field="sign" data-key="1-0-7" class="">
                  <div class="layui-table-cell laytable-cell-1-0-7">
                    点击此处，显示更多。当内容超出时，点击单元格会自动显示更多内容。
                  </div>
                </td>
                <td data-field="city" data-key="1-0-8" class="">
                  <div class="layui-table-cell laytable-cell-1-0-8">
                    浙江杭州
                  </div>
                </td>
                <td data-field="ip" data-key="1-0-9" class="">
                  <div class="layui-table-cell laytable-cell-1-0-9">
                    192.168.0.8
                  </div>
                </td>
                <td data-field="joinTime" data-key="1-0-10" class="">
                  <div class="layui-table-cell laytable-cell-1-0-10">
                    2016-10-14
                  </div>
                </td>
                <td
                  data-field="11"
                  data-key="1-0-11"
                  data-off="true"
                  class="layui-table-col-special"
                >
                  <div class="layui-table-cell laytable-cell-1-0-11">
                    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                    <a
                      class="layui-btn layui-btn-danger layui-btn-xs"
                      lay-event="del"
                      >删除</a
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="layui-table-page">
      <div id="layui-table-page1">
           <lay-page total="100" limit="10" showPage showLimit showSkip></lay-page>
      </div>
    </div>
  </div>
</template>
<script setup name="LayTable" lang="ts">
import { defineProps, defineEmits } from 'vue'

const props =
  defineProps<{
    columns?: Object[]
    data?: Object[]
  }>()
</script>
<style>

</style>
