<script setup>
import { reactive, onMounted, watch } from 'vue';
import { Medicament } from '../Medicament.js';
const url = 'https://springajax.herokuapp.com/api/medicaments';
const listeMedic = reactive([]);

function getMedic() {
  const fetchOptions = { method: 'GET' };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      for (let elt of dataJSON._embedded.medicaments) {
        console.log(elt);
        let m = new Medicament(
          elt.reference,
          elt.fournisseur,
          elt.imageURL,
          elt.indisponible,
          elt.nom,
          elt.prixUnitaire,
          elt.quantiteParUnite,
          elt.unitesEnStock
        );
        listeMedic.push(m);
      }
      console.log(listeMedic);
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  getMedic();
});
</script>

<template>
  <div class="medicaments-container">
    <div id="ajouter-medic" class="medic-item">
      <h3>Ajouter un médicament</h3>
    </div>
    <div v-for="medic in listeMedic" :key="medic.id" class="medic-item">
      <h3>{{ medic.nom }}</h3>
      <div class="medic-image">
        <img :src="medic.image" alt="image médicament" />
      </div>
      <div class="medic-button">
        <button id="supprimer">Supprimer</button>
        <button id="modifier">Modifier</button>
        <button id="+1">+1</button>
        <button id="-1">-1</button>
      </div>
    </div>
  </div>
</template>

<style>
.medicaments-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  max-width: 90%;
  margin: 0 auto;
}
.medic-image {
  height: 80%;
  width: 100%;
  display: flex;             
  flex-direction: column;    
  justify-content: center;  
  align-items: center;
}

.medic-image img {
  max-width: 80%;
  max-height: 80%;

  object-fit: contain;
}
#ajouter-medic{
  display: flex;             
  flex-direction: column;    
  justify-content: center;  
  align-items: center;
}
.medic-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.medic-item:hover {
  transform: translateY(-5px);
  border: 1px solid #4caf50;
}

h3 {
  margin: 0 0 5px 0;
  color: #34495e;
  font-size: 1.2rem;
}
.medic-button button {
  margin: 5px;
}
</style>
