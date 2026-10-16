/**
 * @see https://laconsole.dev/
 * Cours théoriques sur les bases JavaScript
 */

// Revoir sur laconsole.dev :
// - Déclaration de variable
// - Types Primitifs de données
// - Le type Objet + Array (tableaux, qui sont aussi un type d'Objet)
// - Les fonctions + leurs différentes ecritures

function addition(n1, n2) {
  // n1 et n2 sont des paramètres
  const resultat = n1 + n2;
  return resultat; // return va retourner le résultat pour le rendre disponible en dehors de la fonction
}

const a1 = addition(3, 4); // On transmets des valeurs en tant qu'arguments, ici 3 pour n1 et 4 pour n2
const a2 = addition(1, 2);
const a3 = addition(5, 9);

// Log ici est une fonction rattachée à un objet, qu'on appelle une méthode
console.log(a1, a2, a3);

const voiture = {
  moteur: "Diesel", // Variable rattaché à un objet qu'on appelle une propriété
  demarre() {
    // ici une méthode nommée demarre
  },
};

voiture.demarre();

const titre = document.querySelector("h1"); // appel de la méthode querySelector sur l'objet document pour aller rechercher un élément du DOM

// addEventListener c'est pour ajouter un écouteur d'évènement
titre.addEventListener("click", function (event) {
  console.log(event); // Représente un objet contenant des informations sur l'évènement du click
  // Ici, le code de cette fonction anonyme (une fonction sans nom) va s'executer lorsque l'on clique sur le titre
  console.log("Clique sur le titre");
});

// Différentes écritures d'une fonction

// Classique
function A()

// Fonction nommée. Ici la fonction s'appelle "addition"
function addition(n1, n2) {
  return n1 + n2;
}

// Méthode (fonction rattachée à un objet) nommée
const math = {
  multiplication(a, b) {
    return a * b;
  },
};

// fonction dites "anonyme"
(function (mot) {
  return mot.split(" ");
})("une phrase decomposee");

// fonction anonyme affectée à une variable nommée "soustraction"
const soustraction = function (a, b) {
  return a - b;
};

// Fonction anonyme associée à une clé d'un objet, grosso modo ça fera le même résultat que sur l'objet math
// avec la méthode de multiplication
const math2 = {
  division: function (a, b) {
    return a / b;
  },
};

document.addEventListener("click", function () {});

// fonction anonyme (à droite avant l'affectation)
let addition = function (a, b) {
  return a + b;
};

// fonction fléchée
addition = (a, b) => {
  return a + b;
};

// fonction fléchée avec retour implicite
// Si une seule instruction dans le corps de la fonction, le return est implicite (on enlève les accolades)
addition = (a, b) => a + b;



Mes exercices :
// 1. Création de variables
const age = 25;
const nom = "Sabine"
console.log(age, nom);

//2. Création de types primitifs
const texte = "Bonjour";
const number = 25;
const vraiOufaux = true; // ou false
const vide = null;

//3. Création d'un objet
const personnage = {
  nom: "Sabine",
  vie: 25,
  estVivant: true,
}

//4. Création d'une fonction 
function soustraction(n1, n2){
  return n1 - n2;
}

soustraction = (n1,n2) => n1 - n2;

function direBienvenue(prenom){
  console.log ("Bienvenue " + prenom);
}

//5. Mélanger les notions
const chien = {
  nom: "Volt",
  aboyer: function() {
    console.log("Wouf");
  }
};
chien.aboyer();

const personnage = [nom, vie, estVivant];

console.log (personnage [0], personnage [1], personnage [2]);


//6. Écriture de fonctions 
function carre(n){
  return n*n;
}

carre = (n) => n*n;

carre = n => n*n;

const calculatrice = { 
  addition (a,b) {
    return a + b;
  },
  soustraction (a,b) {
    return a - b;
  }
}
console.log(calculatrice.addition(1,2), calculatrice.soustraction(1,2));

function (Sabine){
  return "Salut " + Sabine;
}
console.log("Salut " + Sabine);

document.addEventListener("click", function() {
  console.log("Tu as cliqué !");
}
