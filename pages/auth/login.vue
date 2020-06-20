<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
        lg="3"
      >
        <v-form v-model="valid" @submit.prevent="login">
          <v-card>
            <v-toolbar :color="currentTheme.navBarColor" dark>
              <h3 class="text-center">
                Proyecto Vety
              </h3>
            </v-toolbar>
            <v-container>
              <v-row
                align="center"
                justify="center"
              >
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="form.email"
                    :counter="10"
                    prepend-icon="mdi-account"
                    label="Email"
                    :rules="emailRules"
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="form.password"
                    :counter="10"
                    label="Password"
                    prepend-icon="mdi-lock"
                    append-icon="mdi-eye-off"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    @click:append="showPassword = !showPassword"
                  />
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-row
                align="center"
                justify="center"
              >
                <v-col cols="6" md="4">
                  <v-btn type="submit" width="100%" dark :color="currentTheme.navBarColor">
                    Entrar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import client from '../../plugins/apis/vety/client'

export default {
  name: 'Login',
  layout: 'clean',
  data () {
    return {
      valid: false,
      form: {
        email: '',
        password: ''
      },
      showPassword: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    currentTheme () {
      return this.$vuetify.theme.themes.dark
    }
  },
  created () {
    // console.log(this.$auth.$state)
  },
  methods: {
    async login () {
      try {
        const res = await this.$auth.login({ data: this.form })
        console.log(res)
        console.log(this.$auth.$state)
      } catch (errors) {
        // console.log(errors)
      }
    },
    async logout () {
      try {
        const res = await this.$auth.logout()
        console.log(res)
      } catch (errors) {
        // console.log(errors)
      }
    },
    async getClients () {
      try {
        const res = await client.getClients(this.$axios)
        console.log(res)
      } catch (errors) {
        // console.log(errors)
      }
    },
    async getUser () {
      try {
        const res = await this.$auth.fetchUser()
        console.log(res)
      } catch (errors) {
        // console.log(errors)
      }
    }
  }
}
</script>

<style scoped>

</style>
