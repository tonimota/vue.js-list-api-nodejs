<template>
  <div id="app">
    <netshoes-list></netshoes-list>
  </div>
</template>

<script>
import List from '@/components/List/list';

export default {
  name: 'App',
  components: {
    'netshoes-list': List,
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/style/main.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
