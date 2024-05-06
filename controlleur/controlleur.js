const model = require('../model/model.js');

const controlleur = {
     createUser: async (req, res) => {
        try {
            const {courriel, password } = req.body;
    
            
            
           
            const newUser = await model.createUser(courriel, password );
    
            
            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "An error occurred while creating the user." });
        }
    },
    
 updateUser: async (req, res) => {
    try {
        const userId = req.params.userId; 
        const password = req.headers['password'];
        const isValidPassword = await model.verifyCode(userId, password);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Unauthorized: Invalid password' });
        }
        
      
        const updatedUser = await model.updateUser(userId);

        res.status(200).json({
            success: true,
            message: 'User API key updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user API key:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user API key'
        });
    }
},
getAll: async (req, res) => {
    console.log("controlleur pass");
    const userId = req.params.id;
    const cleApi = req.headers['cle_api'];
    
    try {

        const isCleApiValid = await model.verifyCleApi(userId, cleApi);
        
        if (!isCleApiValid) {
            return res.status(401).json({ error: 'Unauthorized: Invalid cle_api' });
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
    
    try {
        // Verify the cle_api
        const isCleApiValid = await model.verifyCleApi(userId, cleApi);
        
        if (!isCleApiValid) {
            return res.status(401).json({ error: 'Unauthorized: Invalid cle_api' });
        }
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
        const cleApi = req.headers['cle_api'];
        try {
         
            const isCleApiValid = await model.verifyCleApi(userId, cleApi);
            
            if (!isCleApiValid) {
                return res.status(401).json({ error: 'Unauthorized: Invalid cle_api' });
            }
            const { utilisateurId, titre, description, dateDebut, dateEcheance } = req.body;
            const newTask = await model.ajouterTache(utilisateurId, titre, description, dateDebut, dateEcheance);
            res.status(201).json(newTask);
        } catch (error) {
            console.error("Error adding task:", error);
            res.status(500).json({ error: "Error adding task" });
        }
    },

    modifierTache: async (req, res) => {
        const cleApi = req.headers['cle_api']; 
    
        try {
          
            const isCleApiValid = await model.verifyCleApi(userId, cleApi);
            
            if (!isCleApiValid) {
                return res.status(401).json({ error: 'Unauthorized: Invalid cle_api' });
            }
            const { tacheId, titre, description, dateDebut, dateEcheance } = req.body;
            const modifiedTask = await model.modifierTache(tacheId, titre, description, dateDebut, dateEcheance);
            res.json(modifiedTask);
        } catch (error) {
            console.error("Error modifying task:", error);
            res.status(500).json({ error: "Error modifying task" });
        }
    },

    supprimerTache: async (req, res) => {
        const cleApi = req.headers['cle_api']; 
    
        try {
         
            const isCleApiValid = await model.verifyCleApi(userId, cleApi);
            
            if (!isCleApiValid) {
                return res.status(401).json({ error: 'Unauthorized: Invalid cle_api' });
            }
            const { tacheId } = req.params;
            const deletedTask = await model.supprimerTache(tacheId);
            res.json(deletedTask);
        } catch (error) {
            console.error("Error deleting task:", error);
            res.status(500).json({ error: "Error deleting task" });
        }
    },
    ajouterSousTache: async (req, res) => {
        const cleApi = req.headers['cle_api']; 
        try {
         
            const isCleApiValid = await model.verifyCleApi(userId, cleApi);
            
            if (!isCleApiValid) {
                return res.status(401).json({ error: 'Unauthorized: Invalid cle_api' });
            }
            const { tacheId, titre, complete } = req.body;
            const newSubTask = await model.ajouterSousTache(tacheId, titre, complete);
            res.status(201).json(newSubTask);
        } catch (error) {
            console.error("Error adding sub-task:", error);
            res.status(500).json({ error: "Error adding sub-task" });
        }
    },
    
    modifierSousTache: async (req, res) => {
        const cleApi = req.headers['cle_api']; 
        try {
          
            const isCleApiValid = await model.verifyCleApi(userId, cleApi);
            
            if (!isCleApiValid) {
                return res.status(401).json({ error: 'Unauthorized: Invalid cle_api' });
            }
            const { sousTacheId, titre, complete } = req.body;
            const modifiedSubTask = await model.modifierSousTache(sousTacheId, titre, complete);
            res.json(modifiedSubTask);
        } catch (error) {
            console.error("Error modifying sub-task:", error);
            res.status(500).json({ error: "Error modifying sub-task" });
        }
    },
    
    supprimerSousTache: async (req, res) => {
        const cleApi = req.headers['cle_api']; 
        try {
       
            const isCleApiValid = await model.verifyCleApi(userId, cleApi);
            
            if (!isCleApiValid) {
                return res.status(401).json({ error: 'Unauthorized: Invalid cle_api' });
            }
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