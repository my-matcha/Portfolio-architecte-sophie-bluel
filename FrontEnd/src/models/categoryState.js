export function createCategoryState(categories) {
  return {
    all: function () {
      return categories;
    },
  };
}
