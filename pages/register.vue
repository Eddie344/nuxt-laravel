<template>
  <div class="flex h-screen items-center justify-center">
    <form ref="registerform" @submit.prevent="register()" class="w-1/4 mx-auto p-4">
      <h1 class="font-semibold mb-2 text-xl">
        Register
      </h1>
      <div class="mb-4">
        <label for="name" class="block mb-1 text-sm">Name</label>
        <input
          type="text"
          v-model="formData.name"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block mb-1 text-sm">Email</label>
        <input
          type="email"
          v-model="formData.email"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-1 text-sm">Password</label>
        <input
          type="password"
          v-model="formData.password"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password_confirmation" class="block mb-1 text-sm">Confirm password</label>
        <input
          type="password"
          v-model="formData.password_confirmation"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white font-semibold py-2 px-10 w-full rounded"
      >
        Register
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          name: null,
          email: null,
          password: null,
          password_confirmation: null
        },
        error: {},
      };
    },
    mounted() {
      // Before loading login page, obtain csrf cookie from the server.
      this.$axios.$get('/api/csrf-cookie');
    },
    methods: {
      async register() {
        this.error = {};
        try {
          await this.$axios.post('api/register', {
            ...this.formData
          } );

          // Redirect user after login
          this.$router.push({
            path: '/login',
          });
        } catch (err) {
          this.error = err;
          // do something with error
        }
      },
    },
  };
</script>

