import { createStore } from 'vuex'
import user from './modules/user'
import anime from './modules/anime'
export default createStore({

  modules: {
    user,
    anime
  }
})
