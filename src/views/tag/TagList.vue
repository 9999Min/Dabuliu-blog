<template>
  <div id="tag-list">
    <!-- 页头 -->
    <blog-header />

    <!-- 二次元封面 -->
    <blog-page-cover>
      <template #default="slotProps">
        <h1 :style="slotProps.hOneStyle">标签</h1>
      </template>
    </blog-page-cover>

    <div class="container">
      <!-- 侧边栏 -->
      <blog-side-bar />

      <blog-word-card :words="tagCounts" baseUrl="/tag" />
    </div>

    <!-- 页脚 -->
    <blog-footer />

    <!-- 回到顶部 -->
    <blog-back-to-top />
  </div>
</template>

<script>
import { mapState } from "../../store/map";

export default {
  name: "TagList",
  setup() {
    window.scrollTo({ top: 0 });
    let { tagCounts } = mapState("tagAbout");

    return { tagCounts };
  },
};
</script>

<style lang="less" scoped>
#tag-list {
  height: 100%;
  width: 100%;
}

.container {
  padding: 40px 15px;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  animation: fadeInUp 1s;
}

:deep(.clou-card) {
  width: 74%;
  margin: 0;
}

@media screen and (max-width: 900px) {
  :deep(.cloud-card) {
    width: 100%;
  }
}
</style>
