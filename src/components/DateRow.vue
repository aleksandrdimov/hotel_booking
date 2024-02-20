<template>
  <div class="date">
    <p></p>
    <p
      class="date__item"
      v-for="(item, index) in dateStore"
      :key="index"
      :class="{ active: index === dateStore.isActive }"
    >
      {{ item.name }} {{ item.date }}
    </p>
  </div>
</template>

<script setup>
import { store } from '@/store/store';

const props = defineProps({
  day: { type: Object, required: true }
})
const dateStore=store.state.weekDate
store.commit('getWeekDate')

</script>

<style lang="scss" scoped>
.date {
  display: grid;
  grid-template-columns: 2fr repeat(7, 1fr);

  &__item {
    position: relative;
    text-align: center;
    color: #192b48;

    border: 1px solid #eeeeee;
    background-color: white;

    padding: 4px 12px 20px;

    &::after {
      content: '';
      position: absolute;
      z-index: 2;
      bottom: 16px;
      left: 0;

      width: 100%;
      height: 1px;
      background-color: #eeeeee;
    }

    &.active {
      background-color: #F7FFE9;
    }
  }
}
</style>
