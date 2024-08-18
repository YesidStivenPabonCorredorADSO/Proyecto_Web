document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(usuario)
    if (usuario) {
        const userCorreo = document.getElementById('user-correo');
        const userName = document.getElementById('user-name');
        const userApellido = document.getElementById('user-apellido');
        const userContrasena = document.getElementById('user-contrasena');
        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');
        const correoInput = document.getElementById('correo');
        const contrasenaInput = document.getElementById('contrasena');

        if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo}`;
        if (userName) userName.textContent = `Nombre: ${usuario.nombre}`;
        if (userApellido) userApellido.textContent = `Apellido: ${usuario.apellido}`;
        if (userContrasena) userContrasena.textContent = `Contraseña: ${usuario.contrasena}`;

        if (nombreInput) nombreInput.value = usuario.nombre || '';
        if (apellidoInput) apellidoInput.value = usuario.apellido || '';
        if (correoInput) correoInput.value = usuario.correo || '';
        if (contrasenaInput) contrasenaInput.value = usuario.contrasena || '';

        // Manejo de eventos para actualizar localStorage
        if (nombreInput) {
            nombreInput.addEventListener('input', () => {
                usuario.nombre = nombreInput.value;
                localStorage.setItem('usuario', JSON.stringify(usuario));
                if (userName) userName.textContent = `Nombre: ${usuario.nombre}`;
            });
        }

        if (apellidoInput) {
            apellidoInput.addEventListener('input', () => {
                usuario.apellido = apellidoInput.value;
                localStorage.setItem('usuario', JSON.stringify(usuario));
                if (userApellido) userApellido.textContent = `Apellido: ${usuario.apellido}`;
            });
        }

        if (correoInput) {
            correoInput.addEventListener('input', () => {
                usuario.correo = correoInput.value;
                localStorage.setItem('usuario', JSON.stringify(usuario));
                if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo}`;
            });
        }

        if (contrasenaInput) {
            contrasenaInput.addEventListener('input', () => {
                usuario.contrasena = contrasenaInput.value;
                localStorage.setItem('usuario', JSON.stringify(usuario));
                if (userContrasena) userContrasena.textContent = `Contraseña: ${usuario.contrasena}`;
      
            });
        }
    } else {
        console.log("No se encontró información del usuario.");
    }
});


