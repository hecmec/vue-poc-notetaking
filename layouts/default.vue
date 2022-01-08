<template>
  <v-app>
    <nav-bar />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "~/components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  head: {
    titleTemplate: "%s - Real World Notes", // <-- title template
    meta: [
      {
        hid: "description",
        name: "description", // <-- moved this over from index.vue
        content:
          "Where you can find all the events taking place in your neighborhood",
      },
    ],
  },
};
</script>

<style>
html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>