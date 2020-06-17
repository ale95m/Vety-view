<template>
  <div>
    <div class="mt-5 ml-5 mr-5 mb-5">
      <v-sheet
        tile
        height="54"
        class="d-flex m-12"
      >
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.prev()"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-select
          v-model="type"
          :items="types"
          item-text="text"
          item-value="value"
          dense
          outlined
          hide-details
          class="ma-2"
          label="Vista"
        />
        <v-select
          v-model="mode"
          :items="modes"
          dense
          outlined
          hide-details
          label="event-overlap-mode"
          class="ma-2"
        />
        <v-select
          v-model="weekday"
          :items="weekdays"
          dense
          outlined
          hide-details
          label="weekdays"
          class="ma-2"
        />
        <v-spacer />
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.next()"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          @change="getEvents"
        />
      </v-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data: () => ({
    type: 'month',
    types: [
      { value: 'month', text: 'mes' },
      { value: 'week', text: 'semana' },
      { value: 'day', text: 'día' },
      { value: '4day', text: 'proximos días' }
    ],
    mode: 'stack',
    modes: [
      { value: 'stack', text: 'cola' },
      { value: 'column', text: 'columnas' }
    ],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: 'Domingo - Sabado', value: [0, 1, 2, 3, 4, 5, 6] },
      { text: 'Lunes - Domingo', value: [1, 2, 3, 4, 5, 6, 0] },
      { text: 'Lunes - Viernes', value: [1, 2, 3, 4, 5] },
      { text: 'Lunes, Miercoles, Viernes', value: [1, 3, 5] }
    ],
    value: '',
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Reunión', 'Cumple años', 'Consulta', 'Otros asuntos', 'Peluquería', 'Cirugía', 'Conferencía', 'Pesquisa']
  }),
  methods: {
    getEvents ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        })
      }

      this.events = events
    },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    formatDate (a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
    }
  }
}
</script>

<style scoped>

</style>
