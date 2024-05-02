const model = require('../model/model.js');

const controlleur = {
getall: async (req, res) => {
    console.log("controlleur pass");
    const auteur_id = req.params.id;
    console.log(auteur_id);
    try {
        const tache = await model.getAll(auteur_id);
        if (!tache) {
            res.status(404).json({ error: `auteur: ${auteur_id} introuvable` });
        } else {
            res.json(tache);
        }
    } catch (error) {
        console.error(`Error fetching tache with ID ${auteur_id}:`, error);
        res.status(500).json({ error: 'erreur serveur interne' });
    }
},
afficherDetail: async (req, res) => {
    try {
        const taskId  = req.params.taskId;
        console.log(taskId);
        const taskDetails = await model.afficherDetail(taskId);
        res.json(taskDetails);
    } catch (error) {
        console.error("Error fetching task details:", error);
        res.status(500).json({ error: "Error fetching task details" });
    }
},
    ajouterTache: async (req, res) => {
        try {
            const { utilisateurId, titre, description, dateDebut, dateEcheance } = req.body;
            const newTask = await model.ajouterTache(utilisateurId, titre, description, dateDebut, dateEcheance);
            res.status(201).json(newTask);
        } catch (error) {
            console.error("Error adding task:", error);
            res.status(500).json({ error: "Error adding task" });
        }
    },

    modifierTache: async (req, res) => {
        try {
            const { tacheId, titre, description, dateDebut, dateEcheance } = req.body;
            const modifiedTask = await model.modifierTache(tacheId, titre, description, dateDebut, dateEcheance);
            res.json(modifiedTask);
        } catch (error) {
            console.error("Error modifying task:", error);
            res.status(500).json({ error: "Error modifying task" });
        }
    },

    supprimerTache: async (req, res) => {
        try {
            const { tacheId } = req.params;
            const deletedTask = await model.supprimerTache(tacheId);
            res.json(deletedTask);
        } catch (error) {
            console.error("Error deleting task:", error);
            res.status(500).json({ error: "Error deleting task" });
        }
    },
    ajouterSousTache: async (req, res) => {
        try {
            const { tacheId, titre, complete } = req.body;
            const newSubTask = await model.ajouterSousTache(tacheId, titre, complete);
            res.status(201).json(newSubTask);
        } catch (error) {
            console.error("Error adding sub-task:", error);
            res.status(500).json({ error: "Error adding sub-task" });
        }
    },
    
    modifierSousTache: async (req, res) => {
        try {
            const { sousTacheId, titre, complete } = req.body;
            const modifiedSubTask = await model.modifierSousTache(sousTacheId, titre, complete);
            res.json(modifiedSubTask);
        } catch (error) {
            console.error("Error modifying sub-task:", error);
            res.status(500).json({ error: "Error modifying sub-task" });
        }
    },
    
    supprimerSousTache: async (req, res) => {
        try {
            const { sousTacheId } = req.params;
            const deletedSubTask = await model.supprimerSousTache(sousTacheId);
            res.json(deletedSubTask);
        } catch (error) {
            console.error("Error deleting sub-task:", error);
            res.status(500).json({ error: "Error deleting sub-task" });
        }
    }
};



module.exports = controlleur;