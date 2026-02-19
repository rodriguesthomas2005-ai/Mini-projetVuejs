<script setup>
import HelloWorld from './components/HelloWorld.vue';
import ListMedicaments from './components/ListMedicaments.vue'
</script>

<template>
  <div class="body">
    <nav class="sidebar">
      <h2 class="menu-title">Pharmacie</h2>
      <ul>
        <li><a href="#">Médicaments</a></li>
        <li><a href="#">Catégories</a></li>
      </ul>
    </nav>
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

/* Menu latéral fixe */
.sidebar {
  width: 200px;
  background-color: #2c3e50; /* Bleu foncé pro */
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.menu-title {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 30px;
  border-bottom: 2px solid #4caf50; /* Ligne verte pharmacie */
  padding-bottom: 10px;
}


.sidebar ul {
  list-style: none;
  padding: 0;
  text-align: left;
  width: 80%;
  margin: 0 auto;
}

.sidebar li {
  margin: 15px 0;
}

.sidebar a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.sidebar a:hover {
  color: #4caf50;
}

/* Zone de contenu principale */
.conteneur-g {
  flex-grow: 1; /* Prend tout l'espace restant à droite */

  padding: 20px;
  overflow-y: auto; /* Permet de scroller uniquement cette zone */
}
</style>
