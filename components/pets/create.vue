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
      <v-form @submit.prevent="onSubmit">
        <v-container>
          <v-row>
            <v-text-field
              v-model="item.name"
              class="ml-2 mr-2"
              type="text"
              label="Nombre"
            />
            <v-autocomplete
              v-model="item.sex"
              class="ml-2 mr-2"
              item-text="text"
              item-value="value"
              :items="[{text: 'masculino', value:'0'}, {text: 'femenino', value:'1'}]"
              label="Sexo"
            />
            <v-switch
              v-model="item.sterile"
              class="ml-2 mr-2"
              label="Esteril"
            />
          </v-row>
          <v-row>
            <v-autocomplete
              v-model="species_id"
              class="ml-2 mr-2"
              item-text="text"
              item-value="value"
              :items="species"
              label="Especie"
            />
            <v-autocomplete
              v-model="item.breed_id"
              class="ml-2 mr-2"
              item-text="text"
              item-value="value"
              :items="species"
              label="Raza"
            />
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
    </v-container>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        text
        type="onSubmit"
      >
        Guardar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import pet from '../../plugins/apis/vety/pet'

export default {
  name: 'Create',
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
    }
  },
  data () {
    return {
      item: {
        name: '',
        sex: '',
        client_id: '',
        breed_id: '',
        birthday: '',
        sterile: '',
        weight: '',
        ship: '',
        ship_at: '',
        nhc: '',
        census: '',
        character: '',
        diet: '',
        height: '',
        eyes: ''
      },
      species: [],
      menu: false,
      menuChip: false,
      species_id: ''
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  created () {
  },
  methods: {
    getSpecies () {

    },
    async createItem () {
      try {
        console.log(this.item)
        const res = await pet.create(this.$axios, this.item)
        console.log(res)
      } catch (errors) {
        // console.log(errors)
      }
    },
    updateItem () {
    },
    onSubmit () {
      console.log('ok')
      if (this.newItem) {
        this.createItem()
      } else {
        this.updateItem()
      }
    }
  }
}
</script>

<style scoped>

</style>
