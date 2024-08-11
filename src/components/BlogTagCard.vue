<template>
  <blog-card :icon="['fas', 'tags']" iconColor="#db669f" title="标签">
    <div class="tag-clouds">
      <router-link
        class="tag-item"
        v-for="tag in tagClouds"
        :key="tag.id"
        :to="`/tag/${tag.id}`"
        :style="tag.style"
        >{{ tag.name }}</router-link
      >
    </div>
  </blog-card>
</template>

<script setup>
import { mapState } from "../store/map";
import { linearColorWordCloud } from "../utils/word-cloud";
import { computed } from "vue";

const { tagCounts } = mapState("tagAbout");
const tagClouds = computed(() => linearColorWordCloud(tagCounts.value));
</script>

<style scoped>
.tag-clouds {
  font-size: 14px;
  box-sizing: border-box;
}

.tag-item {
  text-decoration: none;
  display: inline-block;
  transition: all 0.4s;
  padding: 0 4px;
  overflow-wrap: break-word;
  line-height: 2;
}

.tag-item:hover {
  color: var(--theme-color) !important;
}
</style>
