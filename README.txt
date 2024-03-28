Bonjour monsieur,
Ci-dessous est décrit le fonctionnement de mon API.
JE l'ai fait avec Mongoos et je l'ai utilisé qu'en ligne de comande avec un CMD comme je ne savais pas comment faire autrement. 


Voila tout ce que j'ai implémenté : 
Récupération d’un défi
Récupération de multiples défis 
Ajout de défi 
Modification de défis
Suppression de défis

Il faudra sûrement faire npm install avant de lancé le projet
J'ai aussi mit dans le fichier /dataBase, un fichier json comportant quelques défis si vous avez envie de les implémentés dans mongo DB.
Je ne l'ai pas fait pour les user parce que les mots de passe était crypté et c'est plus facile d'en recréé un avec les comande ci-dessous.

Pour lancer le projet, il faut faire : node index.js

Voila le fonctionnement de mes comandes : 

/*************************************************POUR RECUPERER UN SEUL DEFIS AU HASARD***********************************************************/

curl http://localhost:3000/defis/random

/*************************************************POUR RECUPERER UN SEUL DEFIS AU HASARD**************************************************************/

curl http://localhost:3000/defis/random/NOMBRE
Vous pouvez mettre le nombre que vous voulez à la place du champ : NOMBRE

/*************************************************POUR S'INSCRIRE ET AVOIR LES DROITS POUR MODIFIER LA BASE******************************************/

curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"votre_nom_utilisateur\",\"password\":\"votre_mot_de_passe\"}" http://localhost:3000/auth/signup

Les champs à modifier sont : votre_nom_utilisateur
			     votre_mot_de_passe

/*************************************************POUR SE CONECTER**********************************************************************************/

curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"votre_nom_utilisateur\",\"password\":\"votre_mot_de_passe\"}" http://localhost:3000/auth/login

Les champs à modifier sont : votre_nom_utilisateur
			     votre_mot_de_passe
Si tout ce passe bien vous êtes alors inscrit en tant qu'Admin et vous avec un token qui est afficher. Ce dernier est à renseigné dans les comande necessitant le droit admin

/*************************************************POUR AJOUTER UN DEFIS***********************************************************************************/

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN_A_METTRE_ICI" -d "{\"titre\": \"TITRE_DU_DEFIS_AU_CHOIX\", \"description\": \"DESCRIPTION_DU_DEFIS_A_INSERRER_ICI\"}" http://localhost:3000/AjoutDefis


Les champs à modifer sont : TOKEN_A_METTRE_ICI 			(metter le token donné précédament)
			    TITRE_DU_DEFIS_AU_CHOIX 		(pour le titre du défis)
			    DESCRIPTION_DU_DEFIS_A_INSERRER_ICI (pour mettre la description du défis)


/*************************************************POUR SUPRIMER UN DEFIS***********************************************************************************/

curl -X DELETE -H "Authorization: Bearer TOKEN_A_METTRE_ICI" http://localhost:3000/DeletDefis/ID_DU_DEFIS


Les champs à modifer sont : TOKEN_A_METTRE_ICI 	(metter le token donné précédament)
			    ID_DU_DEFIS		(c'est l'ID du défis à suprimer)


/*************************************************POUR MODIFIER UN DEFIS***********************************************************************************/

curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN_A_METTRE_ICI" -d "{\"titre\": \"NOUVEAU_TITRE_DU_DEFIS_AU_CHOIX\", \"description\": \"NOUVELLE_DESCRIPTION_DU_DEFIS_A_INSERRER_ICI\"}" http://localhost:3000/ModificationDefis/ID_DU_DEFIS


Les champs à modifer sont : TOKEN_A_METTRE_ICI 					(metter le token donné précédament)
			    NOUVEAU_TITRE_DU_DEFIS_AU_CHOIX			(Pour le nouveau titre)
			    NOUVELLE_DESCRIPTION_DU_DEFIS_A_INSERRER_ICI 	(pour la nouvelle description)






