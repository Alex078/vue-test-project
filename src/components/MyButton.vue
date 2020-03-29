<template>
  <button
    class="button"
    :class="{ 'button--inactive' : inactive }"
    @click="$emit('click')"
  >{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Ok'
    },
    inactive: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style lang="scss" scoped>
.button {
  background: $primary-color-secondary;
  border: 1px solid $primary-color-secondary;
  box-sizing: border-box;
  border-radius: 32px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: $white-color;
  padding: 9.5px 21px;
  outline: none;
  cursor: pointer;

  &--inactive {
    opacity: 0.4;
    pointer-events: none;
  }

  &--inverse {
    background-color: $white-color;
    color: $primary-color-secondary
  }
}
</style>
