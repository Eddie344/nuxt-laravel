<template>
  <div class="flex h-screen items-center justify-center">
    <form ref="loginform" @submit.prevent="login()" class="w-1/4 mx-auto p-4">
      <h1 class="font-semibold mb-2 text-xl">
        Login
      </h1>
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
      <button
        type="submit"
        class="bg-blue-500 text-white font-semibold py-2 px-10 w-full rounded"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          email: null,
          password: null,
          device_name: 'browser'
        },
        error: {},
      };
    },
    methods: {
      async login() {
        this.error = {};
        this.loading = true;
        try {
          let res = await this.$auth.loginWith('local', { data: this.formData });
          await this.$auth.setUserToken(`Bearer ${res.data}`);
          await this.$auth.fetchUser();

          this.loading = false;
        } catch (err) {
          this.loading = false;
          this.error = err;
        }
      },
    },
  };
</script>
