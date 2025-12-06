/**
 * Renders the purchases
 * @param container
 * @param purchases
 */
export function renderPurchases(container, purchases) {
	if (purchases.length === 0) {
		container.innerHTML = `
      <div class="empty-state">
        <p>You haven't purchased any product yet.</p>
      </div>
    `;
		return;
	}

	container.innerHTML = `
    <div class="purchases-header">
      <h2>My Purchases</h2>
    </div>
    <div class="product-list">
      ${purchases.map(purch => `
        <div class="product-item purchase-item">
          <img src="${purch.thumbnail}" alt="${purch.title}" class="product-thumb">
          <div class="product-info">
            <h3>${purch.title}</h3>
            <button class="download-btn" onclick="alert('Downloading ${purch.title}...')">Download</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
