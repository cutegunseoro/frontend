<template>
  <header>
    <div>
      <div @click="goBack">
        <font-awesome-icon class="header-icon" size="lg" :icon="['fas', 'angle-left']" />
      </div>
    </div>
    <div class="header-right">
      <router-link to="/" class="no-style">
        <font-awesome-icon class="header-icon" size="lg" :icon="['fas', 'bell']" />
      </router-link>
      <router-link to="/" class="no-style">
        <font-awesome-icon class="header-icon" size="lg" :icon="['fas', 'gear']" />
      </router-link>
    </div>
  </header>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>
<style scoped lang="scss">
header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  font-size: 1rem;
  box-sizing: border-box;
  padding: 2rem;
  z-index: 1;
}

.header-right {
  display: flex;
  gap: 0.5rem;
}

a.no-style {
  text-decoration: none;
  color: inherit;
}

.header-icon {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.header-icon:hover {
  transform: scale(1.2);
}

.header-icon:active {
  transform: scale(0.9);
}
</style>
