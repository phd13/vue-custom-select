<template lang="pug">
  label(:class="classList" @click.prevent="toggle")
    select.custom-select__select(
      @change="selectOption($event.target.value)"
      v-model="selectedOptionValue"
    )
      option(disabled value="") {{ placeholderText }}
      option(
        v-for="option in parsedOptions"
        :value="option.value"
      ) {{ option.label }}
    custom-dropdown.custom-select__dropdown(
      :visibility.sync="dropdownVisible"
    )
      template(slot="callee")
        span.custom-select__placeholder(
          v-if="!selectedOption"
        ) {{ placeholderText }}
        span.custom-select__name(v-else) {{ selectedOption }}
        arrow-icon(:class="iconClassList")
      ul.custom-select__content(
        v-if="!disabled"
        slot="content"
      )
        li.custom-select__content-item(
          v-for="option in parsedOptions"
          @click.stop.self="selectOption(option.value)"
        ) {{ option.label }}
</template>

<script lang="ts">
  import {
    Component,
    Emit,
    Prop,
    Vue,
    Watch,
  } from 'vue-property-decorator';
  import CustomDropdown from './CustomDropdown.vue';
  import ArrowIcon from "@/components/arrow-icon.vue";
  import {
    Options,
    Primitive,
  } from "@/typings";

  @Component({
    components: {
      ArrowIcon,
      CustomDropdown,
    },
  })

  export default class CustomSelect extends Vue {
    dropdownVisible = false;
    placeholderText = 'Выберите значение';
    selectedOption: Primitive = '';
    selectedOptionValue: Primitive = '';

    @Prop({ required: true, default: () => Array ([]) }) readonly options!: Options;
    @Prop({ default: false }) readonly disabled!: boolean;
    @Prop({ default: 'label' }) readonly label!: string;
    @Prop({ default: 'value' }) readonly value!: string;

    @Watch('options', { deep: true })

    get parsedOptions() {
      return Object.keys(this.options).reduce((acc, key) => {
        const optionKey = this.options[key];

        if (typeof optionKey !== 'object') {
          acc.push({
            label: optionKey.toString(),
            value: optionKey,
          });
        } else {
          acc.push({
            label: optionKey[this.label].toString(),
            value: optionKey[this.value],
          });
        }

        return acc;
      }, [])
    }

    get classList(): Array <string | false> {
      return [
        'custom-select',
        this.dropdownVisible && 'custom-select_focus',
        this.disabled && 'custom-select_disabled',
      ];
    }

    get iconClassList(): Array <string | false> {
      return [
        'custom-select__icon',
        this.dropdownVisible && 'custom-select__icon_active',
      ];
    }

    private toggle(): void {
      if (!this.disabled) {
        this.dropdownVisible = !this.dropdownVisible;
      }
    }

    @Emit('update:value')
    private selectOption(value: string): Primitive {
      this.dropdownVisible = false;
      this.selectedOptionValue = value;

      return this.selectedOption = this.parsedOptions
        .find(option => option.value === value).label;
    }
  }
</script>

<style scoped lang="scss">
  .custom-select {
    border: 1px solid $vue-blue;
    border-radius: 16px;
    font-size: 16px;
    width: 250px;
    color: $vue-blue;
    cursor: pointer;
    user-select: none;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    @include for-mobile {
      width: auto;
      font-size: 14px;
    }

    &_disabled {
      cursor: not-allowed;
    }

    &_focus {
      background: $light-gray;
      color: $vue-blue;
      border-radius: $default-radius $default-radius 0 0;
      border-bottom-color: transparent;
    }

    &__select {
      display: none;

      @include for-mobile {
        display: block;
        top: 0;
        left: 0;
        position: absolute;
        z-index: 1;
        outline: none;
        width: 100%;
        height: 100%;
        background: none;
        border: 0;
        color: transparent;
      }
    }

    &__content {
      background: $light-gray;
      overflow-y: auto;
      border-radius: 0 0 $default-radius $default-radius;
      max-height: 300px;
      color: $vue-blue;
      border: 1px solid $vue-blue;
      border-top: 0;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      margin: 0 -1px;

      &::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
      }

      &-item {
        display: block;
        padding: 0 10px;
        min-height: 50px;
        line-height: 50px;
        background: $light-gray;
        cursor: pointer;
        transition: background-color $default-duration, color $default-duration;
      }

      &-item_active,
      &-item:hover {
        background: $vue-blue;
        color: $light-gray
      }
    }

    &__name,
    &__placeholder {
      color: $vue-blue;
      width: 208px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background-color $default-duration, color $default-duration;

      @include for-mobile {
        width: auto;
      }
    }

    &__icon {

      &_active {
        transform: rotate(180deg);
      }
    }
  }
</style>
