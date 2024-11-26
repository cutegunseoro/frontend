<template>
  <div v-if="props.visible" class="modal-overlay">
    <div class="modal-content">
      <slot></slot>
      <div class="modal-btn-container">
        <button class="modal-btn cancel" @click="closeModal">취소</button>
        <button class="modal-btn" @click="handleRegisterClick">등록</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const closeModal = () => {
  emits('update:visible', false)
}

const handleRegisterClick = () => {
  emits('register')
  closeModal()
}

const emits = defineEmits(['update:visible', 'register'])
const props = defineProps({
  visible: Boolean,
})
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  width: 16rem;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-btn-container {
  display: flex;
  width: 100%;
  padding: 0.4rem 0rem;
  justify-content: space-evenly;
}

.modal-btn {
  background-color: colors.$highlight-color;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.modal-btn:hover {
  transform: scale(1.1);
}

.modal-btn:active {
  transform: scale(0.9);
}

.cancel {
  background-color: darkgray;
}
</style>
