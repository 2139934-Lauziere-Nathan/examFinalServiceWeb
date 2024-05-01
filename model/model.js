const db = require("../.src/config/pg_db.js").default;


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
                    resolve(result);
                }
            });
        });
    }
};
module.exports = mod;