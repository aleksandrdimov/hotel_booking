<template>
  <section class="table">
    <div class="table__btn-wrap">
      <Button :type="'prev'" @click="clickPrev" />
      <Button :type="'next'" @click="clickNext" />
      <Button :type="'text'" @click="clickToday" :disabled="isDisabled" />
    </div>
    <div class="table__date-wrap">
      <DateRow :day="day" />
    </div>
    <div class="table__wrap">
      <div class="table__column" v-for="(room, index) in rooms" :key="index">
        <p class="table__room-name">{{ room.name }}</p>
        <div class="table__container">
          <div class="table__day" v-for="i in 7" :key="i" :class="{ active: i === isActive }">
            <div v-if="room.items.length" v-for="booking in room.items" :key="booking.id">
              <Booking v-if="i === initValues(booking)" :booking="booking" @show="isShowModal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Transition name="modal">
    <ModalDetails v-if="showModal" :item="modalDetails[0]" @close="closeModal" />
  </Transition>
</template>

<script setup>
import ModalDetails from './ModalDetails.vue'

import DateRow from './DateRow.vue'
import Button from './Button.vue'
import Booking from './Booking.vue'
import { onMounted, ref, watch } from 'vue'
import { store } from '@/store/store'

const day = ref(new Date())
const showModal = ref(false)
const isDisabled = ref(true)
const isActive = ref(day.value.getDay() + 1)

const modalDetails = ref()

const bookings = store.state.bookings
const rooms = store.getters.getAllRooms
const dateStore = store.state.weekDate

function initValues(item) {
  if (item.indexStart === 0 || item.indexStart === 1) return 1

  return item.indexStart
}

function isCommit() {
  store.commit('changeDay', day.value)
  store.commit('getWeekDate')
  store.commit('getCurrentBookings')

  isDisabled.value = dateStore.isActive !== -1
}

function clickPrev() {
  day.value = new Date(day.value.getTime() - 86400000 * 7)
  isCommit()
}

function clickNext() {
  day.value = new Date(day.value.getTime() + 86400000 * 7)
  isCommit()
}

function clickToday() {
  day.value = new Date()
  isCommit()
}

function getActive() {
  day.value.getTime().toString().slice(0, 6) === new Date().getTime().toString().slice(0, 6)
    ? (isActive.value = day.value.getDay() + 1)
    : (isActive.value = -1)
}

function isShowModal(data) {
  showModal.value = true
  modalDetails.value = bookings.filter((el) => el.id === data)
  document.documentElement.style.overflow = 'hidden'
}

function closeModal() {
  showModal.value = false
  document.documentElement.style.overflow = 'auto'
}

watch(day, () => {
  getActive()
})

onMounted(() => {
  store.commit('getCurrentBookings')
})
</script>

<style lang="scss" scoped>
.table {
  position: relative;

  &__btn-wrap {
    display: flex;
    gap: 4px;

    margin-bottom: 24px;
  }

  &__column {
    display: grid;
    grid-template-columns: 2fr 7fr;
  }

  &__container {
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  &__room-name {
    color: #69ac4f;
    font-weight: 600;

    border: 1px solid #eeeeee;
    background-color: white;
    padding: 16px;
  }

  &__day {
    position: relative;

    background-color: white;
    border: 1px solid #eeeeee;

    &.active {
      background-color: #f7ffe9;
    }
  }
}

.modal-enter-from {
  opacity: 0;
}
.modal-enter-to {
  opacity: 1;
  transition: all 0.4s ease-in-out;
}
.modal-leave-to {
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
}
</style>
