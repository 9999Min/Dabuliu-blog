<template>
  <hr />
</template>

<style lang="less" scoped>
hr {
  position: relative;
  margin: 10px auto;
  border: 2px dashed #bfe4fb;
  width: 80%;
  box-sizing: content-box;
  height: 0;
  overflow: visible;
  box-sizing: border;
}
hr::before {
  position: absolute;
  top: -11px;
  left: 5%;
  z-index: 1;
  color: #bfe4fb;
  content: "✂";
  font-size: 21px;
  line-height: 1;
  transition: all 1s ease-in-out;
}

hr:hover::before {
  left: calc(95% - 20px);
}
</style>
