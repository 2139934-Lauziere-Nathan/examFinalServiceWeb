const express = require('express');
const router = express.Router();    
const controller = require('../controlleur/controlleur.js');


//creation de la route pour tout afficher
router.get('/tous/:userId', controller.getAll);

//route pour afficher les detail a propos d'une route par son id
router.get('/taskDetails/:userId/:taskId', controller.afficherDetail);

// Route pour ajouter une tache 
router.post('/addTask', controller.ajouterTache);

// Route pour modifier une tache
router.put('/updateTask/:userId/:tacheId', controller.modifierTache);

// Route pour supprimer une tache
router.delete('/deleteTask/:userId', controller.supprimerTache);

// Route pour ajouter une sous tache
router.post('/tasks/subtasks/:userId/:tacheId', controller.ajouterSousTache);

// Route pour metre a jour une sous tache
router.put('/tasks/subtasks/:userId', controller.modifierSousTache);

// Route pour supprimer une sous-tache
router.delete('/tasks/subtasks/:userId', controller.supprimerSousTache);

// Route pour ajouter une utilisateur avec uniquement un email et un password
router.post('/users', controller.createUser);

//route pour metre a jour la cle api
router.put('/users/updateCle', controller.updateUser);

module.exports = router;