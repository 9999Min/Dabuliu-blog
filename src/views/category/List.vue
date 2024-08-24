<template>
  <div class="category-list">
    <!-- 页头 -->
    <blog-header />

    <!-- 封面 -->
    <blog-page-cover>
      <template #default="slotProps">
        <h1 :style="slotProps.hOneStyle">分类</h1>
      </template>
    </blog-page-cover>

    <!-- 内容区 -->
    <div class="container">
      <blog-side-bar />

      <blog-word-card :words="categoryCounts" baseUrl="/category" />
    </div>

    <!-- 页脚 -->
    <blog-footer />

    <!-- 回到顶部 -->
    <blog-back-to-top />
  </div>
</template>

<script>
export default {
  name: "CategoryList",
};
</script>

<script setup>
import { mapState } from "../../store/map";

window.scrollTo({ top: 0 });

const { categoryCounts } = mapState("categoryAbout");
</script>

<style lang="less" scoped>
.category-list {
  width: 100%;
  height: 100%;
  .container {
    padding: 40px 15px;
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    animation: fadeInUp 1s;

    :deep(.cloud-card) {
      width: 74%;
      margin: 0;
    }
  }
}

@media screen and (max-width: 900px) {
  :deep(.cloud-card) {
    width: 100%;
  }
}
</style>
