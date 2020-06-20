<template>
  <v-container>
    <v-toolbar flat color="transparent">
      <v-toolbar-title class="hidden-sm-and-down">
        Clientes
      </v-toolbar-title>
      <v-divider
        class="mx-4 hidden-sm-and-down"
        inset
        vertical
      />
      <v-spacer />
      <v-text-field
        v-model="filter"
        append-icon="mdi-magnify"
        label="Buscar clientes"
        single-line
        hide-details
      />
      <v-btn
        color="primary"
        dark
        class="ml-3"
        @click="createItem"
      >
        <v-icon>mdi-account-plus</v-icon>
        <span class="ml-1 hidden-sm-and-down">Cliente</span>
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col />
    </v-row>
    <v-data-table
      :headers="fields"
      :items="items"
      item-key="id"
      :items-per-page="10"
      class="elevation-1 secondaryBackground"
      :search="filter"
    >
      <template v-slot:item.pets="{ item }">
        {{ petsFields(item.pets) }}
      </template>
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
              @click="myToastInfo('Funcionalidad aún no programada')"
            >
              mdi-eye
            </v-icon>
          </template>
          <span>Ver</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog
      v-model="modal"
      :max-width="$vuetify.breakpoint.smAndDown ? null : '85%'"
    >
      <create
        v-if="modal"
        :title="title"
        :new-item="newItem"
        :selected-item="selectedItem"
        @updateMain="getClients"
        @closeModal="modal = false"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import client from '../../plugins/apis/vety/client'
import create from '../../components/client/create'
import { eventBus } from '../../eventBus'

export default {
  name: 'Index',
  components: {
    create
  },
  async asyncData ({ $axios }) {
    try {
      const res = await client.getClients($axios)
      return {
        apiData: JSON.parse(res.data.data)
      }
    } catch (errors) {
      console.log(errors)
    }
  },
  data () {
    return {
      modal: false,
      items: [],
      speciesOfAnimals: [],
      newItem: true,
      selectedItem: null,
      title: 'Nuevo cliente',
      filter: '',
      expanded: [],
      fields: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        { text: 'Mascotas', value: 'pets' },
        { text: 'Visitas', value: 'visits' },
        { text: 'Última visita', value: 'last_visit' },
        { text: 'Fecha de alta', value: 'created_at' },
        { text: 'Deuda', value: 'expense' },
        { text: 'Nivel', value: 'level' },
        { text: 'Opciones', value: 'actions', sortable: false }
      ]
    }
  },
  created () {
    eventBus.$on('createClient', (data) => {
      if (data) {
        // console.log('me LLame dentro OK')
        this.getClients()
      }
      // console.log('me LLame')
    })
    this.items = this.apiData
  },
  methods: {
    petsFields (pets) {
      let result = ''
      pets.forEach((item) => { result += item.name + ',' })
      if (result.length > 0) { result = result.slice(0, result.length - 1) }
      return result
    },
    async getClients () {
      try {
        this.apiResponse(await client.getClients(this.$axios))
        this.items = this.responseData()
        console.log('result', this.responseData())
      } catch (errors) {
        console.log(errors)
      }
    },
    createItem () {
      this.title = 'Nuevo cliente'
      this.newItem = true
      this.modal = !this.modal
    },
    editItem (item) {
      this.title = 'Actualizar cliente'
      this.newItem = false
      this.selectedItem = item
      this.modal = !this.modal
    },
    async removeItem (item) {
      const res = await this.$confirm('Desea dar de baja al cliente ' + item.name + ' ' + item.last_name,
        {
          icon: 'mdi-calendar'
        })
      if (res) {
        try {
          await client.remove(this.$axios, item)
          this.myToastSuccess('cliente dado de baja correctamente')
          await this.getClients()
        } catch (errors) {
          console.log('myErrors' + errors)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
