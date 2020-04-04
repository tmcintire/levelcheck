<template>
  <div class="level-check-changes flex-col flex-grow">
    <v-list>
      <v-list-item
        v-for="(change, index) in undoChangeState"
        :key="index"
        @click="undoChange(change, index)"
      >
        {{ change.oldValue.name }}
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IParticipant, IApplicationState, IChanges } from '@/data/interfaces'
import ChangeLevel from '@/components/LevelCheck/ChangeLevel.vue'
import { mapState } from 'vuex'
import { addEditParticipant } from '../data/api'

@Component({
  components: {
    ChangeLevel,
  },
})
export default class Changes extends Vue {
  get undoChangeState() {
    return this.$store.getters.undoChangeState
  }

  private undoChange(change: IChanges, index: number) {
    this.$store.commit('removeChange', index)
    addEditParticipant(change.oldValue, change.id)
  }
}
</script>

<style lang="less" scoped>
.level-checks {
  margin-right: 10px;
  overflow-y: auto;

  .participant-card {
    margin: 10px 0px;

    .confirm-level {
      width: 100px;
    }

    .card-left {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 110px;
      border-right: 1px solid #bebebe;

      .card-bib {
        font-size: 1.9em;
      }
    }
  }
}
</style>
