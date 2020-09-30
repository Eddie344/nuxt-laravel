<template>
  <div>
    <p>Name: {{ $auth.user.name }}</p>
    <p>Name: {{ $auth.user.email }}</p>
    <button @click="logout">Log Out</button>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',
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
  };
</script>
