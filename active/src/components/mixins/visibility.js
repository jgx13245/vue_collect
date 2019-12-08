const EVENT_NAME = 'popup-toast'

export default {
  model: {
    prop: 'visible',
    event: EVENT_NAME
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isVisible: false
    }
  },
  watch: {
    visible: {
      handler (newValue) {
        if (newValue) {
          this.show()
        } else {
          this.hide()
        }
      },
      immediate: true
    },
    isVisible (newValue) {
      this.$emit(EVENT_NAME, newValue)
    }
  },
  methods: {
    show () {
      this.isVisible = true
    },
    hide () {
      this.isVisible = false
    }
  }
}