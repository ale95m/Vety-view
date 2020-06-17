<template>
  <v-app :style="{ background: currentTheme.background }">
    <nuxt />
  </v-app>
</template>

<script>
export default {
  name: 'Clean',
  computed: {
    currentTheme () {
      return this.$vuetify.theme.themes.dark
    }
  }
}
</script>

<style scoped>

</style>
