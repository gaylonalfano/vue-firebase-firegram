<template>
  <div class="backdrop" @click="closeModal">
    <img :src="$props.imageSource" alt="enlarged selected image" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImageModal",
  props: ["imageSource"],
  setup(props, context) {
    function closeModal(event: MouseEvent) {
      // Check that the event.target is not the actual HTMLImageElement
      if ((event.target as HTMLDivElement).classList.contains("backdrop")) {
        // NOTE Could scrap handler and pass directly @click="$emit('modalBackdropClicked')"
        // Just emit the event up to parent so it can reset the imageSource to null
        // which will close the Modal.
        context.emit("modalBackdropClicked");
      }
    }

    return { closeModal };
  },
});
</script>

<style></style>
