<template>
  <div>
    <div id="back-to-top" :class="buttonClass" @click="scrollToTop">
      <svg viewBox="0 0 24 24">
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const buttonClass = ref("hidden");

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    buttonClass.value = "";
  } else {
    buttonClass.value = "hidden";
  }
});
</script>

<style scoped>
#back-to-top {
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: block;
  height: 50px;
  opacity: 1;
  outline: none;
  position: fixed;
  right: 20px;
  bottom: 20px;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  transition: bottom 0.2s, opacity 0.2s, background-color 0.2s;
  user-select: none;
  width: 50px;
  z-index: 9999;
}

#back-to-top:hover {
  background-color: var(--theme-color);
  color: white;
  transition: all 0.2s ease;
}

#back-to-top svg {
  display: block;
  fill: currentColor;
  height: 21px;
  margin: 15px auto 0;
  width: 21px;
}

#back-to-top.hidden {
  bottom: -50px;
  opacity: 0;
}
</style>
