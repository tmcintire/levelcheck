import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AddEditParticipants from '@/components/AddEditParticipants.vue';
import AddEditLevels from '@/components/AddEditLevels.vue';
import { store } from './store';

Vue.use(Router);

export const navigateName = (route: string) => {
  if (route !== router.currentRoute.name) {
    router.push({name: route}).catch((err) => console.error(err));
  }
};

export const navigatePath = (path: string) => {
  if (path !== router.currentRoute.path) {
    router.push({path}).catch((err) => console.error(err));
  }
};

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/registrations',
      name: 'registrations',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "registrations" */ './views/Registrations.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
      children: [
        {
          path: 'participants',
          component: AddEditParticipants,
        },
        {
          path: 'levels',
          component: AddEditLevels,
        },
      ],
    },
    {
      path: '/levelcheck',
      name: 'levelcheck',
      component: () => import(/* webpackChunkName: "levelcheck" */ './views/LevelCheck.vue'),
      children: [
        {
          path: 'participants',
          component: AddEditParticipants,
        },
        {
          path: 'levels',
          component: AddEditLevels,
        },
      ],
      beforeEnter: (to, from, next) => {
        const needsLCTutorial = store.getters.user.levelCheckTutorial;
        console.log(store);

        if (needsLCTutorial) {
          next({
            path: '/levelchecktutorial',
          });
        } else {
          next();
        }
      },
    },
    {
      path: '/levelchecktutorial',
      name: 'levelchecktutorial',
      component: () => import(/* webpackChunkName: "levelchecktutorial" */ './views/LevelCheckTutorial.vue'),
      children: [
        {
          path: 'participants',
          component: AddEditParticipants,
        },
        {
          path: 'levels',
          component: AddEditLevels,
        },
      ],
    },
  ],
});
