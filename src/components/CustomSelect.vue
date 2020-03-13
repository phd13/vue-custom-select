<template lang="pug">
  label(:class="computedClassList" @click.prevent="toggle")
    select(
      class="custom-select__select"
      @change="selectOption($event.target.value)"
      v-model="selectedOptionValue"
    )
      option(disabled value="")
        | {{ placeholderText }}
      option(
        v-for="(option, index) in parsedOptions"
        :key="index"
        :value="option.value"
      )
        | {{ option.label }}
    custom-dropdown(
      class="custom-select__dropdown"
      :visibility.sync="dropdownVisible"
    )
      template(slot="callee")
        span(
          class="custom-select__placeholder"
          v-if="!selectedOption"
        )
          | {{ placeholderText }}
        span(class="custom-select__name" v-else)
          | {{ selectedOption }}
        arrow-icon(:class='iconComputedClassList')
      ul(
        v-if="!disabled"
        slot="content"
        class="custom-select__content"
      )
        li(
          class="custom-select__content-item"
          v-for="(option, index) in parsedOptions"
          :key="index"
          @click.stop.self="selectOption(option.label)"
        )
          | {{ option.label }}
</template>

<script lang="ts">
  import {
    Component, Emit,
    Prop,
    Vue,
    Watch,
  } from 'vue-property-decorator';
import CustomDropdown from './CustomDropdown.vue';
import ArrowIcon from "@/components/arrow-icon.vue";
  import {
    Options,
    ParsedOptionArray, Primitive,
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
  parsedOptions: ParsedOptionArray = [];

  @Prop({
    required: true,
    default: []
  }) private options!: Options;
  @Prop({ default: false }) public disabled!: boolean;
  @Prop({ default: 'label' }) private label!: string;
  @Prop({ default: 'value' }) private value!: string;

  @Watch('options', { deep: true })
  onOptionsChanged(val: Options) {
    this.parsedOptions = [];
    this.parseOptions(val);
  }

  get computedClassList(): Array<string | boolean> {
    return [
      'custom-select',
      this.dropdownVisible && 'custom-select_focus',
      this.disabled && 'custom-select_disabled',
    ];
  }

  get iconComputedClassList(): Array<string | boolean> {
    return [
      'custom-select__icon',
      this.dropdownVisible && 'custom-select__icon_active',
    ];
  }

  public toggle(): void {
    if (!this.disabled) {
      this.dropdownVisible = !this.dropdownVisible;
    }
  }

  @Emit('update:value')
  private selectOption(label: string): Primitive {
    this.dropdownVisible = false;
    this.selectedOption = label;
    return this.selectedOptionValue = this.parsedOptions
      .find(option => option.label === label).value;
  }

  private parseOptions(options: Options): void {
    Object.keys(options).map((key) => {
      const optionKey = options[key];

      if (typeof optionKey !== 'object') {
        this.parsedOptions.push({
          label: optionKey.toString(),
          value: optionKey,
        });
      } else {
        this.parsedOptions.push({
          label: optionKey[this.label].toString(),
          value: optionKey[this.value],
        });
      }
    })
  }

  mounted(): void {
    this.parseOptions(this.options);
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
    &__placeholder{
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
