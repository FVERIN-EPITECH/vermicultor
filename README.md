# vermicultor
Ce projet est un projet personnel ayant pour but de créer un environnement auto-gérer pour l'élevage de ver de farine aussi appelé Tenebrion Meunier

L'environnement d'un Tenebrion est similaire de la phase larvaire, nymphatique et adulte. Pour une reproduction et une croissance rapide le Tenebrion à besoin de trois éléments clés:
    - Température
    - Humidité
    - Obscurité
    - Nourriture

Introduction:

La gestion de l'environnement se fera à l'aide d'un micro-controller ESP32 avec la référence 'ESP32 NodeMCU Module WLAN WiFi Dev Kit C Development Board avec CP2102', de composant électronique tel que le DHT22 pour la prise de température ainsi que de l'humidité, d'un module de transducteur à ultrason.

Pour le moment, le projet n'ayant pas terminé je suppose l'utilisation d'une ampoule chauffante en céramique de 75W pour pouvoir réhausser la température si nécessaire mais aussi au maintien de celle-ci tout en émettant aucune lumière nuisant au développement des insectes, ensuite pour l'humidité je suis encore en train de me renseigner sur l'utilisation des transducteurs à ultrason afin de maintenir l'humidité de l'environnement.

Tout ceci, sera installer dans une box de culture indoor afin d'avoir un environnement isotherme et protéger des facteurs contaminant pour y conserver un maximum la stabilité du milieu d'élevage et donc éviter les déperditions de chaleur ou d'humidité qui pourrait causer une surconsommation d'énergie inutile.

Le projet se décompose en plusieurs partie:
    - Micro-Controlleur, avec le developpement du code en C ainsi que la partie électronique qui demandera la création du circuit électronique et d'un boitier avec une imprimante 3D

    - Developpement de la partie numérique elle même décomposer en plusieurs sous parties
        - Back-end avec NodeJs et ExpressJs ainsi que MongoDb pour le stockage des données
        - Front-End avec ReactJs

    - Deploiement du serveur en local sur un RaspberryPi



