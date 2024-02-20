<template>
  <button class="button" :disabled="disabled">
    <span v-if="type === 'text'">Today</span>
    <img v-else src="/arrow_icon.svg" :class="{ prev: type === 'prev' }" alt="arrow" />
  </button>
</template>

<script setup>
const props = defineProps({
  type: { type: String, required: true },
  disabled: { type: Boolean, required: false }
})
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  background-color: #192b48;
  border-radius: 4px;

  padding: 4px 16px;

  & img {
    width: 16px;
    gap: 16px;

    &.prev {
      transform: rotate(180deg);
    }
  }

  & span {
    color: white;
    font-size: 14px;
    line-height: 16px;
  }

  &:disabled{
    cursor: auto;
    pointer-events: none;
    background-color: grey;
  }
}
</style>
