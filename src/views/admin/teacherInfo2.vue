<template>
  <div>
    <v-card elevation="5">
      <v-card-title class="card">
        <div>
          <v-icon class="mx-3">$teacher</v-icon>
          师资力量
        </div>
        <div>
          <v-btn outlined color="orange" class="ml-5" @click="add()">
            <v-icon class="mr-1">$plus</v-icon>
            新增
          </v-btn>
          <v-btn
            outlined
            color="red"
            class="ml-5"
            @click="deleteFn()"
            v-if="cancel"
          >
            <v-icon class="mr-1">$close</v-icon>
            删除教师
          </v-btn>
          <v-btn outlined color="red" class="ml-5" @click="deleteFn()" v-else>
            <v-icon class="mr-1">$close</v-icon>
            取消删除
          </v-btn>
        </div>
      </v-card-title>

      <div
        v-for="(item, i) in teacherInfoList"
        :key="i"
        :name="item.name"
        class="container"
      >
        <v-col cols="3">
          <div class="teacher" style="background-color: pink">
            <v-icon
              class="icon"
              v-show="showIcon"
              @click="deleteBtn(item.teacherId)"
              >$close</v-icon
            >
            <v-img
              :src="item.image"
              @click="teacher1(item)"
              max-width="170"
              max-height="170"
            >
            </v-img
            ><span
              ><h4>{{ item.name }}</h4></span
            >
          </div></v-col
        >
      </div>
      <div class="dialog">
        <el-dialog
          title="教师信息"
          :visible.sync="dialogVisible"
          width="40%"
          :before-close="handleClose"
        >
          <el-form class="form">
            <el-row :gutter="20">
              <el-col span="12" v-if="info">
                <el-form-item label="姓名：" label-width="100px">
                  <el-input disabled v-model="editedItem.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12" v-else>
                <el-form-item label="姓名：" label-width="100px">
                  <el-input v-model="editedItem.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12" v-if="info">
                <el-form-item label="性别：" label-width="100px">
                  <el-input disabled v-model="editedItem.sex"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12" v-else>
                <el-form-item label="性别：" label-width="100px">
                  <el-input v-model="editedItem.sex"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col span="24" v-if="info">
                <el-form-item label="教学课程：" label-width="100px">
                  <el-input disabled v-model="editedItem.subject"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="24" v-else>
                <el-form-item label="教学课程：" label-width="100px">
                  <el-input v-model="editedItem.subject"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col span="24" v-if="info">
                <el-form-item label="兴趣爱好：" label-width="100px">
                  <el-input disabled v-model="editedItem.hobby"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="24" v-else>
                <el-form-item label="兴趣爱好：" label-width="100px">
                  <el-input v-model="editedItem.hobby"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col span="24" v-if="info">
                <el-form-item label="所获荣誉：" label-width="100px">
                  <el-input
                    type="textarea"
                    disabled
                    v-model="editedItem.honor"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="24" v-else>
                <el-form-item label="所获荣誉：" label-width="100px">
                  <el-input
                    type="textarea"
                    v-model="editedItem.honor"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editFn" type="text">编 辑</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sure(editedItem)" v-if="!info"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </v-card>
  </div>
</template>


<script>
import {
  listTeacherInfo,
  updateTeacherInfo,
  deleteTeacherInfo,
} from "@/api/blog/teacherinfo";
import { showSuccessMsg } from "@/utils/msg";
export default {
  name: "teacherInfo2",
  data: () => ({
    dialogVisible: false,
    showIcon: false,
    cancel: true,
    info: true,
    editedItem: {},
    teacherInfoList: null,
  }),
  created() {
    this.getTeacherInfoList();
  },
  methods: {
    getTeacherInfoList() {
      listTeacherInfo().then((result) => {
        this.teacherInfoList = result.data.list;
      });
    },
    teacher1(item) {
      this.dialogVisible = true;
      this.editedIndex = this.teacherInfoList.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    add() {
      this.$router.push("/admin/teacherAdd");
    },
    deleteFn() {
      this.showIcon = !this.showIcon;
      console.log("showIcon", this.showIcon);
      this.cancel = !this.cancel;
    },
    deleteBtn(teacherId) {
      this.$confirm("确定删除该教师?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteTeacherInfo(teacherId).then((result) => {
            showSuccessMsg(result.msg);
            this.getTeacherInfoList();
          });
          this.cancel = !this.cancel;
          this.showIcon = !this.showIcon;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editFn() {
      this.info = !this.info;
    },
    sure(editedItem) {
      this.$confirm("确定修改此教师信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateTeacherInfo(editedItem).then((result) => {
            showSuccessMsg(result.msg);
            this.getTeacherInfoList();
          });

          this.dialogVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
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

.container {
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 280px;
  float: left;
  .teacher {
    background: blue;
    height: 210px;
    width: 230px;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .icon {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  .pic {
    height: 150px;
    width: 200px;
  }
}
.form {
  height: 300px;
}
.card {
  display: flex;
  justify-content: space-between;
}
</style>
