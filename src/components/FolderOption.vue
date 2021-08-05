<template>
  <div class="p-d-flex p-ai-center">
    <img
      :src="
        `https://drive-thirdparty.googleusercontent.com/16/type/${$store.selectedFileType}`
      "
      width="16"
      height="16"
    />
    <InputText
      type="text"
      v-model="Name"
      :disabled="disabled"
      class="p-ml-2 pointer-event-all"
      ref="textField"
    />
    <span
      class="pi pi-user-edit p-mx-3 pointer-event-all"
      @click="edit()"
      v-if="disabled"
    ></span>
    <span
      class="pi pi-check p-mx-3 pointer-event-all "
      @click="saveEdit()"
      v-else
    ></span>
    <span class="pi pi-times pointer-event-all" @click="remove()"></span>
  </div>
</template>

<script>
  import InputText from 'primevue/inputtext';
  export default {
    name: 'FolderOption',
    components: {
      InputText,
    },
    data() {
      return {
        Name: this.$props.name,
        disabled: 'disabled',
      };
    },
    props: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
    },
    methods: {
      remove() {
        this.$store.folderNames = this.$store.folderNames.filter(
          folder => folder.id !== this.id
        );
      },
      edit() {
        this.disabled = false;
      },
      saveEdit() {
        this.$store.folderNames.forEach(folder => {
          if (folder.id === this.id) folder.name = this.Name;
        });
        this.disabled = 'disabled';
      },
    },
  };
</script>

<style scoped>
  .p-inputtext {
    flex-grow: 1;
  }
  .p-inputtext[disabled] {
    border: none;
    background-color: inherit;
    color: black;
  }
  span {
    display: block;
  }
  .pointer-event-all {
    pointer-events: all;
  }
  .pi {
    font-size: 1.3rem;
    display: flex;
  }
  .pi-folder {
    color: var(--primary-color);
  }
</style>
