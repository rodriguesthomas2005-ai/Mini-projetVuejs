<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true 
  }
});

const libelle = ref(''); 
const fournisseur = ref(''); 
const urlImage = ref(''); 
const nbStock = ref(''); 
const prix = ref(''); 
const qteboite = ref('');
const selectedCat = ref('');
const indisponible = ref(false);

const emit = defineEmits(['ajout1', 'MedicAdd']);

const ajouterMedicament = () => {
  const nouveauMedic = {
    nom: libelle.value,
    fournisseur: fournisseur.value,
    imageURL: urlImage.value,
    unitesEnStock: parseInt(nbStock.value) || 0,
    prixUnitaire: parseFloat(prix.value) || 0,
    quantiteParUnite: qteboite.value,
    idCategorie: selectedCat.value,
    indisponible: indisponible.value
  };
  
  emit('MedicAdd', nouveauMedic);
  
  // Réinitialisation
  libelle.value = ''; fournisseur.value = ''; urlImage.value = '';
  nbStock.value = ''; prix.value = ''; qteboite.value = '';
  selectedCat.value = ''; indisponible.value = false;
};
</script>

<template>
  <div class="medic-add-wrapper">
    <h3>Nouveau Produit</h3>
    
    <form @submit.prevent="ajouterMedicament" class="add-form">
      <div class="input-group">
        <input v-model="libelle" type="text" placeholder="Nom du médicament" required />
        
        <div class="row">
          <select v-model="selectedCat" required>
            <option value="" disabled selected>Catégorie</option>
            <option v-for="cat in props.categories" :key="cat.id" :value="cat.id">{{ cat.nom }}</option>
          </select>
        </div>

        <input v-model="urlImage" type="text" placeholder="URL de l'image" />
        
        <div class="row">
          <input v-model="prix" type="number" step="0.01" placeholder="Prix (€)" class="no-spin" />
          <input v-model="nbStock" type="number" step="1" placeholder="Stock" class="no-spin" />
        </div>

        <input v-model="qteboite" type="text" placeholder="Quantité par boîte" />

        <div class="checkbox-group">
          <input type="checkbox" id="indispo" v-model="indisponible" />
          <label for="indispo">Indisponible</label>
        </div>
      </div>
      
      <div class="medic-button">
        <button type="submit" class="btn-submit">Ajouter à la liste</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

.medic-item { padding: 8px; }
h3 { margin: 0 0 6px 0; color: #34495e; font-size: 1rem; text-align: center; }

.add-form {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 4px; 
}

.row {
  display: flex;
  gap: 4px;
}

.row input, .row select { width: 50%; }

input, select {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.8rem;
  height: 28px; /* Hauteur très réduite */
  box-sizing: border-box;
  background-color: #f9f9f9;
  color: #2c3e50;
}

input:focus, select:focus {
  border-color: #4caf50;
  background-color: #fff;
  outline: none;
}

/* Checkbox compacte */
checkbox-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 2px 0;
  margin-top: 2px;
}

.checkbox-group input[type="checkbox"] {
  width: 15px;
  height: 15px;
  accent-color: #4caf50;
  cursor: pointer;
}

.checkbox-group label {
  font-size: 0.75rem;
  color: #7f8c8d;
  cursor: pointer;
}

/* Bouton */
.btn-submit {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 6px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.2s;
}

.btn-submit:hover { background-color: #388e3c; }


input.no-spin::-webkit-outer-spin-button,
input.no-spin::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
input.no-spin[type=number] { -moz-appearance: textfield; }

</style>