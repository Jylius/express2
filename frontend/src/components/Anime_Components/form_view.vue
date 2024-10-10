<template>
  <div class="container">
    <h2>Kullanıcı Listesi</h2>
    <div class="card-list">
      <div v-for="user in users" :key="user._id" class="user-card" @click="selectUser(user)">
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
        <button class="details-button">Detayları Gör</button>
      </div>
    </div>
    
    <transition name="fade" mode="out-in">
      <div v-if="selectedUser" class="user-details-card">
        <h3>Kullanıcı Detayları</h3>
        <p><strong>İsim:</strong> {{ selectedUser.firstName }} {{ selectedUser.lastName }}</p>
        <p><strong>Doğum Tarihi:</strong> {{ selectedUser.birthDate }}</p>
        <p><strong>Cinsiyet:</strong> {{ selectedUser.gender }}</p>
        <p><strong>Telefon:</strong> {{ selectedUser.phone }}</p>
        <p><strong>Email:</strong> {{ selectedUser.email }}</p>
        <p><strong>Şehir:</strong> {{ selectedUser.city }}</p>
        <p><strong>Adres:</strong> {{ selectedUser.address }}</p>
        <button class="close-button" @click="selectedUser = null">Kapat</button>
        <button class="edit-button">Düzenle</button>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      selectedUser: null
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Kullanıcılar getirilemedi:', error);
      }
    },
    selectUser(user) {
      this.selectedUser = user;
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}
.user-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;
}
.user-card:hover {
  transform: translateY(-5px);
}
.details-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
.details-button:hover {
  background-color: #0056b3;
}
.user-details-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  max-width: 400px;
  width: 100%;
  transition: opacity 0.5s ease;
}
.close-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
.close-button:hover {
  background-color: #c82333;
}
.edit-button {
  background-color: #42ef1b;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
.edit-button:hover {
  background-color: #5eff00;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
