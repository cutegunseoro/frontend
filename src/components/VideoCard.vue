<template>
  <div class="video-card" @click="onClick">
    <img :src="video.thumbnailS3Url" alt="Video Thumbnail" class="thumbnail" />
    <div class="overlay">
      <span class="play-icon">▶</span>
    </div>
  </div>
</template>

<script setup>
import { usePopupPlayerStore } from '@/stores/popupPlayer';

const props = defineProps({
  video: {
    type: Object,
    required: true,
    validator: (v) => v.thumbnail && v.videoId,
  },
});

const popupPlayerStore = usePopupPlayerStore();

const onClick = () => {
  popupPlayerStore.play(props.video.videoId)
};
</script>

<style scoped>
.video-card {
  position: relative;
  aspect-ratio: 9 / 16; /* 세로 동영상 비율 */
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.video-card:hover {
  transform: scale(1.05); /* Slight zoom effect on hover */
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures proper scaling of the thumbnail */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0); /* Initially transparent */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.play-icon {
  font-size: 2rem;
  color: white;
  opacity: 0; /* Initially hidden */
  transition: opacity 0.3s ease;
}

.video-card:hover .overlay {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
}

.video-card:hover .play-icon {
  opacity: 1; /* Show the play icon */
}
</style>
