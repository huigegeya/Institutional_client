<template>
  <div>
    <v-card elevation="5" class="mb-2">
      <v-card-title>
        <v-icon class="mx-3">$comment</v-icon>
        论坛
      </v-card-title>
    </v-card>
    <v-card color="white" elevation="5">
      <v-card-title class="text-h5"> 评论区 </v-card-title>
      <v-card-text>
        <template v-for="(item, i) in commentList">
          <div class="mb-1">{{ item.content }}</div>
          <div>
            <span class="mr-3">作者：{{ item.author }}</span>
            <span>{{ item.created }}</span>
          </div>
          <v-divider class="mb-3"></v-divider>
        </template>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="totalPages"
          :total-visible="10"
          @input="getPagedComments"
        ></v-pagination>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { addComment, listComment } from "@/api/blog/comment";

export default {
  name: "RightSideBar",
  created() {
    this.getPagedComments();
    console.log(this.commentList, "commentList");
  },
  // data: function() {
  //   return {
  //     statisticData: {},
  //     hotArticles: []
  //   }
  // }
  data: () => {
    return {
      statisticData: {},
      hotArticles: [],
      valid: true,
      validContent: true,
      page: 1,
      pageSize: 10,
      totalPages: 0,
      commentList: [],
      commentRules: [
        (v) => !!v || "评论不能为空",
        (v) => (v && v.length >= 6) || "评论至少6个字",
      ],
      commentContent: null,
      validComment: true,
    };
  },
  // data: () => ({// 语法糖
  //   statisticData: {},
  //   hotArticles: []
  // }),
  methods: {
    getStatisticData() {
      getStatisticData().then((result) => {
        this.statisticData = result.data;
      });
    },
    getPagedComments() {
      listComment({
        page: this.page,
        pageSize: this.pageSize,
      }).then((result) => {
        this.commentList = result.data.list;
        this.page = result.data.pageNum;
        this.totalPages = result.data.pages;
      });
    },
    // getHotArticles() {
    //   listHotArticle().then(result => {
    //     this.hotArticles = result.data
    //   })
    // }
    getHotArticles() {
      // promise异步机制 request axios
      listHotArticle().then((result) => {
        this.hotArticles = result.data;
      });
    },
  },
};
</script>
