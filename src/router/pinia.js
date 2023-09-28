import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user
      console.log('setUser action called:', this.user)
    },
  },
})