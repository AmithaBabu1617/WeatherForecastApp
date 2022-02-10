<template>
  <div :class="$style.modalBackdrop">
    <div :class="$style.modal">
      <header :class="$style.modal__header">
        <h3 style="margin:0px">Sunrise and Sunset Timing Details</h3>
        <button type="button" :class="$style.modal__closeBtn" @click="close">
          x
        </button>
      </header>
      <section :class="$style.modal__body">
        <slot></slot>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  methods: {
    close() {
      this.$emit("close")
    }
  }
}
</script>

<style lang="less" module>
.modalBackdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 300px;
  @media only screen and (max-width: 719px) {
    width: 300px;
  }
  &__header,
  &__footer {
    padding: 15px;
    display: flex;
  }
  &__header {
    position: relative;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }
  &__body {
    position: relative;
    padding: 20px 10px;
  }
  &__closeBtn {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #2196f3;
    background: transparent;
  }
}
</style>
