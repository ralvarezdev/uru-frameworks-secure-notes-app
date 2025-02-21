import 'dotenv/config';
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {dirname, resolve} from 'path'
import {fileURLToPath} from "url";
import {IS_DEBUG, IS_DEV, IS_PROD, loadVite} from "@ralvarezdev/js-mode";

// Get the file name and directory
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// Load the Vite environment
loadVite()

export default defineConfig({
    plugins: [react()],
    server: {
        port: process.env.PORT,
        proxy: {
            '/api': {
                target: process.env.URU_FRAMEWORKS_SECURE_NOTES_API_URL,
                changeOrigin: true,
                secure: IS_PROD,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    define: {
        'import.meta.env.COOKIE_SALT_NAME': JSON.stringify(process.env.URU_FRAMEWORKS_SECURE_NOTES_API_COOKIE_SALT_NAME),
        'import.meta.env.COOKIE_ENCRYPTED_KEY_NAME': JSON.stringify(process.env.URU_FRAMEWORKS_SECURE_NOTES_API_COOKIE_ENCRYPTED_KEY_NAME),
        'import.meta.env.COOKIE_USER_ID_NAME': JSON.stringify(process.env.URU_FRAMEWORKS_SECURE_NOTES_API_COOKIE_USER_ID_NAME),
        'import.meta.env.IS_DEBUG': JSON.stringify(IS_DEBUG),
        'import.meta.env.IS_DEV': JSON.stringify(IS_DEV),
        'import.meta.env.IS_PROD': JSON.stringify(IS_PROD)
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
            output: {
                entryFileNames: 'bundle.js',
            },
        },
        outDir: 'dist',
    },
})
