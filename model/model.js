const db = require("../src/config/pg_db");
const uuidv4 = require('uuid');
const bcrypt = require('bcrypt');
const mod = {
    getAll: (id) => {
        console.log(id);
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM public.taches WHERE utilisateur_id = $1';
            const value = [id]
            db.query(query, value, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    
                    resolve(result.rows);
                }
            });
        });
    },
   
    afficherDetail: (taskId) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT taches.titre, taches.description, taches.date_debut, sous_taches.titre AS sous_titre, sous_taches.complete AS sous_complete
                FROM public.taches
                INNER JOIN public.sous_taches ON taches.id = sous_taches.tache_id
                WHERE taches.id = $1;
            `;
            const values = [taskId];
            console.log(values);
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.rows.length === 0) {
                        console.log("erreur model", values)
                        resolve(null);
                        return;
                    }
    
                   
                    const mainTask = result.rows[0];
                    const taskDetails = {
                        titre: mainTask.titre,
                        description: mainTask.description,
                        date_debut: mainTask.date_debut,
                        sous_taches: []
                    };
    
                   
                    result.rows.forEach(row => {
                        if (row.sous_titre) {
                            taskDetails.sous_taches.push({
                                titre: row.sous_titre,
                                complete: row.sous_complete
                            });
                        }
                    });
    
                    resolve(taskDetails);
                }
            });
        });
    },

    ajouterTache: (utilisateurId, titre, description, dateDebut, dateEcheance) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO public.taches (utilisateur_id, titre, description, date_debut, date_echeance, complete)
                VALUES ($1, $2, $3, $4, $5, 0);
                
            `;
            const values = [utilisateurId, titre, description, dateDebut, dateEcheance];
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            });
        });
    },
    modifierTache: (tacheId, titre, description, dateDebut, dateEcheance) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE public.taches 
                SET titre = $2, description = $3, date_debut = $4, date_echeance = $5
                WHERE id = $1;
            `;
            const values = [tacheId, titre, description, dateDebut, dateEcheance];
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            });
        });
    },
    supprimerTache: (tacheId) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM public.taches
                WHERE id = $1;
            `;
            const values = [tacheId];
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            });
        });
    },
    ajouterSousTache: (tacheId, titre, complete) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO public.sous_taches (tache_id, titre, complete)
                VALUES ($1, $2, $3);
            `;
            const values = [tacheId, titre, complete];
            db.query(query, values, (err, result) => {
                if (err) {
                    console.log("erreur dans model");
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            });
        });
    },
    
    modifierSousTache: (sousTacheId, titre, complete) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE public.sous_taches 
                SET titre = $2, complete = $3
                WHERE id = $1;
            `;
            const values = [sousTacheId, titre, complete];
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            });
        });
    },
    
    supprimerSousTache: (sousTacheId) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM public.sous_taches
                WHERE id = $1;
            `;
            const values = [sousTacheId];
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            });
        });
    }  ,
    
    
     createUser: async (courriel, password) => {
        try {
           
            let cle_api = uuidv4.v4();
            cle_api = cle_api.substring(0, 30);
    
            console.log("P",password);
            let hashedPassword = await bcrypt.hash(password, 10);
            hashedPassword = hashedPassword.substring(0,30);
            const query = `
                INSERT INTO public.utilisateur (courriel, cle_api, password)
                VALUES ($1, $2, $3);
            `;
            const values = [courriel, cle_api, hashedPassword];
            const result = db.query(query, values);
            console.log(values[0],values[1],values[2]);
            return result.cle_api; 
        } catch (error) {
            throw error;
        }
    },
    updateUser: async (userId) => {
        try {
            let newCleApi = uuidv4.v4();
            newCleApi = newCleApi.substring(0, 30);
    
            const query = `
                UPDATE public.utilisateur 
                SET cle_api = $1
                WHERE id = $2;
            `;
            const values = [newCleApi, userId];
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    } ,
    verifyCleApi: async (userId, cleApi) => {
        try {
            const query = `
                SELECT id FROM public.utilisateur
                WHERE id = $1 AND cle_api = $2;
            `;
            const values = [userId, cleApi];
            const result = await db.query(query, values);
            return result.rows.length > 0; 
        } catch (error) {
            throw error;
        }
    },
    verifyCode: async (userId, password) => {
        try {
            let hashedPassword = await bcrypt.hash(password, 10);
            hashedPassword = hashedPassword.substring(0,30);
            const query = `
                SELECT id FROM public.utilisateur
                WHERE id = $1 AND password = $2;
            `;
            const values = [userId, hashedPassword];
            const result = await db.query(query, values);
            return result.rows.length > 0; 
        } catch (error) {
            throw error;
        }
    }      
};
module.exports = mod;