<script setup>
import { reactive, onMounted, watch, defineProps } from 'vue';
import { Medicament } from '../Medicament.js';
import MedicAdd from './MedicAdd.vue';
import { Categorie } from '../Categorie.js';

const props = defineProps({
  idCat: String
});
const emit = defineEmits(['ajout1']);

const urlBase = 'https://full-lilith-thomas2005-de470762.koyeb.app/api/medicaments';
const urlCat = 'https://springajax.herokuapp.com/api/categories';
const listeMedic = reactive([]);
const listeCategorie = reactive([]);
//////////////////////////////////


//afficher les médicaments//
function getMedic(url) {
  listeMedic.splice(0, listeMedic.length);
  fetch(url)
    .then(response => response.json())
    .then((dataJSON) => {
      for (let elt of dataJSON._embedded.medicaments) {
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
        m.isEditing = false; 
        
        fetch(elt._links.categorie.href)
          .then(res => res.json())
          .then(catData => {
            m.categorie = catData.libelle; 
            listeMedic.push(m);
          });
          
      };
    })
    .catch(error => console.error("Erreur:", error));
}


function getCat(url) {
  const fetchOptions = { method: 'GET' };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      for (let elt of dataJSON._embedded.categories) {
        //console.log(elt);
        let c = new Categorie(
          elt.code,
          elt.libelle
        );
        listeCategorie.push(c);
      }
      console.log(listeCategorie)
    })
    
    .catch((error) => {
      console.log(error);
    });
}
///////////////////////////////////


//modifier//
const modifierStock = (medic, delta) => {
  medic.nbstock += delta;
  const urlUpdate = `${urlBase}/${medic.id}`;

  fetch(urlUpdate, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ unitesEnStock: medic.nbstock })
  })
  .then(response => {
    if (!response.ok) console.error("Erreur lors de la mise à jour du stock");
  })
  .catch(error => console.error("Erreur réseau :", error));
};

const toggleEdit = (medic) => {
  medic.isEditing = !medic.isEditing;
};

const updateMed = (medic) => {
  const urlUpdate = `${urlBase}/${medic.id}`;
  const updatedData = {
    nom: medic.nom,
    prixUnitaire: medic.prix,
    quantiteParUnite: medic.qteunite
  };

  fetch(urlUpdate, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  })
  .then(response => {
    if (response.ok) {
      medic.isEditing = false;
    } else {
      alert("Erreur lors de la mise à jour");
    }
  });
};

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

onMounted(() => {
  getMedic(urlBase);
  getCat(urlCat);
});
</script>

<template>
  <div class="medicaments-container">
    <div class="medic-item add-zone">
      <MedicAdd @ajout1="$emit('ajout1')"></MedicAdd>
    </div>

    <div v-for="medic in listeMedic" :key="medic.id" class="medic-item">
      <div class="medic-header">
        <input v-if="medic.isEditing" v-model="medic._nom" class="edit-input-title" />
        <h3 v-else>{{ medic.nom }}</h3>
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
          
          
          <div v-if="medic.isEditing" class="edit-fields">
            <p><strong>Catégorie:</strong></p>
            <select v-model="selectedCat" id="med-select">
              <option value="">Toutes les catégories</option>
              <option v-for="cat in listeCategorie" :key="cat.id" :value="cat.id">
                {{ cat.nom }}
              </option>
            </select>
            <label>Format:</label>
            <input v-model="medic._qteunite" class="edit-input" />
            <label>Prix (€):</label>
            <input v-model="medic._prix" type="number" step="0.01" class="edit-input" />
          </div>

          <div v-else>
            <p><strong>Catégorie:</strong> {{ medic.categorie || '...' }}</p>
            <p><strong>Format:</strong> {{ medic.qteunite }}</p>
            <p><strong>Prix:</strong> {{ medic.prix }} €</p>
          </div>

          <p class="status" :class="{ 'out': medic.nbstock == 0 }">
            {{ medic.nbstock > 0 ? 'En stock' : 'Rupture' }}
          </p>
        </div>
      </div>

      <div class="medic-footer">
        <button v-if="!medic.isEditing" @click="deleteMed(medic.id)" class="btn-action delete">Supprimer</button>
        
        <button v-if="!medic.isEditing" @click="toggleEdit(medic)" class="btn-action edit">Modifier</button>
        <button v-else @click="updateMed(medic)" class="btn-action save">Enregistrer</button>
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
  background: white; cursor: pointer; font-weight: bold; color:#a8a8a8;
  
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