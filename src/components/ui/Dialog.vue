<script setup>
import { vClickOutside } from "@/directives";

const { show } = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emits = defineEmits(["close", "confirm"]);

const closeDialog = () => {
  emits("close");
};
const confirmDialog = () => {
  emits("confirm");
};
</script>

<template>
  <Transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="show"
      class="background"
    >
      <div class="container container--sm">
        <div
          v-click-outside="closeDialog"
          class="dialog"
        >
          <slot />
          <slot name="footer">
            <div class="dialog__footer">
              <UiButton
                :classes="['full-width']"
                @click="confirmDialog"
              >
                {{ $t("common.yes") }}
              </UiButton>
              <UiButton
                :classes="['full-width']"
                @click="closeDialog"
              >
                {{ $t("common.no") }}
              </UiButton>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.background {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(1.25rem);
}
.dialog {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem;
  background-color: $background-color-1;
  box-shadow: inset 0 0 0 1px $border-color-1;

  &__footer {
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 1.25rem;
  }
}
</style>
