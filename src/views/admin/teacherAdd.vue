<template>
  <div>
    <v-card elevation="5" class="mb-2">
      <v-card-title class="card">
        <div>
          <v-icon class="mx-3">$editt</v-icon>
          新增教师信息
        </div>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="teacherInfoForm">
          <v-container>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="teacherInfos.name"
                  label="姓名"
                  outlined
                  :rules="[(v) => !!v || '必填项']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="teacherInfos.sex"
                  label="性别"
                  outlined
                  :rules="[(v) => !!v || '必填项']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="teacherInfos.subject"
                  label="教学课程"
                  outlined
                  dense
                  :rules="[(v) => !!v || '必填项']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="teacherInfos.hobby"
                  label="兴趣爱好"
                  outlined
                  dense
                  :rules="[(v) => !!v || '必填项']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="teacherInfos.honor"
                  label="所获荣誉(选填)"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-file-input
                  v-model="file"
                  accept="image/*"
                  outlined
                  label="上传图片"
                  :rules="[(v) => !!v || '必须上传图片']"
                ></v-file-input>
              </v-col> </v-row
            ><br /><br />
            <v-btn
              small
              rounded
              min-width="80"
              color="primary"
              @click="addTeacherInfo()"
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
import { addTeacherInfo } from "@/api/blog/teacherinfo";
import { showSuccessMsg } from "@/utils/msg";
import { triggerRef } from "@vue/composition-api";

export default {
  name: "teacherAdd",
  data: () => ({
    teacherInfos: {},
    valid: true,
    teacherInfoForm: false,
  }),

  methods: {
    addTeacherInfo() {
      this.$refs.teacherInfoForm.validate();
      if (this.valid) {
        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("name", this.teacherInfos.name);
        formData.append("sex", this.teacherInfos.sex);
        formData.append("subject", this.teacherInfos.subject);
        formData.append("honor", this.teacherInfos.honor);
        formData.append("hobby", this.teacherInfos.hobby);
        addTeacherInfo(formData).then((result) => {
          showSuccessMsg(result.msg);
          this.$refs.teacherInfoForm.reset();
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
.card {
  display: flex;
  justify-content: space-between;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #ccc;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
