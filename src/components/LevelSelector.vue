<template>
    <div>
        <v-select outlined :value="levelId" @change="handleLevelSelection" :items="levels"/>
        <span>Selected: {{ event && event.name }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { ILevel, IEventLevels, IApplicationState } from '../data/interfaces';

@Component({
    computed: mapState({
        levels: (state: IApplicationState) => {
            return Object.entries(state.event.levels).filter((level: [string, ILevel]) => {
                return level[1].levelCheck;
            }).map((l: [string, ILevel]) => {
                return ({
                        text: l[1].name,
                        value: l,
                    });
            });
        },
    }),
})
export default class LevelSelector extends Vue {
    /** fetch the event details from firebase and set it to the store when the user makes this selection */
    private handleLevelSelection(selection: string) {
        this.$store.dispatch('setLevelCheckLevel', selection);
    }
}
</script>