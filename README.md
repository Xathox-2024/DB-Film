Liste de Films - TP

Bienvenue dans le projet de TP sur la gestion d'une liste de films ! Ce projet est une application simple permettant d'ajouter, de consulter, de modifier et de supprimer des films. Il peut servir de base pour apprendre les concepts fondamentaux de la programmation, de la gestion des bases de données ou du développement web.

Fonctionnalités

Ajouter un film avec des détails (titre, réalisateur, année de sortie, genre, etc.).

Afficher une liste des films enregistrés.

Modifier les informations d'un film.

Supprimer un film de la liste.

Filtrer ou rechercher des films selon différents critères.

c'est un projet que j'ai conçu avec youseff pour les amateurs de cinéma. Ce site permet à chaque utilisateur de gérer facilement une collection de films, tout en offrant une expérience personnalisée grâce à la création de comptes.

Fonctionnalités principales

    Création de comptes utilisateurs :
    Chaque utilisateur peut se créer un compte en quelques clics. Cela permet de sauvegarder et personnaliser ses actions, comme ajouter ou supprimer des films dans sa collection.

    Ajout de films :
    Vous pouvez facilement ajouter vos films préférés en indiquant leur titre, leur genre, ou d'autres détails. Une interface intuitive rend cette action rapide et agréable.

    Suppression de films :
    Si un film ne fait plus partie de votre collection ou que vous voulez réorganiser votre liste, vous pouvez le supprimer en un clic.

    Objectif du projet

    Mon objectif était de créer un outil simple et efficace pour permettre aux utilisateurs de gérer leur propre bibliothèque de films

    Démonstration (si possible)

    Je vais maintenant vous montrer comment fonctionne le site :
        D'abord, nous allons créer un compte.
        Ensuite, nous ajouterons un film dans la collection.
        Enfin, nous verrons comment supprimer un film.

try :

    Le code placé à l'intérieur du bloc try est exécuté normalement.
    Si une erreur ou une exception est levée pendant l'exécution du code, l'exécution s'arrête dans le bloc try, et le contrôle passe immédiatement au bloc catch.

catch :

    Le bloc catch est utilisé pour capturer et gérer l'exception levée dans le bloc try.
    Vous pouvez accéder à l'erreur à l'aide du paramètre spécifié (par exemple, erreur dans l'exemple).
    Ce bloc n'est exécuté que si une erreur est levée dans le bloc try.

finally (facultatif) :

    Le bloc finally contient du code qui s'exécute dans tous les cas, que le code dans le bloc try ait levé une exception ou non.
    Il est souvent utilisé pour effectuer des opérations de nettoyage, comme fermer des connexions ou libérer des ressources.

await est un mot-clé utilisé pour simplifier la gestion des promesses. Il permet de rendre un code asynchrone plus lisible et d'éviter les chaînes complexes de then.

Fonctionnement de await

    await est utilisé uniquement dans une fonction async :
        Une fonction déclarée avec le mot-clé async peut utiliser await pour attendre qu'une promesse soit résolue.
        Si vous essayez d'utiliser await en dehors d'une fonction async, une erreur sera générée.

    Pause l'exécution :
        Lorsqu'il est utilisé, await suspend l'exécution de la fonction async jusqu'à ce que la promesse qu'il attend soit résolue ou rejetée.
        Cela ne bloque pas le fil d'exécution principal (thread principal), permettant à d'autres parties du programme de continuer à s'exécuter.

    Résultat d'une promesse :
        Si la promesse est résolue, await renvoie sa valeur.
        Si la promesse est rejetée, une exception est levée, que vous pouvez gérer avec un bloc try...catch.
