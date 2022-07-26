<template>
  <v-app id="member">
    <v-navigation-drawer v-model="drawer" app dark color="pink">
      <v-list class="px-2" nav>
        <v-list-item>
          <v-list-item-avatar> </v-list-item-avatar>
          <v-list-item-title>您好！{{ getUsername() }}管理员</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group>
          <v-list-item dense to="/admin/subjectInfoManage">
            <v-list-item-icon>
              <v-icon>$subject</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>课程信息</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/admin/teacherInfo2">
            <v-list-item-icon>
              <v-icon>$teacher</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>师资信息</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/admin/exeStudent2">
            <v-list-item-icon>
              <v-icon>$student </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>优秀学员</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/admin/addHonor">
            <v-list-item-icon>
              <v-icon>$honor </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>添加荣誉</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/admin/changePwd2">
            <v-list-item-icon>
              <v-icon>$password</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>修改密码</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/admin/addTeacherCount">
            <v-list-item-icon>
              <v-icon>$addCount </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>添加教师用户</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense to="/admin/comment2">
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
      <v-app-bar-title>管理员端</v-app-bar-title>
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
import { getUserInfo2, removeUserInfo2, removeToken2 } from "@/utils/auth";
import { logout } from "@/api/blog/login";

export default {
  name: "Member",
  data: () => ({ drawer: null }),
  methods: {
    getUsername() {
      let userInfo = getUserInfo2();
      return userInfo ? userInfo.username : null;
    },
    logout() {
      console.log("logout...");
      logout().then((result) => {
        showSuccessMsg(result.msg);
      });
      removeToken2();
      removeUserInfo2();
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
