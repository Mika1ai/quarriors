<script setup>
import { createErrorToast } from "@/utils";

const { accept, maxWidth, maxHeight } = defineProps({
  accept: {
    type: String,
    required: false,
    default: "image/*",
  },
  maxWidth: {
    type: Number,
    required: false,
    default: 64,
  },
  maxHeight: {
    type: Number,
    required: false,
    default: 64,
  },
});

const emits = defineEmits(["file-change"]);

const onFileChange = async (event) => {
  const reader = new FileReader();
  const file = event.target.files[0];

  reader.onload = (e) => {
    const img = new Image();

    img.onload = () => {
      if (img.width > maxWidth || img.height > maxHeight) {
        createErrorToast({
          message: "Image must be between 32x32 and 64x64 pixels",
        });
        event.target.value = "";

        return;
      }

      emits("file-change", file);
    };

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
};
</script>

<template>
  <div class="field">
    <label>
      <UiButton :pseudo="true">
        <InlineSvg src="icons/upload.svg" />
      </UiButton>
      <input
        type="file"
        class="hidden"
        :accept="accept"
        @change="onFileChange"
      />
    </label>
  </div>
</template>

<style lang="scss" scoped>
.field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
