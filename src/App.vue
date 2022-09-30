<script setup lang="ts">
import { computed, reactive } from "vue";
import Complexity from "./components/Complexity.vue";
import Logo from "./components/Logo.vue";
import { ComplexityEnum } from "./interfaces/Complexity";
import { getFromLocalStorage, setToLocalStorage } from "./utils/localStorage";
import Game from "./components/Game.vue";

interface IAppState {
  isStarted: boolean;
  complexity: ComplexityEnum;
  prevGameScore: number | null;
}

const state = reactive<IAppState>({
  isStarted: false,
  complexity: getFromLocalStorage<ComplexityEnum>("complexity") || ComplexityEnum.NORMAL,
  prevGameScore: null,
});

const hasPreviousGame = computed(() => {
  return state.prevGameScore !== null;
});

const handleComplexityChange = (newComplexity: ComplexityEnum) => {
  state.complexity = newComplexity;
  setToLocalStorage("complexity", newComplexity);
};

const handleStart = () => {
  state.isStarted = !state.isStarted;
};

const handleFinishGame = (score: number) => {
  state.isStarted = false;
  state.prevGameScore = score;
};
</script>

<template>
  <div v-if="!state.isStarted" class="main">
    <div class="main__container">
      <Logo />
      <p class="main__rules">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iste et placeat quisquam rem, eum, ea laborum,
        earum sequi nisi sit voluptatem tempore non delectus animi voluptates quod eaque ex.
      </p>
      <button @click="handleStart" class="start-quiz">Start quiz</button>
      <div v-if="hasPreviousGame" class="main__prev-game-info">
        <h3 class="main__prev-score">previous game score:{{ state.prevGameScore }}</h3>
      </div>
    </div>
    <Complexity :selectedComplexity="state.complexity" @change-complexity="handleComplexityChange" />
  </div>
  <div v-if="state.isStarted">
    <Game :selectedComplexity="state.complexity" @finish-game="handleFinishGame" />
  </div>
</template>

<style scoped>
.main {
  max-width: 44rem;
  position: relative;
}
.main__container {
  margin-bottom: 1rem;
}
.main__rules {
  margin: 0 0 0.75rem;
}
.start-quiz {
  width: 100%;
}
.main__prev-game-info {
  position: absolute;
  bottom: -2rem;
  width: 100%;
  text-align: center;
}
.main__prev-score {
  font-size: 1.5rem;
  color: #6e6e6e;
  margin: 0;
}
</style>
