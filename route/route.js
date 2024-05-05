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

// Route for adding a sub-task
router.post('/tasks/:tacheId/subtasks', controller.ajouterSousTache);

// Route for modifying a sub-task
router.put('/tasks/subtasks/:sousTacheId', controller.modifierSousTache);

// Route for deleting a sub-task
router.delete('/tasks/subtasks/:sousTacheId', controller.supprimerSousTache);

router.post('/users', controller.createUser);

router.put('/users/:userId/updateCle', controller.updateUser);

module.exports = router;