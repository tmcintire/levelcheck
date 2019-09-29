<template>
    <div>
        <v-select :value="role" :label="'Role'" outlined @change="handleRoleSelection" :items="roles">
        </v-select>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import * as _ from 'lodash';
import { setEventDetails } from '../data/api';
import { IEvent, TVP, IApplicationState, IParticipant } from '../data/interfaces';

@Component({
    computed: mapState({
        roles: (state: IApplicationState) => {
           const allRoles = Object.entries(state.event.participants).map(p => p[1].role);
           const uniqueRoles = _.uniq(allRoles);
           return uniqueRoles;
        },
        role: (state: IApplicationState) => state.levelCheckRole,
    }),
})
export default class EventSelector extends Vue {
    /** fetch the event details from firebase and set it to the store when the user makes this selection */
     /** fetch the event details from firebase and set it to the store when the user makes this selection */
    private handleRoleSelection(role: string) {
        this.$store.dispatch('setLevelCheckRole', role);
    }
}
</script>