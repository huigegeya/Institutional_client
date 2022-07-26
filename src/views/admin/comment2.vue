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
          <div class="comment">
            <div>
              <span class="mr-3">作者：{{ item.author }}</span>
              <span>{{ item.created }}</span>
            </div>
            <div>
              <el-button type="text" @click="del(item.id)" style="color: red"
                >删除</el-button
              >
            </div>
          </div>
          <v-divider class="mb-3"></v-divider>
        </template>
        <template v-for="(item, i) in commentList"> </template>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="totalPages"
          :total-visible="10"
          @input="getPagedComments"
        ></v-pagination>
        <v-form class="mb-3" ref="commentForm" v-model="validComment">
          <v-textarea
            outlined
            clearable
            :rules="commentRules"
            v-model="commentContent"
          ></v-textarea>
          <v-btn
            small
            rounded
            min-width="80"
            color="primary"
            @click="submitComment()"
          >
            提交
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { addComment, listComment, delComment } from "@/api/blog/comment";
import { showSuccessMsg } from "@/utils/msg";
// import {fileUpload} from "@/api/blog/fileOper";

export default {
  name: "ArticleEditor",
  data: () => ({
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
  }),
  created() {
    this.getPagedComments();
  },
  computed: {},
  methods: {
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
    submitComment() {
      this.$refs.commentForm.validate();
      if (!this.validComment) return;
      addComment({
        content: this.commentContent,
      }).then((result) => {
        showSuccessMsg(result.msg);
        this.$refs.commentForm.reset();
        this.page = 1;
        this.getPagedComments();
      });
    },
    del(id) {
      this.$confirm("确定删除该条评论?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delComment(id).then((result) => {
            showSuccessMsg(result.msg);
            this.getPagedComments();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>


<style lang="scss" scoped>
// 取消mavon-editor设置的z轴高度
.v-note-wrapper {
  z-index: inherit;
}
.commentLine {
  margin-left: 40px;
}
.comment {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
