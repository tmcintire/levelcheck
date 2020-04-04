<template>
  <div v-if="event">
    <v-row justify="center">
      <h1>Level Check</h1>
    </v-row>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import * as _ from 'lodash'
import { mapState } from 'vuex'
import { IApplicationState } from '@/data/interfaces'

@Component({
  computed: mapState({
    event: (state: IApplicationState) => state.event,
  }),
})
export default class LevelCheck extends Vue {}
</script>
