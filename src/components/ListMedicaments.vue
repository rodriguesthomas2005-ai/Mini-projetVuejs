<script setup>
import { ref } from 'vue';
import MedicamentForm from './MedicamentForm.vue';
import Medicament from './Medicament.vue';


const idCategorieSelectionnee = ref("");
const listeCat = ref("")

function filtrerLesMedics(id) {
  idCategorieSelectionnee.value = id;
}
function recupCat(liste){
  listeCat = liste;
}
</script>

<template>
  <h1>Gestion des stocks</h1>
  <MedicamentForm @filterCategory="filtrerLesMedics" @listeCat="recupCat"/>
  
  <Medicament :idCat="idCategorieSelectionnee" :listeCat="listeCat"/>
</template>