<template>
  <div class="footer">
    <router-link to="/home" class="no-style">
      <font-awesome-icon size="lg" :icon="['fas', 'compass']" />
      <div class="footer-text">explore</div>
    </router-link>

    <router-link to="/" class="no-style">
      <font-awesome-icon size="lg" :icon="['fas', 'add']" />
      <div class="footer-text">add</div>
    </router-link>

    <router-link to="/record" class="no-style">
      <font-awesome-icon size="lg" :icon="['fas', 'record-vinyl']" />
      <div class="footer-text">record</div>
    </router-link>

    <router-link to="/calendar" class="no-style">
      <font-awesome-icon size="lg" :icon="['fas', 'calendar-days']" />
      <div class="footer-text">history</div>
    </router-link>

    <router-link to="/profile" class="no-style">
      <font-awesome-icon size="lg" :icon="['fas', 'user']" />
      <div class="footer-text">profile</div>
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

.footer-text {
  font-size: 0.6rem;
}

a {
  text-align: center;
  transition: transform 0.3s ease;
}

a:hover {
  color: colors.$highlight-color;
  transform: scale(1.1);
}

a:active {
  transform: scale(0.9);
}

a.no-style {
  text-decoration: none;
  color: inherit; /* 기본 색상 상속 */
}

a.router-link-active {
  color: colors.$highlight-color; /* 활성화된 링크의 색상 */
}
</style>
