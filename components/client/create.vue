<template>
  <v-card>
    <v-card-title
      class="grey lighten-2"
      primary-title
    >
      <span>{{ title }}</span>
      <v-spacer />
      <v-btn
        icon
        @click="closeModal"
      >
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-card-title>
    <v-container>
      <v-row>
        <v-col sm="12" md="4">
          <v-form>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  lg="6"
                >
                  <v-text-field
                    v-model="item.name"
                    type="text"
                    label="Nombre"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="6"
                >
                  <v-text-field
                    v-model="item.last_name"
                    type="text"
                    label="Apellidos"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="6"
                >
                  <v-autocomplete
                    v-model="item.sex"
                    item-text="text"
                    item-value="value"
                    :items="[{text: 'masculino', value:false}, {text: 'femenino', value:true}]"
                    label="Sexo"
                  />
                </v-col>
                <v-col
                  cols="12"
                  lg="6"
                >
                  <v-text-field
                    v-model="item.credit_card"
                    type="text"
                    :counter="10"
                    label="Tarjeta de credito"
                    required
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
        <v-divider
          class="mx-4 hidden-sm-and-down"
          inset
          vertical
        />
        <v-col cols="12" md="7">
          <v-container>
            <pets-client
              v-if="!newClient"
              :client="item"
            />
            <v-row
              v-else
              align="center"
              justify="center"
            >
              <v-col sm="4" class="text-center text--secondary">
                <v-icon x-large>
                  mdi-paw
                </v-icon>
                <p class="headline mt-3">
                  Mascotas
                </p>
              </v-col>
              <p class="text-center text--secondary">
                Para habilitar esta sección primero debe rellenar los datos del cliente y crearlo
              </p>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <p v-if="!newClient" class="text--primary mb-0 mr-6 mt-1">
        Creado: {{ item ? $moment(item.created_at).format('YYYY-MM-DD') : '' }}
      </p>
      <v-btn
        v-if="!newClient"
        color="primary"
        text
        @click="updateItem"
      >
        Actualizar cliente
      </v-btn>
      <v-btn
        v-else
        color="primary"
        text
        @click="createItem"
      >
        crear cliente
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import petsClient from '../pets/petsClient'
import client from '../../plugins/apis/vety/client'

export default {
  name: 'Create',
  components: {
    petsClient
  },
  props: {
    title: {
      type: String,
      default: 'Nuevo cliente'
    },
    newItem: {
      type: Boolean,
      default: true
    },
    selectedItem: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      newClient: true,
      item: {
        name: null,
        last_name: null,
        sex: null,
        credit_card: null
      }
    }
  },
  created () {
    this.newClient = this.newItem
    if (!this.newClient) { this.item = JSON.parse(JSON.stringify(this.selectedItem)) }
  },
  methods: {
    createItem () {
      // this.$toastr('success', 'i am a toastr success', 'hello')
      this.myToastSuccess('car')
      client.create(this.$axios, this.item)
        .then((res) => {
          this.apiResponse(res)
          if (this.responseSuccessOrError()) {
            this.item = this.responseData()
            this.newClient = false
            this.updateMain()
            console.log(this.responseData())
          }
        })
        .catch((error) => {
          this.responseRequestError(error)
        })
    },
    async updateItem () {
      try {
        this.apiResponse(await client.update(this.$axios, this.item))
        this.item = this.responseData()
        this.updateMain()
        console.log(this.responseData())
      } catch (errors) {
        console.log('myErrors' + errors)
      }
    }
  }
}
</script>

<style scoped>

</style>
