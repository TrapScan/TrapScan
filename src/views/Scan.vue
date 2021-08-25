<template>
  <div>
    <v-btn elevation="2" value="form" to="/form">
      <span>Go to Inspection Form</span>
    </v-btn>
    <br>
    <v-btn elevation="2" value="installform" to="/installform">
      <span>Go to Installation Form</span>
    </v-btn>
    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>
    <qrcode-stream
      key="trapscan"
      :camera="camera"
      @decode="onDecode"
      @init="onInit"
      :track="paintOutline"
    >
      <div v-if="validationSuccess" class="validation-success">
        This is a URL
      </div>

      <div v-if="validationFailure" class="validation-failure">
        This is NOT a URL!
      </div>

      <div v-if="validationPending" class="validation-pending">
        Checking QR Code...
      </div>
    </qrcode-stream>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null
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
    goToForm () {
      this.$router.push('/form')
    },
    goToInstallationForm () {
      this.$router.push('/installform')
    },
    onInit (promise) {
      promise.catch(console.error).then(this.resetValidationState)
    },

    resetValidationState () {
      this.isValid = undefined
    },

    async onDecode (content) {
      this.result = content
      let code = this.result.split('/')
      code = code[code.length - 1]
      console.log(code)

      this.turnCameraOff()

      // TODO: Enter the stepper form, or make this step 1
      this.isValid = content.startsWith('http')
      // some more delay, so users have time to read the message
      await this.timeout(1000)

      this.$store.dispatch('scanQR', { qr_id: code })

      this.turnCameraOn()
    },

    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    },
    paintOutline (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    },

    paintBoundingBox (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
      }
    },

    paintCenterText (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode

        const centerX = boundingBox.x + boundingBox.width / 2
        const centerY = boundingBox.y + boundingBox.height / 2

        const fontSize = Math.max(
          12,
          (50 * boundingBox.width) / ctx.canvas.width
        )
        console.log(boundingBox.width, ctx.canvas.width)

        ctx.font = `bold ${fontSize}px sans-serif`
        ctx.textAlign = 'center'

        ctx.lineWidth = 3
        ctx.strokeStyle = '#35495e'
        ctx.strokeText(detectedCode.rawValue, centerX, centerY)

        ctx.fillStyle = '#5cb984'
        ctx.fillText(rawValue, centerX, centerY)
      }
    }
  }
}
</script>
<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>
