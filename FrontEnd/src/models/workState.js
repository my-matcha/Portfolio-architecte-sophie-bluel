export function createWorkState(works) {
  return {
    all: function () {
      // TODO: Se renseigner sur la mutation d'objets et de tableaux en javascript
      return works.map((work) => ({ ...work })); // Duplication de l'objet pour éviter mutation involontaire
    },
    fromCategory: function (category_id) {
      if (!category_id) return this.all();
      return works.filter((work) => work.category.id === category_id);
    },
  };
}
