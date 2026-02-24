<script setup>
import HelloWorld from './components/HelloWorld.vue';
import ListMedicaments from './components/ListMedicaments.vue'
</script>

<template>
  <div class="body">
    <div class="conteneur-g">
      <ListMedicaments></ListMedicaments>
    </div>
  </div>

  
</template>

<style>
.body {
  display: flex;
  min-height: 100vh;
}

/* Zone de contenu principale */
.conteneur-g {
  flex-grow: 1; /* Prend tout l'espace restant à droite */

  padding: 20px;
  overflow-y: auto; /* Permet de scroller uniquement cette zone */
}
</style>
