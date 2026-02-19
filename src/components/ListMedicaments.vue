<script setup>
import { ref } from 'vue';
import MedicamentForm from './MedicamentForm.vue';
import Medicament from './Medicament.vue';


const idCategorieSelectionnee = ref("");


function filtrerLesMedics(id) {
  idCategorieSelectionnee.value = id;
}
</script>

<template>
  <h1>Gestion des stocks</h1>
  <MedicamentForm @filterCategory="filtrerLesMedics" />
  
  <Medicament :idCat="idCategorieSelectionnee" />
</template>