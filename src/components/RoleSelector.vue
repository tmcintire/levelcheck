<template>
    <div v-if="userEvents">
        <h3>Please select the event with which you'd like to work: </h3>
        <v-select outlined :value="eventId" @change="handleEventSelection" :items="userEvents">
            <option v-for="event in userEvents" v-bind:value="event.id" :key="event.id">
                {{ event.name }}
            </option>
        </v-select>
        <span>Selected: {{ event && event.name }}</span>
    </div>
    <div v-else class="flex-row flex-center"> 
        <span class="loader" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { setEventDetails } from '../data/api';
import { IEvent, TVP, IApplicationState } from '../data/interfaces';

@Component({
    computed: mapState({
        userEvents: (state: IApplicationState) => state.userEvents,
        event: (state: IApplicationState) => state.event,
        eventId: (state: IApplicationState) => state.event ? state.event.eventId : '',
    }),
})
export default class EventSelector extends Vue {
    /** fetch the event details from firebase and set it to the store when the user makes this selection */
    private handleEventSelection(selection: string) {
        setEventDetails(selection);
    }
}
</script>