DROP TABLE IF EXISTS public.sous_taches;
DROP TABLE IF EXISTS public.taches;
DROP TABLE IF EXISTS public.utilisateur;

CREATE TABLE public.utilisateur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(30),
    prenom VARCHAR(30),
    courriel VARCHAR(255),
    cle_api VARCHAR(30),
    password VARCHAR(100)
);

CREATE TABLE public.taches (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT,
    titre VARCHAR(100),
    description VARCHAR(100),
    date_debut DATE,
    date_echeance DATE,
    complete SMALLINT,
    FOREIGN KEY (utilisateur_id) REFERENCES public.utilisateur (id)
);

CREATE TABLE public.sous_taches (
    id SERIAL PRIMARY KEY,
    tache_id INT,
    titre VARCHAR(100),
    complete SMALLINT,
    FOREIGN KEY (tache_id) REFERENCES public.taches (id)
);

INSERT INTO public.utilisateur (nom, prenom, courriel, cle_api, password)
VALUES ('test', 'pretest', 'test@test.tes', '123456789', 'testpass');

INSERT INTO public.taches (utilisateur_id, titre, description, date_debut, date_echeance, complete)
VALUES (1, 'tache1', 'desc', '2024-12-01', '2024-12-02', 0);


