<script lang="ts">
export default {
  name: "LayUpload",
};
</script>
<script lang="ts" setup>
import "./index.less";
import { Recordable } from "../../types";
import { layer } from "@layui/layer-vue";
import { ref, useSlots, withDefaults, onMounted, defineExpose } from "vue";
import { templateRef } from '@vueuse/core'

// 组件的参数字段类型
//https://www.layuiweb.com/doc/modules/upload.html#options
export interface LayUploadProps {
  url?: string;
  data?: any;
  headers?: Recordable;
  acceptMime?: "images" | "file" | "video" | "audio";
  field?: string;
  size?: number;
  multiple?: boolean;
  number: number;
  drag?: boolean;
}

const props = withDefaults(defineProps<LayUploadProps>(), {
  acceptMime: "images",
  field: "file",
  size: 0,
  multiple: false,
  number: 0,
  drag: false,
});
const slot = useSlots();
const slots = slot.default && slot.default();
const emit = defineEmits(["choose", "before", "done", "error"]);

// 内部变量
const isDragEnter = ref(false);

const orgFileInput = templateRef<HTMLElement>('orgFileInput')
// 统一异常提示的常量
const defaultErrorMsg = "上传失败";
const urlErrorMsg = "上传地址格式不合法";
const numberErrorMsg = "文件上传超过规定的个数";
const sizeErrorMsg = "文件大小超过限制";
const uploadRemoteErrorMsg = "请求上传接口出现异常";
const uploadSuccess = "上传成功";

//内部方法 -> start
//文件上传事务流程的方法参数类型
interface localUploadTransaction {
  url: string;
  files: File[] | Blob[];
  [propMame: string]: any;
}
const localUploadTransaction = (option: localUploadTransaction) => {
  const { url, files } = option;
  let formData = new FormData();
  if (url.length <= 5) {
    errorF(urlErrorMsg);
    return;
  }
  if (Array.isArray(files) && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      let _file = files[i];
      formData.append("file[" + i + "]", _file);
    }
    // 对应Upload属性的data字段,额外的上传参数
    if (props.data && props.data instanceof Object) {
      let _requestDate = props.data;
      for (const key in _requestDate) {
        formData.append(key, _requestDate[key]);
      }
    }
    let utimer = window.setTimeout(()=>{
      localUpload({ url,formData },function(){
        clearTimeout(utimer);
      });
    },200)
  }
};

//单文件上传的方法参数类型
interface localUploadOption {
  url: string;
  [propMame: string]: any;
}

const errorF = (errorText: string) => {
  let currentTimeStamp = (new Date()).valueOf();
  let errorMsg = errorText ? errorText : defaultErrorMsg;
  errorMsg = `layui-vue:${errorMsg}`;
  console.warn(errorMsg);
  layer.msg(errorMsg, { icon: 2, time: 1000 }, function (res: unknown) {});
  emit("error",Object.assign({currentTimeStamp,msg:errorMsg}));
};

const localUpload = (option: localUploadOption,callback:Function) => {
  let xhr: XMLHttpRequest, loadedevt, total, per: number, url, uploading;
  xhr = new XMLHttpRequest();
  url = option.url;
  let formData = option.formData;
  const cb = callback;
  //事件回调
  // event callbacks
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status === 304) {
        let currentTimeStamp = (new Date()).valueOf();
        let successText = xhr.responseText?xhr.responseText:uploadSuccess;
        emit("before",Object.assign({currentTimeStamp,msg:successText,...option}));
      } else {
        errorF(xhr.responseText);
      }
    } else {
      errorF(defaultErrorMsg);
    }
  };
  xhr.open("post", url, true); //不能是GET, get请求数据发送只能拼接在URL后面
  // 对应Upload属性的headers字段,额外的上传参数
  if(props.headers){
    for(let key in props.headers){
      xhr.setRequestHeader(key,props.headers[key]);
    }
  }else{
    xhr.setRequestHeader("Accept", "application/json, text/javascript");
  }
  // 上传事务开启前的回调
  let currentTimeStamp = (new Date()).valueOf();
  emit("before",Object.assign(option,currentTimeStamp));
  xhr.send(formData);
  if(cb&&typeof cb == "function"){
    cb();
  }
};

const getUploadChange = (e: any) => {
  const files = e.target.files;
  const _files = [...files];
  // 对应Upload属性的number字段,控制单次上传个数
  if(props.multiple&&props.number!=0&&props.number<_files.length){
    errorF(numberErrorMsg);
    return;
  }
  // 对应Upload属性的size字段,控制上传图片的大小
  if(props.size&&props.size!=0){
    let _cache = [];
    for(let i =0;i<_files.length;i++){
      let _file= _files[i];
      let _size = _file.size;
      if(_size>props.size*1024){
        _cache.push(_file);
      }
    }
    if(_cache&&_cache.length>0){
      for(let i =0;i<_cache.length;i++){
        let _sizeErrorFile = _cache[i];
        let errorMsg = `文件 ${_sizeErrorFile.name} ${sizeErrorMsg},文件最大不可超过${props.size*1000}kb`;
        errorF(errorMsg);
      }
    }
  }
  if (props.url) {
    // 表单提交
    localUploadTransaction({
      url: props.url,
      files: _files,
    });
  } else {
    // 抛出上传文件信息
    emit("done", _files);
  }
};
const chooseFile =()=>{
  console.log(orgFileInput.value);
  let _target = orgFileInput.value;
  if(_target){
      _target.click();
  }
  // _target?.onclick();
};
const clickOrgInput = ()=>{
  let currentTimeStamp = (new Date()).valueOf();
  //console.log(currentTimeStamp);
  emit("choose",currentTimeStamp);
};
const uploadDragOver = (e: any) => {};
const uploadDragDrop = (e: any) => {
  isDragEnter.value = false;
  console.log(e);
};
const uploadDragStop = (e: any) => {};
const uploadDragEnter = (e: any) => {
  isDragEnter.value = true;
};
const uploadDragLeave = (e: any) => {
  isDragEnter.value = false;
};
//内部方法 -> end
</script>
<template>
  <div class="layui-upload layui-upload-wrap">
      <input
        class="layui-upload-file"
        @click="clickOrgInput"
        :multiple="multiple"
        type="file"
        :accept="acceptMime"
        :name="field"
        @change="getUploadChange"
        :field="field"
        ref="orgFileInput"
      />
    <div v-if="!drag">
      <div class="layui-upload-btn-box">
        <lay-button type="primary" @click.stop="chooseFile">上传图片</lay-button>
      </div>
    </div>
    <div
      v-else
      class="layui-upload-drag"
      :class="isDragEnter ? 'layui-upload-drag-draging' : ''"
      @dragleave.stop="uploadDragLeave"
      @dragenter.stop="uploadDragEnter"
      @dragover.stop="uploadDragOver"
      @drop="uploadDragDrop"
      @click.stop="chooseFile"
    >
      <i class="layui-icon"></i>
      <p>点击上传，或将文件拖拽到此处</p>
      <div class="layui-hide" id="uploadDemoView">
        <hr />
        <img src="" alt="上传成功后渲染" style="max-width: 196px" />
      </div>
    </div>
    <div class="layui-upload-list">
      <slot name="preview"></slot>
    </div>
  </div>
</template>
