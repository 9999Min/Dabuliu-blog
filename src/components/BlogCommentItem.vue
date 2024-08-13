<template>
  <div :class="commentClass">
    <!-- 左侧头像 -->
    <div class="comment-item-avatar">
      <img :src="props.comment.avatar" alt="用户头像" />
    </div>
    <!-- 右侧评论框 -->
    <div class="comment-item-body">
      <!--  上方头部 -->
      <div class="comment-item-header">
        <!-- 左侧评论头信息 -->
        <div class="comment-item-info">
          <a @click.prevent="scrollToAnchor">#{{ props.floorNumber }}楼</a>
          <span>{{ props.comment.createTime }}</span>
          <span> {{ props.comment.userName }}</span>
        </div>
        <!-- 右侧评论操作菜单 -->
        <div class="comment-item-actions">
          <span class="more-actions" @click="showMoreActionsMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              version="1.1"
            >
              <path
                d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              ></path>
            </svg>
          </span>

          <el-dropdown
            ref="moreActionsMenu"
            trigger="contextmenu"
            @comman="handleMenuCommand"
          >
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="reply">回复</el-dropdown-item>
                <el-dropdown-item command="update" v-if="canModify"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item command="delete" v-if="canModify"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="comment-item-content" v-html="content"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, defineEmits, defineProps } from "vue";
import markdownIt from "../utils/markdown-it";
import { getUserInfo } from "../utils/storage";
// 定义props
const props = defineProps({
  comment: {
    type: String,
    require: true,
  },
  floorNumber: {
    type: Number,
    require: true,
  },
});
//定义emits
const emits = defineEmits(["reply", "update", "delete"]);

//定义数据
const commentClass = reactive(["comment-item"]);
/**
 * 判断是否是当前用户的评论，添加样式
 */
if (props.comment.isAdmin) {
  commentClass.push("comment-item-admin");
}
// 将当前内容转换成markdown内容
const content = computed(() => {
  return markdownIt.render(props.comment.content);
});
//获取下拉框组件
const moreActionsMenu = ref();
// 获取用户内容
const userInfo = getUserInfo();

//判断当前用户是否可以修改评论，管理员和评论者才能修改
const canModify = userInfo
  ? ref(userInfo.isAdmin || props.comment.createBy == userInfo.id)
  : ref(false);
/**
 * 滚动到点击评论
 */
function scrollToAnchor(e) {
  e.target.scrollIntoView({ behavior: "smooth" });
}
/**
 * 显示下拉框
 */
function showMoreActionsMenu() {
  moreActionsMenu.value.handleOpen();
}
/**
 * 下拉框的点击事件，触发emits提交给父组件
 */
function handleMenuCommand(command) {
  emits(command, props.comment);
}
</script>

<style lang="less" scoped>
.comment-item {
  display: flex;
  padding: 15px 0;
  position: relative;

  .comment-item-avatar {
    img {
      height: 40px;
      width: 40px;
      transition: all 0.6s ease-out;
      box-shadow: 0 0 0 1px rgba(27, 31, 36, 0.5);
      border-radius: 50%;

      &:hover {
        transform: rotate(360deg);
      }
    }
  }

  .comment-item-body {
    border: 1px solid #d0d7de;
    border-radius: 6px;
    width: 100%;
    margin-left: 20px;
    z-index: 1;
    flex: 1;
    min-width: 0;

    .comment-item-header {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: var(--text-color);
      color: #586069;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      background-color: #f6f8fa;
      border-bottom: 1px solid #d0d7de;
      padding: 9px 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: relative;

      .comment-item-info {
        a {
          color: var(--text-color);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          cursor: pointer;

          &::after {
            content: "";
            display: block;
            width: 0;
            height: 1px;
            position: absolute;
            left: 0;
            bottom: -2px;
            background: var(--theme-color);
            transition: all 0.3s ease-in-out;
          }

          &:hover {
            color: var(--theme-color);

            &::after {
              width: 100%;
            }
          }
        }

        span {
          margin: 0 3px;
        }
      }

      .comment-item-actions {
        span {
          color: #57606a;
          padding: 0px 4px;
          cursor: pointer;
          font-size: 13px;

          &:hover {
            color: #0969da;
          }

          svg {
            fill: currentColor;
          }
        }
        /* 弹出菜单 */
        :deep(.el-dropdown) {
          left: -13px;
          top: 10px;
        }
      }

      /*气泡三角形*/
      &::before,
      &::after {
        top: 11px;
        right: 100%;
        left: -16px;
        width: 0;
        height: 0;
        content: " ";
        border-style: solid solid outset;
        position: absolute;
        display: block;
        pointer-events: none;
        border-color: transparent #d0d7de transparent transparent;
        border-width: 8px;
      }

      &::after {
        border-color: transparent;
        margin-top: 1px;
        margin-left: 2px;
        border-width: 7px;
        border-right-color: #f6f8fa;
      }
    }

    :deep(.comment-item-content) {
      padding: 16px;
      font-size: 14px;
      background-color: white;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;

      a {
        color: var(--theme-color);
        position: relative;
        text-decoration: none;

        &:after {
          content: "";
          display: block;
          width: 0;
          height: 1px;
          position: absolute;
          left: 0;
          bottom: -2px;
          background: var(--theme-color);
          transition: all 0.3s ease-in-out;
        }

        &:hover {
          &::after {
            width: 100%;
          }
        }
      }

      p {
        margin: 0 0;

        /* 代码块 */
        & > code {
          color: #c7254e;
          font-family: consolas !important;
          vertical-align: middle;
          margin: 0 3px;
          background-color: #f9f2f4 !important;
          font-size: 13px !important;
          border-radius: 3px !important;
          border: 1px solid #f9f2f4 !important;
          padding: 0.2em 0.3em !important;
          word-break: break-all;
        }
      }

      pre {
        margin: 10px 0;
        white-space: pre;
        position: relative;
        border-radius: 7px;
        color: #bababa;
        background-color: #282c34;
        font-size: 14px;
        padding: 0;

        code {
          border: none;
          border-radius: 7px;
          font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace !important;
          line-height: 21px;
        }
      }

      img {
        margin: 10px 0;
        max-width: 100% !important;
        max-height: 400px;
      }

      /* 引用 */
      blockquote {
        padding: 0 1em;
        color: #57606a;
        border: none;
        border-left: 0.25em solid #d0d7de;
        margin: 10px 0;

        p {
          line-height: 1.8;

          a {
            color: #57606a;
            transition: all 0.3s ease;

            &:hover {
              color: var(--theme-color);
            }
          }
        }
      }
    }
  }

  // 连接线
  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 90px;
    display: block;
    z-index: 0;
    width: 2px;
    content: "";
    background-color: #d8dee4;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
}

.comment-item-admin {
  .comment-item-body {
    border: 1px solid #bbdfff;

    .comment-item-header {
      background-color: #ddf4ff;
      border-bottom: 1px solid #bbdfff;

      &::before,
      &::after {
        border-color: transparent #bbdfff transparent transparent;
      }

      &::after {
        border-right-color: #ddf4ff;
      }
    }
  }
}
</style>
