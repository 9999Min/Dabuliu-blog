<template>
  <div class="setting">
    <!-- 页头 -->
    <blog-header />

    <!-- 封面 -->
    <blog-page-cover>
      <template #default="slotProps">
        <h1 :style="slotProps.hOneStyle">个人中心</h1>
      </template>
    </blog-page-cover>

    <!-- 个人信息卡片 -->
    <div class="user-info-card">
      <!-- 用户封面 -->
      <div class="user-cover">
        <img src="../assets/image/user-cover.jpg" alt="封面" />
      </div>

      <!-- 信息表单 -->
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="0px"
        class="user-ruleForm"
      >
        <div class="user-avatar">
          <img :src="avatar" alt="用户头像" id="avatar" />
          <div
            class="user-avatar-editor"
            v-show="isInEditMode && !isProgressVisible"
            @click="openFileDialog"
          >
            <div class="camera-icon">
              <font-awesome-icon :icon="['fas', 'camera']" />
            </div>
            <span>编辑头像</span>
          </div>
          <!-- 文件选择框 -->
          <input
            type="file"
            id="avatar-input"
            style="display: none"
            accept="image/*"
            @change="uploadAvatar"
          />
          <!-- 进度条 -->
          <el-progress
            type="circle"
            :percentage="progress"
            v-show="isProgressVisible"
            :width="100"
            id="progress"
          />
        </div>

        <!-- 用户信息 -->
        <div class="user-info">
          <div class="user-info-item">
            <span class="user-info-label">用户名</span>
            <span class="user-info-value">{{ userInfo.userName }}</span>
          </div>

          <div class="user-info-item">
            <span class="user-info-label">昵称</span>
            <span class="user-info-value" v-show="!isInEditMode">{{
              userInfo.nickName
            }}</span>
            <el-form-item prop="nickName">
              <el-input
                v-model="ruleForm.nickName"
                class="w-50 m-3"
                size="large"
                placeholder="请输入前辈的昵称"
                v-show="isInEditMode"
              />
            </el-form-item>
          </div>

          <div class="user-info-item">
            <span class="user-info-label">性别</span>
            <span class="user-info-value" v-show="!isInEditMode">{{
              userInfo.sex == "0" ? "男" : "女"
            }}</span>
            <el-form-item prop="sex">
              <el-radio-group v-model="ruleForm.sex" v-show="isInEditMode">
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </el-form-item>
          </div>

          <div class="user-info-item">
            <span class="user-info-label">个性签名</span>
            <span class="user-info-value" v-show="!isInEditMode">{{
              userInfo.signature
            }}</span>
            <el-form-item prop="signature">
              <el-input
                v-model="ruleForm.signature"
                class="w-50 m-3"
                size="large"
                placeholder="用一句话来介绍下自己吧"
                v-show="isInEditMode"
              />
            </el-form-item>
          </div>

          <div class="user-info-item">
            <span class="user-info-label">电子邮箱</span>
            <span class="user-info-value" v-show="!isInEditMode">{{
              userInfo.email
            }}</span>
            <el-form-item prop="email">
              <el-input
                v-model="ruleForm.email"
                type="email"
                class="w-50 m-3"
                size="large"
                placeholder="请输入前辈的电子邮箱"
                v-show="isInEditMode"
              />
            </el-form-item>
          </div>

          <div class="user-info-item">
            <span class="user-info-label">手机号码</span>
            <span class="user-info-value" v-show="!isInEditMode">{{
              userInfo.phonenumber || "未知"
            }}</span>
            <el-form-item prop="phonenumber">
              <el-input
                v-model="ruleForm.phonenumber"
                class="w-50 m-3"
                size="large"
                placeholder="请输入前辈的手机号码"
                v-show="isInEditMode"
              />
            </el-form-item>
          </div>
        </div>
      </el-form>

      <!-- 底部按钮 -->
      <div class="card-footer">
        <!-- 编辑按钮 -->
        <el-button
          type="primary"
          color="#1892ff"
          @click="isInEditMode = true"
          v-show="!isInEditMode"
          >编辑信息</el-button
        >
        <el-button
          type="primary"
          color="#1892ff"
          @click="saveEditInfo(ruleFormRef)"
          v-show="isInEditMode"
          >保存</el-button
        >
        <el-button @click="cancelEditInfo" v-show="isInEditMode"
          >取消</el-button
        >
        <el-button type="danger" @click="handleLogout" v-show="!isInEditMode"
          >退出登录</el-button
        >
      </div>
    </div>

    <!-- 页脚 -->
    <blog-footer />
  </div>
</template>

<script>
export default {
  name: "PersonalPage",
};
</script>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { getUserInfo, setUserInfo } from "../utils/storage";
import { logout, updateUserInfo } from "../api/user";
import router from "../router";
import { uploadImage } from "../api/image";
import { ElMessage } from "element-plus/lib/components";
import store from "../store";

const userInfo = reactive(getUserInfo());
const isInEditMode = ref(false);
const ruleFormRef = ref();
const progress = ref(0);
const isProgressVisible = ref(false);

const ruleForm = reactive({
  nickName: userInfo.nickName,
  sex: userInfo.sex == "0" ? "男" : "女",
  email: userInfo.email,
  signature: userInfo.signature,
  phonenumber: userInfo.phonenumber,
  avatar: userInfo.avatar,
});

const rules = reactive({
  nickName: [
    {
      required: true,
      message: "昵称不能为空",
      trigger: "blur",
    },
  ],
  email: [
    {
      type: "email",
      required: true,
      message: "邮箱格式错误",
      trigger: "blur",
    },
  ],
  phonenumber: [
    {
      required: false,
      message: "手机号码格式错误",
      trigger: "blur",
      pattern: /(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/,
    },
  ],
});
/**
 * 用户退出登录
 */
function handleLogout() {
  logout().then(() => {
    router.replace("/login");
  });
}
/**
 * 打开文件选择框
 */
function openFileDialog() {
  document.getElementById("avatar-input").click();
}
/**
 * 上传头像，并设置头像地址
 */
function uploadAvatar() {
  const fileInput = document.getElementById("avatar-input");
  if (fileInput.files.length == 0) {
    return;
  }

  isProgressVisible.value = true;

  const file = fileInput.files[0];

  document.getElementById("avatar").src = URL.createObjectURL(file);

  uploadImage(file, progress).then(
    (url) => {
      ruleForm.avatar = url;
      isProgressVisible.value = false;
    },
    () => {
      ElMessage.error("哎呀呀，头像上传出错啦~");
      isProgressVisible.value = false;
      document.getElementById("avatar").src = ruleForm.avatar;
    }
  );
}
// 保存修改的个人信息
function saveEditInfo(form) {
  if (!form) return;
  form.validate((valid) => {
    if (!valid) {
      ElMessage.error("个人信息有误哦~请重新填写");
      return;
    }
    Object.assign(userInfo, ruleForm);

    userInfo.sex = ruleForm.sex == "男" ? "0" : "1";

    updateUserInfo(userInfo).then(() => {
      setUserInfo(userInfo);
      isInEditMode.value = false;
      ElMessage.success("个人信息更新成功啦~");
      // 如果是管理员更新仓库信息
      if (store.state.adminAbout.isAdmin) {
        store.commit("adminAbout/updateAdminInfo", userInfo);
      }
    });
  });
}
// 取消编辑事件
function cancelEditInfo() {
  Object.assign(ruleForm, userInfo);
  ruleForm.sex = userInfo.sex == "0" ? "男" : "女";
  document.getElementById("avatar").src = ruleForm.avatar;
  ruleForm.value.clearValidate();
  isInEditMode.value = false;
}
</script>

<style lang="less" scoped>
.setting {
  width: 100%;
  height: 100%;
  .user-info-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: var(--card-box-shadow);
    box-sizing: border-box;
    width: 60%;
    margin: 30px auto 20px;
    position: relative;

    .user-cover {
      height: 240px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
    }

    .user-ruleForm {
      .user-avatar {
        height: 130px;
        width: 130px;
        margin-left: 35px;
        padding: 5px;
        transform: translateY(-50%);
        background-color: white;
        border: transparent;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          transition: 0.5s ease-out;
        }

        .user-avatar-editor {
          display: flex;
          width: 130px;
          height: 130px;
          color: white;
          background-color: rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: all 0.4s ease;
          position: absolute;
          top: 5px;
          left: 5px;
          border-radius: 50%;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          &:hover {
            opacity: 1;
          }

          .camera-icon {
            margin-right: 5px;
          }
        }

        #progress {
          width: 130px;
          height: 130px;
          position: absolute;
          top: 5px;
          left: 5px;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;

          :deep(.el-pregress-circle) {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }

      .user-info {
        border-radius: 15px;
        margin: -50px 8% 20px;

        .user-info-item {
          border-bottom: 1px solid #ebebeb;
          padding: 15px 0;
          line-height: 36px;

          .user-info-label {
            position: absolute;
            font-size: 17px;
            font-weight: bold;
            color: var(--text-color);
          }

          .user-info-value {
            display: -webkit-box;
            padding: 0 64px 0 180px;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            line-clamp: 1;
            -webkit-box-orient: vertical;
          }

          .el-form-item {
            margin-bottom: 0;
            padding-left: 180px;
          }
        }
      }
    }

    .card-footer {
      padding: 1rem 2rem;
      background-color: rgba(0, 0, 0, 0.03);
      border-top: 1px solid rgba(0, 0, 0, 0);
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      text-align: end;
    }
  }
}
</style>
