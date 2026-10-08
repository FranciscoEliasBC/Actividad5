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
        const avisoLogin = document.getElementById('aviso-login');

        if (avisoLogin) {
            avisoLogin.textContent = obtenerUsuarios().length === 0
                ? 'Aún no hay usuarios registrados: el primer acceso es libre. Registra usuarios en Usuarios > Captura.'
                : 'Solo pueden entrar los usuarios registrados.';
        }

        formularioLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            if (errorCorreo) errorCorreo.textContent = '';
            if (errorPassword) errorPassword.textContent = '';
            if (mensajeExito) mensajeExito.textContent = '';

            const correo = inputCorreo.value.trim();
            const password = inputPassword.value;

            const correoValido = validarCorreo(correo);
            const passwordValido = validarPassword(password);

            let formularioValido = true;

            if (!correoValido) {
                if (errorCorreo) errorCorreo.textContent = 'Ingresa un correo electrónico válido.';
                formularioValido = false;
            }

            if (!passwordValido) {
                if (errorPassword) errorPassword.textContent = 'Debe tener 8+ caracteres, mayúscula, minúscula, número y símbolo.';
                formularioValido = false;
            }

            if (!formularioValido) return;

            const usuarios = obtenerUsuarios();

            if (usuarios.length > 0) {
                const usuarioEncontrado = usuarios.find(u =>
                    u.correo.toLowerCase() === correo.toLowerCase() && u.password === password
                );

                if (!usuarioEncontrado) {
                    if (errorPassword) errorPassword.textContent = 'Correo o contraseña incorrectos. Solo pueden entrar usuarios registrados.';
                    return;
                }
            }

            sessionStorage.setItem('correoUsuario', correo);
            if (mensajeExito) mensajeExito.textContent = 'Acceso correcto. Entrando al sistema...';

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800);
        });
    }

    /* MÓDULO SIDEBAR (index.html) */
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        const correoUsuario = sessionStorage.getItem('correoUsuario');
        if (!correoUsuario) {
            window.location.href = 'login.html';
            return;
        }
    }
});