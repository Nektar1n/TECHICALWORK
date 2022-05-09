<template>
  <v-sheet
    :color="`black ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
    class="pa-3"
  >
    <v-skeleton-loader
      class="mx-auto"
      max-width="100%"
      type="table"
    ></v-skeleton-loader>
  </v-sheet>
</template>

<script>
export default {
  name:'TableLoader',
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
}
</script>

<style scoped>

</style>
