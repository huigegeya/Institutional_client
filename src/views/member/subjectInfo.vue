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
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn text class="btn-dense" color="blue" @click="edit(item)"
              >我要报名</v-btn
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
import { apply } from "@/api/blog/student";
import { showSuccessMsg, showInfoMsg } from "@/utils/msg";

export default {
  name: "subjectInfo",
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
    resetQuery() {
      this.keyword = null;
      this.page = 1;
      this.getPagedSubjectInfo();
    },
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

    edit(item) {
      this.$confirm("确定报名该课程?", "确认报名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (item.peopleNum >= item.maxNum) {
            alert("该课程名额已满");
          } else {
            apply(item).then((result) => {
              showSuccessMsg(result.msg);
              this.resetQuery();
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "报名失败",
          });
        });
    },
    del(articleId) {
      console.log(articleId);
      let ids = articleId ? [articleId] : this.selected.map((item) => item.id);
      if (ids.length === 0) return;
      let msg = articleId ? "真的要删除该文章吗？" : "真的要删除选中的文章吗？";
      showInfoMsg(msg, this.deleteSubjectInfo, ids);
    },
    deleteSubjectInfo(ids) {
      deleteSubjectInfo(ids).then((result) => {
        showSuccessMsg(result.msg);
        this.getPagedSubjectInfo();
      });
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
