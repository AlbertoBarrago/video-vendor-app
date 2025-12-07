export const tg = window.Telegram?.WebApp;

export const isTelegramEnv = typeof window !== 'undefined' &&
    window.Telegram &&
    window.Telegram.WebApp &&
    window.Telegram.WebApp.initData &&
    window.Telegram.WebApp.initData.length > 0;

export function initTelegram() {
    if (isTelegramEnv) {
        tg.ready();
        tg.expand();
    }
}

export function setMainButton(text, onClick, isVisible = true) {
    if (!isTelegramEnv) return;

    if (isVisible) {
        tg.MainButton.setText(text);
        tg.MainButton.show();
        tg.MainButton.onClick(onClick);
    } else {
        tg.MainButton.hide();
    }
}

export function hideMainButton() {
    if (!isTelegramEnv) return;
    tg.MainButton.hide();
}