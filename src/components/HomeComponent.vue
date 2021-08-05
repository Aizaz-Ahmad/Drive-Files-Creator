<template>
  <div class="p-text-center">
    <img
      :src="require('@/assets/img/google-drive-icon.png')"
      alt="Google Drive Icon"
    />
    <h1 class="p-text-capitalize p-mt-6">Drive Files Creator</h1>
    <p class="p-text-center">
      Create Multiple Google Drive Files/Folders inside Multiple Folders in a
      single Click
    </p>
    <Button
      label="Get Started"
      icon="pi pi-arrow-right"
      iconPos="right"
      class="p-mt-3"
      @click="$router.push({ path: '/Signin' })"
    />
  </div>
</template>

<script>
  export default {
    name: 'HomeComponent',
  };
</script>

<style scoped>
  h1 {
    color: var(--primary-color);
    font-size: 2.5rem;
    letter-spacing: 2px;
  }
  img {
    width: 200px;
    height: 200px;
  }
  p {
    font-size: 1.5rem;
    color: var(--gray-600);
  }
</style>
