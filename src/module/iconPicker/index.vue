<template>
  <lay-dropdown>
    <input />
    <template #content>
      <div class="layui-iconpicker-view layui-iconpicker-scroll">
        <div class="layui-iconpicker-search">
          <div
            class="layui-form layui-input-wrap layui-input-wrap-prefix"
            lay-filter="LAY-ICON-FORM-DF-3"
          >
            <div class="layui-input-prefix">
              <i class="layui-icon layui-icon-search"></i>
            </div>
            <input
              type="text"
              value=""
              placeholder="search"
              autocomplete="off"
              class="layui-input"
              lay-filter="LAY-ICON-INPUT-3"
              lay-affix="clear"
            />
            <div class="layui-input-suffix layui-input-affix-event layui-hide">
              <i class="layui-icon layui-icon-clear"></i>
            </div>
          </div>
        </div>
        <div class="layui-iconpicker-list">
          <ul>
            <li>
              <i class="layui-icon layui-icon-heart-fill"></i>
              <p class="layui-elip">实心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-heart"></i>
              <p class="layui-elip">空心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-light"></i>
              <p class="layui-elip">亮度/晴</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-time"></i>
              <p class="layui-elip">时间/历史</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-bluetooth"></i>
              <p class="layui-elip">蓝牙</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-at"></i>
              <p class="layui-elip">@艾特</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-mute"></i>
              <p class="layui-elip">静音</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-mike"></i>
              <p class="layui-elip">录音/麦克风</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-key"></i>
              <p class="layui-elip">密钥/钥匙</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-gift"></i>
              <p class="layui-elip">礼物/活动</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-email"></i>
              <p class="layui-elip">邮箱</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-rss"></i>
              <p class="layui-elip">RSS</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-wifi"></i>
              <p class="layui-elip">WiFi</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-logout"></i>
              <p class="layui-elip">退出/注销</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-android"></i>
              <p class="layui-elip">Android 安卓</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-ios"></i>
              <p class="layui-elip">Apple IOS 苹果</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-windows"></i>
              <p class="layui-elip">Windows</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-transfer"></i>
              <p class="layui-elip">穿梭框</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-service"></i>
              <p class="layui-elip">客服</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-subtraction"></i>
              <p class="layui-elip">减</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-addition"></i>
              <p class="layui-elip">加</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-slider"></i>
              <p class="layui-elip">滑块</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-print"></i>
              <p class="layui-elip">打印</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-export"></i>
              <p class="layui-elip">导出</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-cols"></i>
              <p class="layui-elip">列</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-screen-restore"></i>
              <p class="layui-elip">退出全屏</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-screen-full"></i>
              <p class="layui-elip">全屏</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-rate-half"></i>
              <p class="layui-elip">半星</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-rate"></i>
              <p class="layui-elip">星星-空心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-rate-solid"></i>
              <p class="layui-elip">星星-实心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-cellphone"></i>
              <p class="layui-elip">手机</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-vercode"></i>
              <p class="layui-elip">验证码</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-login-wechat"></i>
              <p class="layui-elip">微信</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-login-qq"></i>
              <p class="layui-elip">QQ</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-login-weibo"></i>
              <p class="layui-elip">微博</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-password"></i>
              <p class="layui-elip">密码</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-username"></i>
              <p class="layui-elip">用户名</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-refresh-3"></i>
              <p class="layui-elip">刷新-粗</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-auz"></i>
              <p class="layui-elip">授权</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-spread-left"></i>
              <p class="layui-elip">左向右伸缩菜单</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-shrink-right"></i>
              <p class="layui-elip">右向左伸缩菜单</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-snowflake"></i>
              <p class="layui-elip">雪花</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-tips"></i>
              <p class="layui-elip">提示说明</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-note"></i>
              <p class="layui-elip">便签</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-home"></i>
              <p class="layui-elip">主页</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-senior"></i>
              <p class="layui-elip">高级</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-refresh"></i>
              <p class="layui-elip">刷新</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-refresh-1"></i>
              <p class="layui-elip">刷新</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-flag"></i>
              <p class="layui-elip">旗帜</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-theme"></i>
              <p class="layui-elip">主题</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-notice"></i>
              <p class="layui-elip">消息-通知</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-website"></i>
              <p class="layui-elip">网站</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-console"></i>
              <p class="layui-elip">控制台</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-face-surprised"></i>
              <p class="layui-elip">表情-惊讶</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-set"></i>
              <p class="layui-elip">设置-空心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-template-1"></i>
              <p class="layui-elip">模板</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-app"></i>
              <p class="layui-elip">应用</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-template"></i>
              <p class="layui-elip">模板</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-praise"></i>
              <p class="layui-elip">赞</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-tread"></i>
              <p class="layui-elip">踩</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-male"></i>
              <p class="layui-elip">男</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-female"></i>
              <p class="layui-elip">女</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-camera"></i>
              <p class="layui-elip">相机-空心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-camera-fill"></i>
              <p class="layui-elip">相机-实心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-more"></i>
              <p class="layui-elip">菜单-水平</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-more-vertical"></i>
              <p class="layui-elip">菜单-垂直</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-rmb"></i>
              <p class="layui-elip">金额-人民币</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-dollar"></i>
              <p class="layui-elip">金额-美元</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-diamond"></i>
              <p class="layui-elip">钻石-等级</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-fire"></i>
              <p class="layui-elip">火</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-return"></i>
              <p class="layui-elip">返回</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-location"></i>
              <p class="layui-elip">位置-地图</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-read"></i>
              <p class="layui-elip">办公-阅读</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-survey"></i>
              <p class="layui-elip">调查</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-face-smile"></i>
              <p class="layui-elip">表情-微笑</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-face-cry"></i>
              <p class="layui-elip">表情-哭泣</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-cart-simple"></i>
              <p class="layui-elip">购物车</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-cart"></i>
              <p class="layui-elip">购物车</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-next"></i>
              <p class="layui-elip">下一页</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-prev"></i>
              <p class="layui-elip">上一页</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-upload-drag"></i>
              <p class="layui-elip">上传-空心-拖拽</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-upload"></i>
              <p class="layui-elip">上传-实心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-download-circle"></i>
              <p class="layui-elip">下载-圆圈</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-component"></i>
              <p class="layui-elip">组件</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-file-b"></i>
              <p class="layui-elip">文件-粗</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-user"></i>
              <p class="layui-elip">用户</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-find-fill"></i>
              <p class="layui-elip">发现-实心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-loading"></i>
              <p class="layui-elip">loading</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-loading-1"></i>
              <p class="layui-elip">loading</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-add-1"></i>
              <p class="layui-elip">添加</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-play"></i>
              <p class="layui-elip">播放</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-pause"></i>
              <p class="layui-elip">暂停</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-headset"></i>
              <p class="layui-elip">音频-耳机</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-video"></i>
              <p class="layui-elip">视频</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-voice"></i>
              <p class="layui-elip">语音-声音</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-speaker"></i>
              <p class="layui-elip">消息-通知-喇叭</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-fonts-del"></i>
              <p class="layui-elip">删除线</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-fonts-code"></i>
              <p class="layui-elip">代码</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-fonts-html"></i>
              <p class="layui-elip">HTML</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-fonts-strong"></i>
              <p class="layui-elip">字体加粗</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-unlink"></i>
              <p class="layui-elip">删除链接</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-picture"></i>
              <p class="layui-elip">图片</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-link"></i>
              <p class="layui-elip">链接</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-face-smile-b"></i>
              <p class="layui-elip">表情-笑-粗</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-align-left"></i>
              <p class="layui-elip">左对齐</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-align-right"></i>
              <p class="layui-elip">右对齐</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-align-center"></i>
              <p class="layui-elip">居中对齐</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-fonts-u"></i>
              <p class="layui-elip">字体-下划线</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-fonts-i"></i>
              <p class="layui-elip">字体-斜体</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-tabs"></i>
              <p class="layui-elip">Tabs 选项卡</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-radio"></i>
              <p class="layui-elip">单选框-选中</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-circle"></i>
              <p class="layui-elip">单选框-候选</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-edit"></i>
              <p class="layui-elip">编辑</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-share"></i>
              <p class="layui-elip">分享</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-delete"></i>
              <p class="layui-elip">删除</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-form"></i>
              <p class="layui-elip">表单</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-cellphone-fine"></i>
              <p class="layui-elip">手机-细体</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-dialogue"></i>
              <p class="layui-elip">聊天 对话 沟通</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-fonts-clear"></i>
              <p class="layui-elip">文字格式化</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-layer"></i>
              <p class="layui-elip">窗口</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-date"></i>
              <p class="layui-elip">日期</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-water"></i>
              <p class="layui-elip">水 下雨</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-code-circle"></i>
              <p class="layui-elip">代码-圆圈</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-carousel"></i>
              <p class="layui-elip">轮播组图</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-prev-circle"></i>
              <p class="layui-elip">翻页</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-layouts"></i>
              <p class="layui-elip">布局</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-util"></i>
              <p class="layui-elip">工具</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-templeate-1"></i>
              <p class="layui-elip">选择模板</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-upload-circle"></i>
              <p class="layui-elip">上传-圆圈</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-tree"></i>
              <p class="layui-elip">树</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-table"></i>
              <p class="layui-elip">表格</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-chart"></i>
              <p class="layui-elip">图表</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-chart-screen"></i>
              <p class="layui-elip">图标 报表 屏幕</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-engine"></i>
              <p class="layui-elip">引擎</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-triangle-d"></i>
              <p class="layui-elip">下三角</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-triangle-r"></i>
              <p class="layui-elip">右三角</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-file"></i>
              <p class="layui-elip">文件</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-set-sm"></i>
              <p class="layui-elip">设置-小型</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-reduce-circle"></i>
              <p class="layui-elip">减少-圆圈</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-add-circle"></i>
              <p class="layui-elip">添加-圆圈</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-404"></i>
              <p class="layui-elip">404</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-about"></i>
              <p class="layui-elip">关于</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-up"></i>
              <p class="layui-elip">箭头 向上</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-down"></i>
              <p class="layui-elip">箭头 向下</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-left"></i>
              <p class="layui-elip">箭头 向左</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-right"></i>
              <p class="layui-elip">箭头 向右</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-circle-dot"></i>
              <p class="layui-elip">圆点</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-search"></i>
              <p class="layui-elip">搜索</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-set-fill"></i>
              <p class="layui-elip">设置-实心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-group"></i>
              <p class="layui-elip">群组</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-friends"></i>
              <p class="layui-elip">好友</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-reply-fill"></i>
              <p class="layui-elip">回复 评论 实心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-menu-fill"></i>
              <p class="layui-elip">菜单 隐身 实心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-log"></i>
              <p class="layui-elip">记录</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-picture-fine"></i>
              <p class="layui-elip">图片-细体</p>
            </li>
            <li class="layui-this">
              <i class="layui-icon layui-icon-face-smile-fine"></i>
              <p class="layui-elip">表情-笑-细体</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-list"></i>
              <p class="layui-elip">列表</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-release"></i>
              <p class="layui-elip">发布 纸飞机</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-ok"></i>
              <p class="layui-elip">对 OK</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-help"></i>
              <p class="layui-elip">帮助</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-chat"></i>
              <p class="layui-elip">客服</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-top"></i>
              <p class="layui-elip">top 置顶</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-star"></i>
              <p class="layui-elip">收藏-空心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-star-fill"></i>
              <p class="layui-elip">收藏-实心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-close-fill"></i>
              <p class="layui-elip">关闭-实心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-close"></i>
              <p class="layui-elip">关闭-空心</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-ok-circle"></i>
              <p class="layui-elip">正确</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-add-circle-fine"></i>
              <p class="layui-elip">添加-圆圈-细体</p>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </lay-dropdown>
</template>

<script setup name="LayIconPicker" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    type?: string
  }>()
</script>