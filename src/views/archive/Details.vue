<template>
  <div class="archive-details">
    <!-- 页头 -->
    <blog-header />

    <!-- 封面 -->
    <blog-page-cover>
      <template #default="slotProps">
        <h1 :style="slotProps.hOneStyle">
          {{ props.year }}年 {{ props.month }}月
        </h1>
      </template>
    </blog-page-cover>

    <!-- 内容区 -->
    <div class="container">
      <!-- 侧边栏 -->
      <blog-side-bar />

      <!-- 发表的文章 -->
      <div class="post-article-list">
        <!-- 文章卡片 -->
        <blog-post-article-card
          v-for="(article, index) in postArticles"
          :key="article.id"
          :article="article"
          :reverse="index % 2 == 1"
        />

        <el-pagination
          background
          layout="prev,pager,next"
          :total="articleCount"
          :page-size="pageSize"
          id="pageination"
          @current-change="onCurrentPageChanged"
          v-if="articleCount > 0"
        />
      </div>
    </div>

    <!-- 页脚 -->
    <blog-footer />

    <!-- 回到顶部按钮 -->
    <blog-back-to-top />
  </div>
</template>

<script>
export default {
  name: "ArchiveDetails",
};
</script>

<script setup>
import { reactive, ref, defineProps } from "vue";
import { getPostArticleList } from "../../api/article";
import { defaultThumbnail } from "../../utils/thumbnail";

const props = defineProps(["year", "month"]);

const pageSize = 10;
const postArticles = reactive([]);
const articleCount = ref(0);

// 获取归档数据
function onCurrentPageChanged(pageNum) {
  getPostArticleList(
    pageNum,
    pageSize,
    null,
    null,
    props.year + "/" + props.month
  ).then((data) => {
    articleCount.value = parseInt(data.total);
    data.rows.forEach((article) => {
      article.createTime = article.createTime.split(" ")[0];
      article.thumbnail = article.thumbnail || defaultThumbnail;
    });

    postArticles.splice(0, postArticles.length, ...data.rows);
  });
}

onCurrentPageChanged(1);

window.scrollTo({ top: 0 });
</script>

<style lang="less" scoped>
.archive-details {
  height: 100%;
  width: 100%;
  .container {
    padding: 40px 15px;
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    animation: fadeInUp 1s;
    .post-article-list {
      width: 74%;

      .post-article-card {
        margin-top: 20px;
      }

      .post-article-card:nth-child(1) {
        margin-top: 0;
      }

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
    }
  }
}
@media screen and (max-width: 900px) {
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
