<template>
  <Toast position="bottom-right" />
  <div class="p-card p-py-4 p-mb-3">
    <Steps :model="items" :readonly="true" />
  </div>
  <router-view
    v-slot="{ Component }"
    @prev-page="prevPage($event)"
    @next-page="nextPage($event)"
  >
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
  import Toast from 'primevue/toast';
  import Steps from 'primevue/steps';
  export default {
    name: 'MainPage',
    components: {
      Toast,
      Steps,
    },
    beforeMount() {
      this.loader = this.$loading.show();
    },
    async mounted() {
      try {
        await this.$parent.$parent.updateLoginStatus();
        this.loader.hide();
        this.displaySignedInToast();
      } catch (e) {
        console.log(e);
      }
    },
    data() {
      return {
        loader: null,
        items: [
          {
            label: 'Select Folder(s)',
            to: '/Main/steps/select-folders',
          },
          {
            label: 'Enter File Names',
            to: '/Main/steps/folder-names',
          },
          {
            label: 'Confirmation',
            to: '/Main/steps/confirmation',
          },
        ],
      };
    },
    methods: {
      displaySignedInToast() {
        if (!localStorage.getItem('isViewedSignedInToast')) {
          this.$toast.add({
            severity: 'success',
            summary: 'Successfully Signed in',
            detail: 'Thanks for Signing In! You are good to Go Now!',
            life: 3000,
          });
          localStorage.setItem('isViewedSignedInToast', true);
        }
      },
      nextPage(event) {
        this.$router.push(this.items[event.pageIndex + 1].to);
      },
      prevPage(event) {
        this.$router.push(this.items[event.pageIndex - 1].to);
      },
    },
  };
</script>

<style></style>
