# Fonctionnalité login : amélioration

Séparer les responsabilités du mode édition et du login.amélioration

## Login

```js
const response = await fetch(`${BASE_URL}/users/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: email,
    password: password,
  }),
});
```

Extraire ce code pour le mettre dans le module API (`auth.js`). L'idée c'est d'avoir un module qui gère les appels HTTP pour l'authentification :

- `login()`
- `logout()`
- `isAuthenticated()`

Mettre à jour le code pour utiliser cette nouvelle API d'authentification.

## editMode

editMode est un bout de code UI qui permet d'afficher ou de désafficher le mode "édition"

- Un parametre pour savoir si on est en mode édition
- Un parametre de callback, que la fonction va lancer lorsque l'on clique sur le logout
- Plus de reload
