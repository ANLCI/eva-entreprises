import express from 'express'; // Use import for ESM
const app = express();

const directory = '/' + (process.env.STATIC_DIR || 'dist');
app.use(express.static(process.cwd() + directory));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on', port);
});
