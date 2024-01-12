export const clearForm = (state, setState) => {
  const emptyObject = {};

  Object.keys(state).forEach((key) => {
    emptyObject[key] = "";
  });

  setState(emptyObject);
};
