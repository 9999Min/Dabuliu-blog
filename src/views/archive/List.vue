<template>
  <div class="archive-list">
    <!-- 页头 -->
    <blog-header />
    <!-- 封面 -->
    <blog-page-cover>
      <template #default="slotProps">
        <h1 :style="slotProps.hOneStyle">归档</h1>
      </template>
    </blog-page-cover>

    <!-- 内容区 -->
    <div class="container">
      <blog-side-bar />

      <div class="archive-body">
        <div class="archive-card">
          <el-timeline class="timeline">
            <el-timeline-item
              center
              :timestamp="`历史文章 - ${articleCount}`"
              placement="top"
              class="root-item"
            ></el-timeline-item>

            <el-timeline-item
              v-for="archive in archives"
              :key="archive.year"
              class="year-item"
              :timestamp="archive.year + ''"
              placement="top"
            >
              <div
                v-for="article in archive.articles"
                :key="article.id"
                class="article-item"
              >
                <router-link
                  :to="`/article/${article.id}`"
                  class="article-thumbnail-link"
                  ><img
                    :src="article.thumbnail"
                    @error.once="useDefaultThumbnail"
                    alt="缩略图"
                    class="article-thumbnail"
                  />
                </router-link>

                <div class="article-info">
                  <router-link
                    :to="`/article/${article.id}`"
                    class="article-title"
                    >{{ article.title }}</router-link
                  >
                  <div class="article-meta-data">
                    <span>
                      <font-awesome-icon
                        :icon="['fas', 'calender-days']"
                        class="article-meta-data-icon"
                      />发表于{{ article.createTime }}
                    </span>
                    <span>
                      <font-awesome-icon
                        :icon="['fas', 'eye']"
                        class="article-meta-data-icon"
                      />{{ article.viewCount }}次围观
                    </span>
                  </div>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>

        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="articleCount"
          :pageSize="pageSize"
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
export default {
  name: "ArchiveList",
};
</script>

<script setup>
import { mapState } from "../../store/map";
import { getArchiveList } from "../../api/archive";
import { computed, reactive } from "vue";
import { defaultThumbnail, useDefaultThumbnail } from "../../utils/thumbnail";

window.scrollTo({ top: 0 });

const pageSize = 10;
const archives = reactive([]);
const { articleCountInfo } = mapState("adminAbout");
const articleCount = computed(() => {
  return parseInt(articleCountInfo.value.article);
});

function onCurrentPageChanged(pageNum) {
  getArchiveList(pageNum, pageSize).then((data) => {
    data.rows.forEach((archive) => {
      archive.articles.forEach((article) => {
        article.createTime = article.createTime.split(" ")[0];
        article.thumbnail = article.thumbnail || defaultThumbnail;
      });
    });
    archives.splice(0, archives.length, ...data.rows);

    archives.push({ year: "", articles: [] });
  });
}

onCurrentPageChanged(1);
</script>

<style lang="less" scoped>
.archive-list {
  height: 100%;
  width: 100%;
  .container {
    padding: 40px 15px;
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    animation: fadeInUp 1s;
    .archive-body {
      width: 74%;
      height: 100%;

      .archive-card {
        background: white;
        border-radius: 8px;
        box-shadow: var(--card-box-shadow);
        padding: 50px 24px;
        :deep(.timeline) {
          margin-top: 20px;

          .root-item {
            .el-timeline-item {
              padding-bottom: 20px;
            }

            .el-timeline-item__node {
              border: 5px solid var(--theme-color);
              background: transparent;
              width: 20px;
              height: 20px;
              left: -5px;
              top: -7px;
            }

            .el-timeline-item__tail {
              top: calc(50% - 15px);
              height: calc(50% + 15px);
              border-left: 2px solid #4ba9fc;
            }

            .el-timeline-item__wrapper {
              transform: translateY(-11px);

              .el-timeline-item__timestamp {
                font-size: 24px;
                color: var(--text-color);
              }
            }
          }

          .year-item {
            .article-item {
              display: flex;
              justify-content: center;
              align-content: center;
              padding: 10px 0;

              .article-thumbnail-link {
                height: 80px;
                width: 80px;
                overflow: hidden;
                border-radius: 6px;

                .article-thumbnail {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  transition: all 0.4s ease;
                }
              }

              .article-thumbnail:hover {
                transform: scale(1.1);
              }

              .article-info {
                flex: 1;
                padding-left: 16px;
                word-break: break-all;
                display: inline-block;
                align-self: center;

                .article-title {
                  color: var(--text-color);
                  font-size: 15px;
                  text-decoration: none;
                  transition: color 0.4s;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  line-height: 1.5;
                  -webkit-line-clamp: 2;

                  &:hover {
                    color: var(--theme-color);
                  }
                }

                .article-meta-data {
                  font-size: 13px;
                  color: rgb(133, 133, 133);
                  box-sizing: border-box;
                  line-height: 30px;
                  overflow: hidden;
                  -webkit-line-clamp: 1;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;

                  .article-meta-data-icon {
                    margin-right: 5px;
                  }

                  span {
                    margin-right: 20px;
                  }
                }
              }
            }
            .el-timeline-item__node {
              border: 3px solid #ff7242;
              background: white;
              width: 12px;
              height: 12px;
              left: -1px;
              top: 0;
            }

            .el-timeline-item__wrapper {
              transform: translateY(-6px);

              .el-timeline-item__timestamp {
                font-size: 20px;
                color: var(--text-color);
              }
            }

            .el-timeline-item__tail {
              border-left: 2px solid #9eccf5;
            }
          }

          .year-item:nth-last-child(2) {
            padding-bottom: 0;
          }

          .year-item:last-child {
            visibility: hidden;
          }
        }
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
  .archive-body {
    width: 100%;
  }
}
</style>
