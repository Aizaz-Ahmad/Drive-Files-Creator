import { reactive } from 'vue';

const store = reactive({
  choosedFolders: [],
  folderNames: [],
  selectedFileType: 'application/vnd.google-apps.folder',
});
export default {
  install: app => {
    app.config.globalProperties.$store = store;
  },
};
