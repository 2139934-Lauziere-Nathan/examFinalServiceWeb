const express = require('express');

const app = express();
const PORT = 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send("<p>index</p>");
});
//route de base pour le reste des route
app.use('/api/exam', require('./route/route'));
var pageURL = './index.html';
        
// Redirect the browser to the specified page
window.location.href = pageURL;
//garde le serveur ouvert
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 