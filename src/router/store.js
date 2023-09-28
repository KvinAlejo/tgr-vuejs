import { createStore } from 'vuex';

export default createStore({
    state: {
        email: "",
        user: null,
    },
    getters: {
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        login(state, email) {
            state.email = email;
            localStorage.setItem('email', email);
            alert('Loggeado')
        },
        logout(state) {
            state.email = "";
            localStorage.removeItem('email');
            alert("Fuera")
        },
        initializeStore(state) {
            if (localStorage.getItem('email')) {
                state.email = localStorage.getItem('email')
            }
        }
    },
    actions: {
        updateUser({ commit }, user) {
            commit('setUser', user);
        },
    },
    getters: {
        getUser(state) {
            return state.user;
        },
    },
    modules: {
    },
});
