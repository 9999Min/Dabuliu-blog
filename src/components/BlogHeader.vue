<template>
  <header>
    <router-link class="header-title" to="/">{{
      EnumModule.BLOG_TITLE
    }}</router-link>
    <div class="header-menu">
      <div v-for="item in menuItems" :key="item.name">
        <router-link :to="item.href" class="header-menu-item">
          <font-awesome-icon :icon="item.icon" class="header-icon" />{{
            item.name
          }}
        </router-link>
      </div>
    </div>

    <div id="header-menu-button" @click="drawer = !drawer">
      <font-awesome-icon :icon="['fas', 'bars']" />
    </div>

    <el-drawer
      v-model="drawer"
      direction="ltr"
      :show-close="false"
      :with-header="false"
      size="40%"
    >
      <blog-admin-menu />
    </el-drawer>
  </header>
</template>

<script setup>
import { reactive, ref } from "vue";
import store from "../store";
import EnumModule from "../constant";
let drawer = ref(false);
let menuItems = reactive([
  { name: "首页", icon: ["fab", "fort-awesome"], href: "/" },
  { name: "归档", icon: ["fas", "box-archive"], href: "/archive" },
  { name: "分类", icon: ["fas", "folder"], href: "/category" },
  { name: "标签", icon: ["fas", "tags"], href: "/tag" },
  { name: "个人中心", icon: ["fas", "user"], href: "/user/settings" },
]);
/**
 * 判断是否为管理员来显示新随笔的菜单项
 */
if (store.state.adminAbout.isAdmin) {
  menuItems.splice(4, 0, {
    name: "新随笔",
    icon: ["fas", "pen"],
    href: "/article/add",
  });
}

/**
 * 监听窗口变化事件
 * 获取窗口宽度和当前设备像素比，相乘得到当前设备的实际显示宽度，据此显示菜单抽屉
 */
window.addEventListener("resize", () => {
  let scale = window.devicePixelRatio;
  let exactWidth = document.documentElement.clientWidth * scale;
  if (exactWidth < 900 * scale) {
    drawer.value = false;
  }
});
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Kanit:900);

header {
  position: absolute;
  top: 0;
  height: 60px;
  width: 100%;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3%;
  box-sizing: border-box;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  --text-color: #eeeeee;
  --text-hover-color: white;
  animation: fadeUpIn 1s;
}

.header-title {
  color: var(--text-color);
  font-size: 23px;
  font-family: "Kanit";
  text-decoration: none;
  transition: all 0.2s;
}

.header-title:hover {
  color: var(--text-hover-color);
}

.header-icon {
  margin-right: 7px;
}

.header-menu {
  display: flex;
  position: relative;
}

.header-menu-item {
  color: var(--text-color);
  text-decoration: none;
  font-size: 14px;
  margin-left: 25px;
  position: relative;
  padding-bottom: 5px;
  transition: color 0.4s ease-in-out;
}

.header-menu-item:hover {
  color: var(--text-hover-color);
}

.header-menu-item:after {
  content: "";
  width: 0;
  height: 3px;
  background: #80c8f8;
  position: absolute;
  bottom: 0;
  left: 50%;
  transition: all 0.4s ease-in-out;
  border-radius: 2px;
}

.header-menu-item:hover:after {
  left: 0%;
  width: 100%;
}

#header-menu-button {
  display: none;
  color: var(--text-color);
  cursor: pointer;
  position: relative;
  font-size: 20px;
  margin: 0;
}

#header-menu-button:hover {
  color: var(--text-hover-color);
}

:deep(.el-drawer__body) {
  padding: 0;
}

@media screen and (max-width: 900px) {
  .header-menu {
    display: none;
  }

  #header-menu-button {
    display: inline-block;
  }
}

@keyframes fadeUpIn {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
    opacity: 0%;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 100%;
  }
}
</style>
