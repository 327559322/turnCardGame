<template>
  <div class="mask" @click="$emit('close-pop')">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Mask",
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(2, 2, 2, 0.74);
}
</style>
