<template>
  <div class="container mt-5">
    <div class="field">
      <input 
        class="is-checkradio is-info" 
        id="form-view-radio" 
        type="radio" 
        v-model="activeComponent" 
        :value="'form_view'" 
      />
      <label for="form-view-radio">form view</label>
      
      <input 
        class="is-checkradio is-info" 
        id="form-add-radio" 
        type="radio" 
        v-model="activeComponent" 
        :value="'form_add'" 
      />
      <label for="form-add-radio">add form</label>
    </div>

    <Transition name="fade" mode="out-in">
      <component :is="activeComponent"></component>
    </Transition>
  </div>
</template>

<script>
import form_add from '@/components/Form_Components/form_add.vue';
import form_view from '@/components/Form_Components/form_view.vue';
import { ref } from 'vue';

export default {
  components: {
    form_add,
    form_view,
  },
  setup() {
    const activeComponent = ref('form_view');

    return {
      activeComponent,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}

.field {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.is-checkradio {
  margin-right: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
