// src/store/modules/user.js
import axios from 'axios';

const state = {
  firstName: '',
  lastName: '',
  birthDate: '',
  gender: '',
  email: '',
  selectedCity: '',
  selectedDistrict: '',
  address: '',
  cities: [],
  districts: {},
  tcno: '',
  tcError: '',
  formattedPhone: '',
};

const mutations = {
  SET_USER_DATA(state, payload) {
    Object.assign(state, payload);
  },
  SET_TC_ERROR(state, error) {
    state.tcError = error;
  },
  SET_CITIES(state, cities) {
    state.cities = cities;
  },
  SET_DISTRICTS(state, { city, districts }) {
    state.districts[city] = districts;
  },
  SET_MAX_DATE(state, maxDate) {
    state.maxDate = maxDate;
  }
};

const actions = {
  async fetchCities({ commit }) {
    try {
      const response = await axios.get('http://localhost:5000/api/iller');
      commit('SET_CITIES', response.data.map(city => city.il));
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
  validateTCNo({ commit }, tcno) {
    let error = '';
    if (tcno.length !== 11) {
      error = 'TC Kimlik No 11 haneli olmalıdır.';
    } else if (!this.tcKimlikKontrol(tcno)) {
      error = 'Geçersiz TC Kimlik No.';
    }
    commit('SET_TC_ERROR', error);
  },
  setUserData({ commit }, payload) {
    commit('SET_USER_DATA', payload);
  },
  setMaxDate({ commit }) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const maxDate = `${year}-${month}-${day}`;
    commit('SET_MAX_DATE', maxDate);
  },
  formatPhone({ commit }, formattedPhone) {
    let cleaned = formattedPhone.replace(/\D/g, '');
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      cleaned = `(${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
    }
    commit('SET_USER_DATA', { formattedPhone: cleaned });
  },
  tcKimlikKontrol(_, tcKimlik) {
    if (!/^\d+$/.test(tcKimlik)) return false;

    tcKimlik = tcKimlik.trim().replace(/^0+/, '');

    if (tcKimlik.length !== 11) return false;

    let tekBasamaklar = 0;
    let ciftBasamaklar = 0;

    for (let i = 0; i <= 8; i += 2) tekBasamaklar += parseInt(tcKimlik[i]);
    for (let i = 1; i <= 7; i += 2) ciftBasamaklar += parseInt(tcKimlik[i]);

    if (((7 * tekBasamaklar) - ciftBasamaklar) % 10 !== parseInt(tcKimlik[9])) return false;

    let toplam = 0;
    for (let i = 0; i <= 9; i++) toplam += parseInt(tcKimlik[i]);

    return toplam % 10 === parseInt(tcKimlik[10]);
  },
  async handleSubmit({ state }) {
    try {
      const formData = {
        firstName: state.firstName,
        lastName: state.lastName,
        birthDate: state.birthDate,
        gender: state.gender,
        phone: state.formattedPhone.replace(/\D/g, ''),
        tcno: state.tcno,
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
  }
};

const getters = {
  getUserData(state) {
    return {
      firstName: state.firstName,
      lastName: state.lastName,
      birthDate: state.birthDate,
      gender: state.gender,
      email: state.email,
      selectedCity: state.selectedCity,
      selectedDistrict: state.selectedDistrict,
      address: state.address,
      cities: state.cities,
      districts: state.districts,
      tcno: state.tcno,
      tcError: state.tcError,
      formattedPhone: state.formattedPhone
    };
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
