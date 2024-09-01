import axios from 'axios'
import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        updateCategory: true,
        user: null
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (!state.user) {
                state.isMenuVisible = false
                return
            }
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }            
        },
        updateMenu(state){
            state.updateCategory = !state.updateCategory;
        },
        setUser(state, user) {
            state.user = user
            if (user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})
