// store/modules/user.js
import axios from 'axios';

const state = {
  firstName: '',
  lastName: '',
  birthDate: '',
  gender: '',
  formattedPhone: '',
  email: '',
  selectedCity: '',
  selectedDistrict: '',
  address: '',
  cities: [],
  districts: {},
  tcError: '',
  maxDate: ''
};

const getters = {
  getMaxDate: (state) => state.maxDate,
  getCities: (state) => state.cities,
  getDistricts: (state) => state.districts,
};

const mutations = {
  SET_FIRST_NAME(state, value) {
    state.firstName = value;
  },
  SET_LAST_NAME(state, value) {
    state.lastName = value;
  },
  SET_BIRTH_DATE(state, value) {
    state.birthDate = value;
  },
  SET_GENDER(state, value) {
    state.gender = value;
  },
  SET_PHONE(state, value) {
    state.formattedPhone = value;
  },
  SET_EMAIL(state, value) {
    state.email = value;
  },
  SET_SELECTED_CITY(state, value) {
    state.selectedCity = value;
  },
  SET_SELECTED_DISTRICT(state, value) {
    state.selectedDistrict = value;
  },
  SET_ADDRESS(state, value) {
    state.address = value;
  },
  SET_CITIES(state, cities) {
    state.cities = cities;
  },
  SET_DISTRICTS(state, { city, districts }) {
    state.districts[city] = districts;
  },
  SET_TC_ERROR(state, error) {
    state.tcError = error;
  },
  SET_MAX_DATE(state, maxDate) {
    state.maxDate = maxDate;
  }
};

const actions = {
  async fetchCities({ commit }) {
    try {
      const response = await axios.get('http://localhost:5000/api/iller');
      const cities = response.data.map(city => city.il);
      commit('SET_CITIES', cities);
    } catch (error) {
      console.error('Şehirler yüklenemedi:', error);
    }
  },
  async updateDistricts({ commit }, selectedCity) {
    try {
      if (selectedCity) {
        const response = await axios.get(`http://localhost:5000/api/iller/${selectedCity}`);
        commit('SET_DISTRICTS', { city: selectedCity, districts: response.data });
      }
    } catch (error) {
      console.error('İlçeler yüklenemedi:', error);
    }
  },
  async handleSubmit({ state }) {
    try {
      const formData = {
        firstName: state.firstName,
        lastName: state.lastName,
        birthDate: state.birthDate,
        gender: state.gender,
        phone: state.formattedPhone.replace(/\D/g, ''),
        tcno: state.tcno, // Ensure you add tcno to state if needed
        email: state.email,
        city: state.selectedCity,
        district: state.selectedDistrict,
        address: state.address,
      };
      const response = await axios.post('http://localhost:5000/api/users', formData);
      alert('Form başarıyla gönderildi! Yanıt: ' + response.data._id);
    } catch (error) {
      console.error('Form gönderilemedi:', error);
    }
  },
  setMaxDate({ commit }) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const maxDate = `${year}-${month}-${day}`;
    commit('SET_MAX_DATE', maxDate);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
