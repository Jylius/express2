import actions from './user/actions';
import mutations from './user/mutations';
import getters from './user/getters';

const state = {
  user: {},
  cities: [],
  districts: {},
  firstName: '',
  lastName: '',
  birthDate: '',
  gender: '',
  tcno: '',
  formattedPhone: '',
  email: '',
  selectedCity: '',
  selectedDistrict: '',
  address: '',

  //tcError
  //maxdate
  
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
