<template>
  <v-container>
    <v-toolbar dense flat class="my-2">
      <v-responsive max-width="260">
        <v-text-field
          v-model="keyword"
          label="关键字"
          dense
          hide-details
          outlined
          clearable
          @keyup.enter="getPagedHonors"
          class="mr-2 py-1"
        ></v-text-field>
      </v-responsive>
      <v-btn outlined color="primary" @click="getPagedHonors" class="mr-2">
        <v-icon class="mr-1">$search</v-icon>
        查询
      </v-btn>
      <v-btn outlined color="primary" @click="resetHonorQuery">
        <v-icon class="mr-1">$refresh</v-icon>
        重置
      </v-btn>
    </v-toolbar>
    <v-row dense>
      <v-col cols="12">
        <template v-for="(item, i) in honorList">
          <div class="article-item px-3 py-2">
            <div>
              <span class="mr-3"
                >获奖者{{ item.honorWinner }} 于 {{ item.time }}</span
              >
            </div>
            <div>
              <span class="mr-3"
                >荣获{{ item.subject }}{{ item.honorContent }}特此祝贺！</span
              >
            </div>
          </div>
          <v-divider class="mb-3"></v-divider>
        </template>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-pagination
          v-model="page"
          class="my-4"
          :length="totalPages"
          :total-visible="10"
          @input="getPagedHonors()"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { listHonor } from "@/api/blog/honor";

export default {
  name: "ArticleList",
  data: () => ({
    categoryId: null,
    keyword: null,
    page: 1,
    totalPages: 0,
    pageSize: 10,
    categoryList: [],
    honorList: [],
  }),
  created() {
    this.getPagedHonors();
  },
  methods: {
    getPagedHonors() {
      listHonor({
        page: this.page,
        pageSize: this.pageSize,
        Subject: this.keyword,
      }).then((result) => {
        this.page = result.data.pageNum;
        this.totalPages = result.data.pages;
        this.honorList = result.data.list;
      });
    },
    resetHonorQuery() {
      this.categoryId = null;
      this.keyword = null;
      this.page = 1;
      this.getPagedHonors();
    },
  },
};
</script>

<style lang="scss" scoped>
.article-item {
  background-color: white;

  &:hover {
    opacity: 0.8;
    background-color: ghostwhite;
    cursor: pointer;
  }
}
</style>