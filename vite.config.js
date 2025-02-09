import 'dotenv/config';
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: process.env.PORT,
    },
    define: {
        'import.meta.env.MODE': JSON.stringify(process.env.MODE),
        'import.meta.env.PORT': JSON.stringify(process.env.PORT),
    }
})
