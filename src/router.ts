import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AddEditParticipants from '@/components/AddEditParticipants.vue';
import AddEditLevels from '@/components/AddEditLevels.vue';

Vue.use(Router);

export default new Router({
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
  ],
});
