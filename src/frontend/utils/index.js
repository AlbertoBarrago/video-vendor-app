import {hideMainButton, setMainButton, tg, isTelegramEnv} from "./telegram.js";
import {renderCatalog} from "../components/Catalog.js";
import {renderVideoDetails} from "../components/ProductDetails.js";
import {renderPurchases} from "../components/Purchases.js";
import {
    createWebActionButton,
    createWebBackButton,
    removeWebActionButton,
    removeWebBackButton,
    showWebConfirm
} from "./helpers.js";

let currentPage = 'catalog';
let selectedProduct = null;
let purchases = [];

const app = document.querySelector('#app');
const API_URL = import.meta.env.PROD ? 'https://market-bot-app-qs1elg.fly.dev' : 'http://localhost:3000';

/**
 * Navigates to the given page
 * @param page
 * @param data
 * @returns {Promise<void>}
 */
async function navigateTo(page, data = null) {
    currentPage = page;

    app.innerHTML = '';

    hideMainButton();
    if (!isTelegramEnv) {
        removeWebActionButton();
        removeWebBackButton();
    }

    if (page !== 'catalog') {
        tg.BackButton.show();
        if (!isTelegramEnv) {
            createWebBackButton();
        }
    } else {
        tg.BackButton.hide();
        if (!isTelegramEnv) {
            removeWebBackButton();
        }
    }

    switch (page) {
        case 'catalog':
            const products = await fetchProducts();
            renderCatalog(app, products, (product) => {
                selectedProduct = product;
                void navigateTo('details');
            });
            if (purchases.length > 0) {
                const btn = document.createElement('button');
                btn.className = 'view-purchases-btn';
                btn.textContent = `View Purchases (${purchases.length})`;
                btn.onclick = () => void navigateTo('purchases');
                app.appendChild(btn);
            }
            break;

        case 'details':
            if (selectedProduct) {
                renderVideoDetails(app, selectedProduct);

                const isPurchased = purchases.some(p => p.id === selectedProduct.id);

                const buttonText = isPurchased ? "Download Now" : `Buy for $${selectedProduct.price}`;
                const buttonClass = isPurchased ? 'download' : 'buy';

                const buttonAction = () => {
                    if (isPurchased) {
                        alert(`Downloading ${selectedProduct.title}...`);
                    } else {
                        const confirmMessage = `Buy ${selectedProduct.title} for $${selectedProduct.price}?`;

                        if (isTelegramEnv) {
                            tg.showConfirm(confirmMessage, (confirmed) => {
                                if (confirmed) {
                                    purchases.push(selectedProduct);
                                    tg.showAlert("Purchase successful!");
                                    void navigateTo('purchases');
                                }
                            });
                        } else {
                            showWebConfirm(confirmMessage, (confirmed) => {
                                if (confirmed) {
                                    purchases.push(selectedProduct);
                                    alert("Purchase successful!");
                                    void navigateTo('purchases');
                                }
                            });
                        }
                    }
                };

                setMainButton(buttonText, buttonAction);
                if (!isTelegramEnv) {
                    createWebActionButton(buttonText, buttonAction, buttonClass);
                }
            }
            break;

        case 'purchases':
            renderPurchases(app, purchases);
            break;
    }
}

/**
 * Fetches products from the API
 * @returns {Promise<any|*[]>}
 */
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

tg.BackButton.onClick(() => {
    if (currentPage === 'details' || currentPage === 'purchases') {
        void navigateTo('catalog');
    }
});

export {navigateTo};