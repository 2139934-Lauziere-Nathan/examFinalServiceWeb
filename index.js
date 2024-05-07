const express = require('express');

const app = express();
const PORT = 3000;
// Dans votre fichier de démarrage
const cors = require('cors');

// Déclaration des middlewares
app.use(cors());

app.use(express.json());
/*
app.get('/', (req, res) => {
    res.send("<p>index</p>");
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
*/
//route de base pour le reste des route
app.use('/api/exam', require('./route/route'));

//garde le serveur ouvert
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 