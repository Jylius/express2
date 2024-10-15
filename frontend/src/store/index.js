import { createStore } from 'vuex'
import user from './modules/User/user'
export default createStore({

  modules: {
    user
  }
})
