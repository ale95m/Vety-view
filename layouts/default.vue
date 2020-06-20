<template>
  <v-app
    :style="{ background: currentTheme.background }"
  >
    <v-navigation-drawer
      v-model="drawer"
      :permanent="$vuetify.breakpoint.mdOnly"
      :clipped="$vuetify.breakpoint.mdAndUp"
      :floating="false"
      :mini-variant="$vuetify.breakpoint.mdOnly"
      :expand-on-hover="$vuetify.breakpoint.mdOnly"
      app
    >
      <v-divider />
      <v-list dense shaped>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              :to="child.to"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            :to="item.to"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
      dark
      app
      short
      :color="currentTheme.navBarColor"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-help-circle</v-icon>
          </v-btn>
        </template>
        <span>Ayuda</span>
      </v-tooltip>
      <v-toolbar-title>
        <span class="hidden-sm-and-down">Proyecto<span class="font-weight-bold"> Vety</span></span>
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Busqueda rapida"
      />
      <v-spacer />
      <notification />
      <profile />
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>

import profile from '../components/worker/profile'
import notification from '../components/worker/notification'

export default {
  components: {
    profile,
    notification
  },
  data () {
    return {
      miniVariant: false,
      dialog: false,
      drawer: null,
      items: [
        { icon: 'mdi-home', to: '/', text: 'Inicio' },
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          text: 'Clinica',
          model: true,
          children: [
            { icon: 'mdi-paw', to: '/clients/', text: 'Clientes & Mascotas' },
            { icon: 'mdi-storefront', text: 'Artículos & Conceptos' },
            { icon: 'mdi-barcode-scan', text: 'Tienda' },
            { icon: 'mdi-account-cash-outline', text: 'Cobrar deuda' },
            { icon: 'mdi-google-classroom', text: 'Sala de espera' },
            { icon: 'mdi-calendar-clock', to: '/calendar/', text: 'Agenda' }
          ]
        },
        { icon: 'mdi-cart', text: 'Compras' },
        { icon: 'mdi-cogs', text: 'Procesos' },
        { icon: 'mdi-bunk-bed', text: 'Hospitalización' },
        { icon: 'mdi-book', text: 'Facturación' },
        { icon: 'mdi-badge-account-horizontal', text: 'Documentos' },
        { icon: 'mdi-tune', text: 'Parametros' },
        { icon: 'mdi-tools', text: 'Utilidades' }
      ]
    }
  },
  computed: {
    currentTheme () {
      return this.$vuetify.theme.themes[this.$vuetify.theme.isDark ? 'dark' : 'light']
    }
  },
  beforeCreate () {
    this.$vuetify.theme.dark = !!this.$auth.$state.user.theme
  }
}
</script>
