<template>
  <div>
    <div
      class="layui-transfer layui-form layui-border-box"
    >
      <div
        class="layui-transfer-box"
        style="width: 200px; height: 360px"
      >
        <div class="layui-transfer-header">
          <input
            type="checkbox"
            name="layTransferLeftCheckAll"
            lay-filter="layTransferCheckbox"
            lay-type="all"
            lay-skin="primary"
            title="列表一"
          />
          <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
            <span>列表一</span><i class="layui-icon layui-icon-ok"></i>
          </div>
        </div>
        <ul class="layui-transfer-data" style="height: 320px">
          <li>
            <input
              type="checkbox"
              name="layTransferLeftCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="油酥饼"
              value="2"
            />
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
              <span>油酥饼</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferLeftCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="串串香"
              disabled=""
              value="4"
            />
            <div
              class="
                layui-unselect
                layui-form-checkbox
                layui-checkbox-disabled
                layui-disabled
              "
              lay-skin="primary"
            >
              <span>串串香</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferLeftCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="驴打滚"
              value="6"
            />
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
              <span>驴打滚</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferLeftCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="烤冷面"
              value="8"
            />
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
              <span>烤冷面</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferLeftCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="肉夹馍"
              value="10"
            />
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
              <span>肉夹馍</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferLeftCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="凉皮"
              value="12"
            />
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
              <span>凉皮</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferLeftCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="羊肉泡馍"
              value="13"
            />
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
              <span>羊肉泡馍</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferLeftCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="冰糖葫芦"
              disabled=""
              value="14"
            />
            <div
              class="
                layui-unselect
                layui-form-checkbox
                layui-checkbox-disabled
                layui-disabled
              "
              lay-skin="primary"
            >
              <span>冰糖葫芦</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferLeftCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="狼牙土豆"
              value="15"
            />
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
              <span>狼牙土豆</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="layui-transfer-active">
        <button
          type="button"
          class="layui-btn layui-btn-sm layui-btn-primary layui-btn-disabled"
          data-index="0"
        >
          <i class="layui-icon layui-icon-next"></i></button
        ><button
          type="button"
          class="layui-btn layui-btn-sm layui-btn-primary layui-btn-disabled"
          data-index="1"
        >
          <i class="layui-icon layui-icon-prev"></i>
        </button>
      </div>
      <div
        class="layui-transfer-box"
        style="width: 200px; height: 360px"
      >
        <div class="layui-transfer-header">
          <input
            type="checkbox"
            name="layTransferRightCheckAll"
            lay-filter="layTransferCheckbox"
            lay-type="all"
            lay-skin="primary"
            title="列表二"
          />
          <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
            <span>列表二</span><i class="layui-icon layui-icon-ok"></i>
          </div>
        </div>
        <ul class="layui-transfer-data" style="height: 320px">
          <li>
            <input
              type="checkbox"
              name="layTransferRightCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="瓦罐汤"
              value="1"
            />
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
              <span>瓦罐汤</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferRightCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="炸酱面"
              value="3"
            />
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
              <span>炸酱面</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferRightCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="豆腐脑"
              value="5"
            />
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
              <span>豆腐脑</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferRightCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="北京烤鸭"
              value="7"
            />
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
              <span>北京烤鸭</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferRightCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="毛血旺"
              disabled=""
              value="9"
            />
            <div
              class="
                layui-unselect
                layui-form-checkbox
                layui-checkbox-disabled
                layui-disabled
              "
              lay-skin="primary"
            >
              <span>毛血旺</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
          <li>
            <input
              type="checkbox"
              name="layTransferRightCheck"
              lay-skin="primary"
              lay-filter="layTransferCheckbox"
              title="臊子面"
              value="11"
            />
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
              <span>臊子面</span><i class="layui-icon layui-icon-ok"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup name="LayTransfer"></script>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{}>()
</script>
