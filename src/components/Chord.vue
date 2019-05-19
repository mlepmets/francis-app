<template>
  <div class="chord">
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
  .chord
    font-family: 'Roboto'
    font-size: 1.8rem
    font-weight: 700
    background: white
    opacity: 0.5
    border-radius: 50%
    width: 80px
    height: 80px
    margin: 20px 21px 0 21px
    display: flex
    align-items: center
    justify-content: center
    cursor: default;
  .active-chord
    opacity: 1
</style>