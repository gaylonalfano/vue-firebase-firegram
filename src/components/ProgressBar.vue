<template>
  <div v-if="showProgressBar">
    <div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import useStorage from "@/composables/useStorage";

export default defineComponent({
  name: "ProgressBar",
  props: ["file"],
  setup(props, context) {
    const { error, fileUrl, uploadImage, uploadProgress } = useStorage();
    // Make a Ref to show bar and then use watchEffect()
    const showProgressBar = ref<boolean>(true);

    // Grab the file passed via props
    uploadImage(props.file);
    // console.log({ fileUrl });

    // Reset the file to null after successful upload
    // Q: In React, Shaun used useEffect(). How to do this in Vue?
    // A: I think I can simply wrap with <div v-if="!fileUrl">...
    // A: Or, create a Ref like showProgressBar
    // NOTE If I don't use watchEffect() then I get errors. Interesting...
    // NOTE This does NOT reset the original uploadedFile (file prop) to null!
    // It simply hides the progress bar after it's completed the upload.
    watchEffect(() => {
      if (fileUrl.value) {
        // File upload is complete and we have a URL. Remove bar.
        showProgressBar.value = false;

        // Reset file to null
        // Q: Do I need to emit this back to parent UploadForm
        // Q: How to change props values passed from parents? Emit?
        // A: Use context.emit('customEvent')! to notify parent. The payload is optional
        // props.file = null; // Error
        // props.file.value = null; // Error
        // Let's emit an event to tell Parent to reset the file back to null
        context.emit("uploadComplete"); // Works!
      }
    });

    // Reset the props.file value back to null after successful upload
    // function resetFile() {
    //   const tempFile = props.file;
    //   props.file = null;
    // }
    // Try the same but with watch()
    // watch(currentState, (currentState, prevCurrentState) => ...)
    return { error, fileUrl, uploadProgress, showProgressBar };
  },
});
</script>

<style></style>
