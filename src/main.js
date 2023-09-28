import { createApp,markRaw } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/router";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import vue3GoogleLogin from 'vue3-google-login'
import { createPinia } from 'pinia'; // Importa createPinia

const app = createApp(App)
const pinia = createPinia();
pinia.use(({store})=>{
  store.router = markRaw(router)
})

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)


app.use(vue3GoogleLogin, {
  clientId: '1011770131038-0tgagmepfpi070rqbmo6obm6i4kln842.apps.googleusercontent.com',
  //scope: 'email', prompt: 'consent', fetch_basic_profile: false
})

app.mount("#app");
