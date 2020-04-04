<template>
  <div>
    <v-row
      v-for="(ev, key) in userEvents"
      :key="key"
      @click="selectEvent(ev, key)"
      class="hover"
      :class="selectedEvent === ev ? 'active' : ''"
    >
      {{ ev.text }}
    </v-row>
    <v-btn color="primary" @click="newEvent">New Event</v-btn>
    <v-dialog
      v-if="selectedEvent"
      width="600px"
      max-width="700px"
      :value="selectedEvent"
    >
      <AddEditEvent v-on:close="onClose" />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ILevel, IEvent, TVP } from '@/data/interfaces'
import AddEditEvent from '@/components/AddEditEvent/AddEditEvent.vue' // @ is an alias to /src;
import { mapState } from 'vuex'
import { v4 as uuid } from 'uuid'
import { setSelectedEventDetails } from '../../data/api'

@Component({
  components: {
    AddEditEvent,
  },
  computed: mapState(['userEvents', 'selectedEvent']),
})
export default class AddEditEvents extends Vue {
  public selectEvent(event: TVP, key: string) {
    setSelectedEventDetails(event.value)
  }

  public newEvent() {
    const newSelectedEvent = {
      name: '',
      participants: null,
      levels: {
        [uuid()]: {
          name: '',
          levelCheck: false,
        },
      },
      newEvent: true,
      config: {
        pageSize: 0,
        numBar: 0,
      },
    }

    this.$store.commit('setSelectedEvent', newSelectedEvent)
  }

  public onClose() {
    this.$store.commit('setSelectedEvent', null)
  }
}
</script>
