const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/documentation.json');
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "docs api"
};
app.use(morgan('dev')); 

// Dans votre fichier de démarrage
const cors = require('cors');

// Déclaration des middlewares
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//route de base pour le reste des route
app.use('/api/exam', require('./route/route'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
//garde le serveur ouvert
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 