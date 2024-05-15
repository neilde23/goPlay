import { getCurrentInstance } from 'vue';
import { createStore } from 'vuex';

export default createStore({
    state: {
        userCredentials: JSON.parse(sessionStorage.getItem('userCredentials')) || null,
        currentTeam: JSON.parse(sessionStorage.getItem('currentTeam')) || null
    },
    mutations: {
        setUserCredentials(state, credentials) {
            state.userCredentials = credentials;
            sessionStorage.setItem('userCredentials', JSON.stringify(credentials));
        },
        setCurrentTeam(state, team) {
            state.currentTeam = team;
            sessionStorage.setItem('currentTeam', JSON.stringify(team));
        },
        removeUserCredentials() {
            state.userCredentials = null;
            sessionStorage.removeItem('userCredentials');
        }
    },
    actions: {
        setUserCredentials({ commit }, credentials) {
            commit('setUserCredentials', credentials);
        },
        setCurrentTeam({ commit }, team) {
            commit('setCurrentTeam', team);
        },
    },
    getters: {
        getUserCredentials(state) {
            return state.userCredentials;
        },
        getCurrentTeam(state) {
            return state.currentTeam;
        }
    }
});
