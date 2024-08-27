<template>
  <div class="page_404">
    <div class="container">
      <div class="four_zero_four_bg">
        <h1>404</h1>
      </div>

      <div class="content_box_404">
        <h3>啊哦，出错啦</h3>
        <p>你寻找的页面走丢啦！</p>
        <router-link to="/" class="home-link">返回主页</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page_404 {
  background-color: #fff;
  height: 100%;

  .container {
    padding: 40px 0;
    text-align: center;

    .four_zero_four_bg {
      background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
      height: 400px;
      background-position: center;
      background-repeat: no-repeat;

      h1 {
        font-size: 80px;
        margin-top: 0;
      }
    }

    .content_box_404 {
      margin-top: 10px;

      .home-link {
        color: #fff;
        background: var(--theme-color);
        text-decoration: none;
        padding: 8px 20px;
        border-radius: 5px;
        margin: 20px 0;
        display: inline-block;
      }
    }
  }
}
</style>
