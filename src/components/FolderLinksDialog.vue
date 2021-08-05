<template>
  <Dialog
    header="Files Successfully Created"
    :modal="true"
    v-model:visible="Visible"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    @hide="$emit('dialog-hide')"
  >
    <div
      v-for="(folder, i) in foldersInfo"
      :key="i"
      class="p-d-flex p-ai-center p-py-2 p-px-3 folder-list-item"
    >
      <img
        :src="
          `https://drive-thirdparty.googleusercontent.com/16/type/${$store.selectedFileType}`
        "
        width="16"
        height="16"
      />
      <strong style="flex-grow:1;margin-left:10px;">{{ folder.name }}</strong>
      <a
        :href="'https://drive.google.com/drive/folders/' + folder.id"
        target="_blank"
      >
        <span class="pi pi-external-link"></span>
      </a>
    </div>
  </Dialog>
</template>

<script>
  import Dialog from 'primevue/dialog';
  export default {
    name: 'FolderLinksDialog',
    components: {
      Dialog,
    },
    data() {
      return {
        Visible: this.$props.visible,
      };
    },
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      foldersInfo: {
        type: Array,
        required: true,
      },
    },
    emits: ['dialog-hide'],
    watch: {
      visible() {
        this.Visible = this.$props.visible;
      },
    },
  };
</script>

<style scoped>
  .folder-list-item {
    border-bottom: 1px solid rgb(181, 181, 181);
  }
  .pi {
    font-size: 1.3rem;
  }
</style>
