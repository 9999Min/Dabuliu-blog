<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h2>{{ EnumModule.BLOG_TITLE }}</h2>
      </div>
    </template>

    <div class="card-body">
      <p class="title">{{ props.title }}</p>
      <slot>表单内容</slot>
    </div>
  </el-card>
</template>

<script setup>
import EnumModule from "../constant";
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    require: true,
  },
});
</script>

<style lang="less" scoped>
.box-card {
  width: 461px;
  border: 1px solid transparent;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px, rgba(0, 0, 0, 0.12) 0 -12px 30px,
    rgba(0, 0, 0, 0.12) 0 4px 6px, rgba(0, 0, 0, 0.17) 0 12px 13px,
    rgba(0, 0, 0, 0.09) 0 -3px 5px;
  .card-header {
    height: 35px;
    text-align: center;
    h2 {
      font-family: "Kanit";
      margin-top: 3px;
    }
  }

  .card-body {
    padding: 0px 20px;
    .title {
      font-size: 20px;
      color: #627d98;
      margin-top: 0;
    }
    h3,
    p {
      text-align: center;
    }
    h3 {
      margin-top: 0;
    }
  }
}

@media screen and (max-width: 500px) {
  .box-card {
    width: 80%;
  }
}
</style>
