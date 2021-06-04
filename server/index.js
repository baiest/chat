const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.set('port', PORT);

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))

app.use(express.static(path.join("../build")));