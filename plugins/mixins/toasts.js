import Vue from 'vue'
Vue.mixin({
  methods: {
    myToastSuccess (body, title = '') {
      // this.$toastr.s(body, title);
      this.$toastr.Add({
        title,
        msg: body,
        type: 'success',
        timeout: 5000,
        classNames: ['animated fadeInUp'],
        onCreated () {
          setTimeout(() => {
            this.classNames.push('fadeOutRight')
          }, 4000)
        }
      })
      return true
    },
    myToastError (body, title = '') {
      // this.$toastr.e(body, title);
      this.$toastr.Add({
        title,
        msg: body,
        type: 'error',
        timeout: 8000,
        classNames: ['animated fadeInUp'],
        onCreated () {
          setTimeout(() => {
            this.classNames.push('fadeOutRight')
          }, 7000)
        }
      })
      return false
    },
    myToastWarning (body, title = '') {
      // this.$toastr.w(body, title);
      this.$toastr.Add({
        title,
        msg: body,
        type: 'warning',
        timeout: 8000,
        classNames: ['animated fadeInUp'],
        onCreated () {
          setTimeout(() => {
            this.classNames.push('fadeOutRight')
          }, 7000)
        }
      })
      return false
    },
    myToastInfo (body, title = '') {
      // this.$toastr.i(body, title);
      this.$toastr.Add({
        title,
        msg: body,
        type: 'info',
        timeout: 8000,
        classNames: ['animated fadeInUp'],
        onCreated () {
          setTimeout(() => {
            this.classNames.push('fadeOutRight')
          }, 7000)
        }
      })
    }
  }
})
