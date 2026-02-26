// une chose export
export class Medicament {
  constructor(
    id,
    fournisseur,
    image,
    indisponible,
    nom,
    prix,
    qteunite,
    nbstock
  ) {
    this._fournisseur = fournisseur;
    this._image = image;
    this._id = id;
    this._indisponible = indisponible;
    this._nom = nom;
    this._prix = prix;
    this._qteunite = qteunite;
    this._nbstock = nbstock;
    this._categorie = "";
    this._description = "";
  }
  // ---- getters
  get fournisseur() {
    return this._fournisseur;
  }
  get image() {
    return this._image;
  }
  get indisponible() {
    return this._indisponible;
  }
  get nom() {
    return this._nom;
  }
  get prix() {
    return this._prix;
  }
  get qteunite() {
    return this._qteunite;
  }
  get nbstock() {
    return this._nbstock;
  }
  get id() {
    return this._id;
  }
  get categorie() {
    return this._categorie;
  }
  get description() {
    return this._description;
  }

  // ---- setters
  set nbstock(nbstock) {
    this._nbstock = nbstock;
  }

  set prix(prix) {
    this._prix = prix;
  }

  set indispo(indispo) {
    this._indisponible = indispo;
  }

  set description(description){
    this._description=description;
  }

  set categorie(categorie){
    this._categorie=categorie;
  }

  // -- toString
  toString() {
    return `--> ${this._nom} (${this._id})`;
  }
}
