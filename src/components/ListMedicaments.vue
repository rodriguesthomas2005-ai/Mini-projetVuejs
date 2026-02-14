<script setup>
import Medicament from './Medicament.vue'
import MedicamentForm from './MedicamentForm.vue'




</script>

<template>
  <h2>Gestion des stocks</h2>
  <MedicamentForm @eventAdd="handlerAdd"></MedicamentForm>
  <Medicament></Medicament>
</template>
