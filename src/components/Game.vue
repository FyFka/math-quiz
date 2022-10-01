<script setup lang="ts">
import { onMounted, PropType, reactive, ref } from "vue";
import { ComplexityEnum } from "../interfaces/Complexity";
import { generateExpression, generateFakeAnswers } from "../utils/generator";
import { shuffleArray } from "../utils/shuffle";
import GameInfo from "./GameInfo.vue";
import Timer from "./Timer.vue";

interface IGameState {
  currentQuestion: string;
  step: number;
  answers: number[];
  rightAnswer: number;
  score: number;
  lives: boolean[];
}

const { selectedComplexity } = defineProps({
  selectedComplexity: { type: Number as PropType<ComplexityEnum>, required: true },
});

const timerRef = ref<null | { refresh: (seconds: number) => void }>(null);

const state = reactive<IGameState>({
  currentQuestion: "",
  step: 1,
  answers: [],
  rightAnswer: 0,
  score: 0,
  lives: [true, true, true],
});

const emit = defineEmits(["finishGame"]);

onMounted(() => {
  newQuestion();
});

const handleUserAnswer = (userAnswer: number) => {
  checkAnswer(userAnswer);
  newQuestion();
};

const handleTimeOver = () => {
  checkAnswer();
  newQuestion();
};

const newQuestion = () => {
  const question = generateExpression(selectedComplexity, state.step);
  const rightAnswer = getRightAnswer(question);
  const answers = generateFakeAnswers(rightAnswer, +selectedComplexity, state.step).concat(rightAnswer);
  refreshTimer(Math.ceil(15 - state.step / 2) + 5);
  state.rightAnswer = rightAnswer;
  state.currentQuestion = question.join("");
  state.answers = shuffleArray(answers);
  state.step += 1;
};

const getRightAnswer = (expression: (string | number)[]) => {
  return +new Function(`return ${expression.join("")}`)().toFixed(1);
};

const refreshTimer = (seconds: number) => {
  timerRef.value?.refresh(seconds);
};

const checkAnswer = (userAnswer?: number) => {
  if (userAnswer === state.rightAnswer) {
    state.score += +(selectedComplexity * state.step).toFixed(1);
  } else {
    const lives = state.lives;
    state.lives.pop();
    if (lives.length < 1) {
      emit("finishGame", state.score);
    }
  }
};
</script>

<template>
  <Timer @time-over="handleTimeOver" ref="timerRef" />
  <div class="game">
    <h2>{{ state.currentQuestion }}=</h2>
    <div class="game__answers">
      <button @click="handleUserAnswer(answer)" class="game__answer-btn" v-for="answer in state.answers" :key="answer">
        {{ answer }}
      </button>
    </div>
    <GameInfo :lives="state.lives" :score="state.score" />
  </div>
</template>

<style scoped>
.game {
  width: 100%;
  max-width: 44rem;
  position: relative;
}
.game__answers {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}
.game__answer-btn {
  width: 100%;
}

@media (max-width: 780px) {
  .game__answers {
    flex-direction: column;
  }
}
</style>
