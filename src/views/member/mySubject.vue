<template>
  <div>
    <v-card elevation="5">
      <v-card-title>
        <v-icon class="mx-3">$mySubject</v-icon>
        我的课程
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
                  @keyup.enter="getPagedMyApply"
                  class="py-3"
                ></v-text-field>
              </v-responsive>
              <v-btn
                outlined
                color="primary"
                class="ml-3"
                @click="getPagedMyApply"
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
          @input="getPagedMyApply"
        ></v-pagination>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { apply, myapply } from "@/api/blog/student";
import { showSuccessMsg, showInfoMsg } from "@/utils/msg";

export default {
  name: "mySubject",
  data: () => ({
    headers: [
      {
        text: "课程编号",
        value: "subjectId",
        class: "subtitle-1",
        width: "100px",
      },
      {
        text: "学生用户名",
        value: "stuName",
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
    ],
    selected: [],
    keyword: null,
    page: 1,
    totalPages: 0,
    pageSize: 10,
    resultList: [],
  }),
  created() {
    this.getPagedMyApply();
  },
  methods: {
    resetQuery() {
      this.keyword = null;
      this.page = 1;
      this.getPagedMyApply();
    },
    getPagedMyApply() {
      myapply({
        page: this.page,
        pageSize: this.pageSize,
        subjectName: this.keyword,
      }).then((result) => {
        this.resultList = result.data.list;
        this.page = result.data.pageNum;
        this.totalPages = result.data.pages;
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
