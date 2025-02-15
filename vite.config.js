import 'dotenv/config';
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: process.env.PORT,
        proxy: {
            '/api': {
                target: process.env.URU_FRAMEWORKS_SECURE_NOTES_API_URL,
                changeOrigin: true,
                secure: process.env.MODE === 'prod',
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    define: {
        'import.meta.env.MODE': JSON.stringify(process.env.MODE),
        'import.meta.env.PORT': JSON.stringify(process.env.PORT),
        'import.meta.env.COOKIE_SALT_NAME': JSON.stringify(process.env.URU_FRAMEWORKS_SECURE_NOTES_API_COOKIE_SALT_NAME),
        'import.meta.env.COOKIE_ENCRYPTED_KEY_NAME': JSON.stringify(process.env.URU_FRAMEWORKS_SECURE_NOTES_API_COOKIE_ENCRYPTED_KEY_NAME),
    }
})
