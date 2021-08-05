<template>
  <ConfirmPopup />
  <Card>
    <template #title>Confirm Files/Folders Creation</template>
    <template #subtitle>
      <small>
        Following Files/Folders will be created inside
        <span v-if="!$store.choosedFolders.length">'My Drive' folder:</span>
        <strong v-else v-html="foldersInfo"></strong>
      </small>
    </template>
    <template #content>
      <Listbox
        :filter="true"
        filterPlaceholder="Search File/Folder Name"
        :options="$store.folderNames"
        optionLabel="name"
        optionValue="id"
        listStyle="max-height:200px;"
      >
        <template #option="props">
          <FolderOption :name="props.option.name" :id="props.option.id" />
        </template>
      </Listbox>
    </template>
    <template v-slot:footer>
      <div class="p-grid p-nogutter p-justify-between">
        <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
        <Button
          label="Confirm"
          @click="confirm($event)"
          icon="pi pi-check"
          iconPos="right"
          :disabled="!$store.folderNames.length"
        />
      </div>
    </template>
  </Card>
</template>

<script>
  /*eslint-disable no-unused-vars */
  const VueGapi = require('vue-gapi');
  const VueRouter = require('vue-router');
  const VueLoading = require('vue-loading-overlay');
  import ConfirmPopup from 'primevue/confirmpopup';
  import Listbox from 'primevue/listbox';
  import FolderOption from '../FolderOption.vue';
  export default {
    name: 'ConfirmationComponent',
    components: {
      ConfirmPopup,
      Listbox,
      FolderOption,
    },
    data() {
      return {
        /** @type {gapi} */
        gapi: null,
        /** @type {gapi.client.drive} */
        drive: null,
        /** @type {gapi.client.Batch}*/
        batch: null,
        createdFolders: [],
      };
    },
    async mounted() {
      try {
        this.gapi = await this.$gapi.getGapiClient();
        this.drive = this.gapi.client.drive;
      } catch (e) {
        console.log(e);
      }
    },
    methods: {
      prevPage() {
        this.$emit('prev-page', { pageIndex: 2 });
      },
      confirm(event) {
        this.$confirm.require({
          target: event.currentTarget,
          message: 'Are you sure, you want to proceed?',
          icon: 'pi pi-exclamation-triangle',
          accept: async () => {
            let loader = this.$loading.show();
            let result = await this.createFolders();
            result = this.simplifyingResultObject(result);
            console.log(result);
            await this.resetApp();
            loader.hide();
            this.displayingResultToast(result[0].error);
          },
        });
      },
      async createFolders() {
        let parents = this.$store.choosedFolders.map(folder => folder.id);
        if (parents.length === 0) parents = [[]];
        let mimeType = this.$store.selectedFileType;
        let results = {};
        for (const parent of parents) {
          this.batch = this.gapi.client.newBatch();
          this.$store.folderNames.forEach(folder => {
            let request = this.drive.files.create({
              resource: {
                name: folder.name,
                mimeType: mimeType,
                parents: parent.length ? [parent] : [],
              },
            });
            this.batch.add(request);
          });
          let result = await new Promise(resolve => {
            this.batch.execute((e, q) => resolve(e, q));
          });
          results = { ...results, ...result };
        }
        return results;
      },
      simplifyingResultObject(result) {
        return Object.values(result).map(row => ({
          result: row?.result,
          error: row?.error,
        }));
      },
      async resetApp() {
        this.$store.choosedFolders = this.$store.folderNames = [];
        await this.$router.push({ path: '/Main/steps/select-folders' });
      },
      displayingResultToast(error) {
        this.$toast.add({
          severity: error ? 'error' : 'success',
          summary: error ? error.message : 'Successfully Created',
          detail: error
            ? 'An Unexpected Error Occured, Please Try Again!'
            : 'Files/Folders successfully created! Thanks for Using',
          life: 4000,
        });
      },
    },
    computed: {
      foldersInfo() {
        return this.$store.choosedFolders
          .map(
            f => `<a href="${f.url}">${f.name}</a
          >`
          )
          .join(', ');
      },
    },
  };
</script>

<style scoped></style>
