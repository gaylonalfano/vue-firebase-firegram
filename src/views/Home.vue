<template>
  <div class="home">
    <Title />
    <UploadForm />
    <ImageGrid />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Title from "@/components/Title.vue";
import UploadForm from "@/components/UploadForm.vue";
import ImageGrid from "@/components/ImageGrid.vue";

export default defineComponent({
  name: "Home",
  components: {
    Title,
    UploadForm,
    ImageGrid,
  },
});
</script>
