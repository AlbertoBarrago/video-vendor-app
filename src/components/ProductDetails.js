/**
 * Renders the product details
 * @param container
 * @param product
 */
export function renderVideoDetails(container, product) {
    container.innerHTML = `
    <div class="product-details">
      <img src="${product.thumbnail}" alt="${product.title}" class="detail-thumb">
      <h2>${product.title}</h2>
      <p class="detail-description">${product.description}</p>
      <p class="detail-price">Price: $${product.price}</p>
    </div>
  `;
}
