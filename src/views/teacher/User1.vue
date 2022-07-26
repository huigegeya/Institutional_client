<template>
  <div>
    <v-card elevation="5" class="mb-2">
      <v-card-title class="card">
        <div>
          <v-icon class="mx-3">$editt</v-icon>
          个人信息
        </div>

        <v-btn outlined color="primary" class="ml-5" @click="editBtn()">
          编辑
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="userForm">
          <v-container>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-if="show"
                  v-model="userData.username"
                  label="用户名"
                  outlined
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="userData.username"
                  label="用户名"
                  outlined
                  dense
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-if="show"
                  v-model="userData.name"
                  label="姓名"
                  outlined
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="userData.name"
                  label="姓名"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-if="show"
                  v-model="userData.sex"
                  label="性别"
                  outlined
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="userData.sex"
                  label="性别"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-if="show"
                  v-model="userData.email"
                  label="email(选填)"
                  :rules="emailRules"
                  outlined
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="userData.email"
                  label="email(选填)"
                  :rules="emailRules"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-if="show"
                  v-model="userData.created"
                  label="创建时间"
                  outlined
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="userData.created"
                  label="创建时间"
                  outlined
                  dense
                  disabled
                  v-else
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-if="show"
                  v-model="uservalid"
                  label="状态"
                  outlined
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="uservalid"
                  label="状态"
                  outlined
                  dense
                  disabled
                  v-else
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              small
              rounded
              min-width="80"
              color="primary"
              @click="save()"
              v-if="!show"
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
import { getteacherinfo, teacher, saveTeacher } from "@/api/blog/teacher";
import { showSuccessMsg } from "@/utils/msg";
import { getUserInfo1 } from "@/utils/auth";
import { triggerRef } from "@vue/composition-api";
export default {
  name: "User1",
  data: () => ({
    userData: {},
    valid: true,
    emailRules: [
      (v) => !v || /.+@.+\..+/.test(v) || "邮箱格式为：11111@gmail.com",
    ],
    show: true,
    uservalid: null,
  }),
  created() {
    this.getUsername();
    this.getteacherinfo();
  },
  methods: {
    getteacherinfo() {
      getteacherinfo(this.userData.username).then((result) => {
        this.userData = result.data;
        if (this.userData.email == "null") this.userData.email = null;
        this.uservalid = this.userData.valid == 1 ? "启用" : "禁用";
      });
    },
    getUsername() {
      let userInfo = getUserInfo1();
      this.userData.username = userInfo.username;
    },
    save() {
      this.$refs.userForm.validate();
      if (this.valid) {
        saveTeacher(this.userData).then((result) => {
          showSuccessMsg(result.msg);
        });
        this.$router.push("/member/subjectInfo");
      }
    },
    editBtn() {
      this.show = false;
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
.card {
  display: flex;
  justify-content: space-between;
}
</style>
