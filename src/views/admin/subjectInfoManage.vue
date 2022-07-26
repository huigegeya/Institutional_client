<template>
  <div>
    <v-card elevation="5">
      <v-card-title>
        <v-icon class="mx-3">$subject</v-icon>
        课程信息
      </v-card-title>
      <v-card-text>
        <v-data-table
          fixed-header
          disable-filtering
          disable-pagination
          disable-sort
          height="400"
          show-select
          item-key="subjectId"
          hide-default-footer
          v-model="selected"
          :headers="headers"
          :items="resultList"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-responsive max-width="260">
                <v-text-field
                  v-model="keyword"
                  label="关键字"
                  dense
                  hide-details
                  outlined
                  clearable
                  @keyup.enter="getPagedSubjectInfo"
                  class="py-3"
                ></v-text-field>
              </v-responsive>
              <v-btn
                outlined
                color="primary"
                class="ml-3"
                @click="getPagedSubjectInfo"
              >
                <v-icon class="mr-1">$search</v-icon>
                查询
              </v-btn>
              <v-btn
                outlined
                color="primary"
                class="ml-3"
                @click="resetQuery()"
              >
                <v-icon class="mr-1">$refresh</v-icon>
                重置
              </v-btn>
              <v-btn outlined color="orange" class="ml-5" @click="add()">
                <v-icon class="mr-1">$plus</v-icon>
                添加课程
              </v-btn>
              <v-btn outlined color="red" class="ml-3" @click="del()">
                <v-icon class="mr-1">$minus</v-icon>
                删除课程
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              text
              class="btn-dense"
              color="blue"
              @click="edit(item.subjectId)"
              >编辑</v-btn
            >
            <v-btn
              text
              class="btn-dense"
              color="red"
              @click="del(item.subjectId)"
              >删除</v-btn
            >
          </template>
        </v-data-table>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="totalPages"
          :total-visible="10"
          @input="getPagedSubjectInfo"
        ></v-pagination>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { deleteSubjectInfo, listSubjectInfo } from "@/api/blog/subjectinfo";
import { showSuccessMsg, showInfoMsg } from "@/utils/msg";

export default {
  name: "subjectInfoManage",
  data: () => ({
    headers: [
      {
        text: "课程编号",
        value: "subjectId",
        class: "subtitle-1",
        width: "100px",
      },
      {
        text: "课程名",
        value: "subjectName",
        class: "subtitle-1",
        width: "100px",
      },
      {
        text: "指导老师",
        value: "teacher",
        class: "subtitle-1",
        width: "100px",
      },
      {
        text: "开课时间",
        value: "startTime",
        class: "subtitle-1",
        width: "100px",
      },
      {
        text: "课程时长",
        value: "classTime",
        class: "subtitle-1",
        width: "100px",
      },
      {
        text: "目前报名人数",
        value: "peopleNum",
        class: "subtitle-1",
        width: "100px",
      },
      {
        text: "报名人数上限",
        value: "maxNum",
        class: "subtitle-1",
        width: "100px",
      },
      { text: "操作", value: "actions", class: "subtitle-1", width: "100px" },
    ],
    selected: [],
    keyword: null,
    page: 1,
    totalPages: 0,
    pageSize: 7,
    resultList: [],
  }),
  created() {
    this.getPagedSubjectInfo();
  },
  methods: {
    getPagedSubjectInfo() {
      listSubjectInfo({
        page: this.page,
        pageSize: this.pageSize,
        subjectName: this.keyword,
      }).then((result) => {
        this.resultList = result.data.list;
        this.page = result.data.pageNum;
        this.totalPages = result.data.pages;
      });
    },
    add() {
      this.$router.push("/admin/subjectAdd/0");
    },
    edit(subjectId) {
      this.$router.push("/admin/subjectAdd/" + subjectId);
    },
    del(subjectId) {
      console.log(subjectId);
      let ids = subjectId
        ? [subjectId]
        : this.selected.map((item) => item.subjectId);
      if (ids.length === 0) return;
      let msg = subjectId ? "真的要删除该课程吗？" : "真的要删除选中的课程吗？";
      showInfoMsg(msg, this.deleteSubjectInfo, ids);
    },
    deleteSubjectInfo(ids) {
      deleteSubjectInfo(ids).then((result) => {
        showSuccessMsg(result.msg);
        this.getPagedSubjectInfo();
      });
    },
    resetQuery() {
      this.keyword = null;
      this.page = 1;
      this.getPagedSubjectInfo();
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
