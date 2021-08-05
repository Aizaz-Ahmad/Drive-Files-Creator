<template>
  <Card>
    <template #title>Enter File/Folder Names</template>
    <template #subtitle
      ><small>
        Enter Names of Files/Folders you want to create, Each on Seperate Line.
        At most 100 Files/Folders can be created at a time
      </small>
      <div class="p-d-flex p-ai-center">
        <p class="p-m-0">Select Type:</p>
        <Dropdown
          v-model="$store.selectedFileType"
          :options="mimeTypes"
          optionValue="mimeType"
          optionLabel="description"
          class="dropdown"
        >
          <template #value="props">
            <div class="p-d-flex p-ai-center" v-if="props.value">
              <img
                :src="
                  `https://drive-thirdparty.googleusercontent.com/16/type/${props.value}`
                "
                :alt="props.value"
                class="dropdown-icon"
              />
              <span class="p-pl-2">{{
                getDescriptionOfMimeType(props.value)
              }}</span>
            </div>
          </template>
          <template #option="props">
            <div class="p-d-flex p-ai-center">
              <img
                :src="
                  `https://drive-thirdparty.googleusercontent.com/16/type/${props.option.mimeType}`
                "
                :alt="props.option.description"
                class="dropdown-icon"
              />
              <span class="p-pl-2">{{ props.option.description }}</span>
            </div>
          </template>
        </Dropdown>
      </div></template
    >
    <template #content>
      <TextArea
        :autoResize="true"
        v-model.lazy="value"
        data-gramm_editor="false"
        :disabled="foldersCount >= 100"
      />
      <small class="p-m-0 p-ml-auto"
        >Files/Folders Count: ({{ foldersCount }} / 100)</small
      >
    </template>
    <template v-slot:footer>
      <div class="p-grid p-nogutter p-justify-between">
        <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
        <Button
          label="Next"
          @click="nextPage()"
          icon="pi pi-angle-right"
          iconPos="right"
          :disabled="!foldersCount"
        />
      </div>
    </template>
  </Card>
</template>

<script>
  import TextArea from 'primevue/textarea';
  import Dropdown from 'primevue/dropdown';
  import mimeTypes from '../../mimeTypes';
  export default {
    name: 'FolderNamesComponents',
    components: {
      TextArea,
      Dropdown,
    },
    data() {
      return {
        value: '',
        foldersCount: 0,
        mimeTypes: mimeTypes,
      };
    },

    methods: {
      prevPage() {
        this.$emit('prev-page', { pageIndex: 1 });
      },
      nextPage() {
        this.$store.folderNames = this.value
          .split('\n')
          .filter(val => val.trim())
          .map((name, id) => ({ name, id }));
        this.$emit('next-page', { pageIndex: 1 });
      },
      getDescriptionOfMimeType(type) {
        return this.mimeTypes.find(val => val.mimeType == type).description;
      },
    },

    watch: {
      value() {
        this.foldersCount = this.value
          .split('\n')
          .filter(val => val.trim()).length;
      },
    },
  };
</script>

<style scoped>
  .dropdown {
    flex-grow: 1;
    margin-left: 10px;
    margin-top: 10px;
  }
  .dropdown-icon {
    width: 16px;
    height: 16px;
  }
</style>
