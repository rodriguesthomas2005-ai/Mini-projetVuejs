// une chose export
export class Categorie {
    constructor(
      id,
      nom
    ) {
      this._id=id;
      this._nom=nom
    }
    // ---- getters
    get nom() {
      return this._nom;
    }
    get id() {
      return this._id;
    }

    // ---- setters
    set nom(nom) {
      this._nom = nom;
    }
  
    // -- toString
    toString() {
      return `--> ${this._nom} (${this._id})`;
    }
  }
  