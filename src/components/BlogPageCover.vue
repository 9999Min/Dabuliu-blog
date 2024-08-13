<template>
  <div class="page-cover">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.page-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("../assets/image/beimode.png");
  background-position: top;
  height: 400px;
  width: 100%;
  animation: fadeUpInCover 1s;
  h1 {
    width: 100%;
    text-align: center;
    position: absolute;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    font-size: 40px;
    color: white;
    line-height: 1.5;
    margin-bottom: 15px;
    padding: 0 30px;
    box-sizing: border-box;
  }
}
/* 遮罩层 */
.page-cover::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.3);
}

@keyframes fadeUpInCover {
  0% {
    transform: translateY(-70px);
    opacity: 0%;
  }
  100% {
    transform: translateY(0);
    opacity: 100%;
  }
}
</style>
