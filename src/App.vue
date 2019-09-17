<template>
  <div id="app">
    <Nav />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/Nav/Nav.vue'; // @ is an alias to /src

@Component({
  components: {
    Nav,
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
@import './styles/globals';
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
