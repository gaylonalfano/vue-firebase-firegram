<template>
  <form>
    <label>
      <input type="file" @change="handleFileChange" />
      <span>+</span>
    </label>
    <div class="output">
      <div v-if="uploadedFile">
        {{ uploadedFile.name }} :
        <ProgressBar :file="uploadedFile" @uploadComplete="resetFile" />
      </div>
      <div v-if="fileError" class="error">{{ fileError }}</div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ProgressBar from "@/components/ProgressBar.vue";

export default defineComponent({
  name: "UploadForm",
  components: {
    ProgressBar,
  },
  setup() {
    // NOTE React uses: const [file, setFile] = useState(null); as its equivalent
    const uploadedFile = ref<File | null>(null);
    const fileError = ref<string | null>(null);

    const allowedFileTypes: string[] = ["image/png", "image/jpeg"];

    function handleFileChange(e: Event) {
      console.log("handleFileChange!");
      // console.log(e.target);
      // 1. Access the file user selected
      // NOTE Vanilla JS: document.forms['formName']['inputName'].files[0]
      // let selectedFile: File | null = (e.target as HTMLInputElement).files[0];  // TS2531
      let selectedFiles: FileList | null = (e.target as HTMLInputElement).files; // Works!
      // NOTE Turns out a SINGLE File won't work. Must use FileList to fix TS2531
      // console.log(selectedFiles);
      // 2. Check that we actually have a file and then update our ref
      // 3. Check that filetype is an image using allowedFileTypes.includes(selectedFiles[0].type)
      if (
        selectedFiles &&
        selectedFiles.length &&
        allowedFileTypes.includes(selectedFiles[0].type)
      ) {
        // Update our state (i.e., our uploadedFile ref)
        uploadedFile.value = selectedFiles[0];
        // Reset fileError ref in case
        fileError.value = null;
      } else {
        // Reset our ref
        uploadedFile.value = null;
        // Update the fileError to inform user
        fileError.value = "Please select an image file (png or jpeg)";
      }
    }

    // Function to reset the global uploadedFile value back to null
    // after successfully uploading (within child ProgressBar component)
    function resetFile() {
      uploadedFile.value = null;
      console.log(
        "UploadForm:resetFile:uploadedFile.value: ",
        uploadedFile.value
      );
    }

    return { handleFileChange, uploadedFile, fileError, resetFile };
  },
});
</script>

<style></style>
