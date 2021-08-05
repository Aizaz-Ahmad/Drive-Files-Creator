<template>
  <Card>
    <template #title>Select Folder(s)</template>
    <template #subtitle
      ><small>
        Select Folder inside which you want to Create new Files/Folders from
        your Google Drive by Clicking on the Button Below. You can also select
        Multiple Folders by selecting Folders while holding down Ctrl Key. If no
        folder is selected, Files/Folders will be created inside 'My Drive'
        Folder
      </small>
    </template>
    <template #content>
      <div class="p-text-center">
        <Button class="p-button-outlined" @click="showPicker()">
          <img
            :src="require('@/assets/img/google-drive-icon-sm.png')"
            alt="Google Icon"
            class="p-button-icon"
            width="32"
            height="32"
          />
          <span class="p-button-label p-text-bold p-ml-2"
            >Select Folders From Drive</span
          >
        </Button>
      </div>
    </template>
    <template v-slot:footer>
      <div class="p-grid p-nogutter p-justify-between">
        <i></i>
        <Button
          label="Next"
          @click="nextPage()"
          icon="pi pi-angle-right"
          iconPos="right"
        />
      </div>
    </template>
  </Card>
</template>

<script>
  export default {
    name: 'SelectFolderComponent',
    async mounted() {
      try {
        this.gapi = await this.$gapi.getGapiClient();
        this.pickerApi = await this.loadPicker(this.gapi);
        this.picker = this.buildPicker();
      } catch (e) {
        console.log(e);
      }
    },
    data() {
      return {
        /** @type {gapi} */
        gapi: null,
        /** @type {google.picker} */
        pickerApi: null,
        /** @type {google.picker.Picker} */
        picker: null,
      };
    },
    methods: {
      nextPage() {
        this.$emit('next-page', { pageIndex: 0 });
      },
      loadPicker(gapi) {
        return new Promise((response, reject) => {
          gapi.load('picker', err => {
            if (err) reject(err);
            response(gapi.picker.api);
          });
        });
      },
      buildPicker() {
        let view = this.getDisplayView();
        return new this.pickerApi.PickerBuilder()
          .enableFeature(this.pickerApi.Feature.MULTISELECT_ENABLED)
          .enableFeature(this.pickerApi.Feature.MINE_ONLY)
          .enableFeature(this.pickerApi.Feature.NAV_HIDDEN)
          .setAppId(process.env.VUE_APP_CLIENT_ID)
          .setOAuthToken(this.gapi.auth.getToken().access_token)
          .addView(view)
          .setDeveloperKey(process.env.VUE_APP_API_KEY)
          .setTitle('Drive Files Creator')
          .setCallback(this.folderSelect)
          .build();
      },
      showPicker() {
        this.picker.setVisible(true);
      },
      getDisplayView() {
        return new this.pickerApi.DocsView(
          this.pickerApi.ViewId.FOLDERS
        ).setSelectFolderEnabled(true);
      },
      folderSelect(data) {
        if (data.action === this.pickerApi.Action.PICKED) {
          this.$store.choosedFolders = data.docs;
        }
      },
    },
  };
</script>
<style scoped>
  .google-drive-icon {
    background-image: url('../../assets/img/google-drive-icon.png');
  }
</style>
