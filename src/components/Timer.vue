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
    <div class="timer__fill" :style="{ width: `${(state.timer / state.initialTime) * 100}%` }">{{ state.timer }}</div>
  </div>
</template>

<style scoped>
.timer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.75rem;
}
.timer__fill {
  background: #747bff;
  width: 100%;
  height: 100%;
  transition: width 1s ease;
}
</style>
