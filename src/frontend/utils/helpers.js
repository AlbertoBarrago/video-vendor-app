import {navigateTo} from "./index.js";

function createWebBackButton() {
    const existingBtn = document.querySelector('.web-back-btn');
    if (existingBtn) existingBtn.remove();

    const backBtn = document.createElement('button');
    backBtn.className = 'web-back-btn';
    backBtn.textContent = '← Back';
    backBtn.onclick = () => void navigateTo('catalog');
    document.body.prepend(backBtn);
}

function removeWebBackButton() {
    const existingBtn = document.querySelector('.web-back-btn');
    if (existingBtn) existingBtn.remove();
}

function createWebActionButton(text, onClick, className = '') {
    const existingBtn = document.querySelector('.web-action-btn');
    if (existingBtn) existingBtn.remove();

    const actionBtn = document.createElement('button');
    actionBtn.className = `web-action-btn ${className}`;
    actionBtn.textContent = text;
    actionBtn.onclick = onClick;
    document.body.appendChild(actionBtn);
}

function removeWebActionButton() {
    const existingBtn = document.querySelector('.web-action-btn');
    if (existingBtn) existingBtn.remove();
}

function showWebConfirm(message, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'web-modal';
    modal.innerHTML = `
                                <div class="web-modal-content">
                                    <p>${message}</p>
                                    <div class="web-modal-buttons">
                                        <button class="web-modal-btn cancel">Cancel</button>
                                        <button class="web-modal-btn confirm">Confirm</button>
                                    </div>
                                </div>
                            `;
    document.body.appendChild(modal);

    modal.querySelector('.cancel').onclick = () => {
        modal.remove();
    };

    modal.querySelector('.confirm').onclick = () => {
        modal.remove();
        onConfirm(true);
    };

    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

export {
    createWebBackButton,
    createWebActionButton,
    removeWebBackButton,
    removeWebActionButton,
    showWebConfirm
}