<template>
  <v-card
    elevation="2"
    class="mx-auto my-12"
    min-width="350"
    :loading="loading"
  >
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="formData.email"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.password"
          type="password"
          label="Password"
          required
        ></v-text-field>

        <v-btn
          color="success"
          class="mr-4"
          type="submit"
          :disabled="loading"
        >
          Login
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>

</template>

<script>
  export default {
    layout: 'empty',
    data() {
      return {
        formData: {
          email: null,
          password: null,
          device_name: 'browser'
        },
        loading: false,
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
          // do something with error
        }
      },
    },
  };
</script>

<style lang="sass" scoped>
</style>
