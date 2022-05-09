<template>
  <v-progress-circular
    class="loader"
    :size="70"
    :width="7"
    color="blue"
    indeterminate
  ></v-progress-circular>
</template>

<script>
export default {
  name:'Loader'
}
</script>

<style scoped>
  .loader{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    margin-top: 10px;
  }
</style>
