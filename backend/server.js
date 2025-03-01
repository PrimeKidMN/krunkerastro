import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const app = express();

// Serve the Astro-generated files
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, 'dist');

app.use(express.static(publicDir));

// Proxy setup
app.use('/proxy', createProxyMiddleware({
  target: 'https://krunker.io', // The target website
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (X11; CrOS aarch64 13099.85.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.110 Safari/537.35');
  },
}));

// Serve the Astro site
app.get('*', (req, res) => {
  res.sendFile(join(publicDir, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
