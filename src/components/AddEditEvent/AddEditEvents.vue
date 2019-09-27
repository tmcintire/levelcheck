<template>
    <div>
        <div 
            v-for="(ev, key) in userEvents"
            :key="key" 
            @click="selectEvent(ev, key)"
            class="flex-row hover"
            :class="selectedEvent === ev ? 'active' : ''">
            {{ev.name}}
        </div>
        <b-button type="submit" variant="primary" @click="newEvent">New Event</b-button>
        <v-overlay opacity="0.90" :value="selectedEvent">
            <AddEditEvent :selectedEvent="selectedEvent" :eventId="eventId" v-on:close="onClose"/>
        </v-overlay>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ILevel } from '@/data/interfaces';
import AddEditEvent from '@/components/AddEditEvent/AddEditEvent.vue'; // @ is an alias to /src;
import { mapState } from 'vuex';
import { v4 as uuid } from 'uuid';
import { IParticipantState } from '@/store';

@Component({
    components: {
        AddEditEvent,
    },
    computed: mapState(['userEvents']),
})
export default class AddEditEvents extends Vue {
    public selectedEvent: ILevel = null;

    public selectEvent(event: ILevel, key: string) {
        this.selectedEvent = event;
    }

    public newEvent() {
        const id = uuid();
        this.selectedEvent = {
            name: '',
            levelCheck: false,
            id,
        };
    }

    public onClose() {
        this.selectedEvent = null;
    }
}
</script>
