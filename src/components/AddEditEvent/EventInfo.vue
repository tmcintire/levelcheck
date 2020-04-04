<template>
  <v-form>
    <h3 class="flex-row flex-center">Event Info</h3>
    <v-text-field
      :label="'Name'"
      :value="name"
      v-on:input="updateSelectedEvent({ property: 'name', value: $event })"
    ></v-text-field>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class EventInfo extends Vue {
  @Prop() public name: string

  public updateSelectedEvent(payload) {
    this.$store.commit('updateSelectedEvent', payload)
  }
}
</script>
