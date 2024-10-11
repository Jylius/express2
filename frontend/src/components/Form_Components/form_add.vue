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
                <input type="date" id="dogum-tarihi" v-model="birthDate" required />
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
                <label for="telefon">Telefon</label>
                <input type="tel" id="telefon" v-model="formattedPhone" @input="formatPhone" placeholder="(555) 123 4567" maxlength="14" required />
            </div>
            <div class="form-group">
                <label for="email">E-posta</label>
                <input type="email" id="email" v-model="email" placeholder="E-posta" required />
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
            address: '',
        };
    },
    methods: {
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
        async handleSubmit() {
            try {
                const formData = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    birthDate: this.birthDate,
                    gender: this.gender,
                    phone: this.formattedPhone.replace(/\D/g, ''),
                    email: this.email,
                    address: this.address
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
