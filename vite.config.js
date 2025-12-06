import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		allowedHosts: true
	},
    define: {
        'import.meta.env.MINI_APP_URL': JSON.stringify(process.env.MINI_APP_URL)
    }
});
