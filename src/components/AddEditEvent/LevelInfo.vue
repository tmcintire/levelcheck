<template>
  <v-container>
    <v-form>
      <h3 class="flex-row flex-center">Level Info</h3>

      <v-row justify="space-between" v-for="level in levels" :key="level.id">
        <v-text-field
          :label="'Name'"
          :value="level.name"
          v-on:input="
            updateSelectedEvent({
              property: 'levels',
              value: $event,
              field: 'name',
              key: level.id,
            })
          "
        >
        </v-text-field>
        <v-col align-self="end">
          <span>Level Check</span>
          <v-checkbox
            class="no-margin"
            v-model="level.levelCheck"
            v-on:change="
              updateSelectedEvent({
                property: 'levels',
                value: $event,
                field: 'levelCheck',
                key: level.id,
              })
            "
          >
          </v-checkbox>
        </v-col>
      </v-row>
      <v-btn @click="addNewLevel">+</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ILevel } from '@/data/interfaces'

@Component
export default class LevelInfo extends Vue {
  @Prop() levels: ILevel

  public addNewLevel() {
    this.$store.commit('addNewLevel')
  }

  public updateSelectedEvent(payload) {
    this.$store.commit('updateSelectedEvent', payload)
  }
}
</script>
