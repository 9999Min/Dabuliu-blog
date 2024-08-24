<template>
  <div class="article-edit">
    <!-- 页头 -->
    <blog-header />

    <!-- 封面 -->
    <blog-page-cover>
      <template #default="slotProps">
        <h1 :style="slotProps.hOneStyle">{{ title }}</h1>
      </template>
    </blog-page-cover>

    <!-- 编辑卡片 -->
    <div class="edit-card">
      <h1 class="blog-title">{{ EnumModule.BLOG_TITLE }}</h1>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="60px"
        class="edit-ruleForm"
      >
        <!-- 标题输入 -->
        <el-form-item prop="title" label="标题">
          <el-input
            v-model="ruleForm.title"
            class="w-50 m-3"
            size="large"
            placeholder="给博客起个标题吧"
          />
        </el-form-item>

        <!-- 摘要输入 -->
        <el-form-item prop="summary" label="摘要">
          <el-input
            v-model="ruleForm.summary"
            class="w-50 m-3"
            size="textarea"
            placeholder="简要介绍一下博客吧"
          />
        </el-form-item>

        <!-- 选择器 -->
        <div class="inline-form-row">
          <!-- 分类选择 -->
          <el-form-item prop="category" label="分类" inline style="width: 35%">
            <el-select-v2
              v-model="ruleForm.category"
              :options="categories"
              placeholder="给博客分个类吧"
              style="width: 100%; vertical-align: middle"
              allow-create
              filterable
              clearable
            />
          </el-form-item>
          <!-- 标签选择 -->
          <el-form-item prop="tag" label="标签" inline style="width: 60%">
            <el-select-v2
              v-model="ruleForm.tags"
              :options="tags"
              placeholder="给博客贴几个标签吧"
              style="width: 100%; vertical-align: middle"
              multiple
              allow-create
              filterable
              clearable
            />
          </el-form-item>
        </div>

        <!-- 编辑器 -->
        <el-form-item prop="content" label="内容">
          <mavon-editor
            v-model="ruleForm.content"
            id="mavon"
            codeStyle="atom-one-dark"
            :autofocus="false"
            :boxShadow="false"
            @imgAdd="onImageAdded"
            ref="mavonRef"
          />
        </el-form-item>

        <!-- 缩略图 -->
        <el-form-item prop="thumbnail" label="缩略图">
          <blog-uploader
            @uploaded="handleThumbnailUploaded"
            @aboutToUpload="handleAboutToUploadThumbnail"
            @removed="handleRemoveThumbnail"
            ref="uploaderRef"
          />
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef, false)"
            color="#1892ff"
            class="el-button"
            id="submit-button"
            >立刻发布</el-button
          >
          <el-button
            class="el-button"
            id="draft-button"
            @click="submitForm(ruleFormRef, true)"
            >存为草稿</el-button
          >
          <el-button @click="cancelSubmit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 页脚 -->
    <blog-footer />
  </div>
</template>

<script>
export default {
  name: "ArticleEdit",
};
</script>

<script setup>
import EnumModule from "../../constant/index";
import { ref, reactive, computed, nextTick, defineProps } from "vue";
import { mapState } from "../../store/map";
import { addArticle, editArticle, getArticleDetails } from "../../api/article";
import { uploadImage } from "../../api/image";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "../../router";
import bus from "../../utils/bus";
import markdownIt from "../../utils/markdown-it";

// 加载完成后回到顶部
nextTick(() => {
  window.scrollTo({ top: 0 });
});

const props = defineProps(["id"]);
//模式
const isInEditMode = props.id ? true : false;
//标题
const title = computed(() => {
  return isInEditMode ? "编辑博客" : "新博客";
});
// 获取dom节点
const mavonRef = ref();
const ruleFormRef = ref();
const uploaderRef = ref();

/**
 * 从仓库中获取分类数据处理
 */
const { categoryCounts } = mapState("categoryAbout");
const categories = computed(() => {
  return categoryCounts.value.map((c) => {
    return {
      value: c.name,
      label: c.name,
    };
  });
});
/**
 * 从仓库中获取标签数据处理
 */
const { tagCounts } = mapState("tagAbout");
const tags = computed(() => {
  return tagCounts.value.map((t) => {
    return {
      value: t.name,
      label: t.name,
    };
  });
});

/**
 * 表单数据
 */
const ruleForm = reactive({
  id: undefined,
  title: "",
  summary: "",
  content: "",
  category: "",
  tags: [],
  thumbnail: "",
  isDraft: false,
});

/**
 * 表单校验规则
 */
const rules = reactive({
  title: [
    {
      required: true,
      message: "文章标题不能为空",
      trigger: "change",
    },
  ],
  content: [
    {
      required: true,
      message: "文章内容不能为空",
      trigger: "change",
    },
  ],
  category: [
    {
      required: true,
      message: "请选择一个分类",
      trigger: "change",
    },
  ],
});
/**
 * 如果是编辑状态需要先获取文章信息
 */
if (isInEditMode) {
  getArticleDetails(props.id).then((data) => {
    Object.assign(ruleForm, data);
    ruleForm.category = data.categoryName;
    ruleForm.tags = data.tags.map((t) => {
      return t.name;
    });

    if (data.thumbnail) {
      uploaderRef.value.setImageUrl(data.thumbnail);
      uploaderRef.value.isSuccessLabelVisible = true;
    }
  });
}

function onImageAdded(pos, file) {
  uploadImage(file).then((url) => {
    mavonRef.value.$img2Url(pos, url);
  });
}

/**
 * 上传成功前禁用
 */
function handleAboutToUploadThumbnail() {
  document.getElementById("submit-button").disabled = true;
  document.getElementById("draft-button").disabled = true;
}

/**
 * 上传成功后取消禁用
 * @param url
 */
function handleThumbnailUploaded(url) {
  ruleForm.thumbnail = url;
  document.getElementById("submit-button").disabled = false;
  document.getElementById("draft-button").disabled = false;
}

/**
 * 删除缩略图方法
 */
function handleRemoveThumbnail() {
  ruleForm.thumbnail = "";
}

/**
 * 表单校验方法
 * @param form
 */
function validateForm(form) {
  if (!form) return false;

  form.validate((valid) => {
    if (!valid) {
      ElMessage.error("必填字段不能为空哦");
      return false;
    }
  });

  return true;
}

/**
 * 处理概要内容，有不处理，没有就截取内容的前150个字符
 */
function generateSummary() {
  if (ruleForm.summary) {
    return;
  }

  const html = markdownIt.render(ruleForm.content);
  ruleForm.summary = html.replace(/<[^>]+>/g, "").slice(0, 150);
}

/**
 * 文章发布方法
 * @param form 表单数据
 * @param isDraft 是否为草稿
 */
function submitForm(form, isDraft) {
  if (!validateForm(form)) return;

  ruleForm.isDraft = isDraft;
  generateSummary();

  const name = isDraft ? "草稿" : "博客";
  if (!isInEditMode) {
    addArticle(ruleForm).then((id) => {
      ElMessage.success(name + "保存成功啦");
      setTimeout(() => {
        router.push("/article/" + id);
      }, 1500);
    });
  } else {
    editArticle(ruleForm).then((id) => {
      ElMessage.success(name + "编辑成功啦");
      bus.emit("articlePosted");
      setTimeout(() => {
        router.push("/article/" + id);
      }, 1500);
    });
  }
}

/**
 * 取消发布的方法
 */
function cancelSubmit() {
  ElMessageBox.confirm(
    "前辈已经想好要取消这篇博客的发表了吗？",
    "一条友善的提示",
    {
      confirmButtonText: "你是在教我做事？",
      cancelButtonText: "我再想想",
      type: "warning",
    }
  ).then(() => {
    router.push("/");
  });
}
</script>

<style lang="less" scoped>
.article-edit {
  width: 100%;
  height: 100%;
  .edit-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: var(--card-box-shadow);
    padding: 10px 30px;
    width: 70%;
    margin: 50px auto 0;
    box-sizing: border-box;
    animation: fadeInUp 1s;

    .blog-title {
      text-align: center;
      font-size: 26px;
      font-family: "Kanit";
      color: #4679fa;
    }

    .inline-form-row {
      display: flex;
      justify-content: space-between;
    }

    #mavon {
      width: 100%;
      max-height: 600px;
      border-color: #d9d9d9;

      &:focus {
        border-color: var(--el-color-primary);
      }

      .v-note-op {
        border-bottom-color: #d9d9d9;
      }
    }

    .el-button {
      transition: all 0.4s;
    }
  }
}

#submit-button:disabled,
#draft-button:disabled {
  cursor: not-allowed;
}

@keyframes fadeInUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
