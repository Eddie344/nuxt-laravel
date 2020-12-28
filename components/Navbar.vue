<template>
  <div>
    <v-app-bar
      color="deep-purple"
      dark
      style="z-index: 1"
    >
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    data: () => ({
      group: null,
    }),
    methods: {
      async logout() {
        try {
          await this.$auth.logout();
        }
        catch (e) {
          console.error(e);
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
</style>
