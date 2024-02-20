<template>
  <section class="modal">
    <div class="modal__wrap">
      <div>
        <h2 class="modal__name">Name: <span>{{ item.name }} </span> </h2>
        <p>Phone: <span>{{ item.phone }}</span> </p>
        <p>Email: <span>{{ item.email }}</span> </p>
      </div>
      <div>
        <span>{{ item.typeOfApartments }}</span>
        <p>Check-in: <span>{{ item.start }}</span> </p>
        <p>Eviction: <span>{{ item.end }}</span></p>
      </div>
      <div>
        <span>Numbers of  Guests</span>
        <p>Adults: <span>{{ item.guestInfo.adults }}</span> </p>
        <p>Children: <span>{{ item.guestInfo.children }}</span></p>
      </div>

      <button class="modal__button" @click="closeModal">Close</button>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ item: { type: Object, required: true } })
const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 30;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;

  color: #192b48;;

  background-color: rgba(0, 0, 0, 0.2);

  &__wrap {
    position: absolute;
    z-index: 40;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 400px;
    min-height: 400px;

    display: flex;
    flex-direction: column;
    gap: 24px;

    background-color: rgb(243, 241, 241);
    border-radius: 8px;
    border: 1px solid #e4e4e4;

    padding: 32px;

    & p span,& span{
      font-weight: 600;
      font-size: 20px;
    }


  }

  &__name{
    font-size: 20px;
    & span{
      font-weight: 600;
      font-size: 28px;
    }
  }

  &__button {
    cursor: pointer;
    color: white;
    font-size: 18px;
    line-height: 23px;

    background-color: #192b48;
    border-radius: 4px;

    padding: 8px 16px;

    transition: background-color .4s ease-in-out;

    &:hover{
      background-color: #253f69;
    }
  }
}
</style>
