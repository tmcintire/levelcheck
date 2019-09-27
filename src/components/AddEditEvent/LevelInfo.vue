<template>
    <v-form>
        <h3 class="flex-row flex-center">Level Info</h3>
        <div class="flex-row" v-for="(level, key) in levels" :key="key">
            <v-text-field 
                :label="'Name'" 
                :value="level.name"
                v-on:input="updateSelectedEvent({property: 'levels', field: 'name', value: $event, key})"/>
            <div class="flex-col flex-center">
                <span>Level Check</span>
                <v-checkbox class="no-margin" v-on:change="updateSelectedEvent({property: 'levels', field: 'levelCheck', value: $event, key})"></v-checkbox>
            </div>
        </div>
        <v-btn @click="addNewLevel">+</v-btn>
    </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { IEventLevels, IApplicationState } from '@/data/interfaces';
import uuid from 'uuid';
import { mapState } from 'vuex';

@Component({
    computed: mapState({
        levels: (state: IApplicationState) => state.selectedEvent.levels,
    }),
})
export default class LevelInfo extends Vue {
    public addNewLevel() {
      this.$store.commit('addNewLevel');
    }

    public updateSelectedEvent(payload) {
        this.$store.commit('updateSelectedEvent', payload);
    }
}
</script>