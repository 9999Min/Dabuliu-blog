import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/HomePage";
import Login from "../views/LoginPage.vue";
import Register from "../views/RegisterPage.vue";
import ArticleDetails from "../views/article/Details";
import ArticleEdit from "../views/article/Edit";
import ArchiveList from "../views/archive/List";
import ArchiveDetails from "../views/archive/Details";
import CategoryList from "../views/category/List";
import CategoryDetails from "../views/category/Details";
import TagList from "../views/tag/List";
import TagDetails from "../views/tag/Details";
import PageNotFound from "../views/404.vue";
import { getUserInfo } from "../utils/storage";
import PersonalPage from "../views/PersonalPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    namee: "Register",
    component: Register,
  },
  {
    path: "/article/add",
    name: "ArticleAdd",
    component: ArticleEdit,
    meta: {
      needAuthentication: true,
    },
  },
  {
    path: "/article/:id",
    name: "ArticleDetails",
    component: ArticleDetails,
    // 将路由params参数通过props传给组件
    props: true,
  },
  {
    path: "/article/:id/edit",
    name: "ArticleEdit",
    component: ArticleEdit,
    props: true,
    meta: {
      needAuthentication: true,
    },
  },
  {
    path: "/archive",
    name: "ArchiveList",
    component: ArchiveList,
  },
  {
    path: "/archive/:year/:month",
    name: "ArchiveDetails",
    component: ArchiveDetails,
    props: true,
  },
  {
    path: "/category",
    name: "CategoryList",
    component: CategoryList,
  },
  {
    path: "/category/:id",
    name: "CategoryDetails",
    component: CategoryDetails,
    props: true,
  },
  {
    path: "/tag",
    name: "TagList",
    component: TagList,
  },
  {
    path: "/tag/:id",
    name: "TagDetails",
    component: TagDetails,
    props: true,
  },
  {
    path: "/user/settings",
    name: "UserSettings",
    component: PersonalPage,
    meta: {
      needLogin: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.needAuthentication) {
    let isAdmin = getUserInfo ? getUserInfo().isAdmin : false;
    if (isAdmin) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else if (to.meta.needLogin) {
    let userInfo = getUserInfo();
    if (userInfo) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
