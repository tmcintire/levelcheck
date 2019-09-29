<template>
  <div>
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

        
        <v-list-group
          prepend-icon="mdi-home"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>My Events</v-list-item-title>
          </template>
          <v-list-item-content>
            <v-list-item @click="handleEventSelection(ev.value)" v-for="ev in userEvents" :key="ev.value" :class="event && ev.value === event.eventId ? 'active' : ''">
              <v-list-item-title >{{ev.text}}</v-list-item-title>
            </v-list-item>
          </v-list-item-content>
        </v-list-group>


        <v-list-item v-if="event" @click="navigate('registrations')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Registrations</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="event" @click="navigate('levelcheck')">
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
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import firebase from '../../firebase';
import { router, navigateName } from '@/router';
import { Route } from 'vue-router';
import { mapState } from 'vuex';
import { setEventDetails } from '../../data/api';


@Component({
  computed: mapState(['event', 'userEvents']),
})
export default class Nav extends Vue {
  public showNav: boolean = true;
  public drawer: any = null;

  public navigate(route: string) {
    navigateName(route);
  }

  /** fetch the event details from firebase and set it to the store when the user makes this selection */
  public handleEventSelection(eventId: string) {
      setEventDetails(eventId);
      this.drawer = null;
  }

  @Watch('$route', { immediate: true })
  private OnRouteChange(route: Route) {
    if (route.name === 'login' || route.name === 'register') {
      this.showNav = false;
    } else {
      this.showNav = true;
    }
  }

  private logout() {
    this.$store.dispatch('logout');
    document.cookie = 'user=';
    document.cookie = 'role=';
    document.cookie = 'refreshToken=';
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