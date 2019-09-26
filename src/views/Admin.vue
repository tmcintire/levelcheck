<template>
  <div class="admin container">
    <h1 class="flex-row flex-center">Administrator</h1>
    <v-tabs fixed-tabs>
      <v-tab @click="navigate('/admin/participants')">Participants</v-tab>
      <v-tab @click="navigate('/admin/levels')">Levels</v-tab>
    </v-tabs>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { navigatePath } from '@/router';

@Component({
  computed: mapState(['event']),
})
export default class Admin extends Vue {
  public navigate(path: string) {
    navigatePath(path);
  }
}
</script>
