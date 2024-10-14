<template lang="tr">
    <div class="form-container">
        <h2>Başvuru Formu</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="isim">İsim</label>
                <input type="text" id="isim" v-model="firstName" @input="validateName('firstName')" placeholder="İsim" required />
            </div>
            <div class="form-group">
                <label for="soyisim">Soyisim</label>
                <input type="text" id="soyisim" v-model="lastName" @input="validateName('lastName')" placeholder="Soyisim" required />
            </div>
            <div class="form-group">
                <label for="dogum-tarihi">Doğum Tarihi</label>
                <input type="date" id="dogum-tarihi"  v-model="birthDate" :max="maxDate" @input="validateDate" required />
            </div>
            <div class="form-group">
                <label>Cinsiyet</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="cinsiyet" value="erkek" v-model="gender" required /> Erkek
                    </label>
                    <label>
                        <input type="radio" name="cinsiyet" value="kadin" v-model="gender" required /> Kadın
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label for="tcno">TC Kimlik No</label>
                <input type="text" id="tcno" v-model="tcno" placeholder="TC Kimlik No" maxlength="11" required @input="validateTCNo" />
                <span v-if="tcError" class="error">{{ tcError }}</span>
            </div>
            <div class="form-group">
                <label for="telefon">Telefon</label>
                <input type="tel" id="telefon" v-model="formattedPhone" @input="formatPhone" placeholder="(555) 123 4567" maxlength="14" required />
            </div>
            <div class="form-group">
                <label for="email">E-posta</label>
                <input type="email" id="email" v-model="email" placeholder="E-posta" required />
            </div>

            <div class="form-group">
                <label for="sehir">Şehir</label>
                <select id="sehir" v-model="selectedCity" @change="updateDistricts" required>
                    <option value="" disabled>Şehir Seçin</option>
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="ilce">İlçe</label>
                <select id="ilce" v-model="selectedDistrict" required>
                    <option value="" disabled>İlçe Seçin</option>
                    <option v-for="district in districts[selectedCity]" :key="district" :value="district">{{ district }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="adres">Adres</label>
                <input type="text" id="adres" v-model="address" placeholder="Adres" required />
            </div>
            <button type="submit" class="submit-button">Gönder</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
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
            tcError:""
        };
    },
    mounted(){
        this.fetchCities();
        this.setMaxDate();
    },
    methods: {
        validateTCNo() {
            if (this.tcno.length !== 11) {
                this.tcError = 'TC Kimlik No 11 haneli olmalıdır.';
                return false;
            }
            this.tcError = this.tcKimlikKontrol(this.tcno) ? '' : 'Geçersiz TC Kimlik No.';
        },

        
        tcKimlikKontrol(tcKimlik) {
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
        validateName(field) {
            this[field] = this[field].replace(/[^a-zA-ZığüşöçİĞÜŞÖÇ\s]/g, '');
        },
        formatPhone() {
            let cleaned = this.formattedPhone.replace(/\D/g, '');
            if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
            if (match) {
                this.formattedPhone = `(${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
            }
        },
        setMaxDate(){
      const today = new Date();
      const day = String(today.getDate()).padStart(2,'0');
      const month = String(today.getMonth()+1).padStart(2,'0');
      const year = today.getFullYear();
      this.maxDate = `${year}-${month}-${day}`
    },
    validateDate(event){
      const inputDate= new Date(event.target.value)
      const today = new Date();
      today.setHours(0,0,0,0);
      if (inputDate > today) {
        event.target.value = this.maxDate; 
        this.animeYear = this.maxDate; 
        alert('Lütfen bugünden önceki bir tarih girin.'); 
    }
  },


        async fetchCities() {
      try {
        const response = await axios.get('http://localhost:5000/api/iller');
        this.cities = response.data.map(city => city.il); 
      } catch (error) {
        console.error('Şehirler yüklenemedi:', error);
      }
    },
    async updateDistricts() {
      try {
        if (this.selectedCity) {
          const response = await axios.get(`http://localhost:5000/api/iller/${this.selectedCity}`);
          this.districts[this.selectedCity] = response.data; 
        }
        this.selectedDistrict = '';
      } catch (error) {
        console.error('İlçeler yüklenemedi:', error);
      }
    },
    async handleSubmit() {
      try {
        const formData = {
          firstName: this.firstName,
          lastName: this.lastName,
          birthDate: this.birthDate,
          gender: this.gender,
          phone: this.formattedPhone.replace(/\D/g, ''),
          tcno: this.tcno,
          email: this.email,
          city: this.selectedCity,
          district: this.selectedDistrict,
          address: this.address,
        };
        
        const response = await axios.post('http://localhost:5000/api/users', formData);
        alert('Form başarıyla gönderildi! Yanıt: ' + response.data._id);
    } catch (error) {
        console.error('Form gönderilemedi:', error);
    }
}

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
