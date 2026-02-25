<script setup>
import { reactive, onMounted, ref } from 'vue';
import { Categorie } from '../Categorie.js';

const emit = defineEmits(['filterCategory', 'listeCat']);
const listeCategorie = reactive([]);
const selectedCat = ref("");

const url = 'https://springajax.herokuapp.com/api/categories';

function getCat() {
  const fetchOptions = { method: 'GET' };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      for (let elt of dataJSON._embedded.categories) {
        //console.log(elt);
        let c = new Categorie(
          elt.code,
          elt.libelle
        );

        listeCategorie.push(c);
        
      }
      //console.log(listeMedic);
    })
    .catch((error) => {
      console.log(error);
    });
  emit('listeCat', listeCategorie);  
}

onMounted(() => {
  getCat();
});

function envoyerChoix() {
  emit('filterCategory', selectedCat.value);
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="envoyerChoix">
      <label for="med-select">Choisir une catégorie :</label>
      <select v-model="selectedCat" id="med-select">
          <option value="">Toutes les catégories</option>
          <option v-for="cat in listeCategorie" :key="cat.id" :value="cat.id">
            {{ cat.nom }}
          </option>
      </select>
      <button class="btn-submit" type="submit">Rechercher</button>
    </form>
  </div>
</template>

<style>

.form-container {
  width: 90%; 
  margin: 20px auto;
  padding : 20px;
  background-color: white; 
  border-radius: 12px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
  box-sizing: border-box;
}


form {
  display: flex;        
  flex-direction: row;    
  justify-content: center; 
  align-items: center;   
  gap: 15px;
  flex-wrap: wrap; 
}


label {
  color: #34495e;
  font-weight: 600;
  font-size: 1rem;
}

select {
  background-color: white;
  color: #2c3e50;
  height: 42px;
  min-width: 250px;
  padding: 0 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%234caf50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 18px;
}

select:focus {
  border-color: #4caf50; 
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}


.btn-submit {
  background-color: #4caf50;
  color: white;
  height: 42px;
  padding: 0 25px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);
}

.btn-submit:hover {
  background-color: #388e3c;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-submit:active {
  transform: translateY(0);
}


</style>
