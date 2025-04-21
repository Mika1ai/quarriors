<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const route = useRoute();

const layouts = {
  default: DefaultLayout,
  auth: AuthLayout,
};

const currentLayout = computed(
  () => layouts[route.meta.layout] || DefaultLayout,
);
</script>

<template>
  <Transition
    name="slide-inline"
    mode="out-in"
  >
    <component :is="currentLayout">
      <RouterView v-slot="{ Component }">
        <Transition
          name="slide-block"
          mode="out-in"
        >
          <component
            :is="Component"
            :key="route.path"
          />
        </Transition>
      </RouterView>
    </component>
  </Transition>
</template>

<style lang="scss" scoped>
.slide-block-enter-active,
.slide-block-leave-active {
  transition: all 300ms ease-in-out;
}
.slide-block-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.slide-block-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}

.slide-inline-enter-active,
.slide-inline-leave-active {
  transition: all 300ms ease-in-out;
}
.slide-inline-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.slide-inline-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
</style>
