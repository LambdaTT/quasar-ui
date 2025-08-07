import { boot } from 'quasar/wrappers'
import { wireItUp } from 'src/lambdatt.js'

export default boot(({ app, router }) => {
  wireItUp(app, router)
})
