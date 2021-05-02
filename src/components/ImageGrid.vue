<template>
  <!-- <div class="img-grid"> -->
  <div v-if="!error && documents" class="img-grid">
    <div v-for="img in documents" :key="img.id" class="img-wrap">
      <!-- <h3>createdAt: {{ img.createdAt }}</h3> -->
      <!-- <p>url: {{ img.url }}</p> -->
      <!-- <img src="{{ img.url }}" alt="uploaded image" /> -->
      <!-- <img src="img.url" alt="uploaded image" /> -->
      <img :src="img.url" alt="uploaded image" />
    </div>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, Ref } from "vue";
import { Timestamp } from "@firebase/firestore-types";
import useFirestore from "@/composables/useFirestore";

interface Image {
  id: string;
  url: string;
  createdAt: Timestamp;
}

export default defineComponent({
  name: "ImageGrid",
  setup() {
    // Access the FS images collection
    // NOTE Need to create interface and cast Types or TS complains
    const { documents, error } = useFirestore("images") as {
      documents: Ref<Image[] | null>;
      error: Ref<string | null>;
    };

    return { documents, error };
  },
});
</script>

<style></style>
