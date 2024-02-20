<template>
  <div class="table__reserve" @click="clickBooking" :class="{start: booking.indexStart===0}">
    <span>{{booking.name}}</span>
</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({ booking: { type: Object, required: true } })
const emit =defineEmits(['show'])

function clickBooking(){
    emit('show',props.booking.id)
}

const widthItem=ref('')

function initValues(){
    widthItem.value=`${98+(props.booking.indexEnd-props.booking.indexStart)*100}%`
}

watch(props,()=>{
    initValues()
})

onMounted(()=>{
    initValues()
})
</script>

<style lang="scss" scoped>
.table {
  &__reserve {
    cursor: pointer;
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 51%;

    width: v-bind(widthItem);
    height: 70%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #5395ff;
    border-radius: 10px;
    border: 1px solid #192b48;

    padding: 10px;

    transition: background-color .3s ease-in-out;

    &:hover{
      background-color: #78aafa;
    }

    & span {
      text-align: center;
      color: black;
      font-weight: 600;
      font-size: 16px;
      line-height: 18px;
    }

    &.start{
      left: -51%;
    }
  }
}
</style>
