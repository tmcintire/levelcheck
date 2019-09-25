<template>
  <div class="admin container">
    <h1>Add a new participant</h1>
    <router-link to="/admin/participants">Participants</router-link>
    <router-link to="/admin/levels">Levels</router-link>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: mapState(['event']),
})
export default class Admin extends Vue {}
</script>
