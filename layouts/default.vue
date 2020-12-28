<template>
  <v-app>
    <Sidebar></Sidebar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
  import Navbar from "../components/Navbar";
  import Sidebar from "../components/Sidebar";
  export default {
    components: {Sidebar, Navbar}
  }
</script>
