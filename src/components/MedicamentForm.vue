<script setup>
import { ref } from 'vue';
const libelle = ref('');
const emit = defineEmits(['eventAdd']);
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="$emit('eventAdd', libelle)">
      <input v-model="libelle" type="text" placeholder="Nouvelle recherche" class="input-recherche" />
      <button class="btn-submit" type="submit">Rechercher</button>
    </form>
  </div>
</template>

<style>
.form-container {
  width: 90%; 
  margin: 0 auto;
  height: 100px;
  display: flex;
  align-items: center;   
}

form {
  display: flex;        
  flex-direction: row;    
  justify-content: flex-start; 
  align-items: center;   
  gap: 10px;            
}

.input-recherche {
  background-color: white;
  color: #2c3e50;
  height: 38px;
  width: 200px;
  padding: 0 10px;      
  border: 1px solid white; 
  border-radius: 4px;
}

.btn-submit {
  background-color: white;
  color: #2c3e50;
  height: 40px;
  width: 100px;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;        
}

.btn-submit:hover {
  background-color: #2c3e50;
  color: #4caf50;     
  border: 1px solid #4caf50;      
}

</style>
