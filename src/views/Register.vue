<template>
  <v-app>
    <v-main class="login">
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col lg="5" md="6" sm="7">
            <v-card>
              <v-toolbar color="cyan" dark dense>
                <v-icon>$login</v-icon>
                <v-toolbar-title class="ml-2">用户注册</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="registerForm">
                  <v-container fluid>
                    <v-row justify="center" dense>
                      <v-col cols="11">
                        <v-text-field
                          v-model="registerData.username"
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
                      <v-col cols="1"></v-col>
                    </v-row>
                    <v-row justify="center" dense>
                      <v-col cols="11">
                        <v-text-field
                          v-model="registerData.password"
                          label="密码"
                          counter="10"
                          hint="6-10个字符"
                          clearable
                          outlined
                          color="cyan lighten-1"
                          :rules="passwordRules"
                          :type="pwdType"
                          dense
                          prepend-icon="$password"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="1" class="margin"
                        ><button v-on:click="show()">
                          <v-icon>$eye</v-icon>
                        </button></v-col
                      >
                    </v-row>
                    <v-row justify="center" dense>
                      <v-col cols="11">
                        <v-text-field
                          v-model="registerData.email"
                          label="邮箱(选填)"
                          clearable
                          outlined
                          color="cyan lighten-1"
                          :rules="emailRules"
                          type="email"
                          dense
                          prepend-icon="$email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="1"></v-col>
                    </v-row>
                    <v-row justify="center" dense>
                      <v-col cols="11">
                        <v-text-field
                          v-model="registerData.name"
                          label="姓名"
                          clearable
                          outlined
                          color="cyan lighten-1"
                          :rules="[(v) => !!v || '必填项']"
                          type="email"
                          dense
                          prepend-icon="$email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="1"></v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="11">
                        <v-select
                          prepend-icon="$identity"
                          v-model="registerData.sex"
                          :items="items"
                          label="选择性别"
                          outlined
                          :rules="[(v) => !!v || '必填项']"
                          dense
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row justify="center" dense>
                      <v-col cols="11">
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
                        @click="register()"
                      >
                        注册
                      </v-btn>
                      <v-btn
                        small
                        depressed
                        rounded
                        min-width="60"
                        color="deep-orange lighten-2"
                        dark
                        @click="$refs.registerForm.reset()"
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
import { register } from "@/api/blog/register";
import { showSuccessMsg } from "@/utils/msg";

export default {
  name: "Register",
  data: () => ({
    fromPath: null,
    registerData: {
      username: null,
      password: null,
      email: null,
    },
    items: ["男", "女"],
    items1: ["教师", "学生"],
    valid: true,
    usernameRules: [
      (v) => !!v || "用户名不能为空",
      (v) => (v && v.length >= 3 && v.length <= 30) || "用户名：3-30个字符",
    ],
    passwordRules: [
      (v) => !!v || "密码不能为空",
      (v) => (v && v.length >= 6 && v.length <= 10) || "密码：6-10个字符",
    ],
    emailRules: [
      (v) => !v || /.+@.+\..+/.test(v) || "邮箱格式为：11111@gmail.com",
    ],
    identity: null,
    pwdType: "password",
  }),
  created() {
    if (this.$route.query.fromPath) this.fromPath = this.$route.query.fromPath;
  },
  methods: {
    show() {
      this.pwdType = this.pwdType === "password" ? "text" : "password";
    },
    register() {
      this.$refs.registerForm.validate();
      if (this.valid) {
        register(this.registerData).then((result) => {
          showSuccessMsg(result.msg);
          this.$router.push("/Home");
        });
      }
    },
  },
};
</script>

<style lang="scss">
.login {
  background: url("../assets/registerBack.webp") no-repeat;
  background-size: cover;
}
.margin {
  margin-top: 8px;
}
</style>
