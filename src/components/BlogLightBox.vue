<template>
  <vue-easy-lightbox
    :visible="isVisible"
    :index="index"
    :imgs="images"
    @hide="handleHide"
  ></vue-easy-lightbox>
</template>

<script setup>
import { defineProps, reactive, ref, defineExpose } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";

const props = defineProps({
  container: {
    type: String,
    default: ".post-body .article-content",
  },
});
/**
 * 是否显示
 */
const isVisible = ref(false);
/**
 * 图片数据
 */
const images = reactive(getImages());

/**
 * 当前浏览图片的index
 */
const index = ref(0);

/**
 * 获取当前文章的图片数据
 */
function getImages() {
  let images = [];
  //获取文章内容dom节点
  const articleElement = document.querySelector(props.container);
  if (!articleElement) return images;
  // 获取内容节点中的所有img,得到伪数组,将其数组化,遍历节点转换成图片数组
  const imageElements = Array.from(articleElement.querySelectorAll("img"));
  for (const imageElement of imageElements) {
    const { src, title = "", alt = "" } = imageElement;
    images.push({ title, src, alt });
  }
  //返回
  return images;
}
/**
 * 为图片添加点击事件,供父组件加载完成时调用
 */
function addImageClickedListener() {
  let imageElements = Array.from(
    document.querySelectorAll(props.container + " img")
  );
  imageElements.forEach((el, i) => {
    el.addEventListener("click", () => {
      index.value = i;
      show();
    });
  });
}
/**
 * 暴露方法
 */
defineExpose({
  addImageClickedListener,
});

function show() {
  isVisible.value = true;
}

function handleHide() {
  isVisible.value = false;
}
</script>

<style scoped>
:deep(.vel-img) {
  box-shadow: 0 5px 20px 2px rgba(0, 0, 0, 0.35);
}
</style>
