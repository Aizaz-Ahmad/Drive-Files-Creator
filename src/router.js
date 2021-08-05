import { createRouter, createWebHistory } from 'vue-router';
let $gapi;
const setGapi = gapi => ($gapi = gapi);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./components/HomeComponent'),
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/Signin',
      component: () => import('./components/SignIn'),
      async beforeEnter() {
        if (await $gapi.isSignedIn()) return '/Main';
      },
      meta: {
        title: 'Sign In',
      },
    },
    {
      path: '/Main',
      component: () => import('./components/MainPage'),
      redirect: '/Main/steps/select-folders',
      meta: {
        authRequired: true,
        title: 'Main Page',
      },
      children: [
        {
          path: 'steps/select-folders',
          component: () => import('./components/Steps/SelectFolderComponent'),
        },
        {
          path: 'steps/folder-names',
          component: () => import('./components/Steps/FolderNamesComponent'),
        },
        {
          path: 'steps/confirmation',
          component: () => import('./components/Steps/ConfirmationComponent'),
        },
      ],
    },
  ],
});

router.beforeEach(async to => {
  try {
    document.title = to.meta.title + ' | Drive Files Creator';
    if (to.matched.some(route => route.meta.authRequired)) {
      if (!(await $gapi.isSignedIn())) return '/Signin';
    }
  } catch (e) {
    console.error(e);
  }
});
export default { router, setGapi };
