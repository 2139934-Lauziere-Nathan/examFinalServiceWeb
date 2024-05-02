const db = require("../src/config/pg_db");


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
                    console.log("resolve");
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
                LEFT JOIN public.sous_taches ON taches.id = sous_taches.tache_id
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
                        // If no task found, resolve with null or appropriate message
                        resolve(null);
                        return;
                    }
    
                    // Extract main task details
                    const mainTask = result.rows[0];
                    const taskDetails = {
                        titre: mainTask.titre,
                        description: mainTask.description,
                        date_debut: mainTask.date_debut,
                        sous_taches: []
                    };
    
                    // Organize sub-tasks into an array
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
    }    
};
module.exports = mod;