/* eslint-disable no-undef */

import express from 'express';
import path from 'path';

const app = express();

const directory = '/' + (process.env.STATIC_DIR || 'dist');
const distPath = path.join(process.cwd(), directory)
app.use(
  express.static(distPath, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        // Toujours recharger le index.html
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else {
        // Les autres fichiers peuvent être mis en cache longtemps
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  }),
);

// Redirige toutes les requêtes vers index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), directory, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on', port);
});
