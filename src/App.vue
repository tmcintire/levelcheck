<template>
  <div id="app">
    <Nav v-if="loggedIn"/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/Nav/Nav.vue'; // @ is an alias to /src
import {getUserPermissions} from './data/users';
import firebase from './firebase';
import { getUserEvents } from './data/api';
window['firebase'] = firebase; // tslint:disable-line

@Component({
  components: {
    Nav,
  },
})
export default class App extends Vue {
  public loggedIn: boolean = false;

  private mounted() {
    firebase.auth().onAuthStateChanged((user: any) => {
      this.loggedIn = !!user;
      getUserPermissions(user.uid).then(() => {
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
