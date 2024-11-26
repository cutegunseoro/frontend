<template>
  <TravelVideos :travelId="travelId" />
</template>

<script setup>
import { useRoute } from 'vue-router';

import TravelVideos from '@/components/TravelVideos.vue';

const route = useRoute()
const travelId = route.params.travelId
</script>
