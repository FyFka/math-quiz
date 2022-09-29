<script setup lang="ts">
import { PropType } from "vue";
import { ComplexityEnum } from "../interfaces/Complexity";

const emit = defineEmits(["changeComplexity"]);
const { selectedComplexity } = defineProps({
  selectedComplexity: {
    type: Number as PropType<ComplexityEnum>,
    required: true,
  },
});

const handleComplexityChange = (newComplexity: ComplexityEnum) => {
  emit("changeComplexity", newComplexity);
};
</script>

<template>
  <div class="complexity">
    <button
      @click="handleComplexityChange(ComplexityEnum.EASY)"
      :class="{ active: selectedComplexity === ComplexityEnum.EASY }"
      class="complexity__sel-btn"
    >
      Easy
    </button>
    <button
      @click="handleComplexityChange(ComplexityEnum.NORMAL)"
      :class="{ active: selectedComplexity === ComplexityEnum.NORMAL }"
      class="complexity__sel-btn"
    >
      Normal
    </button>
    <button
      @click="handleComplexityChange(ComplexityEnum.HARD)"
      :class="{ active: selectedComplexity === ComplexityEnum.HARD }"
      class="complexity__sel-btn"
    >
      Hard
    </button>
  </div>
</template>

<style scoped>
.complexity {
  display: flex;
  gap: 1rem;
  justify-content: space-around;
}
.complexity__sel-btn {
  width: 100%;
}
.complexity__sel-btn.active {
  background: #747bff;
}
</style>
