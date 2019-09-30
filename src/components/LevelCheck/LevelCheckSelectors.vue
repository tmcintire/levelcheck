<template>
    <div>
        <v-tabs v-if="levels" fixed-tabs class="no-flex" :value="selectedLevelIndex">
            <v-tab 
                v-for="(level, index) in levels" 
                :key="index" 
                @click="handleLevelSelection(level)">
                {{level.name}}
            </v-tab>
        </v-tabs>
        <v-tabs v-if="roles" fixed-tabs :value="selectedRoleIndex">
            <v-tab 
                v-for="(role, index) in roles" 
                :key="index" 
                @click="handleRoleSelection(role)">
                {{role}}
            </v-tab>
        </v-tabs>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as _ from 'lodash';
import { ILevel } from '../../data/interfaces';
import { sortlevels } from '../../helpers';

@Component
export default class LevelCheckSelectors extends Vue {  
    @Prop() private levels: ILevel[];
    @Prop() private roles: string[];
    private selectedLevelIndex: number = 0;
    private selectedRoleIndex: number = 0;

    // Computed Props
    get level(): ILevel {
        return this.$store.getters.levelCheckLevel;
    }

    get role(): string {
        return this.$store.getters.levelCheckRole;
    }

    mounted() {
        this.selectedLevelIndex = _.findIndex(this.levels, l => l.name === _.get(this.level, 'name'));
        this.selectedRoleIndex = _.findIndex(this.roles, r => r === this.role);
    }

    // Internal Methods
    private handleRoleSelection(role: string, key: number) {
        this.$store.dispatch('setLevelCheckRole', role);
    }

    private handleLevelSelection(selection: [string, ILevel], key: number) {
        this.$store.dispatch('setLevelCheckLevel', selection);
    }
}
</script>