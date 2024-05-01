const express = require('express');
const router = express.Router();    
const controller = require('../controlleur/controlleur.js');


//creation de la route pour tout afficher
router.get('/tous/:id', controller.getall);
router.get('/taskDetails/:taskId', controller.afficherDetail);

// Route for adding a task
router.post('/addTask', controller.ajouterTache);

// Route for modifying a task
router.put('/updateTask/:tacheId', controller.modifierTache);

// Route for deleting a task
router.delete('/deleteTask/:tacheId', controller.supprimerTache);

module.exports = router;