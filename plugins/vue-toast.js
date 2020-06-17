// This code will be injected before initializing the root App
import Vue from 'vue'
import VueToastr from 'vue-toastr'

const options = {
  defaultTimeout: 8000,
  defaultProgressBar: false,
  defaultCloseOnHover: false,
  clickClose: true
}

// Activate plugin
Vue.use(VueToastr, options)
