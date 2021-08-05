<template>
  <Toast position="bottom-right" />
  <div class="p-text-center">
    <p>Sign in to Continue Exploring</p>
    <Button
      label="Sign In With Google"
      class="p-button-outlined"
      @click="login()"
    >
      <img
        :src="require('@/assets/img/google-icon-sm.png')"
        alt="Google Icon"
        class="p-button-icon"
        width="32"
        height="32"
      />
      <span class="p-button-label p-text-bold p-ml-2">Sign in with Google</span>
    </Button>
    <br />
    <small class="p-d-block p-mt-3"
      ><strong>Note: </strong>You must Give Permissions to App to Access Your
      Google Drive to Explore the Features</small
    >
  </div>
</template>

<script>
  /*eslint-disable no-unused-vars */
  const VueGapi = require('vue-gapi');
  const VueRouter = require('vue-router');
  const VueLoading = require('vue-loading-overlay');
  import Toast from 'primevue/toast';
  export default {
    name: 'SignIn',
    data() {
      return {
        loader: null,
      };
    },
    components: {
      Toast,
    },
    beforeMount() {
      this.loader = this.$loading.show();
    },
    async mounted() {
      this.loader.hide();
    },
    methods: {
      async login() {
        this.loader = this.$loading.show();
        try {
          let response = await this.$gapi.login();
          if (!response.hasGrantedScopes) throw new Error('access_denied');
          await this.$router.push({ path: '/Main' });
        } catch (/**@type {Error}*/ e) {
          await this.$gapi.logout();
          if (
            e.message === 'access_denied' ||
            e.error === 'access_denied' ||
            e?.result?.error?.message?.includes('Insufficient Permission')
          ) {
            this.$toast.add({
              severity: 'error',
              summary: 'Insufficient Permission',
              detail: 'You must Give Permissions to Access App.',
              life: 3000,
            });
          }
        }
        this.loader.hide();
      },
    },
  };
</script>

<style scoped>
  .p-button-label {
    font-family: 'Inter', sans-serif;
  }
  p {
    font-size: 1.5rem;
    color: var(--gray-600);
  }
</style>
