<template>
  <v-app>
    <v-main>
      <v-carousel
        :show-arrows="true"
        height="100%"
        interval="5000"
        cycle
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          :font="item.font"
        >
          <div align="right" class="btn">
            <el-button @click="$router.push('/Home')" type="text"
              >点我进入官网！</el-button
            >
          </div>
          <v-row class="carousel">
            <div class="carousel_font">{{ item.font }}</div>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-main>
  </v-app>
</template>

<script>
import { getLoggedInUserInfo, login } from "@/api/blog/login";
import { setToken, setUserInfo } from "@/utils/auth";
import { showSuccessMsg } from "@/utils/msg";

export default {
  name: "start",
  data() {
    return {
      items: [
        {
          src: require("../assets/logo.jpg"),
          font: "欢迎来到辉杭培训营!",
        },
        {
          src: require("../assets/carousel2.jpg"),
        },
        {
          src: require("../assets/carousel3.jpg"),
          font: "\n拿高薪!学技术! \n年入百万不是梦！",
        },
        {
          src: require("../assets/carousel4.jpg"),
        },
        {
          src: require("../assets/carousel5.jpg"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
// .start {
//   background: url("../assets/logo.jpg") no-repeat;
//   background-size: cover;
// }
.carousel_font {
  text-align: center;
  margin: 60px auto;
  font-family: "League-Gothic", Courier;
  font-size: 100px;
  font-family: "League-Gothic", Courier;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 0 20px #fefcc9, 10px -10px 30px #feec85,
    -20px -20px 40px #ffae34, 20px -40px 50px #ec760c, -20px -60px 60px #cd4606,
    0 -80px 70px #973716, 10px -90px 80px #451b0e;
  white-space: pre-wrap;
}
</style>
