<template>
  <v-app-bar app color="white" flat dense>
    <v-img
      src="@/assets/logo.jpg"
      max-width="30"
      max-height="30"
      class="mr-2"
    ></v-img>
    <span class="mr-3 font-weight-bold">辉杭培训营</span>
    <!-- <v-row justify="center" dense> -->
    <!-- <v-col cols="11"> -->

    <!-- </v-col> -->
    <!-- </v-row> -->
    <v-btn
      text
      class="mr-2 btn-dense"
      color="grey darken-2"
      @click="$router.push('')"
      >首页</v-btn
    >

    <v-spacer></v-spacer>
    <!-- <el-form :rules="rules" :model="ruleForm">
      <span>请选择您的身份：</span >
      <el-form-item class="select" prop="identity"
        >请选择您的身份：
        <el-select v-model="userClassify" placeholder="请选择" size="mini">
          <el-option
            v-for="item in userClassifys"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form> -->
    <v-btn
      text
      class="btn-dense"
      color="grey darken-2"
      @click="$router.push('/')"
      >回到起点</v-btn
    >
    <v-btn
      text
      class="btn-dense"
      color="grey darken-2"
      v-if="hasToken() || hasToken1() || hasToken2()"
      @click="logout()"
      >注销</v-btn
    >
    <v-btn
      text
      class="btn-dense"
      color="grey darken-2"
      v-else
      @click="$router.push('/login')"
      >登录</v-btn
    >
    <v-btn
      text
      class="btn-dense"
      color="grey darken-2"
      @click="$router.push('/register')"
      >注册</v-btn
    >
    <v-btn text class="btn-dense" color="orange" @click="jump()"
      >用户中心</v-btn
    >
  </v-app-bar>
</template>

<script>
import {
  getToken,
  getToken1,
  getToken2,
  removeToken,
  removeUserInfo,
  removeToken1,
  removeUserInfo1,
  removeToken2,
  removeUserInfo2,
} from "@/utils/auth";
import { logout } from "@/api/blog/login";
import { showSuccessMsg } from "@/utils/msg";
export default {
  name: "NavBar",
  // data() {
  //   return {
  //     userClassify: "",
  //     userClassifys: [
  //       {
  //         value: 1,
  //         label: "教师",
  //       },
  //       {
  //         value: 2,
  //         label: "学员",
  //       },
  //       {
  //         value: 3,
  //         label: "管理员",
  //       },
  //       {
  //         value: 4,
  //         label: "游客",
  //       },
  //     ],
  //     ruleForm: {
  //       identity: "",
  //     },
  //     rules: {
  //       identity: [
  //         {
  //           required: true,
  //           message: "请选择您的身份",
  //           trigger: "blur",
  //         },
  //       ],
  //     },
  //   };
  // },
  created() {
    console.log("11111", this.userClassifys);
  },
  methods: {
    hasToken() {
      return !!getToken();
    },
    hasToken1() {
      return !!getToken1();
    },
    hasToken2() {
      return !!getToken2();
    },
    jump() {
      if (this.hasToken()) {
        this.$router.push("/member");
      } else if (this.hasToken1()) {
        this.$router.push("/teacher");
      } else if (this.hasToken2()) {
        this.$router.push("/admin");
      } else this.$router.push("/login");
    },
    logout() {
      console.log("logout...");
      logout().then((result) => {
        showSuccessMsg(result.msg);
      });
      removeToken();
      removeUserInfo();
      removeToken1();
      removeUserInfo1();
      removeToken2();
      removeUserInfo2();
      if (this.$route.path === "/Home") this.$router.go(0);
      else this.$router.push("/Home");
    },
    // userCenter() {
    //   if (this.userClassify === 1) {
    //     this.$router.push("/teacher");
    //   }
    //   if (this.userClassify === 2) {
    //     this.$router.push("/member");
    //   }
    //   if (this.userClassify === 4) {
    //     this.$router.push("/register");
    //   }
    //   console.log("@@@", this.userClassify);
    // },
  },
};
</script>

<style scoped>
.btn-dense {
  height: 28px !important;
  min-width: 36px !important;
  padding: 0 8px !important;
}
.select {
  margin-top: 20px;
}
</style>
