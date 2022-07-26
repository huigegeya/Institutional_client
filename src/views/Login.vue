<template>
  <v-app>
    <v-main class="login">
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col lg="5" md="6" sm="7">
            <v-card>
              <v-toolbar color="cyan" dark dense>
                <v-icon>$login</v-icon>
                <v-toolbar-title class="ml-2">用户登录</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="loginForm">
                  <v-container fluid>
                    <v-row justify="center" dense>
                      <v-col cols="11">
                        <v-text-field
                          v-model="loginData.username"
                          label="用户名"
                          counter="50"
                          hint="邮箱/手机号，3-50个字符"
                          clearable
                          outlined
                          color="cyan lighten-1"
                          :rules="usernameRules"
                          type="text"
                          dense
                          prepend-icon="$user"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="center" dense>
                      <v-col cols="11">
                        <v-text-field
                          v-model="loginData.password"
                          label="密码"
                          counter="10"
                          hint="6-10个字符"
                          clearable
                          outlined
                          color="cyan lighten-1"
                          :rules="passwordRules"
                          type="password"
                          dense
                          prepend-icon="$password"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="center" dense>
                      <v-col cols="11">
                        <v-select
                          prepend-icon="$identity"
                          v-model="loginData.userClassify"
                          :items="userClassifys"
                          label="选择身份"
                          :rules="userClassifyRules"
                          outlined
                          dense
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row justify="center" dense>
                      <v-col cols="11">
                        <v-radio-group
                          v-model="loginData.rememberMe"
                          mandatory
                          row
                          dense
                        >
                          <template v-slot:label>
                            <div class="text-subtitle-1">记住我：</div>
                          </template>
                          <v-radio value="0" color="cyan lighten-1">
                            <template v-slot:label>
                              <div>从不</div>
                            </template>
                          </v-radio>
                          <v-radio value="30" color="cyan lighten-1">
                            <template v-slot:label>
                              <div>30天</div>
                            </template>
                          </v-radio>
                          <v-radio value="90" color="cyan lighten-1">
                            <template v-slot:label>
                              <div>90天</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                        <v-divider></v-divider>
                      </v-col>
                    </v-row>
                    <div class="d-flex justify-center mt-3">
                      <v-btn
                        small
                        depressed
                        rounded
                        min-width="60"
                        color="cyan lighten-1"
                        class="mr-4"
                        dark
                        @click="login()"
                      >
                        登录
                      </v-btn>
                      <v-btn
                        small
                        depressed
                        rounded
                        min-width="60"
                        color="deep-orange lighten-2"
                        dark
                        @click="$refs.loginForm.reset()"
                      >
                        重置
                      </v-btn>
                    </div>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {
  getLoggedInUserInfo,
  getLoggedInUserInfo1,
  getLoggedInUserInfo2,
  login,
} from "@/api/blog/login";
import {
  removeUserInfo1,
  removeToken1,
  removeUserInfo,
  removeToken,
  removeUserInfo2,
  removeToken2,
} from "@/utils/auth";
import { logout } from "@/api/blog/login";
import { student } from "@/api/blog/student";
import { teacher } from "@/api/blog/teacher";
import { admin } from "@/api/blog/admin";
import {
  setToken,
  setUserInfo,
  setToken1,
  setUserInfo1,
  setToken2,
  setUserInfo2,
} from "@/utils/auth";
import { showSuccessMsg } from "@/utils/msg";

export default {
  name: "Login",
  data: () => ({
    fromPath: null,
    loginData: {
      rememberMe: 0,
      username: null,
      password: null,
      userClassify: null,
    },
    userClassifys: ["教师", "学员", "管理员"],
    valid: true,
    usernameRules: [
      (v) => !!v || "用户名不能为空",
      (v) => (v && v.length >= 3 && v.length <= 30) || "用户名：3-30个字符",
    ],
    passwordRules: [
      (v) => !!v || "密码不能为空",
      (v) => (v && v.length >= 6 && v.length <= 10) || "密码：6-10个字符",
    ],
    userClassifyRules: [(v) => !!v || "请您选择登录身份！"],
    exist: null,
    uname: null,
  }),
  created() {
    if (this.$route.query.fromPath) this.fromPath = this.$route.query.fromPath;
    console.log("@!!!!", this.loginData);
  },
  methods: {
    login() {
      this.$refs.loginForm.validate();
      if (this.valid) {
        if (this.loginData.userClassify === "学员") {
          student(this.loginData.username).then((result) => {
            if (result.msg == "学生存在") {
              logout().then((result) => {});
              removeToken1();
              removeUserInfo1();
              removeToken2();
              removeUserInfo2();
              login(this.loginData).then((result) => {
                // 保存jwt token
                setToken(result.token);
                // 获取登录用户信息并保存
                getLoggedInUserInfo().then((result) => {
                  setUserInfo(result.userInfo);
                  if (this.fromPath) {
                    console.log(this.fromPath);
                    this.$router.push(this.fromPath);
                  } else {
                    this.$router.push("/Home");
                  }
                });
              });
            }
          });
        }
        if (this.loginData.userClassify === "教师") {
          teacher(this.loginData.username).then((result) => {
            if (result.msg == "教师存在") {
              logout().then((result) => {});
              removeToken();
              removeUserInfo();
              removeToken2();
              removeUserInfo2();
              login(this.loginData).then((result) => {
                // 保存jwt token
                setToken1(result.token);
                // 获取登录用户信息并保存
                getLoggedInUserInfo1().then((result) => {
                  console.log(result.userInfo);
                  setUserInfo1(result.userInfo);
                  if (this.fromPath) {
                    console.log(this.fromPath);
                    this.$router.push(this.fromPath);
                  } else {
                    this.$router.push("/Home");
                  }
                });
              });
            }
          });
        }
        if (this.loginData.userClassify === "管理员") {
          admin(this.loginData.username).then((result) => {
            if (result.msg == "管理员存在") {
              logout().then((result) => {});
              removeToken1();
              removeUserInfo1();
              removeToken();
              removeUserInfo();
              login(this.loginData).then((result) => {
                // 保存jwt token
                setToken2(result.token);
                // 获取登录用户信息并保存
                getLoggedInUserInfo2().then((result) => {
                  setUserInfo2(result.userInfo);
                  if (this.fromPath) {
                    console.log(this.fromPath);
                    this.$router.push(this.fromPath);
                  } else {
                    this.$router.push("/Home");
                  }
                });
              });
            }
          });
        }
      }
    },
  },
};
</script>

<style lang="scss">
.login {
  background: url("../assets/loginBack.webp") no-repeat;
  background-size: cover;
}
</style>
