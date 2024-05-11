const model = require('../model/model.js');

const controlleur = {
     createUser: async (req, res) => {
        try {
            const courriel = req.body.courriel;
            const password = req.body.password;
    
            
            
            console.log(courriel);
            console.log(password);
            const newUser = await model.createUser(courriel, password );
            const retour = await model.getLastUser();
            console.log(retour);
            res.status(201).json(retour);
        } catch (error) {

            console.error("Error creating user:", error);
            res.status(500).json({ error: "erreur lors de la creation de l'utilisateur" });
        }
    },
    
 updateUser: async (req, res) => {
    try {
        const userId = req.body.userId; 
        console.log(userId);
       
        const password = req.body.password;
        console.log(password);
        const isValidPassword = await model.verifyCode(userId, password);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: 'mot de passe invalide' });
        }
        
      
        const updatedUser = await model.updateUser(userId);

        res.status(200).json({
            success: true,
            message: 'cle api mis a jours',
            test: "test",
            user: updatedUser
        });
    } catch (error) {
        console.error('erreur lors de la mise a jour:', error);
        res.status(500).json({
            success: false,
            message: 'echec de la mise a jour'
        });
    }
},
getAll: async (req, res) => {
   
    const userId = req.params.userId;
    const cleApi = req.headers['cle_api'];
    
    try {

        const isCleApiValid = await model.verifyCleApi(userId, cleApi);
        
        if (!isCleApiValid) {
            return res.status(401).json({ error: 'cle api non autoriser' });
        }
        
      
        const tasks = await model.getAll(userId);
        
        if (!tasks) {
            res.status(404).json({ error: `Utilisateur avec l'ID ${userId} introuvable` });
        } else {
            res.json(tasks);
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération des tâches pour l'utilisateur avec l'ID ${userId}:`, error);
        res.status(500).json({ error: 'Erreur serveur interne' });
    }
}
,
afficherDetail: async (req, res) => {
    const cleApi = req.headers['cle_api']; 
    const Id = req.params.userId
    try {
        // Verify the cle_api
        const isCleApiValid = await model.verifyCleApi(Id, cleApi);
        console.log(Id);
        console.log(cleApi);
        if (!isCleApiValid) {
            return res.status(401).json({ error: 'cle api non autoriser' });
        }
        const taskId  = req.params.taskId;
        console.log(taskId);
        const taskDetails = await model.afficherDetail(taskId);
        res.json(taskDetails);
    } catch (error) {
        console.error("erreur a la recuperation des detail:", error);
        res.status(500).json({ error: "erreur a la recuperation des detail" });
    }
},
    ajouterTache: async (req, res) => {
        const cleApi = req.headers['cle_api'];
        const userId = req.params.userId;
        try {
         
            const isCleApiValid = await model.verifyCleApi(userId, cleApi);
            
            if (!isCleApiValid) {
                return res.status(401).json({ error: 'cle api non autoriser' });
            }
            const { utilisateurId, titre, description, dateDebut, dateEcheance } = req.body;
            const newTask = await model.ajouterTache(utilisateurId, titre, description, dateDebut, dateEcheance);
            res.status(201).json(newTask);
        } catch (error) {
            console.error("erreur a l'ajout de la tache:", error);
            res.status(500).json({ error: "erreur a l'ajout de la tache" });
        }
    },

    modifierTache: async (req, res) => {
        const cleApi = req.headers['cle_api']; 
        const userId = req.params.userId;
    
        try {
          
            const isCleApiValid = await model.verifyCleApi(userId, cleApi);
            
            if (!isCleApiValid) {
                return res.status(401).json({ error: 'cle api non autoriser' });
            }
            const { tacheId, titre, description, dateDebut, dateEcheance } = req.body;
            const modifiedTask = await model.modifierTache(tacheId, titre, description, dateDebut, dateEcheance);
            res.json(modifiedTask);
        } catch (error) {
            console.error("erreur a la modification de la tache:", error);
            res.status(500).json({ error: "erreur a la modification de la tache" });
        }
    },

    supprimerTache: async (req, res) => {
        const cleApi = req.headers['cle_api']; 
        const userId = req.params.userId;
        try {
         
            const isCleApiValid = await model.verifyCleApi(userId, cleApi);
            
            if (!isCleApiValid) {
                return res.status(401).json({ error: 'cle api non autoriser' });
            }
            const { tacheId } = req.body.tacheId;
            const deletedTask = await model.supprimerTache(tacheId);
            res.json(deletedTask);
        } catch (error) {
            console.error("erreur a la suppression de la tache:", error);
            res.status(500).json({ error: "erreur a la suppression de la tache" });
        }
    },
    ajouterSousTache: async (req, res) => {
        const cleApi = req.headers['cle_api']; 
        const userId = req.params.userId;
        try {
         
            const isCleApiValid = await model.verifyCleApi(userId, cleApi);
            
            if (!isCleApiValid) {
                return res.status(401).json({ error: 'cle api non autoriser' });
            }
            const { tacheId, titre, complete } = req.body;
           
            const newSubTask = await model.ajouterSousTache(tacheId, titre, complete);
            res.status(201).json(newSubTask);
        } catch (error) {
            console.error("erreur a l'ajout de la sous-tache:", error);
            res.status(500).json({ error: "erreur a l'ajout de la sous-tache" });
        }
    },
    
    modifierSousTache: async (req, res) => {
        const cleApi = req.headers['cle_api']; 
        const userId = req.params.userId;
        try {
          
            const isCleApiValid = await model.verifyCleApi(userId, cleApi);
            
            if (!isCleApiValid) {
                return res.status(401).json({ error: 'cle api non autoriser' });
            }
            const { sousTacheId, titre, complete } = req.body;
            const modifiedSubTask = await model.modifierSousTache(sousTacheId, titre, complete);
            res.json(modifiedSubTask);
        } catch (error) {
            console.error("erreur a la modification de la sous tache:", error);
            res.status(500).json({ error: "erreur a la modification de la sous tache" });
        }
    },
    
    supprimerSousTache: async (req, res) => {
        const cleApi = req.headers['cle_api']; 
        const userId = req.params.userId;
        try {
       
            const isCleApiValid = await model.verifyCleApi(userId, cleApi);
            
            if (!isCleApiValid) {
                return res.status(401).json({ error: 'cle api non autoriser' });
            }
            const { sousTacheId } = req.body;
            const deletedSubTask = await model.supprimerSousTache(sousTacheId);
            res.json(deletedSubTask);
        } catch (error) {
            console.error("erreur a la suppression de la sous-tache:", error);
            res.status(500).json({ error: "erreur a la suppression de la sous-tache" });
        }
    }
};



module.exports = controlleur;