<template>
  <div v-if="event" class="registrations">
    <h1>Level check for {{ event.name }}</h1>
    <LevelSelector />
  </div>
  <div v-else>
    <h3>Please select an event first</h3>
    <EventSelector />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventSelector from '@/components/EventSelector.vue'; // @ is an alias to /src;
import LevelSelector from '@/components/LevelSelector.vue'; // @ is an alias to /src;
import { mapState } from 'vuex';

@Component({
  components: {
    EventSelector,
    LevelSelector,
  },
  computed: mapState(['event']),
})
export default class LevelCheck extends Vue {}
</script>
