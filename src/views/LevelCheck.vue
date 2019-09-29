<template>
  <div v-if="event" class="registrations flex-col flex-grow">
    <h1 class="flex-row flex-center">Level check</h1>
    <div class="flex-row flex-space-around">
      <LevelSelector />
      <RoleSelector />
    </div>
    <div v-if="filteredParticipants" class="level-check-container flex-row flex-grow">
      <NumbersBar v-if="filteredParticipants.length > 5" :filteredParticipants="filteredParticipants" />
      <LevelChecks 
        :filteredParticipants="filteredParticipants"/>
    </div>
    <div v-if="showUndo" class="flex-row flex-center undo-toast" @click="undoChange">
      <h1>Undo</h1>
    </div>
  </div>
  <div v-else>
    <h3>Please select an event first</h3>
    <EventSelector />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as _ from 'lodash';
import EventSelector from '@/components/EventSelector.vue'; 
import LevelSelector from '@/components/LevelSelector.vue'; 
import RoleSelector from '@/components/RoleSelector.vue'; 
import LevelChecks from '@/components/LevelCheck/LevelChecks.vue'; 
import NumbersBar from '@/components/LevelCheck/NumbersBar.vue'; 
import { mapState } from 'vuex';
import { ILevel, IParticipant, IEvent, IApplicationState, IChanges } from '@/data/interfaces';
import { addEditParticipant } from '../data/api';

@Component({
  components: {
    EventSelector,
    LevelSelector,
    RoleSelector,
    LevelChecks,
    NumbersBar,
  },
  computed: mapState({
    event: (state: IApplicationState) => state.event,
    filteredParticipants: (state: IApplicationState) => {
      if (state.levelCheckLevel) {
        // Filter participants by their selected level
        const participantArray = Object.entries(state.event.participants);
        const filteredArray: IParticipant[] = participantArray.filter(p => {
              const part = p[1] as IParticipant;
              part.id = p[0];
              return (
                part.originalLevel === state.levelCheckLevel.level.name &&
                part.role === state.levelCheckRole &&
                !part.levelChecked 
              );
          }).map(p => p[1]);

        const sortedFilteredArray = filteredArray.sort((a, b) => a.bib - b.bib);

        return sortedFilteredArray;
      }
    },
    undoChangeState: (state: IApplicationState) => state.undoChangeState,
  }),
})
export default class LevelCheck extends Vue {
  @Prop() private undoChangeState!: IChanges[];
  private showUndo: boolean = false;

  @Watch('undoChangeState', {immediate: true})
  private handleLevelChangeUndo(participant: IParticipant) {
    this.showUndo = true;

    setTimeout(() => {
      this.showUndo = false;
    }, 5000)
  }

  private undoChange() {
    const lastChange = _.last(this.undoChangeState);
    addEditParticipant(lastChange.oldValue, lastChange.id);
    this.showUndo = false;
  }
}
</script>

<style lang="less">
  .main-wrapper {
    height: calc(~"100vh - 100px");

    .registrations {
        height: 100%;
    }

    .level-check-container {
        border: 1px solid silver;
        border-radius: 5px;
        box-shadow: 3px 0px 4px silver;
        max-height: 100%;
        min-height: 84%;
    }
  }

  .undo-toast {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: green;
  }
</style>
