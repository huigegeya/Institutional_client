<template>
  <v-app id="member">
    <v-navigation-drawer v-model="drawer" app dark color="blue">
      <v-list class="px-2" nav>
        <v-list-item>
          <v-list-item-title>您好！{{ getUsername() }}同学</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group>
          <v-list-item dense to="/member/subjectInfo">
            <v-list-item-icon>
              <v-icon>$subject</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>课程信息</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/member/mySubject">
            <v-list-item-icon>
              <v-icon>$mySubject </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>我的课程</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/member/teacherInfo">
            <v-list-item-icon>
              <v-icon>$teacher</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>师资信息</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/member/exeStudent">
            <v-list-item-icon>
              <v-icon>$student </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>优秀学员</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item dense to="/member/user">
            <v-list-item-icon>
              <v-icon>$user</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>个人信息</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/member/changePwd">
            <v-list-item-icon>
              <v-icon>$password</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>修改密码</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/member/comment">
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
      <v-app-bar-title>学生端</v-app-bar-title>
      <v-btn
        text
        color="black"
        class="ml-3 btn-dense"
        @click="$router.push('/Home')"
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
import { getUserInfo, removeUserInfo, removeToken } from "@/utils/auth";
import { logout } from "@/api/blog/login";

export default {
  name: "Member",
  data: () => ({ drawer: null }),
  methods: {
    getUsername() {
      let userInfo = getUserInfo();
      return userInfo ? userInfo.username : null;
    },
    logout() {
      console.log("logout...");
      logout().then((result) => {
        showSuccessMsg(result.msg);
      });
      removeToken();
      removeUserInfo();
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
