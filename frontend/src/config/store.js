import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        isMenuVisible: false
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
            // console.log("toggle: ", state.isMenuVisible)
        }
    }
})
