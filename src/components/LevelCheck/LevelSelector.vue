<template>
  <div>
    <v-select
      :value="level"
      :label="'Level'"
      outlined
      @change="handleLevelSelection"
      :items="levels"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'
import {
  ILevel,
  IEventLevels,
  IApplicationState,
  IParticipant,
} from '../../data/interfaces'

@Component({
  computed: mapState({
    level: (state: IApplicationState) => state.levelCheckLevel,
  }),
})
export default class LevelSelector extends Vue {
  /** fetch the event details from firebase and set it to the store when the user makes this selection */
  private handleLevelSelection(selection: [string, ILevel]) {
    this.$store.dispatch('setLevelCheckLevel', selection)
  }
}
</script>
