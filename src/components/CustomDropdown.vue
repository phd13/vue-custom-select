<template lang="pug">
  .custom-dropdown(v-click-outside="hide")
    slot
    .custom-dropdown__callee(v-if="hasCallee" @click="toggle")
      slot(name="callee")
    transition(name="fade-out")
      div(v-if="computedVisible" :class="dropdownClassList")
        slot(name='content')
</template>

<script lang="ts">
  import {
    Component,
    Emit,
    Prop,
    Vue
  } from 'vue-property-decorator';
  import clickOutside from "../directives/clickOutside";

  @Component({
    directives: { clickOutside }
  })

  export default class CustomDropdown extends Vue {
    contentVisible = false;

    @Prop({ default: false }) readonly visible!: boolean;

    get hasCallee(): boolean {
      return !!this.$slots.callee;
    }

    get computedVisible(): boolean {
      return this.$slots.callee ? this.contentVisible : this.visible
    }

    get dropdownClassList(): Array <string | false> {
      return [
        'custom-dropdown__content', 
        !this.computedVisible && 'hidden',
      ];
    }

    public toggle(): void {
      this.contentVisible = !this.contentVisible;
    }

    @Emit('update:visibility')
    hide(): boolean {
      this.contentVisible = false;
      return this.contentVisible;
    }
  }
</script>

<style scoped lang="scss">
  .custom-dropdown {
    position: relative;
    height: 100%;

    &__content {
      position: absolute;
      z-index: 2;
      width: 100%;
    }

    &__callee {
      padding: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
  }
</style>
