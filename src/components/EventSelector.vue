<template>
    <div v-if="userEvents">
        <h3>Please select the event with which you'd like to work: </h3>
        <b-select v-model="selected" @change="handleEventSelection">
            <option value=""></option>
            <option v-for="(event, index) in userEvents" v-bind:value="event.id" :key="index">
                {{ event.name }}
            </option>
        </b-select>
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
import { IEvent } from '../data/interfaces';

@Component({
  computed: mapState(['userEvents', 'event']),
})
export default class EventSelector extends Vue {
    private selected: string = '';

    // When the event is changed, lets updated the selected value
    @Watch('event', { immediate: true })
    private onEventSelectionChanged(event: IEvent) {
        this.selected = event ? event.eventId : '';
    }

    /** fetch the event details from firebase and set it to the store when the user makes this selection */
    private handleEventSelection(eventId: string) {
        setEventDetails(eventId);
    }
}
</script>