import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { compile } from '@vue/compiler-dom' // Importa compile de @vue/compiler-dom
import fs from 'fs';

// Configura las opciones del compilador
const compilerOptions = {
  // Tus opciones del compilador aquí
}

// Compila un componente de ejemplo usando las opciones del compilador
const exampleComponent = compile('<template><div></div></template>', compilerOptions)

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 443,
    https: {
      key: fs.readFileSync('./src/certs/key.pem'),
      cert: fs.readFileSync('./src/certs/cert.pem')
    },
    public: 'https://gravamenes-ui-qa.subtel.gob.cl'
  }

})