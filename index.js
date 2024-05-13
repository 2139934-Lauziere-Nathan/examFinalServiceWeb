const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
const morgan = require('morgan')

app.use(morgan('dev')); 

// Dans votre fichier de démarrage
const cors = require('cors');

// Déclaration des middlewares
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//route de base pour le reste des route
app.use('/api/exam', require('./route/route'));

//garde le serveur ouvert
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 