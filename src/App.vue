<template>
  <Menubar :model="menuItems">
    <template #start>
      <h2 class="p-m-0 p-d-flex p-flex-row p-ac-center">
        <img :src="require('@/assets/img/google-drive-icon-sm.png')" alt="" />
        <span class="p-d-block p-as-center p-ml-2" style="user-select:none;"
          >Drive Files Creator</span
        >
      </h2>
    </template>
  </Menubar>
  <main class="p-grid p-jc-center p-ac-center">
    <div class="p-col-11 p-sm-10 p-md-8 p-lg-7 p-xl-6">
      <router-view />
    </div>
  </main>
</template>

<script>
  import Menubar from 'primevue/menubar';
  export default {
    name: 'App',
    components: {
      Menubar,
    },
    data() {
      return {
        isUserLoggedIn: false,
        loggedInUserItems: [
          {
            label: 'Home',
            icon: 'pi pi-home',
            to: '/',
          },
          {
            icon: 'pi pi-fw pi-user',
            to: '/Main',
          },

          {
            label: 'Logout',
            icon: 'pi pi-fw pi-power-off',
            command: async () => {
              await this.$gapi.logout();
              await this.$router.push({ path: '/Signin' });
              this.isUserLoggedIn = false;
            },
          },
        ],
        loggedOutUserItems: [
          {
            label: 'Home',
            icon: 'pi pi-home',
            to: '/',
          },
          {
            label: 'Sign In',
            icon: 'pi pi-sign-in',
            to: '/Signin',
          },
        ],
        loader: null,
      };
    },
    beforeMount() {
      this.loader = this.$loading.show();
    },
    async mounted() {
      await this.updateLoginStatus();
      this.loader.hide();
    },
    methods: {
      async updateLoginStatus() {
        let user = await this.$gapi.getCurrentUser();
        this.isUserLoggedIn = user.isSignedIn();
        this.loggedInUserItems[1].label = user?.getBasicProfile()?.getName();
      },
    },
    computed: {
      menuItems() {
        return this.isUserLoggedIn
          ? this.loggedInUserItems
          : this.loggedOutUserItems;
      },
    },
    emits: {
      async updateStatus() {
        await this.updateLoginStatus();
        return true;
      },
    },
  };
</script>
<style scoped>
  .p-component {
    font-family: 'Inter', sans-serif;
  }
  main {
    min-height: 80vh;
    padding: 50px 0px;
  }
</style>
