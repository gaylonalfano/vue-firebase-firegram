<template>
  <div class="progress-bar">
    Progress Bar props: {{ $props.file }} fileUrl: {{ fileUrl }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useStorage from "@/composables/useStorage";

export default defineComponent({
  name: "ProgressBar",
  props: ["file"],
  setup(props) {
    const { error, fileUrl, uploadImage, uploadProgress } = useStorage();
    // Grab the file passed via props
    uploadImage(props.file);
    console.log({ fileUrl });
    return { error, fileUrl };
  },
});
</script>

<style></style>
