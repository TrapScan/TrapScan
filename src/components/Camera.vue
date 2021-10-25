<template>
  <div>
    <div class="pt-4 background" id="reader" width="600px"></div>
  </div>
</template>

<script>
import { Html5QrcodeScanner } from 'html5-qrcode'
export default {
  data () {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null,
      reader: null
    }
  },
  computed: {
    validationPending () {
      return this.isValid === undefined && this.camera === 'off'
    },
    validationSuccess () {
      return this.isValid === true
    },
    validationFailure () {
      return this.isValid === false
    }
  },
  methods: {
    async onScanSuccess (decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      this.reader.pause()
      this.result = decodedText
      let code = this.result.split('/')
      code = code[code.length - 1]

      // TODO: Enter the stepper form, or make this step 1
      this.isValid = decodedText.startsWith('http')
      // some more delay, so users have time to read the message

      this.$store.dispatch('scanQR', { qr_id: code })

      await this.timeout(1000)
      this.reader.resume()
    },
    onScanFailure (error) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`)
    }
  },
  beforeDestroy () {
    this.reader.stop().then((ignore) => {
      // QR Code scanning is stopped.
    }).catch((err) => {
      console.err(err)
    })
  },
  mounted () {
    this.reader = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 }, rememberLastUsedCamera: true },
      /* verbose= */ false)
    this.reader.render(this.onScanSuccess, this.onScanFailure)
  }
}
</script>

<style scoped>

</style>
