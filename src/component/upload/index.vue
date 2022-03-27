<script lang="ts">
export default {
  name: "LayUpload",
};
</script>
<script lang="ts" setup>
import "./index.less";
import { Recordable } from "../../types";
import { ref, watch, useSlots, withDefaults, onMounted } from "vue";
//https://www.layuiweb.com/doc/modules/upload.html#options
export interface LayUploadProps {
  elem?: string | HTMLElement;
  url?: string;
  data?: Recordable;
  headers?: Recordable;
  accept?: "images" | "file" | "video" | "audio";
  acceptMime?: "images" | "file" | "video" | "audio";
  exts?: "jpg" | "png" | "gif" | "bmp" | "jpeg";
  auto?: boolean;
  bindAction?: string | HTMLElement;
  field?: string;
  size?: number;
  multiple?: boolean;
  number: number;
  drag?: boolean;
}
const props = withDefaults(defineProps<LayUploadProps>(), {
  accept: "images",
  acceptMime: "images",
  auto: true,
  field: "file",
  size: 0,
  multiple: false,
  number: 0,
  drag: false,
});

const emit = defineEmits(["choose", "before", "done", "error"]);

const slot = useSlots();
const slots = slot.default && slot.default();
const isDragEnter = ref(false);

interface localUploadOption {
  url: string;
  file?: unknown;
  otherRequestData?: any;
}

const localUpload = (option: any) => {
  let file,
    formData,
    xhr: XMLHttpRequest,
    loadedevt,
    total,
    per: number,
    url,
    uploading;
  formData = new FormData();
  xhr = new XMLHttpRequest();
  url = option.url;
  file = option.file;
  formData.append("files", file);
  //append 其他数据
  if (option.otherRequestData instanceof Object) {
    var _requestDate = option.otherRequestData;
    for (var key in _requestDate) {
      formData.append(key, _requestDate[key]);
    }
  }
  //事件回调
  // event callbacks
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status === 304) {
        option.successF instanceof Function &&
          option.successF(xhr.responseText);
      } else {
        option.errorF instanceof Function && option.errorF(xhr.responseText);
      }
    } else {
      option.errorF instanceof Function && option.errorF();
    }
  };
  //侦查当前附件上传情况
  /**
   * 附件的上传进度条方法在xhr.upload.onprogeress上，
   * 还有一个xhr.onprogress,是下载时候的进度条,***
   * */
  xhr.upload.onprogress = function (event) {
    // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
    if (event.lengthComputable) {
      loadedevt = event.loaded;
      total = event.total;
      per = Math.floor((100 * loadedevt) / total);
    }
    //执行回调
    option.uploadProgress instanceof Function && option.uploadProgress(per);
  };
  xhr.open("post", url, true); //不能是GET, get请求数据发送只能拼接在URL后面
  xhr.setRequestHeader("Accept", "application/json, text/javascript");
  xhr.send(formData);
};

const getUploadChange = (e: any) => {
  // console.log(e.srcElement);
  const file = e.target.files[0];
  console.log(file);
  if (props.url) {
    // 表单提交
    localUpload({
      url: props.url,
      file: file,
    });
  } else {
    //
  }
};
const uploadDragOver = (e: any) => {
  //console.log("uploadDrag9ikme",e);
};
const uploadDragDrop = (e: any) => {
  isDragEnter.value = false;
};
const uploadDragStop = (e: any) => {};
const uploadDragEnter = (e: any) => {
  isDragEnter.value = true;
};
const uploadDragLeave = (e: any) => {
  isDragEnter.value = false;
};
</script>
<template>
  <div class="layui-upload" v-if="!drag">
    <div class="layui-upload-btn-box">
      <button type="button" class="layui-btn">上传图片</button>
      <input
        class="layui-upload-file"
        :multiple="multiple"
        type="file"
        :accept="accept"
        :name="field"
        @change="getUploadChange"
      />
    </div>
    <div class="layui-upload-list">
      <img class="layui-upload-img" id="demo1" />
      <p id="demoText"></p>
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
  >
    <i class="layui-icon"></i>
    <p>点击上传，或将文件拖拽到此处</p>
    <div class="layui-hide" id="uploadDemoView">
      <hr />
      <img src="" alt="上传成功后渲染" style="max-width: 196px" />
    </div>
    <input
      class="layui-upload-file"
      type="file"
      :accept="accept"
      :name="field"
      @change="getUploadChange"
    />l
  </div>
</template>
