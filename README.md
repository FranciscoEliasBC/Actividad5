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

**Captura de usuarios**

El formulario formulario-captura permite registrar usuarios durante la sesión actual.

Se validan:

- Nombre de usuario.
- Correo electrónico.
- Contraseña.

Para el correo y la contraseña se utilizan:

- `validarCorreo()`
- `validarPassword()`

Los usuarios capturados se almacenan temporalmente en un arreglo:

```javascript
const usuariosCapturados = [];
```

Posteriormente, la función `renderizarUsuariosCapturados()` actualiza la lista mostrada en pantalla.

Esta información solamente permanece en memoria mientras la página está activa, ya que no se utiliza una base de datos.

**Registro de alumnos**

La sección de alumnos permite capturar:

- Nombre completo.
- Número de control.
- Fecha de nacimiento.

El nombre se valida mediante:

- `soloLetras(nombre)`

El número de control debe contener exactamente seis dígitos y se valida mediante:

```javascript 
validarLongitud(Number(control), 6)
```

También se comprueba que la fecha de nacimiento no sea futura.

**Cálculo de edad y mayoría de edad**

Una vez que los datos del alumno son correctos, se utilizan:

```javascript 
const edad = calcularEdad(fecha);
const mayorEdad = esMayorDeEdad(fecha);
```

Los resultados se colocan dentro del modal.

El modal muestra:

- Nombre del alumno.
- Número de control.
- Edad calculada.
- Si el alumno es mayor o menor de edad.

**Funciones utilizadas de utileria.js**

El sistema utiliza la librería `utileria.js`, incluida de forma local en `js/utileria.js`.

Las principales funciones utilizadas son:

1. `validarCorreo()` Comprueba que el correo electrónico introducido tenga un formato válido.

2. `validarPassword()` Comprueba que la contraseña tenga las características requeridas, incluyendo longitud mínima, mayúsculas, minúsculas, números y caracteres especiales.

3. `soloLetras()` Comprueba que el nombre del alumno esté formado únicamente por letras.

4. `validarLongitud()` Se utiliza para validar el número de control.

5. `calcularEdad()` Calcula la edad del alumno a partir de su fecha de nacimiento.

6. `esMayorDeEdad()` Determina si el alumno es mayor o menor de edad.

## Proceso de creación

1. **Creación del login:** Primero se creó login.html con un formulario que contiene los campos de correo electrónico y contraseña.
Se agregó un botón para iniciar sesión y elementos destinados a mostrar mensajes de error y mensajes de éxito.
Posteriormente, mediante login.css, se diseñó una tarjeta centrada con fondo, bordes redondeados, sombras y colores personalizados.

![image alt](img\Creaciondellogin.png)

2. **Validación del login:** Después se conectó el formulario con login.js.
Al presionar `Iniciar sesión`, se ejecutan `validarCorreo()` y `validarPassword()`.
Si los datos son incorrectos, aparecen mensajes debajo de los campos correspondientes.

![image alt](img\Validaciondellogin.png)

Si los datos son correctos, se almacena el correo en sessionStorage y el sistema cambia hacia `index.html`.

![image alt](img\Validaciondellogin2.png)


3. **Creación del navbar:** Después del login se creó el navbar principal del sistema.
El navbar contiene:

- Botón hamburguesa.
- Nombre "Sistema Escolar".
- Icono de usuario.
- Correo del usuario.
- Menú desplegable.
- Opción "Salir del sistema".

El correo mostrado en esta sección proviene de sessionStorage.

![image alt](img\Creaciondelnavbar.png)

4. **Creación del sidebar:** Se creó un menú lateral utilizando HTML, Bootstrap y CSS personalizado.
El sidebar contiene las opciones:

- Inicio.
- Usuarios.
- Captura.
- Alumnos.

La opción Usuarios utiliza el componente collapse de Bootstrap para mostrar el submenú Captura.
También se agregó un botón hamburguesa para mostrar u ocultar el sidebar.

![image alt](img\Creaciondelsidebar.png)

5. **Creación de la captura de usuarios:** Posteriormente se agregó la vista Usuarios → Captura.

Esta sección contiene un formulario con:

- Nombre de usuario.
- Correo electrónico.
- Contraseña.
- Botón "Guardar usuario".

Después de validar los datos, el usuario se agrega a una lista que aparece debajo del formulario.

![image alt](img\Creaciondelacapturadeusuarios.png)

6. **Creación de la sección de alumnos:** Se creó una segunda vista llamada Alumnos → Registro.
El formulario contiene:

- Nombre completo.
- Número de control.
- Fecha de nacimiento.
- Botón "Verificar edad".

El número de control debe tener exactamente seis dígitos.

![image alt](img\Creaciondelasecciondealumnos.png)

7. **Creación del modal** Una vez que los datos del alumno pasan las validaciones, se calculan la edad y la mayoría de edad.
Los resultados se muestran mediante un modal de Bootstrap.

El modal presenta:

- Nombre del alumno.
- Número de control.
- Edad.
- Resultado de mayoría de edad.
- Botón "Cerrar".

![image alt](img\Creaciondelmodal.png)

8. **Implementación del cierre de sesión:** Finalmente se agregó la opción "Salir del sistema" en el menú del usuario.
Al seleccionarla, se elimina correoUsuario de sessionStorage y el sistema regresa automáticamente a login.html.

![image alt](img\Implementaciondelcierredesesion.png)

## Flujo completo

1 — Pantalla de login

![image alt](img\flujo1.png)

2 — Panel principal

![image alt](img\flujo2.png)

3 — Captura de usuarios

![image alt](img\flujo3.png)

![image alt](img\flujo3.1.png)

4 — Registro de alumno

![image alt](img\flujo4.png)

5 — Modal de edad

![image alt](img\flujo5.png)

6 — Cierre de sesión

![image alt](img\flujo6.png)