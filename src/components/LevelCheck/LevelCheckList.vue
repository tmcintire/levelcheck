<template>
    <v-col class="level-check-list">
        <v-card 
            class="mx-auto participant-card"
            :id="`lc-${participant.bib}`"
            v-for="participant in filteredParticipants"
            :key="participant.id"
        >
            <div class="flex-row">
                <div class="card-left" @click="$emit('setParticipant', participant)">
                    <v-card-text class="card-bib">{{participant.bib}}</v-card-text>
                </div>
                <div class="card-right flex-grow" @click="$emit('setParticipant', participant)">
                    <v-card-text>Name: {{participant.name}}</v-card-text>
                    <v-card-text>Level: {{participant.originalLevel}}</v-card-text>
                </div>
                <div class="confirm-level flex-row flex-center" @click="$emit('confirmLevel', participant)">
                    <v-icon color="success" x-large>mdi-check-bold</v-icon>
                </div>
            </div>
        </v-card>
    </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IParticipant} from '@/data/interfaces';

@Component
export default class LevelCheckList extends Vue {
    @Prop() private filteredParticipants: IParticipant[];
}
</script>

<style lang="less" scoped>
    .level-check-list {
        margin-right: 10px;
        overflow-y: auto;
        height: 100%;

        .participant-card {
            margin: 10px 0px;
            width: 100%;

            .confirm-level {
                width: 100px;
            }

            .card-left {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 110px;
                border-right: 1px solid #bebebe;

                .card-bib {
                    font-size: 1.9em;
                }
            }
        }
    }
    
</style>