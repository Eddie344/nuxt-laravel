<template>
  <v-card
    elevation="2"
    class="mx-auto my-12"
    min-width="350"
    :loading="loading"
  >
    <v-card-text>
      <v-form @submit.prevent="register">
        <v-text-field
          v-model="formData.name"
          label="Name"
          required
        ></v-text-field>

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

        <v-text-field
          v-model="formData.password_confirmation"
          type="password"
          label="Confirm password"
          required
        ></v-text-field>

        <v-btn
          color="success"
          class="mr-4"
          type="submit"
          :disabled="loading"
        >
          Register
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
        loading: false,
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
          this.loading = true;
          await this.$axios.post('api/register', {
            ...this.formData
          } );
          this.loading = false;
          // Redirect user after login
          this.$router.push({
            path: '/admin/login',
          });
        } catch (err) {
          this.error = err;
          // do something with error
        }
      },
    },
  };
</script>

