<template>
  <div class="login">
    <blog-form-card title="欢迎前辈回家">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="0px"
      >
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input
            v-model="ruleForm.userName"
            size="large"
            placeholder="用户名"
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            size="large"
            type="password"
            placeholder="密码"
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 记住我 -->
        <el-form-item prop="type">
          <el-checkbox label="记住密码" name="type"></el-checkbox>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <blog-button @click="submitForm(ruleFormRef)">登录</blog-button>
        </el-form-item>
      </el-form>
      <p id="signup-hint">
        前辈还没有账号？
        <router-link to="/register">快来注册一个吧！</router-link>
      </p>
    </blog-form-card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { login } from "../api/user";
import {
  setToken,
  setUserInfo,
  removeToken,
  removeUserInfo,
} from "../utils/storage";
import { md5Encryption } from "../utils/encrypt";
import router from "../router/index";
import store from "../store";
// 再次清除本地token和用户信息
removeToken();
removeUserInfo();

const ruleFormRef = ref();
const ruleForm = reactive({
  userName: "",
  password: "",
});
const rules = reactive({
  userName: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "change",
    },
  ],
  password: [{ required: true, message: "密码不能为空", trigger: "change" }],
});

function submitForm(form) {
  if (!form) return;

  form.validate((valid) => {
    if (!valid) {
      ElMessage.error("用户名和密码不能为空");
      return;
    }

    login(ruleForm.userName, md5Encryption(ruleForm.password)).then((data) => {
      setToken(data.token);
      setUserInfo(data.userInfo);
      store.commit("adminAbout/updateIsAdmin");
      router.push("/");
    });
  });
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url("../assets/image/login-background.jpg");
  background-size: cover;
  text-align: center;

  #signup-hint {
    font-size: 14px;

    a {
      font-size: 14px;
      color: #1890ff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
