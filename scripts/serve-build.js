// Локальный сервер для просмотра собранного build/ (SPA-fallback как на проде)
const path = require('path');
const express = require('express');
const BUILD = path.resolve(__dirname, '..', 'build');
const PORT = process.env.PORT || 4100;
const app = express();
app.use(express.static(BUILD));
app.use((req, res) => res.sendFile(path.join(BUILD, 'index.html')));
app.listen(PORT, () => console.log(`serving build/ on http://localhost:${PORT}`));
