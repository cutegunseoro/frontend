import { ref } from "vue";
import { defineStore } from "pinia";

export const usePopupPlayerStore = defineStore("popupPlayer", () => {
  const isVisible = ref(false);
  const videoId = ref(null);

  const play = (newVideoUrl) => {
    videoId.value = newVideoUrl;
    isVisible.value = true;
  }
  const close = () => {
    isVisible.value = false;
    videoId.value = null;
  }

  return {isVisible, videoId, play, close};
})
