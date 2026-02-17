// une chose export
export class Categorie {
    constructor(
      code,
      description,
      libelle
    ) {
      this._code,
      this._decription,
      this._libelle
    }
    // ---- getters
    get code() {
      return this._code;
    }
    get description() {
        return this._description;
    }
    get libelle() {
    return this._libelle;
    }
    // ---- setters

  
    set libelle(libelle) {
      this._libelle = libelle;
    }
  
    set description(description) {
      this._description = description;
    }
  
    // -- toString
    toString() {
      return `--> ${this._nom} (${this._id})`;
    }
  }
  