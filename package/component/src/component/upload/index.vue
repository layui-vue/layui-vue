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
  onMounted,
  onUnmounted,
  ref,
  useSlots,
  withDefaults,
  watch,
} from "vue";
import { templateRef } from "@vueuse/core";
import { LayLayer } from "@layui/layer-vue";
import LayButton from "../button/index.vue";
import Cropper from "cropperjs";
import { useI18n } from "../../language";

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
  area?: string[];
  btn?: LayerButton[];
  btnAlign?: "l" | "r" | "c";
  anim?: boolean;
  isOutAnim?: boolean;
}

export interface CutOptions {
  layerOption?: LayerModal;
  copperOption?: Cropper.Options;
}

export interface UploadProps {
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
  cutOptions?: CutOptions;
  text?: string;
  dragText?: string;
  modelValue?: any;
  auto?: boolean;
}

/**
 * 裁剪窗体的确认操作, 获取裁剪结果, 并根据 props.auto 决定是否上传。
 */
const getCutDownResult = () => {
  if (_cropper) {
    const canvas = _cropper.getCroppedCanvas();
    let imgData = canvas.toDataURL(cutImageType.value);
    let currentTimeStamp = new Date().valueOf();
    let orgInfo = activeUploadFiles.value[0];
    emit(
      "cutdone",
      Object.assign({ currentTimeStamp, cutResult: imgData, orginal: orgInfo })
    );
    let newFile = dataURLtoFile(imgData);
    if (!props.auto) {
      emit("update:modelValue", [newFile]);
      clearLightCutEffect();
      return;
    }
    commonUploadTransaction([newFile]);
    nextTick(() => clearAllCutEffect());
  } else {
    errorF(cutInitErrorMsg.value);
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
  (orgFileInput.value as HTMLInputElement).value = "";
  _cropper = null;
};

const clearLightCutEffect = () => {
  activeUploadFiles.value = [];
  activeUploadFilesImgs.value = [];
  innerCutVisible.value = false;
  _cropper = null;
};

const { t } = useI18n();
const text = computed(() => (props.text ? props.text : t("upload.text")));
const dragText = computed(() =>
  props.dragText ? props.dragText : t("upload.dragText")
);
const defaultErrorMsg = computed(() => t("upload.defaultErrorMsg"));
const urlErrorMsg = computed(() => t("upload.urlErrorMsg"));
const numberErrorMsg = computed(() => t("upload.numberErrorMsg"));
const occurFileSizeErrorMsg = computed(() => t("upload.occurFileSizeErrorMsg"));
const cutInitErrorMsg = computed(() => t("upload.cutInitErrorMsg"));
const uploadSuccess = computed(() => t("upload.uploadSuccess"));
const startUploadMsg = computed(() => t("upload.startUploadMsg"));
const cannotSupportCutMsg = computed(() => t("upload.cannotSupportCutMsg"));
const title = computed(() => t("upload.title"));
const confirmBtn = computed(() => t("upload.confirmBtn"));
const cancelBtn = computed(() => t("upload.cancelBtn"));

let defaultCutCropperOption = computed<Cropper.Options>(() => {
  return { aspectRatio: 16 / 9 };
});

let defaultCutLayerOption = computed<LayerModal>(() => {
  return {
    type: "component",
    title: title.value,
    shade: true,
    shadeClose: true,
    btn: [
      { text: confirmBtn.value, callback: getCutDownResult },
      { text: cancelBtn.value, callback: closeCutDownModal },
    ],
  };
});

const props = withDefaults(defineProps<UploadProps>(), {
  field: "file",
  acceptMime: "MIME_type",
  size: 0,
  multiple: false,
  number: 0,
  drag: false,
  disabled: false,
  disabledPreview: false,
  cut: false,
  cutOptions: void 0,
  modelValue: null,
  auto: true,
});

const slot = useSlots();
const slots = slot.default && slot.default();
const context = getCurrentInstance();
const emit = defineEmits([
  "choose",
  "chooseAfter",
  "before",
  "done",
  "error",
  "cutdone",
  "cutcancel",
  "update:modelValue",
]);

watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue) {
      clearAllCutEffect();
    }
  }
);

const isDragEnter = ref(false);
const activeUploadFiles = ref<any[]>([]);
const activeUploadFilesImgs = ref<any[]>([]);
const orgFileInput = templateRef<HTMLElement>("orgFileInput");

let _cropper: any = null;
let computedCutLayerOption: ComputedRef<LayerModal> = computed(() => {
  if (props.cutOptions && props.cutOptions.layerOption) {
    return Object.assign(
      defaultCutLayerOption.value,
      props.cutOptions?.layerOption
    );
  }
  return defaultCutLayerOption.value;
});

let computedCutCropperOption: ComputedRef<Cropper.Options> = computed(() => {
  if (props.cutOptions && props.cutOptions.copperOption) {
    return Object.assign(
      defaultCutCropperOption.value,
      props.cutOptions?.copperOption
    );
  }
  return defaultCutCropperOption.value;
});

interface localUploadTransaction {
  url: string;
  files: File[] | Blob[];
  [propMame: string]: any;
}

interface localUploadOption {
  url: string;
  [propMame: string]: any;
}

const innerCutVisible = ref<boolean>(false);

const localUploadTransaction = (option: localUploadTransaction) => {
  const { url, files } = option;
  let formData = new FormData();
  if (url.length <= 5) {
    errorF(urlErrorMsg.value);
    return;
  }
  // 根据 multiple 是否启用, 采用不同的 formData 格式
  if (props.multiple) {
    for (let i = 0; i < files.length; i++) {
      let _file = files[i];
      formData.append(props.field + "[" + i + "]", _file);
    }
  } else {
    let _file = files[0];
    formData.append(props.field, _file);
  }
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

const dataURLtoFile = (dataurl: string) => {
  let arr: any[] = dataurl.split(",");
  let mime = "";
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
  let xhr: XMLHttpRequest = new XMLHttpRequest();
  let url = option.url;
  let formData = option.formData;
  const cb = callback;
  xhr.onreadystatechange = function () {
    let currentTimeStamp = new Date().valueOf();
    if (xhr.readyState === 1) {
      if (
        (xhr.status >= 200 && xhr.status <= 300) ||
        xhr.status === 304 ||
        xhr.status == 0
      ) {
        let successText = startUploadMsg.value;
        emit(
          "before",
          Object.assign({ currentTimeStamp, msg: successText, ...option })
        );
      }
    } else if (xhr.readyState === 4) {
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
  xhr.open("post", url, true);
  if (props.headers) {
    for (let key in props.headers) {
      xhr.setRequestHeader(key, props.headers[key]);
    }
  } else {
    xhr.setRequestHeader("Accept", "application/json, text/javascript");
  }
  xhr.send(formData);
  if (cb && typeof cb == "function") {
    cb();
  }
  clearAllCutEffect();
};

const cutImageType = ref("image/png");

const filetoDataURL = (file: File, fn: Function) => {
  const reader = new FileReader();
  reader.onloadend = function (e: any) {
    fn(e.target.result);
  };
  reader.readAsDataURL(file);
};

const uploadChange = (e: any) => {
  e.preventDefault();
  const _files = [...(e.target.files || e.dataTransfer.files)];
  cutImageType.value = _files[0].type;
  if (props.multiple && props.number != 0 && props.number < _files.length) {
    errorF(numberErrorMsg.value);
    return;
  }
  if (props.size && props.size != 0) {
    for (let i = 0; i < _files.length; i++) {
      let _file = _files[i];
      let _size = _file.size;
      if (_size > props.size * 1024) {
        errorF(occurFileSizeErrorMsg.value);
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
    props.acceptMime.indexOf("image") != -1 &&
    props.multiple == false;

  let arm2 =
    props.cut &&
    props.acceptMime.indexOf("image") != -1 &&
    props.multiple == true;

  if (arm1) {
    innerCutVisible.value = true;
    setTimeout(() => {
      const _imgs: HTMLCollection =
        document.getElementsByClassName("_lay_upload_img");
      if (_imgs && _imgs.length > 0) {
        const _img: HTMLImageElement = _imgs[0] as HTMLImageElement;
        _cropper = new Cropper(_img, computedCutCropperOption.value);
      } else {
        clearAllCutEffect();
      }
    }, 200);
  } else {
    if (arm2) {
      console.warn(cannotSupportCutMsg.value);
    }
    if (!props.auto) {
      emit("update:modelValue", _files);
      return;
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
    clearAllCutEffect();
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

const dragRef = ref();

function dragEnter(e: any) {
  e.stopPropagation();
  e.preventDefault();
}

function dragOver(e: any) {
  e.stopPropagation();
  e.preventDefault();
}

onMounted(() => {
  nextTick(() => {
    if (dragRef.value) {
      dragRef.value.addEventListener("dragenter", dragEnter, false);
      dragRef.value.addEventListener("dragover", dragOver, false);
      dragRef.value.addEventListener("drop", uploadChange, false);
    }
  });
});

onUnmounted(() => {
  if (dragRef.value) {
    dragRef.value.removeEventListener("dragenter");
    dragRef.value.removeEventListener("dragover");
    dragRef.value.removeEventListener("drop");
  }
});
</script>

<template>
  <div
    class="layui-upload layui-upload-wrap"
    :class="disabledPreview ? 'layui-upload-file-disabled' : ''"
  >
    <input
      type="file"
      class="layui-upload-file"
      ref="orgFileInput"
      :name="field"
      :field="field"
      :multiple="multiple"
      :accept="acceptMime"
      :disabled="disabled"
      @click="clickOrgInput"
      @change="uploadChange"
    />
    <div v-if="!drag">
      <div class="layui-upload-btn-box" @click.stop="chooseFile">
        <template v-if="slot.default">
          <slot :disabled="disabled"></slot>
        </template>
        <template v-else>
          <lay-button type="primary" :disabled="disabled">{{
            text
          }}</lay-button>
        </template>
      </div>
    </div>
    <div
      v-else
      ref="dragRef"
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
      <p>{{ dragText }}</p>
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
