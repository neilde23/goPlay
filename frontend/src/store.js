import { createStore } from 'vuex';

export default createStore({
    state: {
        userCredentials: JSON.parse(sessionStorage.getItem('userCredentials')) || null
    },
    mutations: {
        setUserCredentials(state, credentials) {
            state.userCredentials = credentials;
            sessionStorage.setItem('userCredentials', JSON.stringify(credentials));
        },
        removeUserCredentials(state) {
            state.userCredentials = null;
            sessionStorage.removeItem('userCredentials');
        },
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
