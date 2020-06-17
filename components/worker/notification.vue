<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </template>
      <span>Notificaciones</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'Notification'
}
</script>

<style scoped>

</style>
