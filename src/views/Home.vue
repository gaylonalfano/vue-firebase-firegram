<template>
  <div class="home">
    <Title />
    <UploadForm />
    <ImageGrid @imageClicked="passImageSourceToModal" />
    <ImageModal :imageSource="imageSourceForModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Title from "@/components/Title.vue";
import UploadForm from "@/components/UploadForm.vue";
import ImageGrid from "@/components/ImageGrid.vue";
import ImageModal from "@/components/ImageModal.vue";

export default defineComponent({
  name: "Home",
  components: {
    Title,
    UploadForm,
    ImageGrid,
    ImageModal,
  },
  setup() {
    const imageSourceForModal = ref<string | null>(null);
    // Capture image source passed from @imageClicked event payload
    // Q: Does the param name have to match the emitted payload variable name?
    function passImageSourceToModal(imageUrl: string) {
      // Update global imageSource state with new value and pass to Modal
      imageSourceForModal.value = imageUrl;
    }

    return { imageSourceForModal, passImageSourceToModal };
  },
});
</script>
