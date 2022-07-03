const loading = (state = false, action) => {
  switch (action.type) {
    case "LOADING":
      return !state;
    default:
      return state;
  }
}

export default loading;
