import '../style.css';
import {initTelegram} from './utils/telegram.js';
import {navigateTo} from "./utils/index.js";

initTelegram();

void navigateTo('catalog');
