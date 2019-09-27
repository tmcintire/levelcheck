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
            <AddEditEvent v-on:close="onClose" />
        </v-overlay>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ILevel, IEvent, IUserEvent } from '@/data/interfaces';
import AddEditEvent from '@/components/AddEditEvent/AddEditEvent.vue'; // @ is an alias to /src;
import { mapState } from 'vuex';
import { v4 as uuid } from 'uuid';
import { store } from '../../store';
import { setSelectedEventDetails } from '../../data/api';

@Component({
    components: {
        AddEditEvent,
    },
    computed: mapState(['userEvents', 'selectedEvent']),
})
export default class AddEditEvents extends Vue {

    public selectEvent(event: IUserEvent, key: string) {
        setSelectedEventDetails(event.id);
    }

    public newEvent() {
        const id = uuid();
        const newSelectedEvent = {
            name: '',
            participants: null,
            levels: null,
            eventId: id,
        };

        store.commit('setSelectedEvent', newSelectedEvent);
    }

    public onClose() {
        store.commit('setSelectedEvent', null);
    }
}
</script>
