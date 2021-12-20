# Suns

#### App demo: https://sunsents-sunrises.herokuapp.com/
#### Login
 - email: hola@hola.com 
 - password: hola


### Description

Allows you to save and search the best places where you can see beautiful sunrises or sunsets


### App functionalities

It uses Google Maps API to save and show location.

### Server Install

```sh
npm install
```

### Server Usage

```sh
npm run dev
```

### Server .env variables needed

- PORT=5005
- ORIGIN=http://localhost:3000
- MONGODB_URI
- SESS_SECRET
- CLOUDINARY_NAME
- CLOUDINARY_KEY
- CLOUDINARY_SECRET
- GOOGLE_API_KEY

### Endpoints

1. get /  --------- Presentación de la Web
2. get /signup  --------- Formulario de registro
3. post /signup --------- Guarda en la BBDD al usuario
4. get /login  --------- Formulario para Iniciar sesión
5. get /login  --------- Formulario para Iniciar sesión
6. get /profile  --------- Página principal para elegir
7. get /sunsets  --------- Muestra la lista de atardeceres
8. get /profile/sunsets/new  --------- Muestra el formulario para crear una puesta de sol
9. post /profile/sunsets/new  --------- Guarda en la BBDD una una puesta de sol
10. get/profile/sunrises/new --------- Muestra el formulario para crear un amanecer
11. post /profile/sunrises/new --------- Guarda en la BBDD un amanecer
12. get /sunrises --------- Muestra la lista de amaneceres
13. get /sunrises/:id --------- Muestra los detalles de un amanecer
14. get /profile/sunrises/:id/delete --------- Elimina de la BBDD un amanecer
15. get /profile/sunrises/:id/edit --------- Muestra el formulario para editar un amanecer
16. post /profile/sunrises/:id/edit --------- Edita en la BBDD un amanecer
17. get /profile/:anotheruser-id --------- Muestra el perfil de otros usuarios
18. post /profile/:anotheruser-id --------- Comentarios o chat
