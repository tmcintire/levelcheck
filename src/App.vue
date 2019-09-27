<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item @click="navigate('home')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navigate('registrations')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Registrations</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navigate('levelcheck')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Level Check</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navigate('admin')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="event">{{event.name}} Level Check</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
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
  public drawer: any = null;

  public navigate(route: string) {
    if (route !== router.currentRoute.name) {
      router.push({name: route}).catch((err) => console.error(err));
    }
  }

  private mounted() {
    firebase.auth().onAuthStateChanged((user: any) => {
      this.loggedIn = !!user;
      getUserPermissions(user).then(() => {
        getUserEvents(user.uid);
      });
    });
  }
}
</script>

<style lang="less">
@import './styles/globals';
@import './styles/modal';
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>