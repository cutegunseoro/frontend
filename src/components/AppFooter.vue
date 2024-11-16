<template>
  <div class="footer">
    <router-link to="/" class="no-style">
      <font-awesome-icon size="lg" :icon="['fas', 'home']" />
    </router-link>

    <router-link to="/record" class="no-style">
      <font-awesome-icon size="lg" :icon="['fas', 'record-vinyl']" />
    </router-link>

    <router-link to="/calendar" class="no-style">
      <font-awesome-icon size="lg" :icon="['fas', 'calendar-days']" />
    </router-link>

    <router-link to="/profile" class="no-style">
      <font-awesome-icon size="lg" :icon="['fas', 'user']" />
    </router-link>
  </div>
</template>

<script></script>

<style scoped lang="scss">
.footer {
  display: flex;
  position: fixed;
  max-width: 480px;
  bottom: 0;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
  height: 4rem;
  background-color: colors.$primary-color;
  color: colors.$secondary-color;
  z-index: 1;
}

a.no-style {
  text-decoration: none;
  color: inherit; /* 기본 색상 상속 */
}

a.router-link-active {
  color: colors.$icon-color-active; /* 활성화된 링크의 색상 */
}
</style>
