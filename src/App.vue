<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore, useRelationshipsStore } from "@/stores";
import { api } from "@/services";
import { supabase } from "@/services/supabaseClient";
import { useUserSession } from "@/composables";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const { setupUserSession, teardownUserSession } = useUserSession();
const userStore = useUserStore();
const relationshipsStore = useRelationshipsStore();
const route = useRoute();

onMounted(async () => {
  userStore.setUserLoading(true);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) setupUserSession({ user, userStore, relationshipsStore });
  else teardownUserSession({ userStore, relationshipsStore });
});

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
    name="slide-inline-start"
    mode="out-in"
  >
    <component :is="currentLayout">
      <RouterView v-slot="{ Component }">
        <Transition
          name="slide-block-start"
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
// .slide-block-enter-active,
// .slide-block-leave-active {
//   transition: all 300ms ease-in-out;
// }
// .slide-block-enter-from {
//   opacity: 0;
//   transform: translateY(40px);
// }
// .slide-block-leave-to {
//   opacity: 0;
//   transform: translateY(-40px);
// }

// .slide-inline-enter-active,
// .slide-inline-leave-active {
//   transition: all 300ms ease-in-out;
// }
// .slide-inline-enter-from {
//   opacity: 0;
//   transform: translateX(40px);
// }
// .slide-inline-leave-to {
//   opacity: 0;
//   transform: translateX(-40px);
// }
</style>
