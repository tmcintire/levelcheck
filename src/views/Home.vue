<template>
  <div v-if="user" class="home">
    <h1>Welcome, {{user.name}}</h1>
    <img alt="Vue logo" src="../assets/logo.png">
    <EventSelector />
  </div>
  <div v-else class="flex-row flex-center">
    <span class="loader"></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventSelector from '@/components/EventSelector.vue'; // @ is an alias to /src;
import { mapState } from 'vuex';

@Component({
  components: {
    EventSelector,
  },
  computed: mapState(['user']),
})
export default class Home extends Vue {}
</script>
