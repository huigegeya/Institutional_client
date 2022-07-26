<template>
  <v-app>
    <nav-bar />
    <v-main color="grey lighten-4" class="back">
      <v-divider />
      <v-container fluid class="px-5 py-4">
        <v-row>
          <v-col cols="9">
            <v-card>
              <v-tabs background-color="orange" dark>
                <v-tabs-slider color="white"></v-tabs-slider>
                <v-tab>
                  <v-icon>$honor</v-icon>
                  <span class="ml-2">荣誉墙</span>
                </v-tab>
                <v-tab-item>
                  <article-list />
                </v-tab-item>
              </v-tabs>
            </v-card>
          </v-col>
          <v-col cols="3">
            <right-side-bar />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import ArticleList from "@/views/article";
import RightSideBar from "@/components/RightSideBar";

export default {
  name: "Home",
  components: { NavBar, RightSideBar, ArticleList },
};
</script>

<style lang="scss" scoped>
.back {
  background: url("../assets/home.jpg") no-repeat;
  background-size: cover;
}
</style>
