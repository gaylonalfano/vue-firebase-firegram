<template>
  <div class="title">
    <h1>FireGram</h1>
    <transition name="enlarge" :duration="400">
      <h2>Your Pictures</h2>
    </transition>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Title",
});
</script>
