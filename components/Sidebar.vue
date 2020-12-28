<template>
  <v-navigation-drawer
    app
    permanent
    expand-on-hover
  >
    <v-list>
      <v-list-item-group
        color="pink"
      >
        <v-list-item link to="/pets">
          <v-list-item-icon>
            <v-icon>mdi-folder-image</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Питомцы</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <v-list-item-group
        color="red"
      >
        <v-list-item @click="logout" color="red">
          <v-list-item-icon>
            <v-icon
              color="red"
            >
              mdi-logout
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Выйти</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </template>
  </v-navigation-drawer>
</template>

<script>
    export default {
      name: "Sidebar",
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

<style scoped>

</style>
