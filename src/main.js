import { createApp } from 'vue';
import App from './App.vue';
//importing node-modules
import VueGapi from 'vue-gapi';
import VueLoading from 'vue-loading-overlay';
import PrimeVue from 'primevue/config';
//importing PrimeVue Services
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
//importing custom written files
import store from './store';
import router from './router';
//importing custom and plugins CSS
import 'vue-loading-overlay/dist/vue-loading.css';
import 'primevue/resources/themes/saga-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './assets/css/style.css';

//importing most used PrimeVue Components for Global Usage
import Button from 'primevue/button';
import Card from 'primevue/card';

const app = createApp(App);

//Script to install Plugins to use them Globally
app.use(PrimeVue, {
  ripple: true,
});
app.use(VueLoading, {
  lockScroll: true,
  opacity: 0.8,
  loader: 'dots',
  color: '#4CAF50',
});
app.use(VueGapi, {
  apiKey: process.env.VUE_APP_API_KEY,
  clientId: process.env.VUE_APP_CLIENT_ID,
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  scope: 'https://www.googleapis.com/auth/drive',
});
app.use(ToastService);
app.use(ConfirmationService);
app.use(store);
//Setting Components for Global Use
app.component('Button', Button);
app.component('Card', Card);
//setting gapi variable inside router.js
router.setGapi(app._context.config.globalProperties.$gapi);
app.use(router.router);
app.mount('#app');
