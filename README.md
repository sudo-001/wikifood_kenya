# WIKIFOOD KENYA

WIKIFOOD KENYA est une application web interactive destinée à explorer et à gérer une collection de plats traditionnels kényans. Utilisant la technologie des ontologies pour structurer les données, cette application permet aux utilisateurs de visualiser, de rechercher et d'ajouter des informations sur différents plats et leurs ingrédients.

# Fonctionnalités

    - Affichage dynamique : Les utilisateurs peuvent voir les plats listés avec des détails tels que le nom, la description, et une image.
    - Requêtes préparées : Sélectionner et exécuter différentes requêtes SPARQL préconçues pour interroger l'ontologie, comme voir toutes les classes, les sous-classes, et les instances.
    - Recherche personnalisée : Les utilisateurs peuvent écrire et exécuter leurs propres requêtes SPARQL directement à travers une interface utilisateur intuitive.
    - Ajout de nouveaux plats : Interface modale pour ajouter facilement de nouveaux plats à l'ontologie directement depuis le navigateur.
    
# Technologies Utilisées

    - HTML/CSS : Pour la structure et le style de l'interface utilisateur.
    - JavaScript : Pour la logique frontale, la manipulation des données SPARQL, et les interactions avec l'utilisateur.
    - Apache Jena Fuseki : Serveur backend utilisé pour gérer et interroger l'ontologie RDF.
    - TailwindCSS : Framework CSS pour un design responsive et moderne.
    - RDF/OWL : Utilisés pour structurer les données des plats dans une ontologie formelle.
    
# Prérequis
Avant de pouvoir utiliser l'application assurez-vous d'avoir 
- <a href="https://jena.apache.org/download/index.cgi" >Apache Jena Fuseki</a> installé sur votre machine.
- <a href="https://www.oracle.com/java/technologies/downloads/">Java</a> installé sur votre machine ( java 17 recommandé ).

# Installation de l'application
1. Ouvrir un terminal dans le dossier dans le quel est Jena Fuseki sur votre machine
2. Lancer le serveur de jena Fuseki avec la commande ci-dessous
  ./fuseki-server
4. Uploader l'ontologie dans Jena Fuseki :
    - Accédez à l'interface web de Jena Fuseki à l'adresse http://localhost:3030/.
    - Cliquez sur "Manage Datasets" puis sur "Add New Dataset".
    - Entrez le nom du dataset ici ce sera : "kenya_dataset" et cliquez sur "Create Dataset".
    - Cliquez sur le nom du dataset que vous venez de créer, puis sur "Upload Data".
    - Sélectionnez le fichier d'ontologie (RDF) à la racine de ce projet web : "kenya_ontology.rdf" à uploader et cliquez sur "Upload Now".
  5. Lancer l'application : Pour ça Ouvrez le fichier "index.html" dans un navigateur web pour démarrer l'application.

# Utilisation de l'application
- Utilisez les menus déroulants et les champs de saisie pour interagir avec les données de l'ontologie.
- Consultez le fichier script.js pour comprendre la logique de l'application.


# Remarque
Ce projet est réalisé dans le cadre d'un cours sur les technologies web. N'hésitez pas à me contacter pour toute question ou suggestion.
