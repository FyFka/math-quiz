import { PropType } from "vue"; import { computed } from "vue";

<script setup lang="ts">
import { computed, PropType } from "vue";
import { PreviousGamesType } from "../interfaces/PreviousGames";

const props = defineProps({
  previousGames: { type: Array as PropType<PreviousGamesType>, required: true },
});

const hasPreviousGames = computed(() => {
  return props.previousGames.length !== 0;
});
</script>

<template>
  <div v-if="hasPreviousGames" class="prev-games-info">
    <h3 v-for="prev of props.previousGames" :key="prev.time" class="prev-games-info__score">
      {{ prev.time }}: <span class="prev-games-info__score-highlight">score {{ prev.score }}</span>
    </h3>
  </div>
</template>

<style scoped>
.prev-games-info {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  padding: 1rem 0;
  overflow-y: auto;
}
.prev-games-info__score {
  font-size: 1.5rem;
  color: #6e6e6e;
  margin: 0;
}
.prev-games-info__score-highlight {
  color: #d7d7d7;
  font-weight: 700;
}
</style>
