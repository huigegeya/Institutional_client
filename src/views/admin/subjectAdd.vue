<template>
  <div>
    <v-card elevation="5" class="mb-2">
      <v-card-title>
        <v-icon class="mx-3">$edit</v-icon>
        {{ action }}课程
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="subjectForm">
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="subjectCopy.subjectId"
                  label="课程编号"
                  outlined
                  disabled
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="subjectCopy.subjectName"
                  label="课程名"
                  outlined
                  :rules="[(v) => !!v || '必填项']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="subjectCopy.teacher"
                  label="指导老师"
                  outlined
                  :rules="[(v) => !!v || '必填项']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="subjectCopy.startTime"
                  label="开课时间"
                  outlined
                  :rules="[(v) => !!v || '必填项']"
                  dense
                  type="Date"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="subjectCopy.classTime"
                  label="课程时长"
                  :rules="[(v) => !!v || '必填项']"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="subjectCopy.peopleNum"
                  label="目前报名人数"
                  outlined
                  disabled
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="subjectCopy.maxNum"
                  label="报名人数上限"
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
                  @click="saveSubjectInfo()"
                  >保存</v-btn
                >
                <v-btn color="orange" dark small rounded @click="resetForm()"
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
import {
  addSubjectInfo,
  getSubjectInfoDetail,
  updateSubjectInfo,
} from "@/api/blog/subjectinfo";
import { showSuccessMsg } from "@/utils/msg";
// import {fileUpload} from "@/api/blog/fileOper";

export default {
  name: "subjectAdd",
  props: ["subjectId"],
  data: () => ({
    subject: {},
    subjectCopy: {},
    valid: true,
    validContent: true,
    categories: [],
    classIdRules: [
      (v) => !!v || "课程不能为空",
      (v) => (v && v.length >= 6) || "课程最少6个字符",
    ],
    classNameRules: [(v) => !!v || "课程名不能为空"],
    teacherRules: [(v) => !!v || "指导老师不能为空"],
    startClassTimeRules: [(v) => !!v || "开课时间不能为空"],
    classTimeRules: [(v) => !!v || "课程时长不能为空"],
    nowPeopleRules: [(v) => !!v || "目前报名人数不能为空"],
    maxPeopleRules: [(v) => !!v || "报名人数上限不能为空"],
    page: 1,
    pageSize: 10,
    totalPages: 0,
    commentList: [],
    commentContent: null,
    validComment: true,
  }),
  created() {
    console.log(process.env);
    console.log("subjectId: " + this.subjectId);
    if (this.subjectId > 0) {
      // 编辑
      this.getSubjectInfoDetail();
    }
  },
  computed: {
    action() {
      return this.subjectId > 0 ? "编辑" : "添加";
    },
  },
  methods: {
    getSubjectInfoDetail() {
      getSubjectInfoDetail(this.subjectId).then((result) => {
        this.subject = result.data;
        // 表单操作的是副本数据，便于恢复初始数据
        this.subjectCopy = Object.assign({}, this.subject);
      });
    },
    saveSubjectInfo() {
      console.log(this.subjectCopy);
      this.$refs.subjectForm.validate();
      if (this.valid && this.validContent) {
        if (this.subjectId > 0) {
          if (this.subjectCopy.maxNum < this.subjectCopy.peopleNum) {
            alert("报名上限人数不能少于目前报名人数");
          } else {
            updateSubjectInfo(this.subjectCopy).then((result) => {
              showSuccessMsg(result.msg);
              this.subject = Object.assign({}, this.subjectCopy);
              this.$router.push("/admin/subjectInfoManage");
            });
          }
        } else {
          addSubjectInfo(this.subjectCopy).then((result) => {
            showSuccessMsg(result.msg);
            this.resetForm();
          });
        }
      }
    },
    resetForm() {
      this.subjectCopy = Object.assign({}, this.subject);
      this.validContent = true;
      this.$refs.subjectForm.resetValidation();
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
