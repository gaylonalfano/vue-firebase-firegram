<template>
  <div class="title">
    <h1>FireGram</h1>
    <h2
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
      }"
    >
      Your Pictures
    </h2>
    <p v-motion :hovered="{ scale: 1.5 }">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Title",
});
</script>
