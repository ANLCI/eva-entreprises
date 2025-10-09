/* eslint-disable no-undef */

import express from 'express';
import path from 'path';

const app = express();

const directory = '/' + (process.env.STATIC_DIR || 'dist');
app.use(express.static(path.join(process.cwd(), directory)));

// Redirige toutes les requêtes vers index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), directory, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on', port);
});
