<template>
  <div class="backdrop">
    <img :src="$props.imageSource" alt="enlarged selected image" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImageModal",
  props: ["imageSource"],
});
</script>

<style></style>
