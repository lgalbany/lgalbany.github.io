import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath,URL} from 'node:url';
export default defineConfig({define:{'process.env.NODE_ENV':JSON.stringify('production')},plugins:[react()],resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url))}},build:{outDir:'assets',emptyOutDir:true,lib:{entry:'src/main.tsx',formats:['es'],fileName:()=> 'app.js',cssFileName:'style'},sourcemap:false}});
