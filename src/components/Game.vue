<script setup lang="ts">
import { onMounted, PropType, reactive } from "vue";
import { ComplexityEnum } from "../interfaces/Complexity";
import { generateExpression, generateFakeAnswers } from "../utils/generator";
import { shuffleArray } from "../utils/shuffle";

interface IGameState {
  currentQuestion: string;
  step: number;
  answers: number[];
  rightAnswer: number;
  score: number;
  lives: boolean[];
}

const { selectedComplexity } = defineProps({
  selectedComplexity: {
    type: Number as PropType<ComplexityEnum>,
    required: true,
  },
});

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

const newQuestion = () => {
  const question = generateExpression(selectedComplexity, state.step);
  const rightAnswer = getRightAnswer(question);
  const answers = generateFakeAnswers(1, +selectedComplexity, 5).concat(rightAnswer);

  state.rightAnswer = rightAnswer;
  state.currentQuestion = question.join("");
  state.answers = shuffleArray(answers);
  state.step += 1;
};

const getRightAnswer = (expression: (string | number)[]) => {
  return +Number.parseFloat(new Function(`return ${expression.join("")}`)()).toFixed(1);
};

const checkAnswer = (userAnswer: number) => {
  if (userAnswer === state.rightAnswer) {
    state.score += +Math.round(selectedComplexity * state.step).toFixed(1);
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
  <div class="game">
    <h2>{{ state.currentQuestion }}=</h2>
    <div class="game__answers">
      <button @click="handleUserAnswer(answer)" class="game__answer-btn" v-for="answer in state.answers" :key="answer">
        {{ answer }}
      </button>
    </div>
    <div class="game__info-container">
      <h3 class="game__score">score:{{ state.score }}</h3>
      <div class="game__lives">
        <img v-for="(_, idx) in state.lives" :key="idx" src="../assets/live.svg" alt="user live" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.game {
  width: 44rem;
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
.game__info-container {
  position: absolute;
  bottom: -4.5rem;
  text-align: center;
  width: 100%;
}
.game__score {
  font-size: 1.5rem;
  color: #6e6e6e;
  margin: 0 0 0.25rem;
}
.game__lives {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
</style>
