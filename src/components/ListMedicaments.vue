<script setup>
import { ref } from 'vue';
import MedicamentForm from './MedicamentForm.vue';
import Medicament from './Medicament.vue';


const idCategorieSelectionnee = ref("");
const mot = ref("")

function filtrerLesMedics(id) {
  idCategorieSelectionnee.value = id;
}

function motRecherche(libelle){
  mot.value=libelle;
}

</script>

<template>
  <h1>Gestion des stocks</h1>
  <MedicamentForm @filterCategory="filtrerLesMedics" @eventAdd="motRecherche"/>
  
  <Medicament :idCat="idCategorieSelectionnee" :mot="mot"/>
</template>