
const CLAVE_USUARIOS = 'usuariosRegistrados';

function obtenerUsuarios() {
    try {
        const guardados = JSON.parse(localStorage.getItem(CLAVE_USUARIOS));
        return Array.isArray(guardados) ? guardados : [];
    } catch (error) {
        return [];
    }
}

function guardarUsuarios(usuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

document.addEventListener('DOMContentLoaded', () => {

    const formularioLogin = document.getElementById('formulario-login');

    if (formularioLogin) {
        const inputCorreo = document.getElementById('correo');
        const inputPassword = document.getElementById('password');
        const errorCorreo = document.getElementById('error-correo');
        const errorPassword = document.getElementById('error-password');
        const mensajeExito = document.getElementById('mensaje-exito');

        formularioLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            errorCorreo.textContent = '';
            errorPassword.textContent = '';
            mensajeExito.textContent = '';

            const correo = inputCorreo.value.trim();
            const password = inputPassword.value;

            const correoValido = validarCorreo(correo);
            const passwordValido = validarPassword(password);

            console.log('validarCorreo(correo):', correoValido);
            console.log('validarPassword(password):', passwordValido);

            let formularioValido = true;

            if (!correoValido) {
                errorCorreo.textContent = 'Ingresa un correo electrónico válido.';
                formularioValido = false;
            }

            if (!passwordValido) {
                errorPassword.textContent = 'Debe tener 8+ caracteres, mayúscula, minúscula, número y símbolo.';
                formularioValido = false;
            }

            if (!formularioValido) {
                return;
            }

            sessionStorage.setItem('correoUsuario', correo);
            mensajeExito.textContent = 'Acceso correcto. Entrando al sistema...';

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800);
        });
    }

    const sidebar = document.getElementById('sidebar');

    if (sidebar) {

        const correoUsuario = sessionStorage.getItem('correoUsuario');
        if (!correoUsuario) {
            window.location.href = 'login.html';
            return;
        }

        document.getElementById('nombre-usuario-navbar').textContent = correoUsuario;

        const contenido = document.getElementById('contenido');
        const btnHamburguesa = document.getElementById('btn-hamburguesa');

        btnHamburguesa.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('visible');
            } else {
                sidebar.classList.toggle('oculto');
                contenido.classList.toggle('expandido');
            }
        });

        document.getElementById('btn-salir').addEventListener('click', () => {
            sessionStorage.removeItem('correoUsuario');
            window.location.href = 'login.html';
        });

        const enlacesVista = document.querySelectorAll('.enlace-vista');
        const vistas = document.querySelectorAll('.vista');

        enlacesVista.forEach(enlace => {
            enlace.addEventListener('click', (e) => {
                e.preventDefault();
                const destino = enlace.dataset.vista;

                vistas.forEach(v => v.classList.add('d-none'));
                document.getElementById(destino).classList.remove('d-none');

                enlacesVista.forEach(el => el.classList.remove('activo'));
                enlace.classList.add('activo');

                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('visible');
                }
            });
        });

        const formularioCaptura = document.getElementById('formulario-captura');
        const usuariosCapturados = [];

        formularioCaptura.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('captura-nombre').value.trim();
            const correo = document.getElementById('captura-correo').value.trim();
            const password = document.getElementById('captura-password').value;

            document.getElementById('error-captura-nombre').textContent = '';
            document.getElementById('error-captura-correo').textContent = '';
            document.getElementById('error-captura-password').textContent = '';
            document.getElementById('mensaje-captura-exito').textContent = '';

            let valido = true;

            if (nombre === '') {
                document.getElementById('error-captura-nombre').textContent = 'Ingresa un nombre de usuario.';
                valido = false;
            }

            const correoValido = validarCorreo(correo);
            if (!correoValido) {
                document.getElementById('error-captura-correo').textContent = 'Ingresa un correo electrónico válido.';
                valido = false;
            }

            const passwordValido = validarPassword(password);
            if (!passwordValido) {
                document.getElementById('error-captura-password').textContent = 'Debe tener 8+ caracteres, mayúscula, minúscula, número y símbolo.';
                valido = false;
            }

            console.log('validarCorreo(correo):', correoValido);
            console.log('validarPassword(password):', passwordValido);

            if (!valido) return;

            usuariosCapturados.push({ nombre, correo });
            renderizarUsuariosCapturados();

            document.getElementById('mensaje-captura-exito').textContent = `Usuario "${nombre}" guardado correctamente.`;
            formularioCaptura.reset();
        });

        function renderizarUsuariosCapturados() {
            const lista = document.getElementById('lista-usuarios-capturados');
            lista.innerHTML = '';

            if (usuariosCapturados.length === 0) {
                lista.innerHTML = '<li class="list-group-item text-muted">Aún no has capturado ningún usuario.</li>';
                return;
            }

            usuariosCapturados.forEach(u => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `${u.nombre} — ${u.correo}`;
                lista.appendChild(li);
            });
        }

        const formularioAlumno = document.getElementById('formulario-alumno');
        const modalEdad = new bootstrap.Modal(document.getElementById('modal-edad'));

        document.getElementById('alumno-fecha').max = new Date().toISOString().split('T')[0];

        formularioAlumno.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('alumno-nombre').value.trim();
            const control = document.getElementById('alumno-control').value.trim();
            const fecha = document.getElementById('alumno-fecha').value;

            document.getElementById('error-alumno-nombre').textContent = '';
            document.getElementById('error-alumno-control').textContent = '';
            document.getElementById('error-alumno-fecha').textContent = '';

            let valido = true;

            if (nombre === '' || !soloLetras(nombre)) {
                document.getElementById('error-alumno-nombre').textContent = 'Ingresa un nombre válido (solo letras).';
                valido = false;
            }

            const controlEsNumerico = control !== '' && !isNaN(control);
            const controlValido = controlEsNumerico && validarLongitud(Number(control), 6) && control.length === 6;
            if (!controlValido) {
                document.getElementById('error-alumno-control').textContent = 'El número de control debe tener exactamente 6 dígitos.';
                valido = false;
            }

            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            if (fecha === '') {
                document.getElementById('error-alumno-fecha').textContent = 'Selecciona la fecha de nacimiento.';
                valido = false;
            } else if (new Date(fecha) > hoy) {
                document.getElementById('error-alumno-fecha').textContent = 'La fecha no puede ser futura.';
                valido = false;
            }

            console.log('validarLongitud(control, 6):', controlValido);

            if (!valido) return;

            const edad = calcularEdad(fecha);
            const mayorEdad = esMayorDeEdad(fecha);

            console.log('calcularEdad(fecha):', edad);
            console.log('esMayorDeEdad(fecha):', mayorEdad);

            document.getElementById('modal-alumno-nombre').textContent = nombre;
            document.getElementById('modal-alumno-control').textContent = control;
            document.getElementById('modal-alumno-edad').textContent = `${edad} años`;
            document.getElementById('modal-alumno-mayor').textContent = mayorEdad
                ? 'Es mayor de edad ✅'
                : 'Es menor de edad ⚠️';

            modalEdad.show();
        });
    }

});