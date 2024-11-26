<template>
  <div v-if="isVisible && !loading" class="popup-container">
    <div class="popup-overlay" @click="closePopup"></div>
    <div class="popup-content">
      <button class="close-btn" @click="closePopup">&times;</button>
      <video controls autoplay v-if="videoId">
        <source :src="videoSrc" :type="contentType" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { usePopupPlayerStore } from "@/stores/popupPlayer";
import { getVideoStreamUrl } from "@/api/video";

// Access the popup store
const popupPlayerStore = usePopupPlayerStore();

// Computed properties for state
const isVisible = computed(() => popupPlayerStore.isVisible);
const videoId = computed(() => popupPlayerStore.videoId);

// Close popup action
const closePopup = () => {
  popupPlayerStore.close();
};

const videoSrc = ref(null);
const contentType = ref(null);
const loading = ref(false);

watch(videoId, async (newVideoId) => {
  if (!newVideoId) {
    videoSrc.value = null;
    contentType.value = null;
    return;
  }
  loading.value = true;
  try {
    const res = await getVideoStreamUrl(newVideoId);
    contentType.value = res.data.contentType;
    videoSrc.value = res.data.preSignedUrl;
  } finally {
    loading.value = false;
  }
});

</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: relative;
  width: 80%;
  max-width: 800px;
  background: #000;
  border-radius: 10px;
  overflow: hidden;
}

.popup-content video {
  width: 100%;
  height: auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
}
</style>
