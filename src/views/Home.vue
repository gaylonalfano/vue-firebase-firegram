<template>
  <div class="home">
    <Title />
    <UploadForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Title from "@/components/Title.vue";
import UploadForm from "@/components/UploadForm.vue";

export default defineComponent({
  name: "Home",
  components: {
    Title,
    UploadForm,
  },
});
</script>
