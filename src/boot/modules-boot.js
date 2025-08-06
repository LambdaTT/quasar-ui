// src/boot/modules.js
import { boot } from 'quasar/wrappers'

// glob genérico em todos os index.js dos módulos
const allModules = import.meta.globEager(
  '../modules/*/index.js'    // literal, relativo a este arquivo
)

export default boot(({ app }) => {
  Object.entries(allModules).forEach(async ([path, mod]) => {
    // 1) tenta named export
    const module = mod;
    let fn = module.autoWire;

    // 2) invoca se for função
    if (!!fn && typeof fn === 'function') {
      fn(app)
      console.log(`[boot] auto-wired module "${path}"`)
    }
  })

  console.log('⚡ componentes registrados:', Object.keys(app._context.components))
})
