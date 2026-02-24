<script setup>
import { reactive, onMounted, watch, defineProps } from 'vue';
import { Medicament } from '../Medicament.js';
import MedicAdd from './MedicAdd.vue';

const props = defineProps({
  idCat: String
});
const emit = defineEmits(['ajout1']);

const urlBase = 'https://full-lilith-thomas2005-de470762.koyeb.app/api/medicaments';
const listeMedic = reactive([]);

function getMedic(url) {
  // On vide la liste au début
  listeMedic.splice(0, listeMedic.length);
  
  fetch(url)
    .then(response => response.json())
    .then((dataJSON) => {
      const meds = dataJSON._embedded ? dataJSON._embedded.medicaments : [];
      
      meds.forEach((elt) => {
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

        // On ajoute l'objet à la liste réactive
        listeMedic.push(m);

        // On charge la catégorie en arrière-plan
        fetch(elt._links.categorie.href)
          .then(res => res.json())
          .then(catData => {
            m.categorie = catData.libelle; 
          });
      });
    })
    .catch(error => console.error("Erreur:", error));
}

function deleteMed(id) {
  if (!id || !confirm("Supprimer ce médicament ?")) return;
  fetch(`${urlBase}/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        const index = listeMedic.findIndex(m => m.id == id);
        if (index != -1) listeMedic.splice(index, 1);
      }
    });
}

watch(() => props.idCat, (nouvelId) => {
  let url = nouvelId ? `https://full-lilith-thomas2005-de470762.koyeb.app/api/categories/${nouvelId}/medicaments` : urlBase;
  getMedic(url);
});

onMounted(() => getMedic(urlBase));

const modifierStock = (medic, delta) => {
  medic.nbstock += delta;
};
</script>

<template>
  <div class="medicaments-container">
    <div class="medic-item add-zone">
      <MedicAdd @ajout1="$emit('ajout1')"></MedicAdd>
    </div>

    <div v-for="medic in listeMedic" :key="medic.id" class="medic-item">
      <div class="medic-header">
        <h3>{{ medic.nom }}</h3>
      </div>

      <div class="medic-body">
        <div class="image-section">
          <img :src="medic.image" :alt="medic.nom" class="medic-img" />
          
          <div class="stock-control">
            <button @click="modifierStock(medic, -1)" :disabled="medic.nbstock <= 0" class="btn-qte">-</button>
            <span class="qte-val">{{ medic.nbstock }}</span>
            <button @click="modifierStock(medic, 1)" class="btn-qte">+</button>
          </div>
        </div>

        <div class="details-section">
          <p><strong>Catégorie:</strong> {{ medic.categorie || 'Chargement...' }}</p>
          <p><strong>Format:</strong> {{ medic.qteunite }}</p>
          <p><strong>Prix:</strong> {{ medic.prix }} €</p>
          <p class="status" :class="{ 'out': medic.nbstock == 0 }">
            {{ medic.nbstock > 0 ? 'En stock' : 'Rupture' }}
          </p>
        </div>
      </div>

      <div class="medic-footer">
        <button @click="deleteMed(medic.id)" class="btn-action delete">Supprimer</button>
        <button class="btn-action edit">Modifier</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.medicaments-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  padding: 20px;
}

.medic-item {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  transition: transform 0.3s ease;
}

.medic-item:hover {
  transform: translateY(-5px);
  border-color: #4caf50;
}

.medic-header h3 { margin: 0; color: #2c3e50; font-size: 1.1rem; }

.medic-body { display: flex; gap: 15px; margin-top: 15px; flex: 1; }

.image-section { flex: 1; display: flex; flex-direction: column; align-items: center; }

.medic-img { width: 100px; height: 100px; object-fit: contain; }

.details-section { flex: 1.2; font-size: 0.9rem; color: #555; }

.stock-control {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  padding: 5px;
  border-radius: 20px;
  margin-top: 10px;
}

.btn-qte {
  width: 24px; height: 24px; border-radius: 50%; border: none;
  background: white; cursor: pointer; font-weight: bold;
}

.qte-val { font-weight: bold; min-width: 20px; text-align: center; }

.status { font-weight: bold; color: #4caf50; margin-top: 8px; }
.status.out { color: #d32f2f; }

.medic-footer { display: flex; gap: 10px; margin-top: 20px; }

.btn-action { flex: 1; padding: 8px; border-radius: 8px; border: none; cursor: pointer; }
.delete { background: #fff1f0; color: #cf1322; }
.edit { background: #f0f5ff; color: #096dd9; }

.add-zone { border: 2px dashed #d9d9d9; justify-content: center; align-items: center; }
</style>