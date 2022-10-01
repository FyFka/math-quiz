<script setup lang="ts">
import { onUnmounted, reactive } from "vue";

const emit = defineEmits(["timeOver"]);
const state = reactive({ timer: 0, initialTime: 0 });

onUnmounted(() => {
  clearInterval(intervalId);
});

const tick = () => {
  if (state.timer < 1) {
    emit("timeOver");
  }
  state.timer -= 1;
};

let intervalId = 0;

const refresh = (seconds: number) => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  state.initialTime = seconds;
  state.timer = seconds;
  intervalId = setInterval(tick, 1000);
};

defineExpose({ refresh });
</script>

<template>
  <div class="timer">
    <div class="timer__fill" :style="{ width: `${(state.timer / state.initialTime) * 100}%` }"></div>
  </div>
</template>

<style scoped>
.timer {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.5rem;
}
.timer__fill {
  background: var(--highlight-color);
  width: 100%;
  height: 100%;
  transition: width 0.25s ease;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
</style>
