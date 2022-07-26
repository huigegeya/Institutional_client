<template>
  <div>
    <v-card elevation="5">
      <v-card-title class="card">
        <div>
          <v-icon class="mx-3">$teacher</v-icon>
          师资力量
        </div>
      </v-card-title>

      <div
        v-for="(item, i) in teacherInfoList"
        :key="i"
        :name="item.name"
        class="container"
      >
        <v-col cols="3">
          <div
            class="teacher"
            @click="teacher1(item)"
            style="background-color: pink"
          >
            <v-img :src="item.image" max-width="170" max-height="170"> </v-img
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
              <el-col span="12">
                <el-form-item label="姓名：" label-width="100px">
                  <el-input disabled v-model="editedItem.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="性别：" label-width="100px">
                  <el-input disabled v-model="editedItem.sex"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col span="24">
                <el-form-item label="教学课程：" label-width="100px">
                  <el-input disabled v-model="editedItem.subject"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col span="24">
                <el-form-item label="兴趣爱好：" label-width="100px">
                  <el-input disabled v-model="editedItem.hobby"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col span="24">
                <el-form-item label="所获荣誉：" label-width="100px">
                  <el-input
                    disabled
                    type="textarea"
                    v-model="editedItem.honor"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </v-card>
  </div>
</template>

<script>
import { listTeacherInfo } from "@/api/blog/teacherinfo";
export default {
  name: "teacherInfo1",
  data: () => ({
    dialogVisible: false,
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
