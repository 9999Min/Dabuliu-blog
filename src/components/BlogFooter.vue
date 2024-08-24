<template>
  <div id="footer">
    <div class="footer-image"></div>
    <div class="footer-box">
      <!-- 诗词 -->
      <div class="footer-text">
        天若有情天亦老
        <span>
          <font-awesome-icon
            :icon="['fas', 'heart-pulse']"
            class="footer-text-icon"
          />
        </span>
        人间正道是沧桑
      </div>

      <!-- 运行时间 -->
      <div>
        <span class="blog-run-time">网站已经运行了{{ blogRunTime }}</span>
      </div>
      <!-- 版权信息  -->
      <div class="copyright-text">
        Copyright © {{ year }} {{ props.adminName }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, defineProps } from "vue";
import { useStore } from "vuex";
import { getRunTime } from "../utils/date";

const props = defineProps({
  adminName: {
    type: String,
    require: true,
  },
});

const year = ref(new Date().getFullYear());
const currentTime = ref(new Date().getTime());

const timer = setInterval(() => {
  currentTime.value = new Date().getTime();
}, 1000);

const blogRunTime = computed(() => {
  const startDate = useStore().state.websiteAbout.startDate;
  const { day, hour, min, second } = getRunTime(startDate, currentTime.value);
  return `${day}天 ${hour}小时 ${min}分 ${second}秒`;
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped>
#footer {
  background: #232323;
  margin-top: 50px;
  padding: 15px 0 45px 0;
  width: 100%;
  color: rgb(133, 133, 133);
  text-align: center;
  position: absolute;
  animation: fadeInUp 1s;
}

/* .footer-image {
  width: 100%;
  height: 368px;
  background: url("../assets/image/footer.webp") 50% center no-repeat;
  position: absolute;
  top: -293px;
  z-index: 999;
} */

.footer-box {
  width: 100%;
  margin: 0 auto;
}

.footer-text {
  font-size: 17px;
  font-family: "Long Cang", sans-serif;
  padding-bottom: 5px;
  border-bottom: 1px dashed #333;
  margin: 0 auto 5px;
}

.footer-text-icon {
  color: red;
  font-size: 16px;
  animation: heartAni 1.4s infinite;
}

.copyright-text,
.blog-run-time,
.smile-face {
  font-size: 12px;
}

.blog-run-time {
  margin-right: 5px;
}

@keyframes heartAni {
  0%,
  100% {
    transform: scale(1);
  }

  10%,
  30% {
    transform: scale(0.9);
  }

  20%,
  40%,
  50%,
  60%,
  70%,
  80% {
    transform: scale(1.1);
  }
}

@keyframes fadeInUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
