<template>
  <blog-card :icon="['fas', 'folder']" iconColor="#fcd53f" title="分类">
    <div class="category-list">
      <router-link
        v-for="category in categoryCounts"
        :key="category.id"
        :to="`/category/${category.id}`"
        class="category-item"
      >
        <span class="category-name">{{ category.name }}</span>
        <span class="category-count">{{ category.count }}</span>
      </router-link>
    </div>
  </blog-card>
</template>

<script setup>
import { mapState } from "../store/map";
const { categoryCounts } = mapState("categoryAbout");
</script>

<style scoped>
.category-item {
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  padding: 10px 10px;
  color: var(--text-color);
  font-size: 14px;
  transition: all 0.4s;
  border-radius: 4px;
}

.category-item:hover {
  background-color: var(--theme-color);
  color: white;
  padding: 10px 17px;
}

.category-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
