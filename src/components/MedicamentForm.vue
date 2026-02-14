<script setup>
import { ref } from 'vue';
const libelle = ref('');
const emit = defineEmits(['eventAdd']);
</script>

<template>
  <form @submit.prevent="$emit('eventAdd', libelle)">
    <input v-model="libelle" type="text" placeholder="Nouvelle recherche" />
    <button type="submit">Rechercher</button>
  </form>
</template>
