<template>
  <div class="tag-list">
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
export default {
  name: "TagList",
};
</script>

<script setup>
import { mapState } from "../../store/map";

window.scrollTo({ top: 0 });

const { tagCounts } = mapState("tagAbout");
</script>

<style lang="less" scoped>
.tag-list {
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

@keyframes fadeInUp {
  from {
    margin-top: 50px;
    opacity: 0;
  }

  to {
    margin-top: 0;
    opacity: 1;
  }
}
</style>
