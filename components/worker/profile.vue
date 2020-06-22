<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      transition="slide-x-transition"
      offset-x
      offset-y
    >
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              v-bind="attrs"
              icon
              large
              v-on="{ ...tooltip, ...menu }"
            >
              <avatar
                :username="User.name"
                :src="null"
                :size="32"
              />
            </v-btn>
          </template>
          <span>Mi perfil</span>
        </v-tooltip>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <avatar
              :username="User.name"
              :src="null"
              :size="35"
            />
            <v-list-item-content class="pl-3">
              <v-list-item-title>{{ User.name }}</v-list-item-title>
              <v-list-item-subtitle>Doctor</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :class="themeDark ? '' : 'orange--text'"
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="changeTheme"
                  >
                    <v-icon>mdi-{{ themeDark ? 'weather-night': 'weather-sunny' }}</v-icon>
                  </v-btn>
                </template>
                <span>Modo {{ themeDark ? 'oscuro': 'claro' }}</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="notification" color="purple" />
            </v-list-item-action>
            <v-list-item-title>Notificaciones</v-list-item-title>
          </v-list-item>
          <v-row
            align="center"
            justify="center"
            class="pt-5"
            style="height: 6rem;"
          >
            <v-col>
              <p class="text-center text--secondary">
                Mas detalles
              </p>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="logout">
              Cerrar sesión
            </v-btn>
          </v-card-actions>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
import worker from '../../plugins/apis/vety/worker'

export default {
  name: 'WorkerAvatar',
  components: {
    avatar: Avatar
  },
  data () {
    return {
      themeDark: true,
      menu: false,
      notification: true
    }
  },
  computed: {
    User () {
      return this.$auth.$state.user
    }
  },
  created () {
    this.themeDark = this.User.theme !== '0'
  },
  methods: {
    async logout () {
      try {
        await this.$auth.logout()
      } catch (errors) {
        // console.log(errors)
      }
    },
    async changeTheme () {
      try {
        this.themeDark = !this.themeDark
        this.$vuetify.theme.dark = this.themeDark
        await worker.setTheme(this.$axios, this.User.id, { theme: this.themeDark })
        // console.log('changed Theme', this.themeDark)
      } catch (errors) {
        console.log(errors)
      }
    }
  }
}
</script>

<style scoped>

</style>
