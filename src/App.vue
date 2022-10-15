<script setup lang="ts">
import { reactive } from "vue";
import Complexity from "./components/Complexity.vue";
import Logo from "./components/Logo.vue";
import { ComplexityEnum } from "./interfaces/Complexity";
import { getFromLocalStorage, setToLocalStorage } from "./utils/localStorage";
import Game from "./components/Game.vue";
import PreviousGames from "./components/PreviousGames.vue";
import { PreviousGamesType } from "./interfaces/PreviousGames";

interface IAppState {
  isStarted: boolean;
  complexity: ComplexityEnum;
  prevGames: PreviousGamesType;
}

const state = reactive<IAppState>({
  isStarted: false,
  complexity: getFromLocalStorage<ComplexityEnum>("complexity") || ComplexityEnum.NORMAL,
  prevGames: [],
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
  state.prevGames.push({ time: new Date().toLocaleTimeString(), score });
};
</script>

<template>
  <div v-if="!state.isStarted" class="main">
    <div class="main__container">
      <Logo />
      <p class="main__rules">
        The math quiz will take 5 minutes of your time to answer a series of math questions, this math quiz will help
        you find out how much you know about math and understand your current math skills.
      </p>
      <button @click="handleStart" class="start-quiz">Start quiz</button>
    </div>
    <Complexity :selectedComplexity="state.complexity" @change-complexity="handleComplexityChange" />
    <PreviousGames :previous-games="state.prevGames" />
  </div>
  <template v-if="state.isStarted">
    <Game :selectedComplexity="state.complexity" @finish-game="handleFinishGame" />
  </template>
</template>

<style scoped>
.main {
  width: 100%;
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
</style>
