<template>
  <div class="cloud-card">
    <div class="clouds">
      <router-link
        class="cloud-item"
        v-for="cloud in clouds"
        :key="cloud.id"
        :to="`${props.baseUrl}/${cloud.id}`"
        :style="cloud.style"
        >{{ cloud.name }}</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { randomColorWordCloud } from "../utils/word-cloud";

const props = defineProps({
  words: {
    type: Array,
    require: true,
  },
  baseUrl: {
    type: String,
    require: true,
  },
});

const clouds = computed(() => {
  return randomColorWordCloud(props.words);
});
</script>

<style lang="less" scoped>
.cloud-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--card-box-shadow);
  padding: 20px 24px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .clouds {
    font-size: 14px;
    box-sizing: border-box;

    .cloud-item {
      text-decoration: none;
      display: inline-block;
      transition: all 0.4s;
      padding: 0 8px;
      overflow-wrap: break-word;
      line-height: 2;

      &:hover {
        color: var(--theme-color) !important;
        transform: scale(1.1);
      }
    }
  }
}
</style>
