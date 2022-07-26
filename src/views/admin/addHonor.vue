<template>
  <div>
    <v-card elevation="5" class="mb-2">
      <v-card-title class="card">
        <div>
          <v-icon class="mx-3">$honor</v-icon>
          添加荣誉
        </div>
        <v-btn outlined color="primary" class="ml-5" @click="editBtn()">
          编辑
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="addHonorForm">
          <v-container>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-if="show"
                  v-model="honorData.honorWinner"
                  label="获奖者"
                  outlined
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="honorData.honorWinner"
                  label="获奖者"
                  outlined
                  dense
                  :rules="[(v) => !!v || '必填项']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-if="show"
                  v-model="honorData.time"
                  label="获奖时间"
                  outlined
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="honorData.time"
                  label="获奖时间"
                  type="Date"
                  outlined
                  dense
                  :rules="[(v) => !!v || '必填项']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-if="show"
                  v-model="honorData.subject"
                  label="获奖科目"
                  outlined
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="honorData.subject"
                  label="获奖科目"
                  outlined
                  dense
                  :rules="[(v) => !!v || '必填项']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-if="show"
                  v-model="honorData.honorContent"
                  label="获奖内容"
                  :rules="emailRules"
                  outlined
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="honorData.honorContent"
                  label="获奖内容"
                  outlined
                  dense
                  :rules="[(v) => !!v || '必填项']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              small
              rounded
              min-width="80"
              color="primary"
              @click="save()"
              v-if="!show"
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
import { addHonor } from "@/api/blog/honor";
import { showSuccessMsg } from "@/utils/msg";

export default {
  name: "addHonor",
  data: () => ({
    honorData: {},
    valid: true,
    show: true,
  }),
  methods: {
    save() {
      this.$refs.addHonorForm.validate();
      if (this.valid) {
        addHonor(this.honorData).then((result) => {
          showSuccessMsg(result.msg);
          this.$refs.addHonorForm.reset();
        });
      }
    },
    editBtn() {
      this.show = false;
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
</style>
