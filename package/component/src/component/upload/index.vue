<script lang="ts">
export default {
  name: "LayUpload",
};
</script>
<script lang="ts" setup>
import "./index.less";
import { Recordable } from "../../types";
import { layer } from "@layui/layer-vue";
import {
  computed,
  ComputedRef,
  getCurrentInstance,
  nextTick,
  ref,
  toRaw,
  useSlots,
  withDefaults,
} from "vue";
import { templateRef } from "@vueuse/core";
import { LayLayer } from "@layui/layer-vue";
import LayButton from "../button/index.vue";
import Cropper from "cropperjs";
// 组件的参数字段类型
//https://www.layuiweb.com/doc/modules/upload.html#options
export interface LayerButton {
  text: string;
  callback: Function;
}
export interface LayerModal {
  title?: string;
  resize?: boolean;
  move?: boolean;
  maxmin?: boolean;
  offset?: string[];
  content?: string;
  shade?: boolean;
  shadeClose?: boolean;
  shadeOpacity?: number;
  zIndex?: number;
  type?: "component" | "iframe";
  closeBtn?: boolean;
  area: string[];
  btn?: LayerButton[];
  btnAlign?: "l" | "r" | "c";
  anim?: boolean;
  isOutAnim?: boolean;
}

export interface cutOptions {
  layerOption: LayerModal;
  copperOption?: typeof Cropper;
}

export interface LayUploadProps {
  url?: string;
  data?: any;
  headers?: Recordable;
  acceptMime?: string;
  field?: string;
  size?: number;
  multiple?: boolean;
  number?: number;
  drag?: boolean;
  disabled?: boolean;
  disabledPreview?: boolean;
  cut?: boolean;
  cutOptions?: cutOptions;
}

const getCutDownResult = () => {
  if (_cropper) {
    const canvas = _cropper.getCroppedCanvas();
    let imgData = canvas.toDataURL('"image/png"');
    let currentTimeStamp = new Date().valueOf();
    let orgInfo = activeUploadFiles.value[0];
    emit(
      "cutdone",
      Object.assign({ currentTimeStamp, cutResult: imgData, orginal: orgInfo })
    );
    let newFile = dataURLtoFile(imgData);
    commonUploadTransaction([newFile]);
    nextTick(() => clearAllCutEffect());
  } else {
    errorF(cutInitErrorMsg);
  }
};
const closeCutDownModal = () => {
  let currentTimeStamp = new Date().valueOf();
  emit("cutcancel", Object.assign({ currentTimeStamp }));
  nextTick(() => clearAllCutEffect());
};
const clearAllCutEffect = () => {
  activeUploadFiles.value = [];
  activeUploadFilesImgs.value = [];
  innerCutVisible.value = false;
};

let defaultCutLayerOption: LayerModal = {
  title: "标题",
  move: true,
  maxmin: false,
  offset: [],
  btn: [
    { text: "导出", callback: getCutDownResult },
    { text: "取消", callback: closeCutDownModal },
  ],
  area: ["640px", "640px"],
  content: "11",
  shade: true,
  shadeClose: true,
  type: "component",
};

const props = withDefaults(defineProps<LayUploadProps>(), {
  acceptMime: "image/*",
  field: "file",
  size: 0,
  multiple: false,
  number: 0,
  drag: false,
  disabled: false,
  disabledPreview: false,
  cut: false,
  cutOptions: void 0,
});

const slot = useSlots();
const slots = slot.default && slot.default();
const context = getCurrentInstance();
const emit = defineEmits([
  "choose",
  "before",
  "done",
  "error",
  "cutdone",
  "cutcancel",
]);

// 内部变量
const isDragEnter = ref(false);
// 待处理的上传文件
const activeUploadFiles = ref<any[]>([]);
// 待处理的上传图片
const activeUploadFilesImgs = ref<any[]>([]);
const orgFileInput = templateRef<HTMLElement>("orgFileInput");
let _cropper: any = null;
let computedCutLayerOption: ComputedRef<LayerModal>;
if (props.cutOptions && props.cutOptions.layerOption) {
  computedCutLayerOption = computed(() =>
    Object.assign(defaultCutLayerOption, props.cutOptions.layerOption)
  );
} else {
  computedCutLayerOption = computed(() => defaultCutLayerOption);
}

// 统一异常提示的常量
const defaultErrorMsg = "上传失败";
const urlErrorMsg = "上传地址格式不合法";
const numberErrorMsg = "文件上传超过规定的个数";
const sizeErrorMsg = "文件大小超过限制";
const uploadRemoteErrorMsg = "请求上传接口出现异常";
const cutInitErrorMsg = "剪裁插件初始化失败";
// 统一成功提示
const uploadSuccess = "上传成功";

//内部方法 -> start
//文件上传事务流程的方法参数类型
interface localUploadTransaction {
  url: string;
  files: File[] | Blob[];
  [propMame: string]: any;
}

const innerCutVisible = ref<boolean>(false);

const localUploadTransaction = (option: localUploadTransaction) => {
  const { url, files } = option;
  let formData = new FormData();
  if (url.length <= 5) {
    errorF(urlErrorMsg);
    return;
  }
  if (files.length > 0) {
    if (props.multiple) {
      // 多文件
      for (let i = 0; i < files.length; i++) {
        let _file = files[i];
        formData.append(props.field + "[" + i + "]", _file);
      }
    } else {
      // 单文件
      formData.append(props.field, files[0]);
    }
  }
  // 额外参数 
  if (props.data && props.data instanceof Object) {
    let _requestDate = props.data;
    for (const key in _requestDate) {
      formData.append(key, _requestDate[key]);
    }
  }
  let utimer = window.setTimeout(() => {
    localUpload({ url, formData }, function () {
      clearTimeout(utimer);
    });
  }, 200);
};

//单文件上传的方法参数类型
interface localUploadOption {
  url: string;
  [propMame: string]: any;
}
const dataURLtoFile = (dataurl: string) => {
  let arr: any[] = dataurl.split(",");
  let mime: string = "";
  if (arr.length > 0) {
    mime = arr[0].match(/:(.*?);/)[1];
  }
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const errorF = (errorText: string) => {
  let currentTimeStamp = new Date().valueOf();
  let errorMsg = errorText ? errorText : defaultErrorMsg;
  errorMsg = `layui-vue:${errorMsg}`;
  console.warn(errorMsg);
  layer.msg(errorMsg, { icon: 2, time: 1000 }, function (res: unknown) {});
  emit("error", Object.assign({ currentTimeStamp, msg: errorMsg }));
};

const localUpload = (option: localUploadOption, callback: Function) => {
  let xhr: XMLHttpRequest, loadedevt, total, per: number, url, uploading;
  xhr = new XMLHttpRequest();
  url = option.url;
  let formData = option.formData;
  const cb = callback;
  //事件回调
  // event callbacks
  xhr.onreadystatechange = function () {
    // 发起
    let currentTimeStamp = new Date().valueOf();
    if (xhr.readyState === 1) {
      if (
        (xhr.status >= 200 && xhr.status <= 300) ||
        xhr.status === 304 ||
        xhr.status == 0
      ) {
        let successText = "上传开始";
        emit(
          "before",
          Object.assign({ currentTimeStamp, msg: successText, ...option })
        );
      }
    } else if (xhr.readyState === 4) {
      // 完成
      let successText = xhr.responseText ? xhr.responseText : uploadSuccess;
      if (
        (xhr.status >= 200 && xhr.status <= 300) ||
        xhr.status === 304 ||
        xhr.status == 0
      ) {
        let data = xhr.responseText;
        emit("done", { currentTimeStamp, msg: successText, data: data });
      }
    }
  };
  xhr.open("post", url, true); //不能是GET, get请求数据发送只能拼接在URL后面
  // 对应Upload属性的headers字段,额外的上传参数
  if (props.headers) {
    for (let key in props.headers) {
      xhr.setRequestHeader(key, props.headers[key]);
    }
  } else {
    xhr.setRequestHeader("Accept", "application/json, text/javascript");
  }
  // 上传事务开启前的回调
  let currentTimeStamp = new Date().valueOf();
  emit("before", Object.assign(option, currentTimeStamp));
  xhr.send(formData);
  if (cb && typeof cb == "function") {
    cb();
  }
};
const filetoDataURL = (file: File, fn: Function) => {
  const reader = new FileReader();
  reader.onloadend = function (e: any) {
    fn(e.target.result);
  };
  reader.readAsDataURL(file);
};
const getUploadChange = (e: any) => {
  const files = e.target.files;
  const _files = [...files];
  // 对应Upload属性的number字段,控制单次上传个数
  if (props.multiple && props.number != 0 && props.number < _files.length) {
    errorF(numberErrorMsg);
    return;
  }
  // 对应Upload属性的size字段,控制上传图片的大小
  if (props.size && props.size != 0) {
    let _cache = [];
    for (let i = 0; i < _files.length; i++) {
      let _file = _files[i];
      let _size = _file.size;
      if (_size > props.size * 1024) {
        _cache.push(_file);
      }
    }
    if (_cache && _cache.length > 0) {
      for (let i = 0; i < _cache.length; i++) {
        let _sizeErrorFile = _cache[i];
        let errorMsg = `文件 ${
          _sizeErrorFile.name
        } ${sizeErrorMsg},文件最大不可超过${props.size * 1000}kb`;
        errorF(errorMsg);
        return;
      }
    }
  }
  for (let item of _files) {
    activeUploadFiles.value.push(item);
    filetoDataURL(item, function (res: any) {
      activeUploadFilesImgs.value.push(res);
    });
  }
  let arm1 =
    props.cut &&
    props.acceptMime.indexOf("images") != -1 &&
    props.multiple == false;
  let arm2 =
    props.cut &&
    props.acceptMime.indexOf("images") != -1 &&
    props.multiple == true;
  if (arm1) {
    innerCutVisible.value = true;
    setTimeout(() => {
      let _imgs = document.getElementsByClassName("_lay_upload_img");
      let _img = _imgs[0];
      // @ts-ignore
      _cropper = new Cropper(_img, {
        aspectRatio: 16 / 9,
      });
    }, 400);
  } else {
    if (arm2) {
      console.warn(
        "layui-vue:当前版本暂不支持单次多文件剪裁,尝试设置 multiple 为false,通过@done获取返回文件对象"
      );
    }
    commonUploadTransaction(_files);
  }
};
const commonUploadTransaction = (_files: any[]) => {
  let currentTimeStamp = new Date().valueOf();
  let successText = uploadSuccess;
  if (props.url) {
    localUploadTransaction({
      url: props.url,
      files: _files,
    });
  } else {
    emit("done", { currentTimeStamp, msg: successText, data: _files });
  }
};
const chooseFile = () => {
  let _target = orgFileInput.value;
  if (_target) {
    _target.click();
  }
};
const clickOrgInput = () => {
  let currentTimeStamp = new Date().valueOf();
  emit("choose", currentTimeStamp);
};
const cutTransaction = () => {};
</script>

<template>
  <div
    class="layui-upload layui-upload-wrap"
    :class="disabledPreview ? 'layui-upload-file-disabled' : ''"
  >
    <input
      type="file"
      ref="orgFileInput"
      class="layui-upload-file"
      :multiple="multiple"
      :accept="acceptMime"
      :name="field"
      :field="field"
      :disabled="disabled"
      @click="clickOrgInput"
      @change="getUploadChange"
    />
    <div v-if="!drag">
      <div class="layui-upload-btn-box" @click.stop="chooseFile">
        <template v-if="slot.default">
          <slot :disabled="disabled"></slot>
        </template>
        <template v-else>
          <lay-button type="primary" :disabled="disabled">上传文件</lay-button>
        </template>
      </div>
    </div>
    <div
      v-else
      class="layui-upload-drag"
      :class="
        disabled
          ? 'layui-upload-drag-disable'
          : isDragEnter
          ? 'layui-upload-drag-draging'
          : ''
      "
      @click.stop="chooseFile"
    >
      <i class="layui-icon"></i>
      <p>点击上传，或将文件拖拽到此处</p>
      <div class="layui-hide" id="uploadDemoView">
        <hr />
        <img src="" alt="上传成功后渲染" style="max-width: 196px" />
      </div>
    </div>
    <lay-layer
      v-model="innerCutVisible"
      :title="computedCutLayerOption.title"
      :move="computedCutLayerOption.move"
      :resize="computedCutLayerOption.resize"
      :shade="computedCutLayerOption.shade"
      :shadeClose="computedCutLayerOption.shadeClose"
      :shadeOpacity="computedCutLayerOption.shadeOpacity"
      :zIndex="computedCutLayerOption.zIndex"
      :btnAlign="computedCutLayerOption.btnAlign"
      :area="computedCutLayerOption.area"
      :anim="computedCutLayerOption.anim"
      :isOutAnim="computedCutLayerOption.isOutAnim"
      :btn="computedCutLayerOption.btn"
      @close="clearAllCutEffect"
    >
      <div
        class="copper-container"
        v-for="(base64str, index) in activeUploadFilesImgs"
        :key="`file${index}`"
      >
        <img
          :src="base64str"
          :id="`_lay_upload_img${index}`"
          class="_lay_upload_img"
        />
      </div>
    </lay-layer>
    <div
      class="layui-upload-list"
      :class="disabledPreview ? 'layui-upload-list-disabled' : ''"
    >
      <slot name="preview"></slot>
    </div>
  </div>
</template>
