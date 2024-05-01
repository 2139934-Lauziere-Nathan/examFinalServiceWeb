const model = require('../model/model.js');

const controlleur = {
getall: async (req, res) => {
    console.log("controlleur pass");
    const auteur_id = req.params.id;
    console.log(auteur_id);

    model.getAll(auteur_id)
    .then(result => {
        res.send(result);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des tâches :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    });

 
}};

module.exports = controlleur;