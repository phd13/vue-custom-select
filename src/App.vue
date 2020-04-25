<template lang="pug">
  #app
    CustomSelect(:options="example1")
    CustomSelect(:options="example2")
    CustomSelect(:options="example3")
    CustomSelect(:options="example4" label="name" value="id")
    CustomSelect(:options="example5")
    CustomSelect(:options="example6" label="title" value="id")
    CustomSelect(:options="example7" :disabled="true")
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import CustomSelect from './components/CustomSelect.vue';

  @Component({
    components: {
      CustomSelect,
    },
  })
  export default class App extends Vue {
    example1 = ['Option 1', 'Option 2', 'Option 3'];
    example2 = [1, 2, 3];
    example3 = [{ label: 'Option 1', value: 1}, { label: 'Option 2', value: 2 }];
    example4 = [{ name: 'Option 1', id: 1}, { name: 'Option 2', id: 2 }];
    example5 = { value1: "Option 1", value2: 'Option 2' };
    example6 = { value1: { title: 'Option 1', id: '1' }, value2: { title: "Option 2", id: 2 } };
    example7 = ['disabled'];
  }
</script>

<style scoped lang="scss">
  #app {
    height: 100%;
    padding: 16px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
  }
</style>
