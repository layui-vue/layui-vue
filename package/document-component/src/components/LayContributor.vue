<template>
  <div class="contributor">
    <lay-tooltip
      :content="contributor.login"
      v-for="contributor in contributors"
      :key="contributor.id"
      :is-dark="false"
    >
      <a :href="contributor.htmlUrl" target="_blank">
        <lay-avatar :src="contributor.avatarUrl" radius></lay-avatar>
      </a>
    </lay-tooltip>
  </div>
  <lay-tooltip content="在线编辑" :is-dark="false">
    <a
      class="online-edit"
      :href="
        'https://github.com/layui/layui-vue/edit/next/package/document-component/src/document/zh-CN/components/' +
        filePath +
        '.md'
      "
      target="_blank"
    >
      <lay-icon type="layui-icon-edit"></lay-icon>
    </a>
  </lay-tooltip>
</template>

<script lang="ts" setup>
import axios from "axios";
import { Ref, ref } from "vue";

export interface LayContributor {
  filePath: string;
}

const props = withDefaults(defineProps<LayContributor>(), {
  filePath: "",
});

const suffix = ".md";
const githubAPI =
  "https://api.github.com/repos/layui/layui-vue/commits?path=/package/document-component/src/document/zh-CN/components/";
const contributors: Ref<any> = ref([]);

var compare = function (x: any, y: any) {
  if (x.commits < y.commits) {
    return 1;
  } else if (x.commits > y.commits) {
    return -1;
  } else {
    return 0;
  }
};

const fetchContributors = () => {
  axios.get(githubAPI + props.filePath + suffix).then((result) => {
    const topic: any[] = [];
    result.data.forEach((item: any) => {
      if (item.committer) {
        const itemdata = {
          id: item.committer["id"],
          login: item.committer["login"],
          avatarUrl: item.committer["avatar_url"],
          htmlUrl: item.committer["html_url"],
          commits: 1,
        };
        if (topic.some((e) => e.id == itemdata.id)) {
          topic.forEach((item) => {
            if (item.id === itemdata.id) {
              item.commits = item.commits + 1;
            }
          });
        } else {
          topic.push(itemdata);
        }
      }
    });
    contributors.value = topic.sort(compare);
  });
};

fetchContributors();
</script>

<style>
.contributor {
  text-align: left;
  margin: 30px 15px 30px 20px;
  display: inline-block;
}

.contributor a {
  height: 40px;
  display: inline-block;
}

.contributor span {
  margin: 5px;
}

.online-edit {
  display: inline-block;
}
</style>
