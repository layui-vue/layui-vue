::: anchor
:::

::: title 基本介绍
:::

::: describe 文件上传
:::

::: title 基础使用
:::

::: demo 使用 `lay-upload` 标签, 创建一个上传按钮

<template>
  <lay-upload url="https://www.mocky.io/v2/5cc8019d300000980a055e76" field="file" @done="doneHandle" multiple>
    <template #preview>
      <img v-if="data" :src="data.url" style="width: 100px;"/>
    </template>
  </lay-upload>
</template>

<script>
import { ref,reactive } from 'vue'

export default {
  setup() {

    const data = ref();

    const doneHandle = (result) => {
      data.value = JSON.parse(result.data);
      console.log(data.value.url)
    };

    return {
      doneHandle,
      data,
    }
  }
}
</script>

:::

::: title 手动上传
:::

::: demo 通过设置 `auto` 属性为 `false`, 使用 `v-model` 接收选择的文件对象。

<template>
  <lay-upload url="https://www.mocky.io/v2/5cc8019d300000980a055e76" v-model="file1" field="file" :auto="false">
    <template #preview>
      {{ file1[0]?.name }}
    </template>
  </lay-upload>
</template>

<script>
import { ref,reactive } from 'vue'

export default {
  setup() {

    const file1 = ref([]);

    return {
      file1
    }
  }
}
</script>

:::

::: title 默认插槽
:::

::: demo 使用 `default` 插槽, 自定义入口

<template>
  <lay-upload @done="getUploadFile" @choose="beginChoose">
    <template v-slot:default="params">
      <lay-button>上传 - 是否禁用 - {{ params.disabled }}</lay-button>
    </template>
    <template #preview>
      <div v-for="(item,index) in picList" :key="`demo1-pic-'${index}`">
        <img :src="item"/>
      </div>
    </template>
  </lay-upload>
</template>

<script>
import { ref,reactive } from 'vue'

export default {
  setup() {
    const picList = ref([]);
    const filetoDataURL=(file,fn)=>{
      const reader = new FileReader();
      reader.onloadend = function(e){
        fn(e.target.result);
      };
      reader.readAsDataURL(file);
    };
    const getUploadFile=(files)=>{
      if(Array.isArray(files)&&files.length>0){
        files.forEach((file,index,array)=>{
          filetoDataURL(file,(res)=>{
            console.log(res);
            picList.value.push(res);
            console.log(picList.value);
          });
        });
      }
    };
    const beginChoose =(e)=>{
      console.log("beginChoose",e);
    };
    return {
      getUploadFile,
      filetoDataURL,
      beginChoose,
      picList
    }
  }
}
</script>

:::

::: title 多文件上传
:::

::: demo 使用 `lay-upload` 标签, 并使用 `multiple` 创建一个可上传多个文件的上传组件

<template>
  <lay-upload :multiple="true"></lay-upload>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
    }
  }
}
</script>

:::

::: title 拖拽上传
:::

::: demo 使用 `lay-upload` 标签, 使用 `drag属性` 创建一个可拖拽的上传文件域

<template>
  <lay-upload :drag="true"></lay-upload>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 自定义预览/上传禁用
:::

::: demo 使用 `lay-upload` 标签, 使用 `#preview` 自定义预览的 UI 交互,使用 `disabled` 对上传按钮添加禁用状态,使用 `disabledPreview` 对上传预览区域添加禁用状态

<template>
  <lay-upload @done="getUploadFile2" :disabled="true" :disabledPreview="true">
    <template #preview>
      <div class="easy-wrap">
        <img src="https://chixian.oss-cn-hangzhou.aliyuncs.com/20211023003617_0706a.jpg" style="width:62.9px;height:63.2px"/>
        <img src="https://chixian.oss-cn-hangzhou.aliyuncs.com/20211023003617_0706a.jpg" style="width:62.9px;height:63.2px"/>
        <img src="https://chixian.oss-cn-hangzhou.aliyuncs.com/20211023003617_0706a.jpg" style="width:62.9px;height:63.2px"/>
        <img src="https://chixian.oss-cn-hangzhou.aliyuncs.com/20211023003617_0706a.jpg" style="width:62.9px;height:63.2px"/>
        <img src="https://chixian.oss-cn-hangzhou.aliyuncs.com/20211023003617_0706a.jpg" style="width:62.9px;height:63.2px"/>
      </div>
    </template>
  </lay-upload>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const getUploadFile2 = (file)=>{
      console.log(file);
    };
    return {
      getUploadFile2
    }
  }
}
</script>

:::

::: title 开启裁剪

::: demo 使用 `lay-upload` 标签, 添加 `cut` 开启 选择文件后剪裁功能

<template>
  <lay-upload  url="https://www.mocky.io/v2/5cc8019d300000980a055e76" @cutdone="getCutDone" :beforeUpload="beforeUpload10" acceptMime="images" @cutcancel="getCutCancel" :cut="true" :cutOptions="cutOptions" @done="getFileDone">
    <template #preview>
      <div class="easy-wrap" v-if="cutUrl">
        <img :src="cutUrl"/>
      </div>
    </template>
  </lay-upload>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const cutUrl = ref("");

    const cutOptions = {
      copperOption: {
        center: false,
        aspectRatio: 1,
        crop: function(event) {
          console.log(event.detail.x);
          console.log(event.detail.y);
          console.log(event.detail.width);
          console.log(event.detail.height);
          console.log(event.detail.rotate);
          console.log(event.detail.scaleX);
          console.log(event.detail.scaleY);
        },
      }
    }

    const getCutDone=(res)=>{
      console.log("getCutDone",res);
      cutUrl.value = res.msg;
    };

    const getCutCancel=(res)=>{
      console.log("getCutCancel",res);
    };

    const getFileDone=(res)=>{
      console.log("getFileDone",res);
    };

    return {
      getCutDone,
      getCutCancel,
      getFileDone,
      cutUrl,
      cutOptions
    }
  }
}
</script>

:::

::: title 钩子函数

::: demo 通过 `beforeUpload` 属性设置上传前的回调函数，参数为 file 或 file[]，你可以通过返回 false 来阻止上传。

<template>
  <lay-upload :beforeUpload="beforeUpload10"  url="https://www.mocky.io/v2/5cc8019d300000980a055e76" >
    <template #preview>
      <img v-if="data10" :src="data10.url" style="width: 100px;"/>
    </template>
  </lay-upload>
</template>

<script>
import { ref,reactive } from 'vue'
import { layer } from "@layui/layer-vue";

export default {
  setup() {

    const data10 = ref();

    const doneHandle10 = (result) => {
      data.value = JSON.parse(result.data);
    };

    const beforeUpload10 = (file) => {
      var isOver = false;
      if(file.size > 1000) {
        isOver = true;
        layer.msg(`file size over ${file.size} KB`, { icon: 2})
      } 
      return !isOver;
    }

    return {
      beforeUpload10,
      doneHandle10,
      data10,
    }
  }
}
</script>

:::

::: title Upload 属性
:::

::: table

| 属性            | 描述                                                    | 类型    | 默认值                       | 可选值      |
| --------------- | ------------------------------------------------------- | ------- | ---------------------------- | ----------- |
| url             | 服务端上传接口的地址                                    | string  | --                           | --          |
| data            | 请求上传接口的额外参数                                  | object  | --                           | --          |
| headers         | 接口的请求头                                            | object  | --                           | --          |
| acceptMime      | 文件选择框时的可选文件类型                              | string  | `MIME_type`                  | `MIME_type` |
| field           | 设定文件域的字段名                                      | string  | `file`                       | --          |
| size            | 设置文件最大可允许上传的大小，单位 KB。不支持 ie8/9     | number  | `0(不限制)`                  | --          |
| multiple        | 是否允许多文件上传。设置 true 即可开启。不支持 ie8/9    | boolean | false                        | --          |
| number          | 设置同时可上传的文件数量，一般配合 multiple 参数出现。  | number  | `0(不限制)`                  | --          |
| drag            | 是否接受拖拽的文件上传，设置 false 可禁用。不支持 ie8/9 | boolean | true                         | --          |
| disabled        | 设置文件禁用                                            | boolean | false                        | --          |
| disabledPreview | 设置文件预览插槽区域为禁用状态                          | boolean | false                        | --          |
| cut             | 是否开启选择图片后检测,设置 true 可开启                 | boolean | false                        | --          |
| cutOptions      | 开启剪裁的模态弹窗与剪裁框的配置                        | object  | { layerOption,copperOption } | --          |
| text            | 普通上传描述                                            | string  | --                           | --          |
| dragText        | 拖拽上传描述                                            | string  | --                           | --          |
| auto            | 是否自动提交                                            | boolean | false                        | --          |
| beforeUpload    | 上传之前的钩子（1.9.4）                                 | Function | --                        | --          |

:::

::: title Upload 插槽
:::

::: table

| 名称    | 描述           | 参数 |
| ------- | -------------- | ---- |
| preview | 自定义预览效果 | --   |

:::

::: title Upload 事件
:::

::: table

| 名称     | 描述                       | 参数 |
| -------- | -------------------------- | ---- |
| choose   | 打开系统选择文件窗体的回调   | --   |
| before   | 上传事务开启前的回调 (在 1.9.4 版本新增 before-upload 属性，来代替该事件，仍向后兼容)        | --   |
| done     | 上传事务结束的回调          | --   |
| error    | 上传事务中出现错误的回调     | --   |
| cutdown  | 剪裁完成                   | --   |
| cutclose | 剪裁取消                   | --   |

:::

::: contributor upload
:::

::: previousNext upload
:::
