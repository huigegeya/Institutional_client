<template>
  <div>
    <v-card elevation="5" class="mb-2">
      <v-card-title>
        <v-icon class="mx-3">$addCount</v-icon>
        添加教师用户
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="subjectForm">
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="teacherData.username"
                  label="用户名"
                  outlined
                  :rules="[(v) => !!v || '必填项']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="teacherData.password"
                  label="密码"
                  outlined
                  type="password"
                  :rules="[(v) => !!v || '必填项']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="teacherData.email"
                  label="邮箱"
                  outlined
                  :rules="[
                    (v) =>
                      !v ||
                      /.+@.+\..+/.test(v) ||
                      '邮箱格式为：11111@gmail.com',
                  ]"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="teacherData.name"
                  label="姓名"
                  outlined
                  :rules="[(v) => !!v || '必填项']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="teacherData.sex"
                  label="性别"
                  :rules="[(v) => !!v || '必填项']"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense class="mt-4 mb-2">
              <v-col cols="12" class="text-center">
                <v-btn
                  color="primary"
                  dark
                  small
                  rounded
                  class="mr-4"
                  @click="register()"
                  >添加</v-btn
                >
                <v-btn
                  color="orange"
                  dark
                  small
                  rounded
                  @click="$refs.subjectForm.reset()"
                  >重置</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { teacherRegister } from "@/api/blog/register";
import { showSuccessMsg } from "@/utils/msg";

export default {
  name: "addTeacherCount",

  data: () => ({
    teacherData: {},
  }),
  methods: {
    register() {
      this.$refs.subjectForm.validate();
      if (this.valid) {
        teacherRegister(this.teacherData).then((result) => {
          showSuccessMsg(result.msg);
          this.$refs.subjectForm.reset();
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
</style>
