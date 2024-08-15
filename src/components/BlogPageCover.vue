<template>
  <div class="page-cover">
    <slot :hOneStyle="styles"></slot>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const styles = reactive({
  textAlign: "center",
  position: "absolute",
  textShadow: "0 3px 6px rgba(0,0,0,0.4)",
  color: "white",
  lineHeight: 1.5,
  padding: "0 30px",
  marginBottom: "15px",
  overflow: "hidden",
  display: "-webkit-box",
  textOverflow: "ellipsis",
  "-webkit-line-clamp": "vertical",
  lineClamp: 3,
  boxSizing: "border-box",
});
</script>

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
