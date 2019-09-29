<template>
    <v-form>
        <h3 class="flex-row flex-center">Event Configuration</h3>
        <v-text-field :label="'The number of participants in a grouping on the level check page'" :value="config.pageSize" v-on:input="updateSelectedEvent({property: 'config', value: $event, field: 'pageSize', })"></v-text-field>
        <v-text-field :label="'Show Number scroller after this many participants'" :value="config.numBar" v-on:input="updateSelectedEvent({property: 'config', value: $event, field: 'numBar', })"></v-text-field>
    </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IConfig } from '../../data/interfaces';

@Component
export default class EventConfig extends Vue {
    @Prop() public config: IConfig;

    public updateSelectedEvent(payload) {
        this.$store.commit('updateSelectedEvent', payload);
    }
}
</script>