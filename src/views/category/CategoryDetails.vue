<template>
  <div class="category-details">
    <!-- 页头 -->
    <blog-header />

    <!-- 二次元封面 -->
    <blog-page-cover>
      <template #default="slotProps">
        <h1 :style="slotProps.hOneStyle">{{ categoryName }}</h1>
      </template>
    </blog-page-cover>

    <div class="container">
      <!-- 侧边栏 -->
      <blog-side-bar />

      <!-- 发表的文章 -->
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
          :page-size="pageSize"
          id="pagination"
          @current-change="onCurrentPageChanged"
          v-if="articleCount > 0"
        />
      </div>
    </div>

    <!-- 页脚 -->
    <blog-footer />

    <!-- 回到顶部 -->
    <blog-back-to-top />
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { getPostArticleList } from "../../api/article";
import { defaultThumbnail } from "../../utils/thumbnail";
import { mapState } from "../../store/map";

export default {
  name: "CategoryDetails",
  setup(props) {
    let pageSize = 10;
    let postArticles = reactive([]);
    let articleCount = ref(0);
    let { categoryCounts } = mapState("categoryAbout");
    let categoryName = computed(() => {
      let map = Object.fromEntries(
        categoryCounts.value.map((i) => [i.id, i.name])
      );
      return map[props.id];
    });

    onCurrentPageChanged(1);

    function onCurrentPageChanged(pageNum) {
      getPostArticleList(pageNum, pageSize, props.id).then((data) => {
        articleCount.value = parseInt(data.total);
        data.rows.forEach((article) => {
          article.createTime = article.createTime.split(" ")[0];
          article.thumbnail = article.thumbnail || defaultThumbnail;
        });

        postArticles.push(...data.rows);
      });
    }

    window.scrollTo({ top: 0 });

    return {
      categoryName,
      postArticles,
      articleCount,
      pageSize,
      onCurrentPageChanged,
    };
  },
  props: ["id", "name"],
};
</script>

<style lang="less" scoped>
.category-details {
  width: 100%;
  height: 100%;
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
