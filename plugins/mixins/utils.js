import Vue from 'vue'
Vue.mixin({
  methods: {
    onlyArrayIds (array, value) {
      return array.map(function (obj) {
        return obj.id
      })
    },
    secondsToTime (seconds) {
      const pad = function (num, size) {
        return ('0000' + num).slice(size * -1)
      }
      const time = parseFloat(seconds).toFixed(3)
      const hours = Math.floor(time / 60 / 60)
      const minutes = Math.floor(time / 60) % 60
      const second = Math.floor(time - minutes * 60)
      let size = 2
      if (hours > 999) { size = 4 } else if (hours > 99) { size = 3 }
      return pad(hours, size) + ':' + pad(minutes, 2) + ':' + pad(second, 2)
      // return moment.utc(seconds * 1000).format("HH:mm");
    },
    timeToSeconds (time) {
      const a = time.split(':') // HH:MM:SS
      if (time.length === 8) { return +((+a[0]) * 3600 + (+a[1]) * 60 + (+a[2])) } else { return +((+a[0]) * 60 + (+a[1])) }
    },
    roundMoney (money) {
      return '$ ' /* + _.round(money, 2) */
    },
    closeModal () {
      this.$emit('closeModal')
    },
    getNumber (value) {
      return +value
    },
    updateMain () {
      this.$emit('updateMain')
    },
    percentTo100 (percent) {
      return (percent * 100).toFixed(0)
    },
    valueToFixed1 (value) {
      return (value * 1).toFixed(1)
    },
    isThisEmpty (data) {
      return Object.keys(data).length === 0
    },
    percentToDecimal (percent) {
      return percent / 100
    }
  }
})
