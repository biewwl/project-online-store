export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const responseJson = await response.json();
  return responseJson;
}

export async function getProductsFromCategoryAndQuery(category, query) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${category}&q=${query}`);
  const responseJson = await response.json();
  return responseJson;
}

export async function getProductById(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
}
