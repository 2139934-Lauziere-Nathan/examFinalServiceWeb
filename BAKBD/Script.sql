CREATE TABLE public.uilisateur (
id INT primary key,
nom VARCHAR(30),
prenom VARCHAR(30),
courriel VARCHAR(255),
cle_api VARCHAR(30),
password VARCHAR(100)
);
CREATE TABLE public.taches (
id INT primary key,
utilisateur_id INT,
titre VARCHAR(100),
description VARCHAR(100),
date_debut DATE,
date_echeance DATE,
complete SMALLINT,
FOREIGN KEY (utilisateur_id) REFERENCES uilisateur (id)
);
CREATE TABLE public.sous_taches (
id INT primary key,
tache_id INT,
titre VARCHAR(100),
complete SMALLINT,
FOREIGN KEY (tache_id) REFERENCES taches (id)
);

INSERT INTO public.uilisateur (id,nom,prenom,courriel,cle_api,password)
VALUES (1,'test','pretest','test@test.tes', 123456789, 'testpass');

insert into public.taches (id, utilisateur_id, titre, description, date_debut, date_echeance, complete)
VALUES(3,1,'tache1', 'desc', '2024-12-01','2024-12-02',0);

SELECT * FROM public.taches WHERE utilisateur_id = 1;