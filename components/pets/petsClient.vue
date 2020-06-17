<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title class="hidden-md-and-down">
        Mascotas
      </v-toolbar-title>
      <v-divider
        class="mx-4 hidden-md-and-down"
        inset
        vertical
      />
      <v-spacer />
      <v-text-field
        v-model="filter"
        append-icon="mdi-magnify"
        label="Buscar mascota"
        single-line
        hide-details
      />
      <v-btn
        color="primary"
        dark
        class="ml-3"
        @click="newItem"
      >
        <v-icon>mdi-plus</v-icon>
        <v-icon>mdi-dog-side</v-icon>
        <span class="ml-1 hidden-md-and-down">Mascota</span>
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="fields"
      :items="items"
      item-key="id"
      disable-pagination
      :hide-default-footer="true"
      class="elevation-1"
    >
      <template v-slot:item.last_visit="{ item }">
        {{ $moment(item.last_visit).format('YYYY-MM-DD') }}
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ $moment(item.created_at).format('YYYY-MM-DD') }}
      </template>
      <template v-slot:item.level="{ item }">
        <v-rating v-model="item.level" dense small readonly color="primary" />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              class="mr-1"
              v-bind="attrs"
              v-on="on"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              class="mr-1"
              v-bind="attrs"
              @click="removeItem(item)"
              v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Dar de baja</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              v-bind="attrs"
              v-on="on"
              @click="removeItem(item)"
            >
              mdi-eye
            </v-icon>
          </template>
          <span>Historia clínica</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog
      v-model="modal"
      :max-width="'900px'"
    >
      <create
        :title="title"
        :selected-item="selectedItem"
        @closeModal="modal = false"
      />
    </v-dialog>
  </div>
</template>

<script>

import create from './create'

export default {
  name: 'PetsClient',
  components: {
    create
  },
  props: {
    client: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      modal: false,
      selectedItem: null,
      title: 'Nueva mascota',
      items: [],
      filter: [],
      fields: [
        { text: 'Nombre', value: 'name' },
        { text: 'Especie', value: 'specie' },
        { text: 'Raza', value: 'breed' },
        { text: 'Carácter', value: 'character' },
        { text: 'Opciones', value: 'actions', sortable: false }
      ]
    }
  },
  created () {
    console.log(this.client)
  },
  methods: {
    newItem () {
      this.title = 'Nueva mascota'
      this.selectedItem = null
      this.modal = true
    },
    editItem (item) {
      this.title = 'Editar mascota'
      this.selectedItem = item
      this.modal = true
    },
    removeItem (item) {

    }
  }
}
</script>

<style scoped>

</style>
