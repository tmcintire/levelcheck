<template>
    <v-form>
        <h3 class="flex-row flex-center">Level Info</h3>
        <div class="flex-row" v-for="level in levels" :key="level.id" >
            <v-text-field 
                :label="'Name'" 
                v-on:input="$emit('updateField', {property: 'levels', field: 'name', value: $event, key: level.id})"/>
            <div class="flex-col flex-center">
                <span>Level Check</span>
                <v-checkbox class="no-margin" v-on:change="$emit('updateField', {property: 'levels', field: 'levelCheck', value: $event, key: level.id})"></v-checkbox>
            </div>
        </div>
        <v-btn @click="$emit('newLevel')">+</v-btn>
    </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { IEventLevels } from '@/data/interfaces';

@Component
export default class LevelInfo extends Vue {
    @Prop() public levels: IEventLevels;
}
</script>