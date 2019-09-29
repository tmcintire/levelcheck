<template>
    <v-item-group class="level-check-pages">
        <div 
            class="level-check-page-item"
            v-for="coll in collection"
            :key="coll.first"
            v-scroll-to="{el: `#lc-${coll.first}`, container: '.level-checks'}">
            <v-item v-slot:default="{ active, toggle }">
                <v-card :color="active ? 'primary' : ''"
                    class="level-check-item-card"
                    
                    @click="toggle">
                    {{coll.first}}-{{coll.last}}
                </v-card>
            </v-item>
        </div>
    </v-item-group>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import vuescroll from 'vue-scrollto';
import * as _ from 'lodash';
import { IParticipant, IApplicationState } from '../../data/interfaces';
import { mapState } from 'vuex';

@Component({
    computed: mapState({

        collection: function(state: IApplicationState) {
            let currentNumber = this.$props.filteredParticipants[0].bib;
            const lastNumber = this.$props.filteredParticipants[this.$props.filteredParticipants.length-1].bib;

            const pageSize=state.event.config.pageSize;
            let coll: {first: number, last: number}[] = [];
            let totalNumber = lastNumber;
            while (currentNumber < lastNumber) {
                if (totalNumber/pageSize > 1) {
                    const nextNumber = currentNumber + pageSize;
                    
                    const isInScope = this.$props.filteredParticipants.filter(p => {
                        return _.inRange(p.bib, currentNumber, currentNumber + pageSize);
                    });

                    if (isInScope.length > 0) {
                        coll.push({
                            first: currentNumber,
                            last: nextNumber,
                        });
                    }

                    currentNumber = nextNumber;
                    totalNumber -= pageSize;
                } else {
                    coll.push({
                        first: currentNumber,
                        last: lastNumber,
                    });

                    currentNumber = lastNumber;
                }
            }

            return coll;
        },
    }),
})
export default class NumbersBar extends Vue {
    @Prop() public filteredParticipants: IParticipant[];
    private collection!: {first: number, last: number}[];
}
</script>

<style lang="less" scoped>
    .level-check-pages {
        margin: 10px 10px;
        width: 90px;
        overflow-y: scroll;

        .level-check-page-item {
            padding: 5px;

            .level-check-item-card {
                padding: 10px;
            }
        }
    }
</style>