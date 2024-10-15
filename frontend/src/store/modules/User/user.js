import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
  user: {},
  cities: [],
  districts: {}
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
