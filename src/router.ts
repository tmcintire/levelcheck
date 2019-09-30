import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Changes from './views/Changes.vue';
import AddEditParticipants from '@/components/AddEditParticipants.vue';
import AddEditLevels from '@/components/AddEditLevels.vue';
import AddEditEvents from '@/components/AddEditEvent/AddEditEvents.vue';
import LevelChecks from '@/components/LevelCheck/LevelChecks.vue';
import { store } from './store';
import { getCookie } from './data/cookies';

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
      meta: {
        requiresAuth: true,
      },
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
      meta: {
        requiresAuth: true,
      },
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
        {
          path: 'events',
          component: AddEditEvents,
        },
      ],
      meta: {
        requiresAuth: true,
        adminOnly: true,
      },
    },
    {
      path: '/levelcheck',
      component: () => import(/* webpackChunkName: "levelcheck" */ './views/LevelCheck.vue'),
      children: [
        {
          alias: '',
          path: 'checks',
          name: 'levelcheck',
          component: LevelChecks,
        },
        {
          path: 'changes',
          component: Changes,
        },
      ],
      meta: {
        requiresAuth: true,
        adminOnly: true,
      },
      beforeEnter: (to, from, next) => {
        const needsLCTutorial = store.getters.user.levelCheckTutorial;
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const refreshToken = getCookie('refreshToken');
    if (!refreshToken) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {

      // if we have authenticated, we need to also make sure we have an event selected

      if (!store.state.event && to.path !== '/') {
        next({
          path: '/',
        });
      } else {
        next();
      }

    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
