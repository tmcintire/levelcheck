<template>
    <div id='nav' v-if='showNav'>
      <span class="event-name">{{event && event.name}}</span>
      <router-link to='/'>Home</router-link> |
      <router-link to='/registrations'>Registrations</router-link> |
      <router-link to='/levelcheck'>Level Check</router-link> |
      <router-link to='/admin'>Admin</router-link> |
      <span @click='logout'>Logout</span>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import firebase from '../../firebase';
import { router } from '@/router';
import { Route } from 'vue-router';
import { store } from '@/store';
import { mapState } from 'vuex';


@Component({
  computed: mapState(['event']),
})
export default class Nav extends Vue {
  public showNav: boolean = true;

  @Watch('$route', { immediate: true })
  private OnRouteChange(route: Route) {
    if (route.name === 'login' || route.name === 'register') {
      this.showNav = false;
    } else {
      this.showNav = true;
    }
  }

  private logout() {
    store.dispatch('logout');
    document.cookie = "user=";
    document.cookie = "role=";
    document.cookie = "refreshToken=";
    firebase.auth().signOut().then(() => {
      router.push({name: 'login'});
    });
  }
}
</script>


<style scoped lang='less'>
#nav {
  padding: 30px;

  .event-name {
    margin-right: 50px;
  }

  a, span {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>