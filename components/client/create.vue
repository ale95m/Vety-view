<template>
  <v-card>
    <v-card-title
      class="elevation-1 primaryTopBar"
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
          <ValidationObserver ref="observer">
            <v-form>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    lg="6"
                  >
                    <ValidationProvider v-slot="{ errors }" name="Nombre" rules="required">
                      <v-text-field
                        v-model="item.name"
                        type="text"
                        label="Nombre"
                        :error-messages="errors"
                      />
                    </ValidationProvider>
                  </v-col>

                  <v-col
                    cols="12"
                    lg="6"
                  >
                    <ValidationProvider v-slot="{ errors }" name="Apellidos" rules="required">
                      <v-text-field
                        v-model="item.last_name"
                        type="text"
                        label="Apellidos"
                        :error-messages="errors"
                        required
                      />
                    </ValidationProvider>
                  </v-col>

                  <v-col
                    cols="12"
                    lg="6"
                  >
                    <ValidationProvider v-slot="{ errors }" name="Sexo" rules="required">
                      <v-autocomplete
                        v-model="item.sex"
                        item-text="text"
                        item-value="value"
                        :error-messages="errors"
                        :items="[{text: 'masculino', value:'0'}, {text: 'femenino', value:'1'}]"
                        label="Sexo"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="6"
                  >
                    <ValidationProvider v-slot="{ errors }" name="Tarjeta de credito" rules="required|min:14">
                      <v-text-field
                        v-model="item.credit_card"
                        v-mask="'#### #### ####'"
                        :counter="12"
                        type="text"
                        :error-messages="errors"
                        label="Tarjeta de credito"
                        :counter-value="counterCredit_card"
                        required
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>
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
              @updateMain="updateMain()"
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
        Agregado: {{ item ? $moment(item.created_at).format('YYYY-MM-DD') : '' }}
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
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, min } from 'vee-validate/dist/rules'
import petsClient from '../pets/petsClient'
import client from '../../plugins/apis/vety/client'

extend('required', {
  ...required,
  message: '{_field_} no puede estar vacio'
})
extend('min', {
  ...min,
  message: '{_field_} debe contener 12 digitos'
})

// extend('required', required);

export default {
  name: 'Create',
  components: {
    petsClient,
    ValidationProvider,
    ValidationObserver
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
  computed: {
    CreditCard () {
      return this.item.credit_card ? this.item.credit_card.toString().replace(/\s/g, '') : 0
    }
  },
  created () {
    this.newClient = this.newItem
    if (!this.newClient) {
      this.item = JSON.parse(JSON.stringify(this.selectedItem))
    }
    // console.log(this.item)
  },
  methods: {
    counterCredit_card (value) {
      return this.item.credit_card ? this.CreditCard.length : 0
    },
    createItem () {
      this.$refs.observer.validate().then((success) => {
        if (!success) { return }
        client.create(this.$axios, {
          name: this.item.name,
          last_name: this.item.last_name,
          sex: this.item.sex,
          credit_card: this.CreditCard
        })
          .then((res) => {
            this.apiResponse(res)
            if (this.responseSuccessOrError()) {
              this.item = this.responseData()
              this.newClient = false
              this.updateMain()
              this.myToastSuccess('Cliente agregado correctamente')
              console.log(this.responseData())
            }
          })
          .catch((error) => {
            this.responseRequestError(error)
          })
      })
    },
    updateItem () {
      this.$refs.observer.validate().then((success) => {
        if (!success) { return }
        client.update(this.$axios, {
          id: this.item.id,
          name: this.item.name,
          last_name: this.item.last_name,
          sex: this.item.sex,
          credit_card: this.CreditCard
        })
          .then((res) => {
            this.apiResponse(res)
            if (this.responseSuccessOrError()) {
              this.item = this.responseData()
              this.updateMain()
              this.myToastSuccess('Cliente actualizado correctamente')
              console.log(this.responseData())
            }
          })
          .catch((error) => {
            this.responseRequestError(error)
          })
      })
    }
  }
}
</script>

<style scoped>

</style>
