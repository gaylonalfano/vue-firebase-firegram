<template>
  <!-- <div class="img-grid"> -->
  <div v-if="!error && documents" class="image-grid">
    <div
      v-for="image in documents"
      :key="image.id"
      @click="passImageSourceToHome"
      class="image-wrap"
    >
      <!-- <h3>createdAt: {{ img.createdAt }}</h3> -->
      <!-- <p>url: {{ img.url }}</p> -->
      <!-- <img src="{{ img.url }}" alt="uploaded image" /> -->
      <!-- <img src="img.url" alt="uploaded image" /> -->
      <img :src="image.url" alt="uploaded image" />
    </div>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { Timestamp } from "@firebase/firestore-types";
import useFirestore from "@/composables/useFirestore";

interface Image {
  id: string;
  url: string;
  createdAt: Timestamp;
}

export default defineComponent({
  name: "ImageGrid",
  emits: {
    imageClicked(imageUrl: string) {
      return !!imageUrl;
    },
  },
  setup(props, context) {
    // Access the FS images collection
    // NOTE Need to create interface and cast Types or TS complains
    const { documents, error } = useFirestore("images") as {
      documents: Ref<Image[] | null>;
      error: Ref<string | null>;
    };

    const clickedImageSource = ref<string | null>(null);

    function passImageSourceToHome(event: MouseEvent) {
      // Grab the selected image's URL and update our ref
      let clickedImage = event.target as HTMLImageElement; // <img src alt > element
      console.log("clickedImage: ", clickedImage);
      // let clickedImage = (event.target as HTMLImageElement).getAttribute("src");
      // console.log("clickedImage: ", clickedImage); // https://... WORKS!
      // Update our state
      clickedImageSource.value = clickedImage.src;
      console.log("clickedImageSource: ", clickedImageSource.value);
      // Use context to emit the click event and pass img source
      context.emit("imageClicked", clickedImageSource.value);
    }

    return { documents, error, passImageSourceToHome };
  },
});
</script>

<style></style>
