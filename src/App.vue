<script setup lang="ts">
import { reactive } from "vue";
import Complexity from "./components/Complexity.vue";
import { ComplexityEnum } from "./interfaces/Complexity";
import { getFromLocalStorage, setToLocalStorage } from "./utils/localStorage";

interface IAppState {
  isStarted: boolean;
  complexity: ComplexityEnum;
}

const state = reactive<IAppState>({ isStarted: false, complexity: getFromLocalStorage<ComplexityEnum>("complexity") });

const handleComplexityChange = (newComplexity: ComplexityEnum) => {
  state.complexity = newComplexity;
  setToLocalStorage("complexity", newComplexity);
};
</script>

<template>
  <div class="main">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iste et placeat quisquam rem, eum, ea laborum,
      earum sequi nisi sit voluptatem tempore non delectus animi voluptates quod eaque ex.
    </p>
    <button v-if="!state.isStarted" class="start-quiz">Start quiz</button>
  </div>
  <Complexity :selectedComplexity="state.complexity" @change-complexity="handleComplexityChange" />
</template>

<style scoped>
.main {
  margin-bottom: 1rem;
  max-width: 44rem;
}
.start-quiz {
  width: 100%;
}
</style>
