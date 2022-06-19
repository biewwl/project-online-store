function lS(method, key, value) {
  switch(method) {
    case 'g':
      return JSON.parse(localStorage.getItem(key));

    case 's':
      localStorage.setItem(key, JSON.stringify(value));
      break;

    case 'r':
      localStorage.removeItem(key);
      break;

    default:
      throw new Error('The chosen method does not match any pattern of this function');
  }
}

export default lS;
