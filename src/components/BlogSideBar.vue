<template>
  <div id="side-bar">
    <slot>
      <blog-admin-card />
      <blog-hot-article-card />
      <blog-category-card />
      <blog-tag-card />
      <blog-archive-card />
    </slot>
  </div>
</template>
<style lang="less" scoped>
#side-bar {
  width: 26%;
  margin-right: 20px;
}

@media screen and (max-width: 900px) {
  #side-bar {
    display: none;
  }
}
</style>
