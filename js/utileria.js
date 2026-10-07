function validarCorreo(correo) {
    const regnex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regnex.test(correo);
}

function soloLetras(texto) {
    const regnex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regnex.test(texto);
}

function validarLongitud(numero, maxLongitud) {
    const digitos = Math.abs(numero).toString().length;
    return digitos <= maxLongitud;
}

function calcularEdad(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNacimiento = nacimiento.getMonth();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
}

function esMayorDeEdad(fechaNacimiento) {
    return calcularEdad(fechaNacimiento) >= 18;
}

function validarPassword(password) {
    const regnex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return regnex.test(password);
}

function capitalizarTexto(texto) {
    return texto
        .toLowerCase()
        .split(" ")
        .filter(palabra => palabra.length > 0)
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(" ");
}

function calcularDiasRestantes(fechaObjetivo) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const objetivo = new Date(fechaObjetivo);
    objetivo.setHours(0, 0, 0, 0);

    const diferenciaMs = objetivo - hoy;
    const dias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));

    return dias > 0 ? dias : 0;
}