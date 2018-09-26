import Vue from 'vue'
import Vuex from 'vuex'

import mine from './modules/mine'
import publish from './modules/publish'
import about from './modules/about'
import home from './modules/home'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        mine,
        publish,
        about,
        home
    },
    static: debug
})
