import { createStore } from 'vuex';

export default createStore({
    state: {
        userCredentials: null // Initialisation des informations d'identification de l'utilisateur à null
    },
    mutations: {
        setUserCredentials(state, credentials) {
            state.userCredentials = credentials;
        }
    },
    actions: {
        setUserCredentials({ commit }, credentials) {
            commit('setUserCredentials', credentials);
        }
    },
    getters: {
        getUserCredentials(state) {
            return state.userCredentials;
        }
    }
});
