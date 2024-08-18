<template>
  <div id="category-list">
    <!-- 页头 -->
    <blog-header />

    <!-- 二次元封面 -->
    <blog-page-cover>
      <template #default="slotProps">
        <h1 :style="slotProps.hOneStyle">分类</h1>
      </template>
    </blog-page-cover>

    <div class="container">
      <!-- 侧边栏 -->
      <blog-side-bar />

      <!-- 标签云卡片 -->
      <blog-word-card :words="categoryCounts" baseUrl="/category" />
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
  name: "CategoryList",
  setup() {
    window.scrollTo({ top: 0 });
    let { categoryCounts } = mapState("categoryAbout");

    return { categoryCounts };
  },
};
</script>

<style lang="less" scoped>
#category-list {
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

:deep(.cloud-card) {
  width: 74%;
  margin: 0;
}

@media screen and (max-width: 900px) {
  :deep(.cloud-card) {
    width: 100%;
  }
}
</style>
