<template>
  <div class="site-container">
    <div class="site-layui-main">
      <div class="site-zfj site-zfj-anim">
        <img
          src="../assets/logo.jpg"
          style="width: 172px; border-radius: 20px; border: 5px solid #e2e2e2"
        />
      </div>
      <div class="layui-anim site-desc site-desc-anim">
        <p class="web-font-desc">layui - vue</p>
        <cite>{{ t("home.description") }}</cite>
      </div>
      <div class="site-download">
        <router-link class="layui-inline site-down" to="/zh-CN/guide">
          Get Started
        </router-link>
        <a
          class="layui-inline site-down"
          href="javascript:void(0);"
          @click="changeTheme"
        >
          {{ appStore.theme === "dark" ? "Turn Off" : "Turn On" }}
        </a>
      </div>
      <div class="site-version">
        <span
          >{{ t("home.version") }}：<cite class="site-showv">
            {{ version }}
          </cite></span
        >
        <span
          >{{ t("home.download") }}：<em class="site-showdowns">{{
            npmDownloadValue
          }}</em></span
        >
      </div>
      <div class="site-banner-other">
        <a
          href="https://gitee.com/layui/layui-vue"
          target="_blank"
          rel="nofollow"
          class="site-star"
        >
          <i class="layui-icon"></i> Star <cite id="getStars">3174</cite>
        </a>
        <a
          href="https://gitee.com/layui/layui-vue"
          target="_blank"
          rel="nofollow"
          class="site-fork"
        >
          Gitee
        </a>
        <a
          href="https://github.com/layui/layui-vue"
          target="_blank"
          rel="nofollow"
          class="site-fork"
        >
          Github
        </a>
      </div>
    </div>
    <div class="box-list">
      <lay-row :space="30">
        <lay-col :md="8" :sm="12" :xs="12">
          <div class="box">
            <div class="icon">🐼</div>
            <h2 class="title">Classic design</h2>
            <p class="details">layui css.</p>
          </div>
        </lay-col>
        <lay-col :md="8" :sm="12" :xs="12">
          <div class="box">
            <div class="icon">🐝</div>
            <h2 class="title">Small volume</h2>
            <p class="details">only 14.9 MB.</p>
          </div>
        </lay-col>
        <lay-col :md="8" :sm="12" :xs="12">
          <div class="box">
            <div class="icon">☀️</div>
            <h2 class="title">Dark theme</h2>
            <p class="details">provide theme variables.</p>
          </div>
        </lay-col>
        <lay-col :md="8" :sm="12" :xs="12">
          <div class="box">
            <div class="icon">🚀</div>
            <h2 class="title">Piu allegro</h2>
            <p class="details">provide vscode plugin.</p>
          </div>
        </lay-col>
        <lay-col :md="8" :sm="12" :xs="12">
          <div class="box">
            <div class="icon">☁️</div>
            <h2 class="title">Complete ecology</h2>
            <p class="details">admin and form design.</p>
          </div>
        </lay-col>
        <lay-col :md="8" :sm="12" :xs="12">
          <div class="box">
            <div class="icon">⚡</div>
            <h2 class="title">Setup script</h2>
            <p class="details">use grammar sugar.</p>
          </div>
        </lay-col>
      </lay-row>
    </div>
    <div class="link-list">
      <lay-row :space="30">
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="layui" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://layui.dev/"
              target="_blank"
            >
              <lay-avatar
                src="https://unpkg.com/outeres@0.0.6/img/layui/icon-1.png"
                style="border-radius: 2px"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="furion" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://furion.net/"
              target="_blank"
            >
              <lay-avatar
                src="https://foruda.gitee.com/avatar/1676938478360257103/974299_monksoul_1578937227.png"
                style="background: transparent"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="mybatis plus" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://baomidou.com"
              target="_blank"
            >
              <lay-avatar
                src="https://baomidou.com/assets/asset.cIbiVTt_.svg"
                style="background: transparent"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="aizuda" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://aizuda.com/home"
              target="_blank"
            >
              <lay-avatar
                src="https://aizuda.com/favicon.svg"
                style="background: transparent"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="LiteFlow" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://liteflow.yomahub.com"
              target="_blank"
            >
              <lay-avatar
                src="https://liteflow.yomahub.com//img/logo.svg"
                style="background: transparent"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="Sa-Token" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://sa-token.cc"
              target="_blank"
            >
              <lay-avatar
                src="https://sa-token.cc/logo.png"
                style="background: transparent"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="Jpom" position="top">
            <a
              style="height: 40px; display: inline-block"
              href="https://jpom.top"
              target="_blank"
            >
              <lay-avatar
                src="https://jpom.top/images/logo/jpom_logo_small.svg"
                style="background: transparent; width: 40px"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
        <lay-col :md="3" :xs="6">
          <lay-tooltip content="流之云" position="top">
            <a
              style="height: 40px; width: 40px; display: inline-block"
              href="https://www.gadmin8.com/"
              target="_blank"
            >
              <lay-avatar
                src="https://www.gadmin8.com/favicon.ico"
                style="background: transparent; width: 32px; height: 32px"
              ></lay-avatar>
            </a>
          </lay-tooltip>
        </lay-col>
      </lay-row>
    </div>
    <div class="footer footer-index">
      <p>Released under the <a href="/index.html">MIT License</a>.</p>
      <p>Copyright © 2021-2023 www.layui-vue.com</p>
      <p>
        鸣谢：
        <a
          href="https://www.oschina.net"
          style="color: #16b777; font-weight: 800; margin: 0px 5px"
          >Oschina</a
        >
        <a
          href="https://gitee.com"
          style="color: #c71d23; font-weight: 800; margin: 0px 5px"
          >Gitee</a
        >
        <a
          href="https://www.iconfont.cn/"
          style="color: #9b16ff; font-weight: 800; margin: 0px 5px"
          >iconfont</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "../store/app";
import { layer } from "layui-layer/src/index";

export default {
  name: "Index",
  setup() {
    const { t } = useI18n();
    const appStore = useAppStore();

    const npmDownloadValue = ref("...");

    /**
     * 从2021-9-28开始，获取每年的日期范围
     * 需要分段获取，接口不支持一次性获取所有数据
     * return [
        ["2021-09-28", "2021-12-31"],
        ["2022-01-01", "2022-12-31"],
        ["2023-01-01", "2023-12-31"],
        ["2024-01-01", "2024-12-31"],
        ["2025-01-01", "2025-03-09"]
       ]
     */
    function getYearlyDateRanges() {
      const startDate = new Date(2021, 9, 28);
      const today = new Date();
      const result = [];

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const startYear = startDate.getFullYear();
      const endYear = today.getFullYear();

      for (let year = startYear; year <= endYear; year++) {
        let rangeStart, rangeEnd;

        if (year === startYear) {
          rangeStart = startDate;
          rangeEnd = year === endYear ? today : new Date(year, 11, 31);
        } else if (year === endYear) {
          rangeStart = new Date(year, 0, 1);
          rangeEnd = today;
        } else {
          rangeStart = new Date(year, 0, 1);
          rangeEnd = new Date(year, 11, 31);
        }

        result.push([formatDate(rangeStart), formatDate(rangeEnd)]);
      }

      return result;
    }

    async function getNpmDownloadValue() {
      const timeRanges = getYearlyDateRanges();

      // https://api.npmjs.org/downloads/point/2023-09-08:2025-03-09/@layui/layui-vue
      const results = await Promise.all(
        timeRanges.map((range) => {
          return fetch(
            `https://api.npmjs.org/downloads/point/${range.join(
              ":"
            )}/@layui/layui-vue`
          );
        })
      );

      let num = 0;
      for (const result of results) {
        const data = await result.json();
        num += data.downloads;
      }

      npmDownloadValue.value = num.toLocaleString("en-US");
    }

    const changeTheme = () => {
      if (appStore.theme === "dark") {
        appStore.theme = "light";
      } else {
        appStore.theme = "dark";
      }
    };

    const version = inject("version");

    onMounted(() => {
      getNpmDownloadValue();

      if (appStore.documentVersion != version) {
        appStore.documentVersion = version;
        layer.notify({
          title: "更新公告",
          content: `layui - vue ${version} 已发布，请前往 <a style="color:#16baaa;" href="http://www.layui-vue.com/zh-CN/guide/changelog">[ 查看 ]</a>`,
          isHtmlFragment: true,
          offset: "rb",
          time: 10000,
          icon: 1,
        });
      }
    });

    return {
      t,
      version,
      appStore,
      changeTheme,
      npmDownloadValue,
    };
  },
};
</script>
<style>
#app,
html,
body {
  height: 100%;
}

.site-container {
  background: #fff;
  margin-top: 60px;
  height: calc(100vh - 60px);
  width: 100vw;
  background-image: url(../assets/background.svg);
  background-repeat: no-repeat;
  background-size: 100%;
}

.site-layui-main {
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.site-download {
  margin-top: 72px;
  font-size: 0;
}

.site-download a {
  position: relative;
  padding: 0 20px 0 20px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  background: #f1f1f1;
  border: 1px solid #f1f1f1;
  font-size: 16px;
  color: #476582;
  font-weight: 500;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  letter-spacing: 0.2px;
}

.site-download a:hover {
  border-radius: 10px;
}

.site-download a:first-child {
  background: var(--global-primary-color);
  color: white;
}

.site-download a + a {
  margin-left: 20px;
}

.site-zfj {
  height: 220px;
}

.site-zfj-anim i {
  -webkit-animation-name: site-zfj;
  animation-name: site-zfj;
  -webkit-animation-duration: 5s;
  animation-duration: 5s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

.site-zfj i {
  position: absolute;
  left: 50%;
  top: 50px;
  width: 200px;
  height: 200px;
  margin-left: -100px;
  font-size: 180px;
  color: #c2c2c2;
}

.site-desc-anim {
  -webkit-animation-name: site-desc;
  animation-name: site-desc;
}

.site-desc {
  position: relative;
  height: 70px;
  margin-top: 20px;
}

.site-desc .web-font-desc {
  color: #fff;
  color: #213547;
  font-size: 52px;
  opacity: 0.86;
}

.web-font-desc {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0 auto;
}

.site-desc cite {
  position: absolute;
  bottom: -40px;
  left: 0;
  width: 100%;
  color: rgba(60, 60, 60, 0.7);
  font-style: normal;
}

.site-version {
  position: relative;
  margin-top: 18px;
  color: rgba(60, 60, 60, 0.7);
  font-size: 12px;
}

.site-version span {
  padding: 0 3px;
}

.site-version * {
  font-style: normal;
}

.site-version a {
  color: rgba(60, 60, 60, 0.7);
  text-decoration: none;
  margin-top: -4px;
}

.site-banner-other {
  width: 100%;
  margin-top: 40px;
  text-align: center;
  font-size: 0;
}

.sponsors {
  padding: 0 150px 36px;
}

.sponsors h1 {
  text-align: center;
  margin-bottom: 12px !important;
}

.sponsors-main {
  padding: 20px 20px 20px;
  background-color: #ffffff;
  border-radius: 10px;
}

.sponsors-row {
  display: flex;
  justify-content: center;
}

.sponsors-btn {
  text-align: center;
}

.box-list {
  padding: 50px 250px;
}

.link-list {
  padding: 50px 250px;
  border-top: 1px solid #eeeeee;
}

.link-list .layui-col {
  text-align: center;
}

.box {
  background-color: #f9f9f9;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  padding: 24px;
  height: 100%;
}

.box .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: #e5e5e5;
  width: 48px;
  height: 48px;
  font-size: 24px;
}

.box .title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.box .details {
  font-size: 14px;
  padding-top: 8px;
  font-weight: 500;
  line-height: 24px;
  color: rgba(56 56 56 / 70%);
}

.site-container .layui-field-title {
  border-top: 1px solid #d2d2d2;
}

.site-banner-other a {
  display: inline-block;
  vertical-align: middle;
  height: 28px;
  line-height: 28px;
  margin: 0 6px;
  padding: 0 8px;
  border-radius: 4px;
  color: rgba(60, 60, 60, 0.7);
  background: #f2f4f5;
  border: 1px solid rgba(0, 0, 0, 0.06);
  font-size: 14px;
}

.footer {
  width: 100%;
  padding: 30px 0px;
  line-height: 30px;
  text-align: center;
  border-top: 1px solid #eee;
  color: rgba(60, 60, 60, 0.7);
  font-weight: 300;
  font-size: 13.6px;
  background: #f9f9f9;
}
</style>
