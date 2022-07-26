<template>
  <v-app id="teacher">
    <v-navigation-drawer v-model="drawer" app dark color="blue">
      <v-list class="px-2" nav>
        <v-list-item>
          <v-list-item-title>您好！{{ getUsername() }}</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group>
          <v-list-item dense to="/teacher/subjectInfoTeacher">
            <v-list-item-icon>
              <v-icon>$article</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>课程信息</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/teacher/mySubject1">
            <v-list-item-icon>
              <v-icon>$mySubject </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>我的教学</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/teacher/teacherInfo1">
            <v-list-item-icon>
              <v-icon>$teacher</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>师资信息</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/teacher/exeStudent1">
            <v-list-item-icon>
              <v-icon>$student </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>优秀学员</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/teacher/User1">
            <v-list-item-icon>
              <v-icon>$user</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>个人信息</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/teacher/changePwd1">
            <v-list-item-icon>
              <v-icon>$password</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>修改密码</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/teacher/comment1">
            <v-list-item-icon>
              <v-icon>$comment </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>论坛</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>教师端</v-app-bar-title>
      <v-btn
        text
        color="black"
        class="ml-3 btn-dense"
        @click="$router.push('/')"
        >首页</v-btn
      >
      <v-btn text color="orange" class="btn-dense" @click="logout">退出</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="py-6 px-4" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { getUserInfo1, removeUserInfo1, removeToken1 } from "@/utils/auth";
import { logout } from "@/api/blog/login";

export default {
  name: "teacher",
  data: () => ({ drawer: null }),
  methods: {
    getUsername() {
      let userInfo = getUserInfo1();
      return userInfo ? userInfo.username : null;
    },
    logout() {
      console.log("logout...");
      logout().then((result) => {
        showSuccessMsg(result.msg);
      });
      removeToken1();
      removeUserInfo1();
      this.$router.push("/Home");
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-dense {
  height: 28px !important;
  min-width: 36px !important;
  padding: 0 8px !important;
}
</style>
