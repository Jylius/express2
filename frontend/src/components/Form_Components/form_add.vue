<template lang="tr">
    <div class="form-container">
      <h2>Başvuru Formu</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="isim">İsim</label>
          <input type="text" id="isim" v-model="userData.firstName" @input="setUserData({ firstName: userData.firstName })" placeholder="İsim" required />
        </div>
        <div class="form-group">
          <label for="soyisim">Soyisim</label>
          <input type="text" id="soyisim" v-model="userData.lastName" @input="setUserData({ lastName: userData.lastName })" placeholder="Soyisim" required />
        </div>
        <div class="form-group">
          <label for="dogum-tarihi">Doğum Tarihi</label>
          <input type="date" id="dogum-tarihi" v-model="userData.birthDate" :max="userData.maxDate" @input="validateDate" required />
        </div>
        <div class="form-group">
          <label>Cinsiyet</label>
          <div class="radio-group">
            <label>
              <input type="radio" name="cinsiyet" value="erkek" v-model="userData.gender" required @change="setUserData({ gender: userData.gender })" /> Erkek
            </label>
            <label>
              <input type="radio" name="cinsiyet" value="kadin" v-model="userData.gender" required @change="setUserData({ gender: userData.gender })" /> Kadın
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="tcno">TC Kimlik No</label>
          <input type="text" id="tcno" v-model="userData.tcno" placeholder="TC Kimlik No" maxlength="11" required @input="validateTCNo" />
          <span v-if="userData.tcError" class="error">{{ userData.tcError }}</span>
        </div>
        <div class="form-group">
          <label for="telefon">Telefon</label>
          <input type="text" id="telefon" v-model="userData.formattedPhone" @input="formatPhone(userData.formattedPhone)" placeholder="(555) 123 4567" maxlength="14" required />
        </div>
        <div class="form-group">
          <label for="email">E-posta</label>
          <input type="email" id="email" v-model="userData.email" placeholder="E-posta" required @input="setUserData({ email: userData.email })" />
        </div>
  
        <div class="form-group">
          <label for="sehir">Şehir</label>
          <select id="sehir" v-model="userData.selectedCity" @change="updateDistricts(userData.selectedCity)" required>
            <option value="" disabled>Şehir Seçin</option>
            <option v-for="city in userData.cities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="ilce">İlçe</label>
          <select id="ilce" v-model="userData.selectedDistrict" required>
            <option value="" disabled>İlçe Seçin</option>
            <option v-for="district in userData.districts[userData.selectedCity]" :key="district" :value="district">{{ district }}</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="adres">Adres</label>
          <input type="text" id="adres" v-model="userData.address" placeholder="Adres" required @input="setUserData({ address: userData.address })" />
        </div>
        <button type="submit" class="submit-button">Gönder</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters('user', ['getUserData']),
      userData() {
        return this.getUserData;
      }
    },
    mounted() {
      this.fetchCities();
      this.setMaxDate();
    },
    methods: {
      ...mapActions('user', [
        'fetchCities', 
        'updateDistricts', 
        'setUserData', 
        'setTCError', 
        'validateTCNo', 
        'formatPhone', 
        'handleSubmit', 
      ])
    }
  };
  </script>
  


<style scoped>
.form-container {
    background-color: #fff;
    color: #333;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
h2 {
    text-align: center;
    margin-bottom: 20px;
}
.form-group {
    margin-bottom: 15px;
}
label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}
input[type="text"],
input[type="tel"],
input[type="email"],
input[type="date"],
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
}
input[type="radio"] {
    margin-right: 5px;
}
.radio-group {
    display: flex;
    justify-content: space-between;
}
.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}
.submit-button:hover {
    background-color: #0056b3;
}
</style>
