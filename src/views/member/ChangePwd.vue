<template>
  <div>
    <v-card elevation="5" class="mb-2">
      <v-card-title>
        <v-icon class="mx-3">$edit</v-icon>
        修改密码
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="passwordForm">
          <v-container>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="passwordData.password"
                  label="原密码"
                  :rules="passwordRules"
                  outlined
                  dense
                  :type="pwdType1"
                ></v-text-field>
              </v-col>
              <v-col cols="1" class="margin"
                ><button v-on:click="show1()">
                  <v-icon>$eye</v-icon>
                </button></v-col
              >
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="passwordData.newpassword1"
                  label="新密码"
                  :rules="passwordRules"
                  outlined
                  dense
                  :type="pwdType2"
                ></v-text-field>
              </v-col>
              <v-col cols="1" class="margin"
                ><button v-on:click="show2()">
                  <v-icon>$eye</v-icon>
                </button></v-col
              >
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="passwordData.newpassword2"
                  label="确认新密码"
                  :rules="passwordRules"
                  outlined
                  dense
                  :type="pwdType3"
                ></v-text-field>
              </v-col>
              <v-col cols="1" class="margin"
                ><button v-on:click="show3()">
                  <v-icon>$eye</v-icon>
                </button></v-col
              >
            </v-row>
            <v-btn
              small
              rounded
              min-width="80"
              color="primary"
              @click="savepassword()"
            >
              保存
            </v-btn>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { savepassword } from "@/api/blog/student";
import { getUserInfo } from "@/utils/auth";
import { showSuccessMsg } from "@/utils/msg";

export default {
  name: "ChangePwd",
  data: () => ({
    article: {},
    passwordData: {},
    valid: true,
    passwordRules: [
      (v) => !!v || "密码不能为空",
      (v) => (v && v.length >= 6 && v.length <= 10) || "密码：6-10个字符",
    ],
    pwdType1: "password",
    pwdType2: "password",
    pwdType3: "password",
  }),
  created() {
    this.getUsername();
  },
  methods: {
    show1() {
      this.pwdType1 = this.pwdType1 === "password" ? "text" : "password";
    },
    show2() {
      this.pwdType2 = this.pwdType2 === "password" ? "text" : "password";
    },
    show3() {
      this.pwdType3 = this.pwdType3 === "password" ? "text" : "password";
    },
    getUsername() {
      let userInfo = getUserInfo();
      this.passwordData.username = userInfo.username;
    },
    savepassword() {
      this.$refs.passwordForm.validate();
      if (this.valid) {
        savepassword(this.passwordData).then((result) => {
          showSuccessMsg(result.msg);
        });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
// 取消mavon-editor设置的z轴高度
.v-note-wrapper {
  z-index: inherit;
}
.margin {
  margin-top: 8px;
}
</style>
