<template>
  <v-dialog
    v-model="modal"
    :max-width="$vuetify.breakpoint.smAndDown ? null : '85%'"
  >
    <slot />
  </v-dialog>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style scoped>

</style>
