import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { createStore } from 'vuex';
import { decodeCredential, googleLogout, googleOneTap, googleAuthCodeLogin, googleTokenLogin, googleSdkLoaded } from 'vue3-google-login'



const uuid = uuidv4();

export const useUserStore = defineStore('auth', {
  state: () => ({
    authUser: null,
    picture: null,
    email: null,
    domail: null,
    authToken: null,
    ususario: [],
    username: null

  }),
  getters: {
    user: (state) => state.authUser,
    token: (state) => state.authToken
  },
  actions: {
    async logout() {
      google.accounts.id.disableAutoSelect();
      googleLogout();
      //socket.close()
      //socket.disconnect();
      this.authUser = null,
        this.picture = null,
        this.email = null,
        this.domail = null,
        this.authToken = null,
        this.ususario = [],
        this.username = null,
        this.router.push('/')

    },
  },
  persist: true
});
