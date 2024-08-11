<template>
  <div id="home">
    <!-- 页头 -->
    <blog-header />
    <!-- 封面 -->
    <blog-cover></blog-cover>

    <div class="container">
      <!-- 侧边栏 -->
      <div class="side-content">
        <blog-admin-card />
        <blog-hot-article-card />
        <blog-category-card />
        <blog-tag-card />
        <blog-archive-card />
      </div>

      <!-- 文章列表 -->
      <div class="post-article-list">
        <blog-post-article-card
          v-for="(article, index) in postArticles"
          :key="article.id"
          :article="article"
          :reverse="index % 2 == 1"
        />

        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="articleCount"
          :page-size="EnumModule.ARTICLE_PAGESIZE"
          id="pagination"
          @current-change="onCurrentPageChanged"
          v-if="articleCount > 0"
        ></el-pagination>
      </div>
    </div>

    <!-- 页脚 -->
    <blog-footer :adminName="$store.state.adminAbout.adminInfo.nickName" />

    <!-- 滚动到顶部按钮 -->
    <blog-back-to-top />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getPostArticleList } from "../api/article";
import { defaultThumbnail } from "../utils/thumbnail";
import EnumModule from "../constant";
const postArticles = reactive([]);
const articleCount = ref(0);

/**
 * @param pageNum
 * 获取文章方法 对文章的创建时间和展示图片处理
 * 文章列表 文章总数
 * 开始即调用页码为1
 */
onCurrentPageChanged(1);
async function onCurrentPageChanged(pageNum) {
  const data = await getPostArticleList(pageNum, EnumModule.ARTICLE_PAGESIZE);
  articleCount.value = parseInt(data.total);
  data.rows.forEach((article) => {
    article.createTime = article.createTime.split(" ")[0];
    article.thumbnail = article.thumbnail || defaultThumbnail;
  });
  postArticles.splice(0, postArticles.length, ...data.rows);
}
</script>

<style lang="less" scoped>
#home {
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

.post-article-list {
  width: 74%;

  .post-article-card {
    margin-top: 20px;
  }

  .post-article-card:nth-child(1) {
    margin-top: 0;
  }
}

.side-content {
  width: 26%;
  margin-right: 20px;
}
// 样式穿透
:deep(#pagination) {
  margin-top: 20px;
  justify-content: center;

  & > button {
    box-shadow: var(--card-box-shadow);
    background: white;
    border-radius: 8px;
    height: 35px;
    width: 35px;
  }

  li {
    box-shadow: var(--card-box-shadow);
    background-color: white;
    border-radius: 8px;
    margin: 0 6px;
    height: 35px;
    width: 35px;
  }

  li.active {
    color: white;
    background: var(--theme-color);
    font-weight: normal;
  }
}

@media screen and (max-width: 900px) {
  .side-content {
    display: none;
  }

  .post-article-list {
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
