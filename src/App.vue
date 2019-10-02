<template>
  <v-app id="inspire">
    <Nav />

    <v-content>
      <v-container class="main-wrapper">
        <router-view/>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/Nav/Nav.vue'; // @ is an alias to /src
import {getUserPermissions} from './data/users';
import firebase from './firebase';
import { getUserEvents } from './data/api';
import { router } from './router';
import { mapState } from 'vuex';
window['firebase'] = firebase; // tslint:disable-line

@Component({
  components: {
    Nav,
  },
  computed: mapState(['event']),
})
export default class App extends Vue {
  public loggedIn: boolean = false;

  public navigate(route: string) {
    if (route !== router.currentRoute.name) {
      router.push({name: route}).catch((err) => console.error(err));
    }
  }

  private mounted() {
    firebase.auth().onAuthStateChanged((user: any) => {
      this.loggedIn = !!user;
      if (user) {
          getUserPermissions(user).then(() => {
            getUserEvents(user.uid);
          });
      }

    });
  }
}
</script>

<style lang="less">
@import './styles/globals';
@import './styles/modal';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>