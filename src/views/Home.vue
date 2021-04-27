<template>
  <div class="home">
    <Title />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Title from "@/components/Title.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    Title,
  },
});
</script>
