<template>
  <div v-if="event" class="registrations flex-col flex-grow">
    <h1 class="flex-row flex-center">LevelCheck</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as _ from 'lodash';
import { mapState } from 'vuex';
import { IApplicationState } from '@/data/interfaces';

@Component({
  computed: mapState({
    event: (state: IApplicationState) => state.event,
  }),
})
export default class LevelCheck extends Vue {
  
}
</script>

<style lang="less">
  .no-flex {
    flex: 0
  }
</style>
