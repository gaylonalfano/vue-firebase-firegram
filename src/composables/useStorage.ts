// // COMBINED APPROACH
// import { ref, watchEffect, watch, computed } from "vue";
// import { storage } from "@/firebase/config";

// function useStorage() {
//   // Set some state
//   const progress = ref<number>(0);
//   const fileError = ref<string | null>(null);
//   // Ref for the public URL that FB sends back after successfully adding
//   const fileUrl = ref<string | null>(null);

//   async function uploadImage(file: File) {
//     // Q: Use watch() or watchEffect() for progress?
//     const storageRef = storage.ref(file.name);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     // Upload file to storageRef using await put()
//     // Use a try/catch in case of an error
//     try {
//       const response = await storageRef.put(file);
//       // Update fileUrl from the response object
//       fileUrl.value = await response.ref.getDownloadURL();
//     } catch (err) {
//       console.log(err.message);
//       // Update error.value
//       fileError.value = err.message;
//     }
//   }

//   // Listen for changes each time file changes
//   watchEffect(() => {
//     // references
//     const storageRef = storage.ref(file.name);

//     // Upload the file to storageRef using put()
//     try {
//       // NOTE put() is async and so is on() I believe
//       storageRef.put(file).on(
//         "state_change",
//         (snapshot) => {
//           // Compute the progress of the upload
//           const percentage =
//             (snapshot.bytesTrasferred / snapshot.totalBytes) * 100;
//           // Update our progress Ref
//           progress.value = percentage;
//         },
//         // Fire async function when upload is complete
//         async () => {
//           // Update fileUrl from the image that was just uploaded
//           const url = await storageRef.getDownloadURL();
//           // Update our state fileUrl Ref
//           // NOTE We're going to store this URL inside the images collection inside a doc
//           fileUrl.value = url;
//         }
//       );
//     } catch (err) {
//       console.log(err.message);
//       fileError.value = err.message;
//     }
//   });

//   return { progress, fileUrl, fileError };
// }

// export default useStorage;

// // COMPLETED BROKEN ATTEMPT to convert React approach to Vue
// import { ref, watchEffect } from "vue";
// import { storage } from "@/firebase/config";

// function useStorage(file: File) {
//   // Set some state
//   const progress = ref<number>(0);
//   const fileError = ref<string | null>(null);
//   // Ref for the public URL that FB sends back after successfully adding
//   const fileUrl = ref<string | null>(null);

//   // Listen for changes each time file changes
//   watchEffect(() => {
//     // references
//     const storageRef = storage.ref(file.name);

//     // Upload the file to storageRef using put()
//     try {
//       // NOTE put() is async and so is on() I believe
//       storageRef.put(file).on(
//         "state_change",
//         (snapshot) => {
//           // Compute the progress of the upload
//           const percentage =
//             (snapshot.bytesTrasferred / snapshot.totalBytes) * 100;
//           // Update our progress Ref
//           progress.value = percentage;
//         },
//         // Fire async function when upload is complete
//         async () => {
//           // Update fileUrl from the image that was just uploaded
//           const url = await storageRef.getDownloadURL();
//           // Update our state fileUrl Ref
//           // NOTE We're going to store this URL inside the images collection inside a doc
//           fileUrl.value = url;
//         }
//       );
//     } catch (err) {
//       console.log(err.message);
//       fileError.value = err.message;
//     }
//   });

//   return { progress, fileUrl, fileError };
// }

// export default useStorage;

// REFERENCE:
// composables/useStorage.ts
import { ref } from "vue";
import { storage } from "@/firebase/config";

function useStorage() {
  const error = ref<string | null>(null);
  const fileUrl = ref<string | null>(null);
  // Ref for FB Storage path (e.g., covers/{userId}/{fileName})
  const filePath = ref<string | null>(null);
  const uploadProgress = ref<number>(0);

  // Create a function that will upload an image
  async function uploadImage(file: File) {
    // Specify the file path we want in Storage
    filePath.value = `images/${file.name}`;
    // Create a Ref to this Storage using our filePath
    const storageRef = storage.ref(filePath.value);

    // Upload file to storageRef using await put()
    // Use a try/catch in case of an error
    try {
      // Q: How to grab uploadProgress? Use watch(), watchEffect(), computed()?
      const uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_change",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploadProgress.value = Math.floor(progress);
          console.log(`Upload is ${uploadProgress.value} % done`);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        // Fire async function when upload is complete
        async () => {
          // Update fileUrl from the response object
          fileUrl.value = await uploadTask.snapshot.ref.getDownloadURL();
        }
      );
    } catch (err) {
      console.log(err.message);
      // Update error.value
      error.value = err.message;
    }
  }

  return { fileUrl, filePath, error, uploadImage, uploadProgress };
}

export default useStorage;
