const express = require('express');

const app = express();
const PORT = 3000;
// Dans votre fichier de démarrage
const cors = require('cors');

// Déclaration des middlewares
app.use(cors());

app.use(express.json());

//route de base pour le reste des route
app.use('/api/exam', require('./route/route'));

//garde le serveur ouvert
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 