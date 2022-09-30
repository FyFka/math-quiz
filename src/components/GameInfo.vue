<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  score: { type: Number, required: true },
  lives: { type: Array as PropType<boolean[]>, required: true },
});
</script>

<template>
  <div class="game-info">
    <h3 class="game-info__score">score:{{ score }}</h3>
    <div class="game-info__lives">
      <img class="game-info__user-live" v-for="(_, idx) in lives" :key="idx" src="../assets/live.svg" alt="user live" />
    </div>
  </div>
</template>

<style scoped>
.game-info {
  position: absolute;
  bottom: -4.5rem;
  text-align: center;
  width: 100%;
}
.game-info__score {
  font-size: 1.5rem;
  color: #6e6e6e;
  margin: 0 0 0.25rem;
}
.game-info__lives {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
.game-info__user-live {
  width: 2rem;
  height: 2rem;
  transition: transform 0.15s ease-in-out;
}
.game-info__user-live:hover {
  transform: scale(1.25);
}
.game-info__user-live:active {
  transform: scale(0.85);
}
</style>
