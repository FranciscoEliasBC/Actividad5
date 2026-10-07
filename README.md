# Sistema de Acceso — Login + Panel

**Proyecto:** Login funcional con flujo hacia un panel de sistema (sidebar + navbar + formularios), hecho con HTML, CSS y JavaScript.

**Integrantes del equipo:**
- Ruiz Durán Emiliano
- Bautista Cente Francisco Elias

**Descripción breve:** 
Simula el acceso a un sistema escolar. El usuario inicia sesión en `login.html` con correo y contraseña (validados con la librería `utileria.js`); si son válidos, pasa a `index.html`, donde ve su correo en la barra superior, puede capturar nuevos usuarios, registrar alumnos (con verificación de mayoría de edad en un modal), y cerrar sesión para volver al login.

## Enlaces

- **Repositorio:** _(pegar aquí el link de GitHub)_
- **GitHub Pages:** _(pegar aquí el link en vivo)_

## Estructura del repositorio

```
/sistema-login
├── README.md
├── login.html
├── index.html
├── css/
│   ├── login.css
│   ├── bootstrap.min.css
│   ├── bootstrap-icons.min.css
│   └── fonts/            (Bootstrap Icons e Inter, locales)
├── js/
│   ├── login.js
│   ├── utileria.js
│   └── bootstrap.bundle.min.js
└── img/

```

## Explicación y documentación

**Framework CSS utilizado**
Para el desarrollo de la interfaz se utilizó Bootstrap 5.3.3, incluido de forma local (`css/bootstrap.min.css` y `js/bootstrap.bundle.min.js`), por lo que el proyecto funciona sin conexión a internet.
Bootstrap se utilizó principalmente para facilitar la construcción de:

- Formularios.
- Navbar.
- Botones.
- Sidebar y elementos de navegación.
- Dropdown del usuario.
- Modal.
- Sistema responsive.
- Clases de espaciado y posicionamiento.

### Flujo del login hacia el sistema

1. En `login.html`, el usuario ingresa correo y contraseña.
2. Al enviar el formulario, se validan con `validarCorreo(correo)` y `validarPassword(password)` de **utileria.js**.
3. Si ambas validaciones pasan, el correo se guarda en `sessionStorage` (`sessionStorage.setItem('correoUsuario', correo)`), y tras una breve pausa se redirige a `index.html` con `window.location.href`.
4. Al cargar `index.html`, el script revisa si existe `correoUsuario` en `sessionStorage`. Si no existe (por ejemplo, alguien entra directo a la URL sin pasar por el login), se le redirige de vuelta a `login.html` automáticamente.

### Cómo se pasa el nombre de usuario del login al navbar

El correo guardado en `sessionStorage` durante el login se lee al cargar `index.html` y se inyecta directamente en el 
`<span id="nombre-usuario-navbar">` de la barra superior.

```javascript
const correoUsuario = sessionStorage.getItem('correoUsuario');
document.getElementById('nombre-usuario-navbar').textContent = correoUsuario;
```
Al hacer clic en "Salir del sistema", se borra con `sessionStorage.removeItem('correoUsuario')` y se regresa a `login.html`, simulando el cierre de sesión.

## Métodos y bloques principales

**Validación del formulario de login**

El listener asociado a formulario-login obtiene el correo y la contraseña, ejecuta las funciones de validación y determina si el usuario puede acceder al sistema.

Las principales funciones utilizadas son:

```javascript
validarCorreo(correo)
validarPassword(password)
```

**Guardia de sesión**

La guardia de sesión comprueba que exista `correoUsuario` dentro de `sessionStorage`.
Si no existe, el usuario es enviado nuevamente al login.

**Botón hamburguesa**

El botón identificado como `btn-hamburguesa` permite ocultar o mostrar el sidebar.
En pantallas grandes se modifica la posición del sidebar y del contenido.
En pantallas pequeñas se utiliza la clase visible para mostrar el menú como un elemento deslizable.

**Cambio de vistas**

Los elementos que tienen la clase:

`.enlace-vista`

permiten cambiar entre las diferentes secciones del sistema.

Las vistas principales son:

- `vista-inicio`
- `vista-captura`
- `vista-alumnos`

Cuando se selecciona una opción, las demás vistas se ocultan utilizando `d-none` y se muestra únicamente la vista seleccionada.
