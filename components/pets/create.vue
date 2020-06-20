<template>
  <v-card>
    <v-card-title
      class="grey primaryTopBar"
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
      <ValidationObserver ref="observer">
        <v-form>
          <v-container>
            <v-row>
              <ValidationProvider v-slot="{ errors }" class="flex" name="Nombre" rules="required">
                <v-text-field
                  v-model="item.name"
                  class="ml-2 mr-2"
                  type="text"
                  label="Nombre"
                  :error-messages="errors"
                />
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" class="flex" name="Sexo" rules="required">
                <v-autocomplete
                  v-model="item.sex"
                  class="ml-2 mr-2"
                  item-text="text"
                  item-value="value"
                  :error-messages="errors"
                  :items="[{text: 'masculino', value:0}, {text: 'femenino', value:1}]"
                  label="Sexo"
                />
              </ValidationProvider>
              <v-switch
                v-model="item.sterile"
                class="ml-2 mr-2"
                label="Esteril"
              />
            </v-row>
            <v-row>
              <ValidationProvider v-slot="{ errors }" class="flex" name="Especies" rules="required">
                <v-select
                  v-model="species_id"
                  class="ml-2 mr-2"
                  item-text="name"
                  item-value="id"
                  :items="speciesOfAnimals"
                  label="Especie"
                  :error-messages="errors"
                  @change="item.breed_id = null"
                />
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" class="flex" name="Raza" rules="required">
                <v-select
                  v-model="item.breed_id"
                  class="ml-2 mr-2"
                  item-text="name"
                  item-value="id"
                  :items="Breeds"
                  label="Raza"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-row>
            <v-row>
              <v-menu
                ref="menu"
                v-model="menu"
                class="ml-2 mr-2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="item.birthday"
                    label="Fecha nacimento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="item.birthday"
                  day-format="YYYY-MM-DD"
                  no-title
                  scrollable
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                >
                  <v-spacer />
                  <v-btn text color="primary" @click="menu = false">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <v-text-field
                v-model="item.weight"
                class="ml-2 mr-2"
                type="numeric"
                label="Peso"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="item.chip"
                class="ml-2 mr-2"
                type="text"
                label="Chip"
              />
              <v-menu
                ref="menu"
                v-model="menuChip"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="item.ship_at"
                    label="Fecha"
                    prepend-icon="mdi-calendar"
                    day-format="YYYY-MM-DD"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="item.ship_at" no-title scrollable>
                  <v-spacer />
                  <v-btn text color="primary" @click="menuChip = false">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-row>
            <v-row>
              <v-text-field
                v-model="item.nhc"
                class="ml-2 mr-2"
                type="text"
                label="Nhc"
              />
              <v-text-field
                v-model="item.census"
                class="ml-2 mr-2"
                type="text"
                label="Census"
              />
              <v-text-field
                v-model="item.character"
                class="ml-2 mr-2"
                type="text"
                label="Carácter"
              />
              <v-text-field
                v-model="item.chip"
                class="ml-2 mr-2"
                type="text"
                label="Chip"
              />
              <v-text-field
                v-model="item.diet"
                class="ml-2 mr-2"
                type="text"
                label="Dieta"
              />
              <v-text-field
                v-model="item.height"
                class="ml-2 mr-2"
                type="text"
                label="Altura"
              />
              <v-text-field
                v-model="item.eyes"
                class="ml-2 mr-2"
                type="text"
                label="Ojos"
              />
            </v-row>
          </v-container>
        </v-form>
      </ValidationObserver>
    </v-container>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <p v-if="!newItem" class="text--primary mb-0 mr-6 mt-1">
        Agregada: {{ item ? $moment(item.created_at).format('YYYY-MM-DD') : '' }}
      </p>
      <v-btn
        v-if="!newItem"
        color="primary"
        text
        @click="updateItem"
      >
        Actualizar mascota
      </v-btn>
      <v-btn
        v-else
        color="primary"
        text
        @click="createItem"
      >
        agregar mascota
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import pet from '../../plugins/apis/vety/pet'
import { eventBus } from '../../eventBus'

extend('required', {
  ...required,
  message: '{_field_} no puede estar vacio'
})

export default {
  name: 'Create',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    title: {
      type: String,
      default: 'Nueva mascota'
    },
    newItem: {
      type: Boolean,
      default: true
    },
    selectedItem: {
      type: Object,
      default: () => {
      }
    },
    clientId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      item: {
        name: null,
        sex: null,
        client_id: null,
        breed_id: null,
        birthday: null,
        sterile: false,
        weight: null,
        ship: null,
        ship_at: null,
        nhc: null,
        census: null,
        character: null,
        diet: null,
        height: null,
        eyes: null
      },
      speciesOfAnimals: [],
      menu: false,
      menuChip: false,
      species_id: ''
    }
  },
  computed: {
    Breeds () {
      const data = this.speciesOfAnimals.filter(x => x.id === this.species_id)
      return data.length > 0 ? data[0].breeds : []
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  created () {
    if (!this.newItem) {
      this.item = JSON.parse(JSON.stringify(this.selectedItem))
    }
    this.getSpecies()
  },
  methods: {
    itemReady (item, excludes = ['created_at', 'updated_at']) {
      const result = {}
      for (const [key, value] of Object.entries(item)) {
        if ((value || value === false) && !excludes.includes(key)) {
          result[key] = value
        }
      }
      console.log(result)
      return result
    },
    getSpecies () {
      pet.getSpecies(this.$axios)
        .then((res) => {
          this.apiResponse(res)
          if (this.responseSuccessOrError()) {
            this.speciesOfAnimals = this.responseData()
            if (!this.newItem) {
              const specie = this.speciesOfAnimals.filter(x => x.breeds.filter(y => y.id === this.item.breed_id).length > 0)
              this.species_id = specie.length ? specie[0].id : 0
            }
          }
        })
        .catch((error) => {
          this.responseRequestError(error)
        })
    },
    createItem () {
      this.$refs.observer.validate().then((success) => {
        if (!success) {
          return
        }
        const data = this.itemReady(this.item)
        data.client_id = this.clientId
        console.log(data)
        pet.create(this.$axios, data)
          .then((res) => {
            this.apiResponse(res)
            if (this.responseSuccessOrError()) {
              this.closeModal()
              this.updateMain()
              eventBus.$emit('createClient', 'newPet')
              this.myToastSuccess('Mascota agregada correctamente')
            }
          })
          .catch((error) => {
            this.responseRequestError(error)
          })
      })
    },
    updateItem () {
      this.$refs.observer.validate().then((success) => {
        if (!success) {
          return
        }
        pet.update(this.$axios, this.item)
          .then((res) => {
            this.apiResponse(res)
            if (this.responseSuccessOrError()) {
              this.closeModal()
              this.updateMain()
              this.myToastSuccess('Mascota agregado correctamente')
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
