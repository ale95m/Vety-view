import Vue from 'vue'
Vue.mixin({
  data () {
    return {
      res: {}
    }
  },
  methods: {
    apiResponse (res) {
      this.res = res
    },
    responseSuccess () {
      return this.res.data.status === 'success'
    },
    responseMessage () {
      return this.res.data.message
    },
    responseData () {
      return JSON.parse(this.res.data.data)
    },
    responseSuccessOrError () {
      if (this.responseSuccess()) { return true } else { this.responseMessageError() }
    },
    responseRequestError (error) {
      const errors = error.response.data.errors
      Object.keys(errors).forEach(
        key => this.myToastError(errors[key], error.response.status)
      )
    },
    responseMessageError () {
      this.myToastError(this.responseMessage())
    }
  }
})
