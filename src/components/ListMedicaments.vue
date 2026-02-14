<script setup>
import Medicament from './Medicament.vue'
import MedicamentForm from './MedicamentForm.vue'




</script>

<template>
  <h1>Gestion des stocks</h1>
  <MedicamentForm @eventAdd="handlerAdd"></MedicamentForm>
  <Medicament></Medicament>
</template>

<style>

</style>

