<template>
  <header>
    <div>
      <router-link class="no-style">
        <font-awesome-icon class="header-icon" size="lg" :icon="['fas', 'angle-left']" />
      </router-link>
    </div>
    <div class="header-right">
      <router-link class="no-style">
        <font-awesome-icon class="header-icon" size="lg" :icon="['fas', 'bell']" />
      </router-link>
      <router-link class="no-style">
        <font-awesome-icon class="header-icon" size="lg" :icon="['fas', 'gear']" />
      </router-link>
    </div>
  </header>
</template>
<script setup></script>
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
  border-bottom: 1px solid #f0f0f0;
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
  transition: transform 0.3s ease;
}

.header-icon:hover {
  transform: scale(1.2);
}
</style>
