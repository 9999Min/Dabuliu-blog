<template>
  <router-view :key="$route.fullPath" />
</template>

<script>
import store from "./store";
import bus from "./utils/bus";

export default {
  name: "App",
  /**
   * App setup
   * 1.进入获取用户信息
   * 2.更新文章数量分类标签等信息
   * 3.全局事件总线监听articlePosted文章发布事件，重新获取信息
   */
  setup() {
    store.dispatch("adminAbout/getAdminInfo");
    updateArticleInfo();
    bus.on("articlePosted", updateArticleInfo);

    function updateArticleInfo() {
      store.dispatch("adminAbout/getArticleCount");
      store.dispatch("categoryAbout/getCategoryCounts");
      store.dispatch("tagAbout/getTagCounts");
    }
  },
};
</script>

<style>
/* 引入谷歌字体 */
@import url(https://fonts.googleapis.com/css?family=Kanit:900);
@import url(https://fonts.googleapis.com/css?family=Long+Cang&display=swap);

/* 自定义滚动条 */
::-webkit-scrollbar {
  height: 14px;
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(153, 153, 153, 0.8);
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}
/* 页面整体背景 */
body {
  overflow: overlay;
  background-color: #f3f6f7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

:root {
  --theme-color: #19b1f5;
  --text-color: #4c4948;
  --card-box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}

::selection {
  background: var(--theme-color);
  color: #fff;
}
</style>
