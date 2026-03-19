<script setup>
import { computed } from "vue";
import { vClickOutside } from "@/directives";

const { show, positionBlock, positionInline, closeOnOutsideClick } =
  defineProps({
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
    positionBlock: {
      type: String,
      required: false,
      default: "start",
    },
    positionInline: {
      type: String,
      required: false,
      default: "start",
    },
    closeOnOutsideClick: {
      type: Boolean,
      required: false,
      default: true,
    },
  });

const dropdownMenuPosition = computed(() => {
  return `${positionBlock}-${positionInline}`;
});

const emits = defineEmits(["close", "toggle"]);

const closeDropdown = () => {
  emits("close");
};
const toggleDropdown = () => {
  emits("toggle");
};
const onOutsideClick = () => {
  if (show && closeOnOutsideClick) {
    closeDropdown();
  }
};
</script>

<template>
  <div
    v-if="$slots.default"
    v-click-outside="onOutsideClick"
    class="dropdown"
  >
    <div
      v-if="$slots.trigger"
      class="dropdown__trigger"
      @click="toggleDropdown"
    >
      <slot name="trigger" />
    </div>
    <Transition
      :name="`slide-block-${positionBlock}`"
      mode="out-in"
    >
      <div
        v-if="show"
        :class="['dropdown__menu', `dropdown__menu--${dropdownMenuPosition}`]"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: relative;

  &__menu {
    position: absolute;
    z-index: 2;
    padding: 1.25rem;
    background-color: $background-color-1;
    box-shadow: inset 0 0 0 1px $border-color-1;

    &--start-start {
      inset-block-end: calc(100% + 1.25rem);
      inset-inline-end: 0;
    }
    &--start-end {
      inset-block-end: calc(100% + 1.25rem);
      inset-inline-start: 0;
    }
    &--end-start {
      inset-block-start: calc(100% + 1.25rem);
      inset-inline-end: 0;
    }
    &--end-end {
      inset-block-start: calc(100% + 1.25rem);
      inset-inline-start: 0;
    }
  }
}
</style>
